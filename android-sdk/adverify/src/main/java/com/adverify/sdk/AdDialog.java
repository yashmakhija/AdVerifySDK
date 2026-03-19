package com.adverify.sdk;

import android.app.Activity;
import android.app.Dialog;
import android.content.Intent;
import android.content.res.ColorStateList;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.graphics.Outline;
import android.graphics.Typeface;
import android.graphics.drawable.ColorDrawable;
import android.graphics.drawable.GradientDrawable;
import android.graphics.drawable.RippleDrawable;
import android.net.Uri;
import android.os.Build;
import android.text.TextUtils;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewOutlineProvider;
import android.view.Window;
import android.view.WindowManager;
import android.view.animation.AlphaAnimation;
import android.view.animation.AnimationSet;
import android.view.animation.DecelerateInterpolator;
import android.view.animation.ScaleAnimation;
import android.view.animation.TranslateAnimation;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;

import com.adverify.sdk.internal.models.Ad;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

class AdDialog {

    interface AdDialogListener {
        void onClicked(String url);
        void onClosed();
    }

    private final Activity activity;
    private final Ad ad;
    private final AdDialogListener listener;

    AdDialog(Activity activity, Ad ad, AdDialogListener listener) {
        this.activity = activity;
        this.ad = ad;
        this.listener = listener;
    }

    void show() {
        if (activity == null || activity.isFinishing()) return;
        if (Build.VERSION.SDK_INT >= 17 && activity.isDestroyed()) return;

        String type = ad.adType != null ? ad.adType.toLowerCase().trim() : "card";
        try {
            switch (type) {
                case "fullscreen": showFullscreen(); break;
                case "banner": showBanner(); break;
                default: showCard(); break;
            }
        } catch (Exception e) {
            if (listener != null) listener.onClosed();
        }
    }

    // ════════════════════════════════════════
    // CARD — simple Dialog, no overlay tricks
    // ════════════════════════════════════════

    private void showCard() {
        // Use a basic Dialog — simplest approach, guaranteed WRAP_CONTENT
        Dialog dialog = new Dialog(activity);
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        dialog.setCancelable(true);
        dialog.setOnDismissListener(d -> {
            if (listener != null) listener.onClosed();
        });

        int screenW = getScreenWidth();
        int cardWidth = Math.min(dp(320), screenW - dp(48));

        // Root card
        LinearLayout root = new LinearLayout(activity);
        root.setOrientation(LinearLayout.VERTICAL);

        GradientDrawable rootBg = new GradientDrawable();
        rootBg.setColor(Color.WHITE);
        rootBg.setCornerRadius(dp(16));
        root.setBackground(rootBg);
        root.setClipToOutline(true);
        root.setOutlineProvider(new ViewOutlineProvider() {
            @Override
            public void getOutline(View v, Outline o) {
                o.setRoundRect(0, 0, v.getWidth(), v.getHeight(), dp(16));
            }
        });

        // Image — 16:9
        if (hasImage()) {
            ImageView img = new ImageView(activity);
            img.setScaleType(ImageView.ScaleType.CENTER_CROP);
            img.setBackgroundColor(Color.parseColor("#f0f0f0"));
            int imgH = (int) (cardWidth * 9.0 / 16.0);
            LinearLayout.LayoutParams imgLP = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, imgH);
            img.setLayoutParams(imgLP);
            root.addView(img);
            loadImage(ad.imageUrl, img);
        }

        // Content
        LinearLayout content = new LinearLayout(activity);
        content.setOrientation(LinearLayout.VERTICAL);
        content.setPadding(dp(20), dp(16), dp(20), dp(16));
        LinearLayout.LayoutParams contentLP = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        content.setLayoutParams(contentLP);

        // Title
        TextView title = new TextView(activity);
        title.setText(safeStr(ad.title, ""));
        title.setTextSize(TypedValue.COMPLEX_UNIT_SP, 16);
        title.setTextColor(Color.parseColor("#111111"));
        title.setTypeface(Typeface.DEFAULT_BOLD);
        title.setMaxLines(2);
        title.setEllipsize(TextUtils.TruncateAt.END);
        content.addView(title);

