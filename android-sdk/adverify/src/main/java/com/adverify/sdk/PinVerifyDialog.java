package com.adverify.sdk;

import android.app.Activity;
import android.app.Dialog;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.net.Uri;
import android.text.InputType;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;

/** PIN verification dialog with "Get PIN" button that auto-creates shortener link. */
class PinVerifyDialog {

    interface PinListener {
        void onPinSubmit(String pin, PinVerifyDialog dialog);
        void onGetPinClicked(PinVerifyDialog dialog);
        void onMaxAttemptsReached();
    }

    private final Activity activity;
    private final String message;
    private final int maxAttempts;
    private final String getPinBtnText;
    private final PinListener listener;
    private Dialog dialog;
    private TextView errorText;
    private int attempts = 0;

    PinVerifyDialog(Activity activity, String message, int maxAttempts,
                    String getPinBtnText, PinListener listener) {
        this.activity = activity;
        this.message = message;
        this.maxAttempts = maxAttempts;
        this.getPinBtnText = getPinBtnText;
        this.listener = listener;
    }

    void show() {
        dialog = new Dialog(activity);
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        dialog.setCancelable(false);

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
        title.setText("Verification Required");
        title.setTextSize(TypedValue.COMPLEX_UNIT_SP, 18);
        title.setTextColor(Color.parseColor("#e8eaf0"));
        title.setTypeface(null, Typeface.BOLD);
        root.addView(title);

        // Message
        TextView msg = new TextView(activity);
        msg.setText(message);
        msg.setTextSize(TypedValue.COMPLEX_UNIT_SP, 14);
        msg.setTextColor(Color.parseColor("#7c809a"));
        msg.setPadding(0, dp(8), 0, dp(16));
        root.addView(msg);

        // "Get PIN" button — triggers link creation via server
        Button getPinBtn = new Button(activity);
        getPinBtn.setText(getPinBtnText != null && !getPinBtnText.isEmpty() ? getPinBtnText : "Get PIN");
        getPinBtn.setTextColor(Color.WHITE);
        getPinBtn.setAllCaps(false);
        getPinBtn.setTextSize(TypedValue.COMPLEX_UNIT_SP, 14);

        GradientDrawable getPinBg = new GradientDrawable();
        getPinBg.setColor(Color.parseColor("#00d4aa"));
        getPinBg.setCornerRadius(dp(8));
        getPinBtn.setBackground(getPinBg);

        LinearLayout.LayoutParams getPinParams = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT
        );
        getPinParams.bottomMargin = dp(12);
        getPinBtn.setLayoutParams(getPinParams);

        getPinBtn.setOnClickListener(v -> {
            if (listener != null) listener.onGetPinClicked(PinVerifyDialog.this);
        });

        root.addView(getPinBtn);

        // PIN input
        EditText pinInput = new EditText(activity);
        pinInput.setHint("Enter PIN");
        pinInput.setTextColor(Color.parseColor("#e8eaf0"));
        pinInput.setHintTextColor(Color.parseColor("#4a4d5e"));
        pinInput.setInputType(InputType.TYPE_CLASS_NUMBER | InputType.TYPE_NUMBER_VARIATION_PASSWORD);
        pinInput.setTextSize(TypedValue.COMPLEX_UNIT_SP, 16);
        pinInput.setGravity(Gravity.CENTER);
        pinInput.setPadding(dp(12), dp(12), dp(12), dp(12));

        GradientDrawable inputBg = new GradientDrawable();
        inputBg.setColor(Color.parseColor("#232733"));
        inputBg.setCornerRadius(dp(8));
        inputBg.setStroke(1, Color.parseColor("#252836"));
        pinInput.setBackground(inputBg);
        root.addView(pinInput);

        // Error text
        errorText = new TextView(activity);
        errorText.setTextSize(TypedValue.COMPLEX_UNIT_SP, 12);
        errorText.setTextColor(Color.parseColor("#ff5c5c"));
        errorText.setPadding(0, dp(8), 0, 0);
        errorText.setVisibility(View.GONE);
        root.addView(errorText);

        // Verify button
        Button submitBtn = new Button(activity);
        submitBtn.setText("Verify PIN");
        submitBtn.setTextColor(Color.WHITE);
        submitBtn.setAllCaps(false);
        submitBtn.setTextSize(TypedValue.COMPLEX_UNIT_SP, 14);

        GradientDrawable btnBg = new GradientDrawable();
        btnBg.setColor(Color.parseColor("#635bff"));
        btnBg.setCornerRadius(dp(8));
        submitBtn.setBackground(btnBg);

        LinearLayout.LayoutParams btnParams = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT
        );
        btnParams.topMargin = dp(12);
        submitBtn.setLayoutParams(btnParams);

        submitBtn.setOnClickListener(v -> {
            String pin = pinInput.getText().toString().trim();
            if (pin.isEmpty()) {
                showError("Please enter a PIN");
                return;
            }

            attempts++;
            if (attempts >= maxAttempts) {
                dialog.dismiss();
                if (listener != null) listener.onMaxAttemptsReached();
                return;
            }

            if (listener != null) listener.onPinSubmit(pin, PinVerifyDialog.this);
        });

        root.addView(submitBtn);

        dialog.setContentView(root);

        if (dialog.getWindow() != null) {
            dialog.getWindow().setBackgroundDrawableResource(android.R.color.transparent);
            dialog.getWindow().setLayout(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        }

        dialog.show();
    }

    void dismiss() {
        if (dialog != null && dialog.isShowing()) {
            dialog.dismiss();
        }
    }

    void openUrl(String url) {
        try {
            activity.startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url)));
        } catch (Exception ignored) {}
    }

    void showError(String msg) {
        if (errorText != null) {
            errorText.setText(msg);
            errorText.setVisibility(View.VISIBLE);
        }
    }

    private int dp(int value) {
        return (int) TypedValue.applyDimension(
            TypedValue.COMPLEX_UNIT_DIP, value,
            activity.getResources().getDisplayMetrics()
        );
    }
}
