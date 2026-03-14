package com.adverify.sdk;

import android.app.Activity;
import android.app.Dialog;
import android.content.Intent;
import android.content.res.ColorStateList;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.graphics.drawable.RippleDrawable;
import android.net.Uri;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.animation.AlphaAnimation;
import android.view.animation.AnimationSet;
import android.view.animation.DecelerateInterpolator;
import android.view.animation.ScaleAnimation;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.adverify.sdk.internal.models.JoinLink;

/** Community links dialog shown when user taps "Join Us". */
class JoinDialog {

    private final Activity activity;
    private final JoinLink[] links;
    private Dialog dialog;

    JoinDialog(Activity activity, JoinLink[] links) {
        this.activity = activity;
        this.links = links;
    }

    void show() {
        dialog = new Dialog(activity);
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        dialog.setCancelable(true);

        LinearLayout root = new LinearLayout(activity);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setPadding(dp(22), dp(28), dp(22), dp(22));
        root.setGravity(Gravity.CENTER_HORIZONTAL);

        GradientDrawable bg = new GradientDrawable();
        bg.setColor(Color.parseColor("#fafafa"));
        bg.setCornerRadius(dp(18));
        root.setBackground(bg);

        // Community icon (circle with people silhouette)
        View communityIcon = new View(activity) {
            @Override
            protected void onDraw(Canvas canvas) {
                super.onDraw(canvas);
                float w = getWidth();
                float h = getHeight();
                float cx = w / 2f;
                float cy = h / 2f;
                float r = Math.min(w, h) / 2f;

                // Circle background
                Paint circlePaint = new Paint(Paint.ANTI_ALIAS_FLAG);
                circlePaint.setColor(Color.parseColor("#eef6ff"));
                canvas.drawCircle(cx, cy, r, circlePaint);

                // Circle border
                Paint borderPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
                borderPaint.setStyle(Paint.Style.STROKE);
                borderPaint.setStrokeWidth(r * 0.04f);
                borderPaint.setColor(Color.parseColor("#dce8f4"));
                canvas.drawCircle(cx, cy, r - 1, borderPaint);

                // Person 1 (front)
                Paint p = new Paint(Paint.ANTI_ALIAS_FLAG);
                p.setStyle(Paint.Style.STROKE);
                p.setStrokeWidth(r * 0.1f);
                p.setStrokeCap(Paint.Cap.ROUND);
                p.setColor(Color.parseColor("#3b82f6"));
                canvas.drawCircle(cx - r * 0.15f, cy - r * 0.2f, r * 0.22f, p);

                Path body1 = new Path();
                body1.moveTo(cx - r * 0.55f, cy + r * 0.55f);
                body1.quadTo(cx - r * 0.15f, cy + r * 0.1f, cx + r * 0.25f, cy + r * 0.55f);
                canvas.drawPath(body1, p);

                // Person 2 (behind, lighter)
                p.setAlpha(100);
                canvas.drawCircle(cx + r * 0.25f, cy - r * 0.15f, r * 0.18f, p);
                Path body2 = new Path();
                body2.moveTo(cx, cy + r * 0.55f);
                body2.quadTo(cx + r * 0.25f, cy + r * 0.15f, cx + r * 0.55f, cy + r * 0.55f);
                canvas.drawPath(body2, p);
            }
        };
        LinearLayout.LayoutParams iconParams = new LinearLayout.LayoutParams(dp(44), dp(44));
        iconParams.gravity = Gravity.CENTER_HORIZONTAL;
        iconParams.bottomMargin = dp(12);
        communityIcon.setLayoutParams(iconParams);
        root.addView(communityIcon);

        // Title
        TextView title = new TextView(activity);
        title.setText("Join Our Community");
        title.setTextSize(TypedValue.COMPLEX_UNIT_SP, 16);
        title.setTextColor(Color.parseColor("#111111"));
        title.setTypeface(Typeface.DEFAULT_BOLD);
        title.setGravity(Gravity.CENTER);
        root.addView(title);

        // Subtitle
        TextView sub = new TextView(activity);
        sub.setText("Get updates, mods & support");
        sub.setTextSize(TypedValue.COMPLEX_UNIT_SP, 12);
        sub.setTextColor(Color.parseColor("#999999"));
        sub.setGravity(Gravity.CENTER);
        LinearLayout.LayoutParams subParams = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT
        );
        subParams.topMargin = dp(2);
        subParams.bottomMargin = dp(16);
        sub.setLayoutParams(subParams);
        root.addView(sub);