        // Description
        if (hasDesc()) {
            TextView desc = new TextView(activity);
            desc.setText(ad.description);
            desc.setTextSize(TypedValue.COMPLEX_UNIT_SP, 13);
            desc.setTextColor(Color.parseColor("#888888"));
            desc.setLineSpacing(0, 1.3f);
            desc.setMaxLines(3);
            desc.setEllipsize(TextUtils.TruncateAt.END);
            LinearLayout.LayoutParams descLP = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
            descLP.topMargin = dp(4);
            desc.setLayoutParams(descLP);
            content.addView(desc);
        }

        // Divider
        View divider = new View(activity);
        divider.setBackgroundColor(Color.parseColor("#f0f0f0"));
        LinearLayout.LayoutParams divLP = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, dp(1));
        divLP.topMargin = dp(14);
        divider.setLayoutParams(divLP);
        content.addView(divider);

        // Button row
        LinearLayout btnRow = new LinearLayout(activity);
        btnRow.setOrientation(LinearLayout.HORIZONTAL);
        btnRow.setGravity(Gravity.CENTER_VERTICAL);
        LinearLayout.LayoutParams btnRowLP = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        btnRowLP.topMargin = dp(12);
        btnRow.setLayoutParams(btnRowLP);

        // Close
        TextView closeBtn = new TextView(activity);
        closeBtn.setText("Close");
        closeBtn.setTextColor(Color.parseColor("#999999"));
        closeBtn.setTextSize(TypedValue.COMPLEX_UNIT_SP, 13);
        closeBtn.setPadding(dp(4), dp(8), dp(12), dp(8));
        closeBtn.setOnClickListener(v -> dialog.dismiss());
        btnRow.addView(closeBtn);

        // Spacer
        View spacer = new View(activity);
        spacer.setLayoutParams(new LinearLayout.LayoutParams(0, 1, 1f));
        btnRow.addView(spacer);

        // CTA
        TextView cta = new TextView(activity);
        cta.setText(safeStr(ad.buttonText, "Visit"));
        cta.setTextColor(Color.WHITE);
        cta.setTextSize(TypedValue.COMPLEX_UNIT_SP, 13);
        cta.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
        cta.setGravity(Gravity.CENTER);
        GradientDrawable ctaBg = new GradientDrawable();
        ctaBg.setColor(Color.parseColor("#111111"));
        ctaBg.setCornerRadius(dp(10));
        cta.setBackground(new RippleDrawable(
            ColorStateList.valueOf(Color.parseColor("#333333")), ctaBg, null));
        cta.setPadding(dp(20), dp(10), dp(20), dp(10));
        cta.setOnClickListener(v -> { onCtaClick(); dialog.dismiss(); });
        btnRow.addView(cta);

        content.addView(btnRow);
        root.addView(content);

        dialog.setContentView(root);

        // Window — transparent bg, fixed width, WRAP height
        Window window = dialog.getWindow();
        if (window != null) {
            window.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
            window.setLayout(cardWidth, ViewGroup.LayoutParams.WRAP_CONTENT);
            window.setGravity(Gravity.CENTER);
            // Dim behind
            window.setDimAmount(0.4f);
            window.addFlags(WindowManager.LayoutParams.FLAG_DIM_BEHIND);
        }

        dialog.show();

        // Animate
        AnimationSet anim = new AnimationSet(true);
        anim.setInterpolator(new DecelerateInterpolator());
        anim.setDuration(200);
        anim.addAnimation(new AlphaAnimation(0f, 1f));
        anim.addAnimation(new ScaleAnimation(0.95f, 1f, 0.95f, 1f,
            ScaleAnimation.RELATIVE_TO_SELF, 0.5f, ScaleAnimation.RELATIVE_TO_SELF, 0.5f));
        root.startAnimation(anim);
    }

    // ════════════════════════════════════════
    // FULLSCREEN
    // ════════════════════════════════════════

    private void showFullscreen() {
        Dialog dialog = new Dialog(activity, android.R.style.Theme_Translucent_NoTitleBar);
        dialog.setCancelable(true);
        dialog.setOnDismissListener(d -> { if (listener != null) listener.onClosed(); });

        FrameLayout root = new FrameLayout(activity);
        root.setLayoutParams(new FrameLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        root.setBackgroundColor(Color.BLACK);

        // Full image
        if (hasImage()) {
            ImageView img = new ImageView(activity);
            img.setScaleType(ImageView.ScaleType.CENTER_CROP);
            img.setBackgroundColor(Color.parseColor("#111111"));
            img.setLayoutParams(new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
            root.addView(img);
            loadImage(ad.imageUrl, img);
        }

        // Gradient
        View grad = new View(activity);
        grad.setBackground(new GradientDrawable(GradientDrawable.Orientation.BOTTOM_TOP,
            new int[]{ Color.parseColor("#DD000000"), Color.TRANSPARENT }));
        FrameLayout.LayoutParams gradLP = new FrameLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, dp(220));
        gradLP.gravity = Gravity.BOTTOM;
        grad.setLayoutParams(gradLP);
        root.addView(grad);

        // Bottom content
        LinearLayout bottom = new LinearLayout(activity);
        bottom.setOrientation(LinearLayout.VERTICAL);
        int navH = getNavBarHeight();
        bottom.setPadding(dp(24), dp(16), dp(24), dp(24) + navH);
        FrameLayout.LayoutParams bLP = new FrameLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        bLP.gravity = Gravity.BOTTOM;
        bottom.setLayoutParams(bLP);

        TextView t = new TextView(activity);
        t.setText(safeStr(ad.title, ""));
        t.setTextSize(TypedValue.COMPLEX_UNIT_SP, 20);
        t.setTextColor(Color.WHITE);
        t.setTypeface(Typeface.DEFAULT_BOLD);
        t.setMaxLines(2);
        t.setShadowLayer(6, 0, 2, Color.parseColor("#88000000"));
        bottom.addView(t);

        if (hasDesc()) {
            TextView d = new TextView(activity);
            d.setText(ad.description);
            d.setTextSize(TypedValue.COMPLEX_UNIT_SP, 14);
            d.setTextColor(Color.parseColor("#cccccc"));
            d.setMaxLines(2);
            d.setLineSpacing(0, 1.3f);
            LinearLayout.LayoutParams dLP = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
            dLP.topMargin = dp(4);
            d.setLayoutParams(dLP);
            bottom.addView(d);
        }

        // CTA — white, full width
        TextView cta = new TextView(activity);
        cta.setText(safeStr(ad.buttonText, "Visit"));
        cta.setTextColor(Color.BLACK);
        cta.setTextSize(TypedValue.COMPLEX_UNIT_SP, 14);
        cta.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
        cta.setGravity(Gravity.CENTER);
        GradientDrawable ctaBg = new GradientDrawable();
        ctaBg.setColor(Color.WHITE);
        ctaBg.setCornerRadius(dp(12));
        cta.setBackground(new RippleDrawable(
            ColorStateList.valueOf(Color.parseColor("#dddddd")), ctaBg, null));
        cta.setPadding(dp(20), dp(14), dp(20), dp(14));
        LinearLayout.LayoutParams ctaLP = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        ctaLP.topMargin = dp(16);
        cta.setLayoutParams(ctaLP);
        cta.setOnClickListener(v -> { onCtaClick(); dialog.dismiss(); });
        bottom.addView(cta);

        root.addView(bottom);

        // Close X
        TextView x = new TextView(activity);
        x.setText("✕");
        x.setTextColor(Color.WHITE);
        x.setTextSize(TypedValue.COMPLEX_UNIT_SP, 16);
        x.setGravity(Gravity.CENTER);
        GradientDrawable xBg = new GradientDrawable();
        xBg.setColor(Color.parseColor("#66000000"));
        xBg.setCornerRadius(dp(18));
        x.setBackground(xBg);
        FrameLayout.LayoutParams xLP = new FrameLayout.LayoutParams(dp(36), dp(36));
        xLP.gravity = Gravity.TOP | Gravity.END;
        xLP.topMargin = dp(12) + getStatusBarHeight();
        xLP.rightMargin = dp(12);
        x.setLayoutParams(xLP);
        x.setOnClickListener(v -> dialog.dismiss());
        root.addView(x);

        dialog.setContentView(root);
        Window w = dialog.getWindow();
        if (w != null) {
            w.setLayout(WindowManager.LayoutParams.MATCH_PARENT, WindowManager.LayoutParams.MATCH_PARENT);
            w.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
            w.clearFlags(WindowManager.LayoutParams.FLAG_DIM_BEHIND);
        }
        dialog.show();
    }

    // ════════════════════════════════════════
    // BANNER
    // ════════════════════════════════════════

    private void showBanner() {
        Dialog dialog = new Dialog(activity, android.R.style.Theme_Translucent_NoTitleBar);
        dialog.setCancelable(true);
        dialog.setOnDismissListener(d -> { if (listener != null) listener.onClosed(); });

        FrameLayout root = new FrameLayout(activity);
        root.setLayoutParams(new FrameLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        root.setClipChildren(false); // allow banner shadow to render
        root.setOnClickListener(v -> dialog.dismiss()); // tap outside to dismiss

        // Banner
        LinearLayout banner = new LinearLayout(activity);
        banner.setOrientation(LinearLayout.HORIZONTAL);
        banner.setGravity(Gravity.CENTER_VERTICAL);
        banner.setOnClickListener(v -> {}); // block click-through

        GradientDrawable bannerBg = new GradientDrawable();
        bannerBg.setColor(Color.WHITE);
        bannerBg.setCornerRadii(new float[]{dp(16),dp(16),dp(16),dp(16), 0,0,0,0});
        banner.setBackground(bannerBg);
        banner.setElevation(dp(12));
        int navH = getNavBarHeight();
        banner.setPadding(dp(16), dp(14), dp(16), dp(14) + navH);

        FrameLayout.LayoutParams bLP = new FrameLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        bLP.gravity = Gravity.BOTTOM;
        banner.setLayoutParams(bLP);

        // Thumb
        if (hasImage()) {
            ImageView thumb = new ImageView(activity);
            thumb.setScaleType(ImageView.ScaleType.CENTER_CROP);
            thumb.setBackgroundColor(Color.parseColor("#f0f0f0"));
            GradientDrawable tBg = new GradientDrawable();
            tBg.setColor(Color.parseColor("#f0f0f0"));
            tBg.setCornerRadius(dp(10));
            thumb.setBackground(tBg);
            thumb.setClipToOutline(true);
            thumb.setOutlineProvider(new ViewOutlineProvider() {
                @Override public void getOutline(View v, Outline o) {
                    o.setRoundRect(0, 0, v.getWidth(), v.getHeight(), dp(10));
                }
            });
            LinearLayout.LayoutParams tLP = new LinearLayout.LayoutParams(dp(52), dp(52));
            tLP.rightMargin = dp(12);
            thumb.setLayoutParams(tLP);
            banner.addView(thumb);
            loadImage(ad.imageUrl, thumb);
        }

        // Text
        LinearLayout textCol = new LinearLayout(activity);
        textCol.setOrientation(LinearLayout.VERTICAL);
        textCol.setLayoutParams(new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f));

        TextView title = new TextView(activity);
        title.setText(safeStr(ad.title, ""));
        title.setTextSize(TypedValue.COMPLEX_UNIT_SP, 14);
        title.setTextColor(Color.parseColor("#111111"));
        title.setTypeface(Typeface.DEFAULT_BOLD);
        title.setMaxLines(1);
        title.setSingleLine(true);
        title.setEllipsize(TextUtils.TruncateAt.END);
        textCol.addView(title);

        TextView sub = new TextView(activity);
        sub.setText("Sponsored");
        sub.setTextSize(TypedValue.COMPLEX_UNIT_SP, 11);
        sub.setTextColor(Color.parseColor("#999999"));
        textCol.addView(sub);

        banner.addView(textCol);

        // CTA
        TextView cta = new TextView(activity);
        cta.setText(safeStr(ad.buttonText, "Visit"));
        cta.setTextColor(Color.WHITE);
        cta.setTextSize(TypedValue.COMPLEX_UNIT_SP, 13);
        cta.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
        cta.setGravity(Gravity.CENTER);
        GradientDrawable ctaBg = new GradientDrawable();
        ctaBg.setColor(Color.parseColor("#111111"));
        ctaBg.setCornerRadius(dp(10));
        cta.setBackground(new RippleDrawable(
            ColorStateList.valueOf(Color.parseColor("#333333")), ctaBg, null));
        cta.setPadding(dp(18), dp(12), dp(18), dp(12));
        LinearLayout.LayoutParams ctaLP = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        ctaLP.leftMargin = dp(10);
        cta.setLayoutParams(ctaLP);
        cta.setOnClickListener(v -> { onCtaClick(); dialog.dismiss(); });
        banner.addView(cta);

        root.addView(banner);

        // Close X above banner
        TextView x = new TextView(activity);
        x.setText("✕");
        x.setTextColor(Color.parseColor("#999"));
        x.setTextSize(TypedValue.COMPLEX_UNIT_SP, 13);
        x.setGravity(Gravity.CENTER);
        GradientDrawable xBg = new GradientDrawable();
        xBg.setColor(Color.parseColor("#f0f0f0"));
        xBg.setCornerRadius(dp(14));
        x.setBackground(xBg);
        FrameLayout.LayoutParams xLP = new FrameLayout.LayoutParams(dp(28), dp(28));
        xLP.gravity = Gravity.BOTTOM | Gravity.END;
        xLP.bottomMargin = dp(86) + navH;
        xLP.rightMargin = dp(12);
        x.setLayoutParams(xLP);
        x.setOnClickListener(v -> dialog.dismiss());
        root.addView(x);

        dialog.setContentView(root);
        Window w = dialog.getWindow();
        if (w != null) {
            w.setLayout(WindowManager.LayoutParams.MATCH_PARENT, WindowManager.LayoutParams.MATCH_PARENT);
            w.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
            w.clearFlags(WindowManager.LayoutParams.FLAG_DIM_BEHIND);
        }
        dialog.show();

        // Slide up
        TranslateAnimation slide = new TranslateAnimation(0, 0, dp(100), 0);
        slide.setDuration(300);
        slide.setInterpolator(new DecelerateInterpolator());
        banner.startAnimation(slide);
    }

    // ════════════════════════════════════════
    // HELPERS
    // ════════════════════════════════════════

    private void onCtaClick() {
        if (listener != null) listener.onClicked(ad.redirectUrl);
        if (ad.redirectUrl != null && !ad.redirectUrl.isEmpty()) {
            try { activity.startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(ad.redirectUrl))); }
            catch (Exception ignored) {}
        }
    }

    private boolean hasImage() { return ad.imageUrl != null && !ad.imageUrl.isEmpty(); }
    private boolean hasDesc() { return ad.description != null && !ad.description.isEmpty(); }
    private String safeStr(String s, String def) { return s != null && !s.isEmpty() ? s : def; }

    private void loadImage(String url, ImageView iv) {
        new Thread(() -> {
            try {
                HttpURLConnection c = (HttpURLConnection) new URL(url).openConnection();
                c.setConnectTimeout(8000);
                c.setReadTimeout(8000);
                c.setInstanceFollowRedirects(true);
                c.connect();
                if (c.getResponseCode() == 200) {
                    InputStream is = c.getInputStream();
                    Bitmap bmp = BitmapFactory.decodeStream(is);
                    is.close(); c.disconnect();
                    if (bmp != null && !activity.isFinishing()) {
                        activity.runOnUiThread(() -> { try { iv.setImageBitmap(bmp); } catch (Exception ignored) {} });
                    }
                } else { c.disconnect(); }
            } catch (Exception ignored) {}
        }).start();
    }

    private int dp(int v) {
        return (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, v,
            activity.getResources().getDisplayMetrics());
    }
    private int getScreenWidth() { return activity.getResources().getDisplayMetrics().widthPixels; }
    private int getStatusBarHeight() {
        int id = activity.getResources().getIdentifier("status_bar_height", "dimen", "android");
        return id > 0 ? activity.getResources().getDimensionPixelSize(id) : dp(24);
    }
    private int getNavBarHeight() {
        int id = activity.getResources().getIdentifier("navigation_bar_height", "dimen", "android");
        return id > 0 ? activity.getResources().getDimensionPixelSize(id) : 0;
    }
}
