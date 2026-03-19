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
import android.widget.TextView;

import com.adverify.sdk.internal.models.Ad;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Displays an ad dialog with 3 layout modes:
 *   - "card" (default)  — centered card with image + text + CTA
 *   - "fullscreen"      — full screen image with bottom text overlay
 *   - "banner"          — slim bar at bottom of screen
 *
 * All layouts use dp() for density-independent sizing.
 * Tested on: mdpi (160), hdpi (240), xhdpi (320), xxhdpi (480), xxxhdpi (640).
 * Min API: 21 (Android 5.0).
 */
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
        // Guard: activity must be alive
        if (activity == null || activity.isFinishing()) return;
        if (Build.VERSION.SDK_INT >= 17 && activity.isDestroyed()) return;

        String type = ad.adType != null ? ad.adType.toLowerCase().trim() : "card";

        try {
            switch (type) {
                case "fullscreen":
                    showFullscreen();
                    break;
                case "banner":
                    showBanner();
                    break;
                case "card":
                case "interstitial":
                case "dialog":
                default:
                    showCard();
                    break;
            }
        } catch (Exception e) {
            // If dialog fails for any reason, report closed so SDK flow continues
            if (listener != null) listener.onClosed();
        }
    }

    // ════════════════════════════════════════════
    // CARD LAYOUT (default)
    // ════════════════════════════════════════════

    private void showCard() {
        Dialog dialog = createDialog();

        // Scrim overlay — tapping outside dismisses
        FrameLayout overlay = new FrameLayout(activity);
        overlay.setLayoutParams(matchParent());
        overlay.setBackgroundColor(Color.parseColor("#66000000"));
        overlay.setOnClickListener(v -> dialog.dismiss());

        // Card container
        LinearLayout card = new LinearLayout(activity);
        card.setOrientation(LinearLayout.VERTICAL);
        card.setOnClickListener(v -> {}); // block click-through

        // Responsive width: max 340dp, min 20dp margin each side
        int screenW = getScreenWidth();
        int cardWidth = Math.min(dp(340), screenW - dp(40));
        // Safety: at least 240dp wide
        cardWidth = Math.max(cardWidth, dp(240));

        applyRoundedBg(card, Color.WHITE, dp(16));

        FrameLayout.LayoutParams cardLP = new FrameLayout.LayoutParams(
            cardWidth, ViewGroup.LayoutParams.WRAP_CONTENT);
        cardLP.gravity = Gravity.CENTER;
        card.setLayoutParams(cardLP);

        // Image — 16:9 aspect ratio
        if (hasImage()) {
            ImageView img = createImageView();
            int imgH = (int) (cardWidth * 9.0 / 16.0);
            img.setLayoutParams(new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, imgH));
            card.addView(img);
            loadImage(ad.imageUrl, img);
        }

        // Content area
        LinearLayout content = new LinearLayout(activity);
        content.setOrientation(LinearLayout.VERTICAL);
        content.setPadding(dp(20), dp(16), dp(20), dp(16));

        // Title — 16sp bold, max 2 lines
        content.addView(createTitle(16, Color.parseColor("#111111"), 2));

        // Description — 13sp, max 3 lines
        if (hasDesc()) {
            content.addView(createDesc(13, Color.parseColor("#888888"), 3, dp(4)));
        }

        // Divider
        content.addView(createDivider(dp(14)));

        // Button row: Close (left) | spacer | CTA (right)
        content.addView(createButtonRow(dialog));

        card.addView(content);
        overlay.addView(card);

        showDialog(dialog, overlay);
        animateScale(card);
    }

    // ════════════════════════════════════════════
    // FULLSCREEN LAYOUT
    // ════════════════════════════════════════════

    private void showFullscreen() {
        Dialog dialog = createDialog();

        FrameLayout root = new FrameLayout(activity);
        root.setLayoutParams(matchParent());
        root.setBackgroundColor(Color.BLACK);

        // Full-screen image
        if (hasImage()) {
            ImageView img = createImageView();
            img.setBackgroundColor(Color.parseColor("#111111"));
            img.setLayoutParams(new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
            root.addView(img);
            loadImage(ad.imageUrl, img);
        }

        // Bottom gradient scrim — ensures text is readable over any image
        View gradient = new View(activity);
        GradientDrawable gradBg = new GradientDrawable(
            GradientDrawable.Orientation.BOTTOM_TOP,
            new int[]{ Color.parseColor("#DD000000"), Color.TRANSPARENT });
        gradient.setBackground(gradBg);
        FrameLayout.LayoutParams gradLP = new FrameLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, dp(220));
        gradLP.gravity = Gravity.BOTTOM;
        gradient.setLayoutParams(gradLP);
        root.addView(gradient);

        // Bottom content
        LinearLayout bottom = new LinearLayout(activity);
        bottom.setOrientation(LinearLayout.VERTICAL);
        // Extra bottom padding for devices with gesture nav bar
        int bottomPad = dp(24) + getNavBarHeight();
        bottom.setPadding(dp(24), dp(16), dp(24), bottomPad);
        FrameLayout.LayoutParams bottomLP = new FrameLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        bottomLP.gravity = Gravity.BOTTOM;
        bottom.setLayoutParams(bottomLP);

        // Title — white, 20sp, shadow for readability
        TextView title = createTitle(20, Color.WHITE, 2);
        title.setShadowLayer(6, 0, 2, Color.parseColor("#88000000"));
        bottom.addView(title);

        // Description
        if (hasDesc()) {
            bottom.addView(createDesc(14, Color.parseColor("#cccccc"), 2, dp(4)));
        }

        // CTA — full width, white button
        TextView cta = new TextView(activity);
        cta.setText(ad.buttonText != null ? ad.buttonText : "Visit");
        cta.setTextColor(Color.BLACK);
        cta.setTextSize(TypedValue.COMPLEX_UNIT_SP, 14);
        cta.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
        cta.setGravity(Gravity.CENTER);
        applyRoundedBg(cta, Color.WHITE, dp(12));
        cta.setPadding(dp(20), dp(14), dp(20), dp(14));
        LinearLayout.LayoutParams ctaLP = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        ctaLP.topMargin = dp(16);
        cta.setLayoutParams(ctaLP);
        cta.setOnClickListener(v -> { onCtaClick(); dialog.dismiss(); });
        bottom.addView(cta);

        root.addView(bottom);

        // Close X — top right, safe from status bar
        TextView closeX = createCloseButton(dp(36), 16, Color.WHITE, Color.parseColor("#66000000"));
        FrameLayout.LayoutParams closeLP = new FrameLayout.LayoutParams(dp(36), dp(36));
        closeLP.gravity = Gravity.TOP | Gravity.END;
        closeLP.topMargin = dp(12) + getStatusBarHeight();
        closeLP.rightMargin = dp(12);
        closeX.setLayoutParams(closeLP);
        closeX.setOnClickListener(v -> dialog.dismiss());
        root.addView(closeX);

        showDialog(dialog, root);
        animateScale(root);
    }

    // ════════════════════════════════════════════
    // BANNER LAYOUT
    // ════════════════════════════════════════════

    private void showBanner() {
        Dialog dialog = createDialog();

        FrameLayout overlay = new FrameLayout(activity);
        overlay.setLayoutParams(matchParent());
        // Transparent — app content visible behind, tap to dismiss
        overlay.setOnClickListener(v -> dialog.dismiss());

        // Banner bar
        LinearLayout banner = new LinearLayout(activity);
        banner.setOrientation(LinearLayout.HORIZONTAL);
        banner.setGravity(Gravity.CENTER_VERTICAL);
        banner.setOnClickListener(v -> {}); // block click-through

        GradientDrawable bannerBg = new GradientDrawable();
        bannerBg.setColor(Color.WHITE);
        bannerBg.setCornerRadii(new float[]{dp(16),dp(16),dp(16),dp(16), 0,0,0,0});
        banner.setBackground(bannerBg);
        banner.setElevation(dp(16));

        // Extra bottom padding for gesture nav
        int navPad = getNavBarHeight();
        banner.setPadding(dp(16), dp(14), dp(16), dp(14) + navPad);

        FrameLayout.LayoutParams bannerLP = new FrameLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        bannerLP.gravity = Gravity.BOTTOM;
        banner.setLayoutParams(bannerLP);

        // Thumbnail
        if (hasImage()) {
            ImageView thumb = createImageView();
            applyRoundedBg(thumb, Color.parseColor("#f0f0f0"), dp(10));
            thumb.setClipToOutline(true);
            thumb.setOutlineProvider(roundedOutline(dp(10)));
            LinearLayout.LayoutParams thumbLP = new LinearLayout.LayoutParams(dp(52), dp(52));
            thumbLP.rightMargin = dp(12);
            thumb.setLayoutParams(thumbLP);
            banner.addView(thumb);
            loadImage(ad.imageUrl, thumb);
        }

        // Text column (weight=1 to fill remaining space)
        LinearLayout textCol = new LinearLayout(activity);
        textCol.setOrientation(LinearLayout.VERTICAL);
        textCol.setLayoutParams(new LinearLayout.LayoutParams(
            0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f));

        // Title — 14sp, single line, ellipsize
        TextView title = new TextView(activity);
        title.setText(ad.title);
        title.setTextSize(TypedValue.COMPLEX_UNIT_SP, 14);
        title.setTextColor(Color.parseColor("#111111"));
        title.setTypeface(Typeface.DEFAULT_BOLD);
        title.setMaxLines(1);
        title.setSingleLine(true);
        title.setEllipsize(TextUtils.TruncateAt.END);
        textCol.addView(title);

        // "Sponsored" label
        TextView sub = new TextView(activity);
        sub.setText("Sponsored");
        sub.setTextSize(TypedValue.COMPLEX_UNIT_SP, 11);
        sub.setTextColor(Color.parseColor("#999999"));
        sub.setPadding(0, dp(2), 0, 0);
        textCol.addView(sub);

        banner.addView(textCol);

        // CTA button
        TextView cta = new TextView(activity);
        cta.setText(ad.buttonText != null ? ad.buttonText : "Visit");
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

        overlay.addView(banner);

        // Close X — positioned above the banner
        TextView closeX = createCloseButton(dp(28), 13, Color.parseColor("#999999"), Color.parseColor("#f0f0f0"));
        FrameLayout.LayoutParams closeLP = new FrameLayout.LayoutParams(dp(28), dp(28));
        closeLP.gravity = Gravity.BOTTOM | Gravity.END;
        // Position above banner (banner height ~80dp + navPad)
        closeLP.bottomMargin = dp(80) + navPad + dp(8);
        closeLP.rightMargin = dp(12);
        closeX.setLayoutParams(closeLP);
        closeX.setOnClickListener(v -> dialog.dismiss());
        overlay.addView(closeX);

        showDialog(dialog, overlay);

        // Slide-up animation for banner
        AnimationSet anim = new AnimationSet(true);
        anim.setInterpolator(new DecelerateInterpolator());
        anim.setDuration(300);
        anim.addAnimation(new TranslateAnimation(0, 0, dp(100), 0));
        anim.addAnimation(new AlphaAnimation(0f, 1f));
        banner.startAnimation(anim);
    }

    // ════════════════════════════════════════════
    // SHARED VIEW BUILDERS
    // ════════════════════════════════════════════

    private Dialog createDialog() {
        Dialog dialog = new Dialog(activity, android.R.style.Theme_Translucent_NoTitleBar);
        dialog.setCancelable(true);
        dialog.setOnDismissListener(d -> {
            if (listener != null) listener.onClosed();
        });
        return dialog;
    }

    private void showDialog(Dialog dialog, View contentView) {
        dialog.setContentView(contentView);
        if (dialog.getWindow() != null) {
            Window window = dialog.getWindow();
            window.setLayout(WindowManager.LayoutParams.MATCH_PARENT, WindowManager.LayoutParams.MATCH_PARENT);
            window.setBackgroundDrawableResource(android.R.color.transparent);
            window.clearFlags(WindowManager.LayoutParams.FLAG_DIM_BEHIND);
            // Make dialog draw under system bars for fullscreen
            if (Build.VERSION.SDK_INT >= 21) {
                window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            }
        }
        dialog.show();
    }

    private ImageView createImageView() {
        ImageView img = new ImageView(activity);
        img.setScaleType(ImageView.ScaleType.CENTER_CROP);
        img.setBackgroundColor(Color.parseColor("#f0f0f0"));
        return img;
    }

    private TextView createTitle(int sizeSp, int color, int maxLines) {
        TextView t = new TextView(activity);
        t.setText(ad.title != null ? ad.title : "");
        t.setTextSize(TypedValue.COMPLEX_UNIT_SP, sizeSp);
        t.setTextColor(color);
        t.setTypeface(Typeface.DEFAULT_BOLD);
        t.setMaxLines(maxLines);
        t.setEllipsize(TextUtils.TruncateAt.END);
        return t;
    }

    private TextView createDesc(int sizeSp, int color, int maxLines, int topPad) {
        TextView d = new TextView(activity);
        d.setText(ad.description != null ? ad.description : "");
        d.setTextSize(TypedValue.COMPLEX_UNIT_SP, sizeSp);
        d.setTextColor(color);
        d.setPadding(0, topPad, 0, 0);
        d.setLineSpacing(0, 1.3f);
        d.setMaxLines(maxLines);
        d.setEllipsize(TextUtils.TruncateAt.END);
        return d;
    }

    private View createDivider(int topMargin) {
        View div = new View(activity);
        div.setBackgroundColor(Color.parseColor("#f0f0f0"));
        LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, dp(1));
        lp.topMargin = topMargin;
        div.setLayoutParams(lp);
        return div;
    }

    private LinearLayout createButtonRow(Dialog dialog) {
        LinearLayout row = new LinearLayout(activity);
        row.setOrientation(LinearLayout.HORIZONTAL);
        row.setGravity(Gravity.CENTER_VERTICAL);
        row.setPadding(0, dp(12), 0, 0);

        // Close — min touch target 48dp
        TextView close = new TextView(activity);
        close.setText("Close");
        close.setTextColor(Color.parseColor("#999999"));
        close.setTextSize(TypedValue.COMPLEX_UNIT_SP, 13);
        close.setGravity(Gravity.CENTER);
        close.setMinimumHeight(dp(44));
        close.setMinimumWidth(dp(48));
        close.setPadding(dp(4), 0, dp(12), 0);
        close.setOnClickListener(v -> dialog.dismiss());
        row.addView(close);

        // Spacer
        View spacer = new View(activity);
        spacer.setLayoutParams(new LinearLayout.LayoutParams(
            0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f));
        row.addView(spacer);

        // CTA — min touch target
        TextView cta = new TextView(activity);
        cta.setText(ad.buttonText != null ? ad.buttonText : "Visit");
        cta.setTextColor(Color.WHITE);
        cta.setTextSize(TypedValue.COMPLEX_UNIT_SP, 13);
        cta.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
        cta.setGravity(Gravity.CENTER);
        cta.setMinimumHeight(dp(44));
        GradientDrawable ctaBg = new GradientDrawable();
        ctaBg.setColor(Color.parseColor("#111111"));
        ctaBg.setCornerRadius(dp(10));
        cta.setBackground(new RippleDrawable(
            ColorStateList.valueOf(Color.parseColor("#333333")), ctaBg, null));
        cta.setPadding(dp(20), dp(10), dp(20), dp(10));
        cta.setOnClickListener(v -> { onCtaClick(); dialog.dismiss(); });
        row.addView(cta);

        return row;
    }

    private TextView createCloseButton(int size, int textSp, int textColor, int bgColor) {
        TextView btn = new TextView(activity);
        btn.setText("✕");
        btn.setTextColor(textColor);
        btn.setTextSize(TypedValue.COMPLEX_UNIT_SP, textSp);
        btn.setGravity(Gravity.CENTER);
        GradientDrawable bg = new GradientDrawable();
        bg.setColor(bgColor);
        bg.setCornerRadius(size / 2f);
        btn.setBackground(bg);
        // Ensure minimum touch target of 48dp
        btn.setMinimumWidth(Math.max(size, dp(48)));
        btn.setMinimumHeight(Math.max(size, dp(48)));
        return btn;
    }

    private void applyRoundedBg(View view, int color, int radius) {
        GradientDrawable bg = new GradientDrawable();
        bg.setColor(color);
        bg.setCornerRadius(radius);
        view.setBackground(bg);
        if (Build.VERSION.SDK_INT >= 21) {
            view.setElevation(dp(24));
        }
        view.setClipToOutline(true);
        view.setOutlineProvider(roundedOutline(radius));
    }

    // ════════════════════════════════════════════
    // UTILITIES
    // ════════════════════════════════════════════

    private void onCtaClick() {
        if (listener != null) listener.onClicked(ad.redirectUrl);
        if (ad.redirectUrl != null && !ad.redirectUrl.isEmpty()) {
            try {
                activity.startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(ad.redirectUrl)));
            } catch (Exception ignored) {}
        }
    }

    private boolean hasImage() {
        return ad.imageUrl != null && !ad.imageUrl.isEmpty();
    }

    private boolean hasDesc() {
        return ad.description != null && !ad.description.isEmpty();
    }

    private ViewGroup.LayoutParams matchParent() {
        return new ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
    }

    private ViewOutlineProvider roundedOutline(int radius) {
        return new ViewOutlineProvider() {
            @Override
            public void getOutline(View view, Outline outline) {
                outline.setRoundRect(0, 0, view.getWidth(), view.getHeight(), radius);
            }
        };
    }

    private void animateScale(View target) {
        AnimationSet anim = new AnimationSet(true);
        anim.setInterpolator(new DecelerateInterpolator());
        anim.setDuration(250);
        anim.addAnimation(new AlphaAnimation(0f, 1f));
        anim.addAnimation(new ScaleAnimation(0.92f, 1f, 0.92f, 1f,
            ScaleAnimation.RELATIVE_TO_SELF, 0.5f,
            ScaleAnimation.RELATIVE_TO_SELF, 0.5f));
        target.startAnimation(anim);
    }

    private void loadImage(String imageUrl, ImageView imageView) {
        new Thread(() -> {
            try {
                HttpURLConnection conn = (HttpURLConnection) new URL(imageUrl).openConnection();
                conn.setConnectTimeout(8000);
                conn.setReadTimeout(8000);
                conn.setDoInput(true);
                conn.setInstanceFollowRedirects(true);
                conn.connect();
                if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
                    InputStream is = conn.getInputStream();
                    Bitmap bitmap = BitmapFactory.decodeStream(is);
                    is.close();
                    conn.disconnect();
                    if (bitmap != null && !activity.isFinishing()) {
                        activity.runOnUiThread(() -> {
                            try {
                                imageView.setImageBitmap(bitmap);
                            } catch (Exception ignored) {}
                        });
                    }
                } else {
                    conn.disconnect();
                }
            } catch (Exception ignored) {}
        }).start();
    }

    private int dp(int value) {
        return (int) TypedValue.applyDimension(
            TypedValue.COMPLEX_UNIT_DIP, value,
            activity.getResources().getDisplayMetrics());
    }

    private int getScreenWidth() {
        return activity.getResources().getDisplayMetrics().widthPixels;
    }

    private int getStatusBarHeight() {
        int resourceId = activity.getResources().getIdentifier("status_bar_height", "dimen", "android");
        return resourceId > 0 ? activity.getResources().getDimensionPixelSize(resourceId) : dp(24);
    }

    private int getNavBarHeight() {
        int resourceId = activity.getResources().getIdentifier("navigation_bar_height", "dimen", "android");
        return resourceId > 0 ? activity.getResources().getDimensionPixelSize(resourceId) : 0;
    }
}