        // Link cards
        if (links != null) {
            for (JoinLink link : links) {
                root.addView(buildLinkCard(link));
            }
        }

        // Close button
        Button closeBtn = new Button(activity);
        closeBtn.setText("Close");
        closeBtn.setTextColor(Color.parseColor("#888888"));
        closeBtn.setTextSize(TypedValue.COMPLEX_UNIT_SP, 13);
        closeBtn.setAllCaps(false);
        closeBtn.setTypeface(Typeface.DEFAULT, Typeface.NORMAL);

        GradientDrawable closeBg = new GradientDrawable();
        closeBg.setColor(Color.WHITE);
        closeBg.setCornerRadius(dp(10));
        closeBg.setStroke(dp(1), Color.parseColor("#eeeeee"));
        closeBtn.setBackground(new RippleDrawable(
            ColorStateList.valueOf(Color.parseColor("#f0f0f0")), closeBg, null));
        closeBtn.setPadding(dp(24), dp(10), dp(24), dp(10));

        LinearLayout.LayoutParams closeParams = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT
        );
        closeParams.topMargin = dp(14);
        closeBtn.setLayoutParams(closeParams);
        closeBtn.setOnClickListener(v -> dialog.dismiss());
        root.addView(closeBtn);

        dialog.setContentView(root);

        if (dialog.getWindow() != null) {
            dialog.getWindow().setBackgroundDrawableResource(android.R.color.transparent);
            dialog.getWindow().setLayout(dp(310), ViewGroup.LayoutParams.WRAP_CONTENT);
        }

        dialog.show();

        // Entrance animation
        AnimationSet anim = new AnimationSet(true);
        anim.setInterpolator(new DecelerateInterpolator());
        anim.setDuration(200);
        anim.addAnimation(new AlphaAnimation(0f, 1f));
        anim.addAnimation(new ScaleAnimation(
            0.95f, 1f, 0.95f, 1f,
            ScaleAnimation.RELATIVE_TO_SELF, 0.5f,
            ScaleAnimation.RELATIVE_TO_SELF, 0.5f
        ));
        root.startAnimation(anim);
    }

    private LinearLayout buildLinkCard(JoinLink link) {
        LinearLayout card = new LinearLayout(activity);
        card.setOrientation(LinearLayout.HORIZONTAL);
        card.setGravity(Gravity.CENTER_VERTICAL);
        card.setPadding(dp(14), dp(12), dp(14), dp(12));

        GradientDrawable cardBg = new GradientDrawable();
        cardBg.setColor(Color.WHITE);
        cardBg.setCornerRadius(dp(12));
        cardBg.setStroke(dp(1), Color.parseColor("#eeeeee"));
        card.setBackground(new RippleDrawable(
            ColorStateList.valueOf(Color.parseColor("#f0f0f0")), cardBg, null));

        LinearLayout.LayoutParams cardParams = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT
        );
        cardParams.bottomMargin = dp(8);
        card.setLayoutParams(cardParams);

        // Icon
        boolean isTelegram = "telegram".equals(link.iconType);
        int iconBgColor = isTelegram ? Color.parseColor("#e8f4fd") : Color.parseColor("#eef8ee");
        int iconColor = isTelegram ? Color.parseColor("#0088cc") : Color.parseColor("#22c55e");

        View iconView = new View(activity) {
            @Override
            protected void onDraw(Canvas canvas) {
                super.onDraw(canvas);
                float w = getWidth();
                float h = getHeight();
                float cx = w / 2f;
                float cy = h / 2f;

                // Background rounded rect
                Paint bgPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
                bgPaint.setColor(iconBgColor);
                canvas.drawRoundRect(0, 0, w, h, w * 0.27f, h * 0.27f, bgPaint);

                Paint p = new Paint(Paint.ANTI_ALIAS_FLAG);
                p.setColor(iconColor);
                p.setStyle(Paint.Style.STROKE);
                p.setStrokeWidth(w * 0.065f);
                p.setStrokeCap(Paint.Cap.ROUND);
                p.setStrokeJoin(Paint.Join.ROUND);

                if (isTelegram) {
                    // Paper plane
                    Path plane = new Path();
                    plane.moveTo(cx - w * 0.3f, cy);
                    plane.lineTo(cx + w * 0.3f, cy - h * 0.25f);
                    plane.lineTo(cx + w * 0.1f, cy + h * 0.25f);
                    plane.lineTo(cx - w * 0.05f, cy + h * 0.05f);
                    plane.close();
                    p.setStyle(Paint.Style.FILL_AND_STROKE);
                    p.setAlpha(30);
                    canvas.drawPath(plane, p);
                    p.setAlpha(255);
                    p.setStyle(Paint.Style.STROKE);
                    canvas.drawPath(plane, p);
                    canvas.drawLine(cx + w * 0.3f, cy - h * 0.25f, cx, cy + h * 0.05f, p);
                } else {
                    // Megaphone / channel
                    Path mega = new Path();
                    mega.moveTo(cx - w * 0.2f, cy - h * 0.08f);
                    mega.lineTo(cx - w * 0.08f, cy - h * 0.08f);
                    mega.lineTo(cx + w * 0.2f, cy - h * 0.25f);
                    mega.lineTo(cx + w * 0.2f, cy + h * 0.2f);
                    mega.lineTo(cx - w * 0.08f, cy + h * 0.08f);
                    mega.lineTo(cx - w * 0.2f, cy + h * 0.08f);
                    mega.close();
                    p.setStyle(Paint.Style.FILL_AND_STROKE);
                    p.setAlpha(30);
                    canvas.drawPath(mega, p);
                    p.setAlpha(255);
                    p.setStyle(Paint.Style.STROKE);
                    canvas.drawPath(mega, p);

                    // Sound wave
                    Path wave = new Path();
                    wave.moveTo(cx + w * 0.25f, cy - h * 0.1f);
                    wave.quadTo(cx + w * 0.35f, cy, cx + w * 0.25f, cy + h * 0.1f);
                    canvas.drawPath(wave, p);
                }
            }
        };
        LinearLayout.LayoutParams iconLP = new LinearLayout.LayoutParams(dp(36), dp(36));
        iconLP.rightMargin = dp(12);
        iconView.setLayoutParams(iconLP);
        card.addView(iconView);

        // Text column
        LinearLayout textCol = new LinearLayout(activity);
        textCol.setOrientation(LinearLayout.VERTICAL);
        textCol.setLayoutParams(new LinearLayout.LayoutParams(
            0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f
        ));

        TextView name = new TextView(activity);
        name.setText(link.name);
        name.setTextSize(TypedValue.COMPLEX_UNIT_SP, 13);
        name.setTextColor(Color.parseColor("#222222"));
        name.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
        textCol.addView(name);

        if (link.description != null && !link.description.isEmpty()) {
            TextView desc = new TextView(activity);
            desc.setText(link.description);
            desc.setTextSize(TypedValue.COMPLEX_UNIT_SP, 11);
            desc.setTextColor(Color.parseColor("#999999"));
            LinearLayout.LayoutParams descLP = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT
            );
            descLP.topMargin = dp(1);
            desc.setLayoutParams(descLP);
            textCol.addView(desc);
        }

        card.addView(textCol);

        // Arrow
        TextView arrow = new TextView(activity);
        arrow.setText("\u203A");
        arrow.setTextSize(TypedValue.COMPLEX_UNIT_SP, 18);
        arrow.setTextColor(Color.parseColor("#cccccc"));
        card.addView(arrow);

        card.setOnClickListener(v -> {
            if (link.url != null && !link.url.isEmpty()) {
                try {
                    activity.startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(link.url)));
                } catch (Exception ignored) {}
            }
        });

        return card;
    }

    private int dp(int value) {
        return (int) TypedValue.applyDimension(
            TypedValue.COMPLEX_UNIT_DIP, value,
            activity.getResources().getDisplayMetrics()
        );
    }
}
