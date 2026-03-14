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
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewOutlineProvider;
import android.view.Window;
import android.view.animation.AlphaAnimation;
import android.view.animation.AnimationSet;
import android.view.animation.DecelerateInterpolator;
import android.view.animation.ScaleAnimation;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.adverify.sdk.internal.models.Ad;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

/** Displays an ad dialog — minimal light theme. */
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
        Dialog dialog = new Dialog(activity);
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        dialog.setCancelable(true);
        dialog.setOnDismissListener(d -> {
            if (listener != null) listener.onClosed();
        });

        LinearLayout root = new LinearLayout(activity);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setMinimumWidth(dp(300));

        GradientDrawable bg = new GradientDrawable();
        bg.setColor(Color.parseColor("#fafafa"));
        bg.setCornerRadius(dp(20));
        root.setBackground(bg);
        root.setClipToOutline(true);
        root.setOutlineProvider(new ViewOutlineProvider() {
            @Override
            public void getOutline(View view, Outline outline) {
                outline.setRoundRect(0, 0, view.getWidth(), view.getHeight(), dp(20));
            }
        });

        // Image section
        if (ad.imageUrl != null && !ad.imageUrl.isEmpty()) {
            ImageView imageView = new ImageView(activity);
            imageView.setScaleType(ImageView.ScaleType.CENTER_CROP);
            imageView.setBackgroundColor(Color.parseColor("#eeeeee"));
            LinearLayout.LayoutParams imgLP = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, dp(160));
            imageView.setLayoutParams(imgLP);
            root.addView(imageView);
            loadImage(ad.imageUrl, imageView);
        }

        // Content
        LinearLayout content = new LinearLayout(activity);
        content.setOrientation(LinearLayout.VERTICAL);
        content.setPadding(dp(24), dp(20), dp(24), dp(20));

        TextView title = new TextView(activity);
        title.setText(ad.title);
        title.setTextSize(TypedValue.COMPLEX_UNIT_SP, 17);
        title.setTextColor(Color.parseColor("#111111"));
        title.setTypeface(Typeface.DEFAULT_BOLD);
        content.addView(title);

        if (ad.description != null && !ad.description.isEmpty()) {
            TextView desc = new TextView(activity);
            desc.setText(ad.description);
            desc.setTextSize(TypedValue.COMPLEX_UNIT_SP, 13);
            desc.setTextColor(Color.parseColor("#888888"));
            desc.setPadding(0, dp(6), 0, 0);
            desc.setLineSpacing(0, 1.35f);
            content.addView(desc);
        }

        // Divider
        View divider = new View(activity);
        divider.setBackgroundColor(Color.parseColor("#f2f2f2"));
        LinearLayout.LayoutParams divLP = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, dp(1));
        divLP.topMargin = dp(16);
        divider.setLayoutParams(divLP);
        content.addView(divider);

        // Button row
        LinearLayout btnRow = new LinearLayout(activity);
        btnRow.setOrientation(LinearLayout.HORIZONTAL);
        btnRow.setGravity(Gravity.CENTER_VERTICAL);
        btnRow.setPadding(0, dp(12), 0, 0);

        // Close button
        Button closeBtn = new Button(activity);
        closeBtn.setText("Close");
        closeBtn.setTextColor(Color.parseColor("#999999"));
        closeBtn.setTextSize(TypedValue.COMPLEX_UNIT_SP, 13);
        closeBtn.setAllCaps(false);
        GradientDrawable closeBg = new GradientDrawable();
        closeBg.setColor(Color.TRANSPARENT);
        closeBg.setCornerRadius(dp(8));
        closeBtn.setBackground(new RippleDrawable(
            ColorStateList.valueOf(Color.parseColor("#f0f0f0")), closeBg, null));
        closeBtn.setPadding(dp(12), dp(8), dp(12), dp(8));
        closeBtn.setOnClickListener(v -> dialog.dismiss());
        btnRow.addView(closeBtn);

        // Spacer
        View spacer = new View(activity);
        spacer.setLayoutParams(new LinearLayout.LayoutParams(
            0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f));
        btnRow.addView(spacer);

        // CTA button — solid black
        Button ctaBtn = new Button(activity);
        ctaBtn.setText(ad.buttonText);
        ctaBtn.setTextColor(Color.WHITE);
        ctaBtn.setTextSize(TypedValue.COMPLEX_UNIT_SP, 13);
        ctaBtn.setAllCaps(false);
        ctaBtn.setTypeface(Typeface.DEFAULT, Typeface.BOLD);

        GradientDrawable ctaBg = new GradientDrawable();
        ctaBg.setColor(Color.parseColor("#111111"));
        ctaBg.setCornerRadius(dp(10));
        ctaBtn.setBackground(new RippleDrawable(
            ColorStateList.valueOf(Color.parseColor("#333333")), ctaBg, null));
        ctaBtn.setPadding(dp(20), dp(10), dp(20), dp(10));

        ctaBtn.setOnClickListener(v -> {
            if (listener != null) listener.onClicked(ad.redirectUrl);
            if (ad.redirectUrl != null && !ad.redirectUrl.isEmpty()) {
                try {
                    activity.startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(ad.redirectUrl)));
                } catch (Exception ignored) {}
            }
            dialog.dismiss();
        });

        btnRow.addView(ctaBtn);
        content.addView(btnRow);
        root.addView(content);

        dialog.setContentView(root);

        if (dialog.getWindow() != null) {
            dialog.getWindow().setBackgroundDrawableResource(android.R.color.transparent);
            dialog.getWindow().setLayout(dp(340), ViewGroup.LayoutParams.WRAP_CONTENT);
        }

        dialog.show();

        // Entrance animation
        AnimationSet anim = new AnimationSet(true);
        anim.setInterpolator(new DecelerateInterpolator());
        anim.setDuration(200);
        anim.addAnimation(new AlphaAnimation(0f, 1f));
        anim.addAnimation(new ScaleAnimation(0.95f, 1f, 0.95f, 1f,
            ScaleAnimation.RELATIVE_TO_SELF, 0.5f,
            ScaleAnimation.RELATIVE_TO_SELF, 0.5f));
        root.startAnimation(anim);
    }

    private void loadImage(String imageUrl, ImageView imageView) {
        new Thread(() -> {
            try {
                HttpURLConnection conn = (HttpURLConnection) new URL(imageUrl).openConnection();
                conn.setConnectTimeout(5000);
                conn.setReadTimeout(5000);
                conn.setDoInput(true);
                conn.connect();
                if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
                    InputStream is = conn.getInputStream();
                    Bitmap bitmap = BitmapFactory.decodeStream(is);
                    is.close();
                    conn.disconnect();
                    if (bitmap != null) {
                        activity.runOnUiThread(() -> imageView.setImageBitmap(bitmap));
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
}
