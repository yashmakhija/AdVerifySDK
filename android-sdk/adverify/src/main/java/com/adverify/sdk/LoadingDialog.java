package com.adverify.sdk;

import android.app.Activity;
import android.app.Dialog;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.RectF;
import android.graphics.drawable.ColorDrawable;
import android.graphics.drawable.GradientDrawable;
import android.os.Handler;
import android.os.Looper;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.animation.AlphaAnimation;
import android.view.animation.AnimationSet;
import android.view.animation.DecelerateInterpolator;
import android.view.animation.ScaleAnimation;
import android.widget.LinearLayout;
import android.widget.TextView;

/** Lightweight loading overlay shown while the SDK fetches initial config. */
class LoadingDialog {

    private final Activity activity;
    private final String message;
    private Dialog dialog;
    private SpinnerView spinnerView;

    LoadingDialog(Activity activity, String message) {
        this.activity = activity;
        this.message = message != null ? message : "Please wait…";
    }

    void show() {
        if (activity == null || activity.isFinishing()) return;

        dialog = new Dialog(activity);
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        dialog.setCancelable(false);
        dialog.setCanceledOnTouchOutside(false);

        // Card container
        LinearLayout root = new LinearLayout(activity);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setGravity(Gravity.CENTER_HORIZONTAL);
        root.setPadding(dp(28), dp(28), dp(28), dp(24));

        GradientDrawable bg = new GradientDrawable();
        bg.setColor(Color.WHITE);
        bg.setCornerRadius(dp(20));
        root.setBackground(bg);

        // Spinner
        spinnerView = new SpinnerView(activity);
        LinearLayout.LayoutParams spinLP = new LinearLayout.LayoutParams(dp(44), dp(44));
        spinLP.gravity = Gravity.CENTER_HORIZONTAL;
        spinLP.bottomMargin = dp(14);
        spinnerView.setLayoutParams(spinLP);
        root.addView(spinnerView);

        // Message label
        TextView label = new TextView(activity);
        label.setText(message);
        label.setTextSize(TypedValue.COMPLEX_UNIT_SP, 13);
        label.setTextColor(Color.parseColor("#888888"));
        label.setGravity(Gravity.CENTER);
        label.setLayoutParams(new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT));
        root.addView(label);

        dialog.setContentView(root);

        Window window = dialog.getWindow();
        if (window != null) {
            window.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
            window.setLayout(dp(180), ViewGroup.LayoutParams.WRAP_CONTENT);
            window.setGravity(Gravity.CENTER);
            window.setDimAmount(0.25f);
            window.addFlags(android.view.WindowManager.LayoutParams.FLAG_DIM_BEHIND);
        }

        dialog.show();

        // Entrance animation
        AnimationSet anim = new AnimationSet(true);
        anim.setInterpolator(new DecelerateInterpolator());
        anim.setDuration(180);
        anim.addAnimation(new AlphaAnimation(0f, 1f));
        anim.addAnimation(new ScaleAnimation(0.9f, 1f, 0.9f, 1f,
            ScaleAnimation.RELATIVE_TO_SELF, 0.5f,
            ScaleAnimation.RELATIVE_TO_SELF, 0.5f));
        root.startAnimation(anim);

        spinnerView.start();
    }

    void dismiss() {
        if (spinnerView != null) spinnerView.stop();
        if (dialog != null && dialog.isShowing()) {
            try { dialog.dismiss(); } catch (Exception ignored) {}
        }
    }

    // ─── Animated arc spinner ────────────────────────────────────────────────

    private static class SpinnerView extends View {

        private final Paint trackPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
        private final Paint arcPaint   = new Paint(Paint.ANTI_ALIAS_FLAG);
        private final RectF oval       = new RectF();
        private float angle            = 0f;
        private boolean running        = false;
        private final Handler handler  = new Handler(Looper.getMainLooper());

        SpinnerView(Activity activity) {
            super(activity);
            float stroke = TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 3.5f,
                activity.getResources().getDisplayMetrics());

            trackPaint.setStyle(Paint.Style.STROKE);
            trackPaint.setStrokeWidth(stroke);
            trackPaint.setColor(Color.parseColor("#eeeeee"));
            trackPaint.setStrokeCap(Paint.Cap.ROUND);

            arcPaint.setStyle(Paint.Style.STROKE);
            arcPaint.setStrokeWidth(stroke);
            arcPaint.setColor(Color.parseColor("#111111"));
            arcPaint.setStrokeCap(Paint.Cap.ROUND);
        }

        void start() {
            running = true;
            tick();
        }

        void stop() {
            running = false;
            handler.removeCallbacksAndMessages(null);
        }

        private void tick() {
            if (!running) return;
            angle = (angle + 8f) % 360f;
            invalidate();
            handler.postDelayed(this::tick, 16); // ~60 fps
        }

        @Override
        protected void onDraw(Canvas canvas) {
            float pad = getWidth() * 0.08f;
            oval.set(pad, pad, getWidth() - pad, getHeight() - pad);
            canvas.drawOval(oval, trackPaint);
            canvas.drawArc(oval, angle, 270f, false, arcPaint);
        }
    }

    private int dp(int v) {
        return (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, v,
            activity.getResources().getDisplayMetrics());
    }
}
