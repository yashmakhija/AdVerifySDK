package com.adverify.sdk;

import android.app.Activity;
import android.app.Dialog;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.net.Uri;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.adverify.sdk.internal.models.Ad;

/** Displays an ad as a Material-style dialog. */
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
        root.setPadding(dp(24), dp(28), dp(24), dp(20));
        root.setMinimumWidth(dp(300));

        GradientDrawable bg = new GradientDrawable();
        bg.setColor(Color.parseColor("#1a1d27"));
        bg.setCornerRadius(dp(16));
        root.setBackground(bg);

        // Title
        TextView title = new TextView(activity);
        title.setText(ad.title);
        title.setTextSize(TypedValue.COMPLEX_UNIT_SP, 18);
        title.setTextColor(Color.parseColor("#e8eaf0"));
        title.setTypeface(null, Typeface.BOLD);
        root.addView(title);

        // Description
        if (ad.description != null && !ad.description.isEmpty()) {
            TextView desc = new TextView(activity);
            desc.setText(ad.description);
            desc.setTextSize(TypedValue.COMPLEX_UNIT_SP, 14);
            desc.setTextColor(Color.parseColor("#7c809a"));
            desc.setPadding(0, dp(8), 0, 0);
            root.addView(desc);
        }

        // Button row
        LinearLayout btnRow = new LinearLayout(activity);
        btnRow.setOrientation(LinearLayout.HORIZONTAL);
        btnRow.setGravity(Gravity.END);
        btnRow.setPadding(0, dp(20), 0, 0);

        // Close button
        Button closeBtn = new Button(activity);
        closeBtn.setText("Close");
        closeBtn.setTextColor(Color.parseColor("#7c809a"));
        closeBtn.setTextSize(TypedValue.COMPLEX_UNIT_SP, 13);
        closeBtn.setBackgroundColor(Color.TRANSPARENT);
        closeBtn.setPadding(dp(16), dp(8), dp(16), dp(8));
        closeBtn.setOnClickListener(v -> dialog.dismiss());
        btnRow.addView(closeBtn);

        // CTA button
        Button ctaBtn = new Button(activity);
        ctaBtn.setText(ad.buttonText);
        ctaBtn.setTextColor(Color.WHITE);
        ctaBtn.setTextSize(TypedValue.COMPLEX_UNIT_SP, 13);
        ctaBtn.setAllCaps(false);

        GradientDrawable ctaBg = new GradientDrawable();
        ctaBg.setColor(Color.parseColor("#635bff"));
        ctaBg.setCornerRadius(dp(8));
        ctaBtn.setBackground(ctaBg);
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
        root.addView(btnRow);

        dialog.setContentView(root);

        if (dialog.getWindow() != null) {
            dialog.getWindow().setBackgroundDrawableResource(android.R.color.transparent);
            dialog.getWindow().setLayout(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        }

        dialog.show();
    }

    private int dp(int value) {
        return (int) TypedValue.applyDimension(
            TypedValue.COMPLEX_UNIT_DIP, value,
            activity.getResources().getDisplayMetrics()
        );
    }
}
