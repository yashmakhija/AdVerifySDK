package com.adverify.sdk;

import android.app.Activity;
import android.app.Dialog;
import android.content.Intent;
import android.content.res.ColorStateList;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.RectF;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.graphics.drawable.RippleDrawable;
import android.net.Uri;
import android.text.InputType;
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
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;

import com.adverify.sdk.internal.models.PinInfoItem;

/** PIN verification dialog — minimal light theme. */
class PinVerifyDialog {

    interface PinListener {
        void onPinSubmit(String pin, PinVerifyDialog dialog);
        void onGetPinClicked(PinVerifyDialog dialog);
        void onMaxAttemptsReached();
        void onTutorialClicked();
        void onJoinClicked();
        void onExitClicked();
    }

    // Colors
    private static final String C_BG      = "#fafafa";
    private static final String C_BLACK   = "#111111";
    private static final String C_TEXT    = "#444444";
    private static final String C_MUTED   = "#888888";
    private static final String C_BORDER  = "#eeeeee";
    private static final String C_DIV     = "#f2f2f2";
    private static final String C_WHITE   = "#ffffff";
    private static final String C_BLUE    = "#3b82f6";
    private static final String C_GREEN   = "#22c55e";
    private static final String C_VIOLET  = "#8b5cf6";
    private static final String C_AMBER   = "#eab308";
    private static final String C_RED     = "#ef4444";
    private static final String C_EXIT_RED = "#ee5555";

    private final Activity activity;
    private final String title;
    private final String message;
    private final int maxAttempts;
    private final String getPinBtnText;
    private final PinInfoItem[] infoItems;
    private final PinListener listener;

    private Dialog dialog;
    private LinearLayout infoState;
    private LinearLayout pinState;
    private TextView errorText;
    private TextView attemptsText;
    private EditText pinInput;
    private Button generateBtn;
    private Button verifyBtn;
    private int attempts = 0;

    PinVerifyDialog(Activity activity, String title, String message, int maxAttempts,
                    String getPinBtnText, PinInfoItem[] infoItems, PinListener listener) {
        this.activity = activity;
        this.title = title;
        this.message = message;
        this.maxAttempts = maxAttempts;
        this.getPinBtnText = getPinBtnText;
        this.infoItems = infoItems;
        this.listener = listener;
    }

    void show() {
        dialog = new Dialog(activity);
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        dialog.setCancelable(false);

        ScrollView scroll = new ScrollView(activity);
        scroll.setFillViewport(true);

        LinearLayout root = new LinearLayout(activity);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setPadding(dp(24), dp(32), dp(24), dp(24));
        root.setGravity(Gravity.CENTER_HORIZONTAL);

        GradientDrawable bg = new GradientDrawable();
        bg.setColor(Color.parseColor(C_BG));
        bg.setCornerRadius(dp(20));
        root.setBackground(bg);

        // ── Shield icon: black with lock ──
        View shieldIcon = new View(activity) {
            @Override
            protected void onDraw(Canvas canvas) {
                super.onDraw(canvas);
                drawShieldLock(canvas, getWidth(), getHeight());
            }
        };
        LinearLayout.LayoutParams shieldLP = new LinearLayout.LayoutParams(dp(56), dp(56));
        shieldLP.gravity = Gravity.CENTER_HORIZONTAL;
        shieldLP.bottomMargin = dp(18);
        shieldIcon.setLayoutParams(shieldLP);
        root.addView(shieldIcon);

        // ── Title ──
        TextView titleView = new TextView(activity);
        titleView.setText(title != null && !title.isEmpty() ? title : "Device Verification");
        titleView.setTextSize(TypedValue.COMPLEX_UNIT_SP, 17);
        titleView.setTextColor(Color.parseColor(C_BLACK));
        titleView.setTypeface(Typeface.DEFAULT_BOLD);
        titleView.setGravity(Gravity.CENTER);
        root.addView(titleView);

        // ── Subtitle ──
        TextView subtitle = new TextView(activity);
        subtitle.setText(message != null && !message.isEmpty() ? message : "Verify your device to continue");
        subtitle.setTextSize(TypedValue.COMPLEX_UNIT_SP, 13);
        subtitle.setTextColor(Color.parseColor(C_MUTED));
        subtitle.setGravity(Gravity.CENTER);
        LinearLayout.LayoutParams subLP = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        subLP.topMargin = dp(4);
        subLP.bottomMargin = dp(22);
        subtitle.setLayoutParams(subLP);
        root.addView(subtitle);

        // ═══════ INFO STATE ═══════
        infoState = new LinearLayout(activity);
        infoState.setOrientation(LinearLayout.VERTICAL);
        infoState.setLayoutParams(new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));

        // Info card
        if (infoItems != null && infoItems.length > 0) {
            infoState.addView(buildInfoCard());
        }

        // Generate button — solid black
        generateBtn = new Button(activity);
        String genText = getPinBtnText != null && !getPinBtnText.isEmpty()
            ? getPinBtnText : "Generate PIN & Verify";
        generateBtn.setText(genText);
        generateBtn.setTextColor(Color.WHITE);
        generateBtn.setAllCaps(false);
        generateBtn.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
        generateBtn.setTextSize(TypedValue.COMPLEX_UNIT_SP, 14);

        GradientDrawable genBg = new GradientDrawable();
        genBg.setColor(Color.parseColor(C_BLACK));
        genBg.setCornerRadius(dp(12));
        generateBtn.setBackground(createRipple(Color.parseColor("#333333"), genBg));
        generateBtn.setPadding(dp(24), dp(14), dp(24), dp(14));

        LinearLayout.LayoutParams genLP = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        genLP.topMargin = dp(18);
        generateBtn.setLayoutParams(genLP);
        generateBtn.setOnClickListener(v -> {
            if (listener != null) listener.onGetPinClicked(PinVerifyDialog.this);
        });
        infoState.addView(generateBtn);

        // Secondary row: Tutorial + Join Us
        LinearLayout secRow = new LinearLayout(activity);
        secRow.setOrientation(LinearLayout.HORIZONTAL);
        LinearLayout.LayoutParams secLP = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        secLP.topMargin = dp(10);
        secRow.setLayoutParams(secLP);

        Button tutBtn = buildGhostButton("Tutorial");
        tutBtn.setOnClickListener(v -> { if (listener != null) listener.onTutorialClicked(); });
        LinearLayout.LayoutParams tutLP = new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f);
        tutLP.rightMargin = dp(4);
        tutBtn.setLayoutParams(tutLP);
        secRow.addView(tutBtn);

        Button joinBtn = buildGhostButton("Join Us");
        joinBtn.setOnClickListener(v -> { if (listener != null) listener.onJoinClicked(); });
        LinearLayout.LayoutParams joinLP = new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f);
        joinLP.leftMargin = dp(4);
        joinBtn.setLayoutParams(joinLP);
        secRow.addView(joinBtn);
        infoState.addView(secRow);

        // Exit button — red pill
        Button exitBtn = new Button(activity);
        exitBtn.setText("Exit");
        exitBtn.setTextColor(Color.parseColor(C_EXIT_RED));
        exitBtn.setTextSize(TypedValue.COMPLEX_UNIT_SP, 12);
        exitBtn.setAllCaps(false);
        exitBtn.setTypeface(Typeface.DEFAULT, Typeface.NORMAL);

        GradientDrawable exitBg = new GradientDrawable();
        exitBg.setColor(Color.TRANSPARENT);
        exitBg.setCornerRadius(dp(18));
        exitBg.setStroke(dp(1), Color.parseColor("#ffeeee"));
        exitBtn.setBackground(createRipple(Color.parseColor("#fff5f5"), exitBg));
        exitBtn.setPadding(dp(18), dp(8), dp(18), dp(8));

        LinearLayout.LayoutParams exitLP = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        exitLP.gravity = Gravity.CENTER_HORIZONTAL;
        exitLP.topMargin = dp(10);
        exitBtn.setLayoutParams(exitLP);
        exitBtn.setOnClickListener(v -> { if (listener != null) listener.onExitClicked(); });
        infoState.addView(exitBtn);

        root.addView(infoState);

        // ═══════ PIN STATE ═══════
        pinState = new LinearLayout(activity);
        pinState.setOrientation(LinearLayout.VERTICAL);
        pinState.setVisibility(View.GONE);
        pinState.setLayoutParams(new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));

        TextView pinSub = new TextView(activity);
        pinSub.setText("Enter the PIN from your browser");
        pinSub.setTextSize(TypedValue.COMPLEX_UNIT_SP, 13);
        pinSub.setTextColor(Color.parseColor(C_MUTED));
        pinSub.setGravity(Gravity.CENTER);
        LinearLayout.LayoutParams pinSubLP = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        pinSubLP.bottomMargin = dp(18);
        pinSub.setLayoutParams(pinSubLP);
        pinState.addView(pinSub);

        // PIN input
        pinInput = new EditText(activity);
        pinInput.setHint("Enter PIN");
        pinInput.setTextColor(Color.parseColor(C_BLACK));
        pinInput.setHintTextColor(Color.parseColor("#bbbbbb"));
        pinInput.setInputType(InputType.TYPE_CLASS_NUMBER | InputType.TYPE_NUMBER_VARIATION_PASSWORD);
        pinInput.setTextSize(TypedValue.COMPLEX_UNIT_SP, 20);
        pinInput.setGravity(Gravity.CENTER);
        pinInput.setLetterSpacing(0.3f);
        pinInput.setPadding(dp(16), dp(16), dp(16), dp(16));
        pinInput.setTypeface(Typeface.MONOSPACE);

        GradientDrawable inputBg = new GradientDrawable();
        inputBg.setColor(Color.WHITE);
        inputBg.setCornerRadius(dp(10));
        inputBg.setStroke(dp(1), Color.parseColor("#dddddd"));
        pinInput.setBackground(inputBg);
        pinState.addView(pinInput);

        // Error text
        errorText = new TextView(activity);
        errorText.setTextSize(TypedValue.COMPLEX_UNIT_SP, 12);
        errorText.setTextColor(Color.parseColor(C_EXIT_RED));
        errorText.setGravity(Gravity.CENTER);
        errorText.setPadding(0, dp(10), 0, 0);
        errorText.setVisibility(View.GONE);
        pinState.addView(errorText);

        // Attempts text
        attemptsText = new TextView(activity);
        attemptsText.setTextSize(TypedValue.COMPLEX_UNIT_SP, 11);
        attemptsText.setTextColor(Color.parseColor("#999999"));
        attemptsText.setGravity(Gravity.CENTER);
        attemptsText.setTypeface(Typeface.MONOSPACE);
        attemptsText.setPadding(0, dp(6), 0, 0);
        attemptsText.setVisibility(View.GONE);
        pinState.addView(attemptsText);

        // Verify button — solid black
        verifyBtn = new Button(activity);
        verifyBtn.setText("Verify");
        verifyBtn.setTextColor(Color.WHITE);
        verifyBtn.setAllCaps(false);
        verifyBtn.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
        verifyBtn.setTextSize(TypedValue.COMPLEX_UNIT_SP, 14);

        GradientDrawable verBg = new GradientDrawable();
        verBg.setColor(Color.parseColor(C_BLACK));
        verBg.setCornerRadius(dp(12));
        verifyBtn.setBackground(createRipple(Color.parseColor("#333333"), verBg));
        verifyBtn.setPadding(dp(24), dp(14), dp(24), dp(14));

        LinearLayout.LayoutParams verLP = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        verLP.topMargin = dp(18);
        verifyBtn.setLayoutParams(verLP);
        verifyBtn.setOnClickListener(v -> {
            String pin = pinInput.getText().toString().trim();
            if (pin.isEmpty()) { showError("Please enter a PIN"); return; }
            attempts++;
            if (attempts >= maxAttempts) {
                dialog.dismiss();
                if (listener != null) listener.onMaxAttemptsReached();
                return;
            }
            if (listener != null) listener.onPinSubmit(pin, PinVerifyDialog.this);
        });
        pinState.addView(verifyBtn);

        // Back button
        Button backBtn = new Button(activity);
        backBtn.setText("\u2190 Back");
        backBtn.setTextColor(Color.parseColor("#999999"));
        backBtn.setTextSize(TypedValue.COMPLEX_UNIT_SP, 12);
        backBtn.setAllCaps(false);
        GradientDrawable backBg = new GradientDrawable();
        backBg.setColor(Color.TRANSPARENT);
        backBg.setCornerRadius(dp(8));
        backBtn.setBackground(createRipple(Color.parseColor("#f0f0f0"), backBg));
        backBtn.setPadding(dp(14), dp(7), dp(14), dp(7));

        LinearLayout.LayoutParams backLP = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        backLP.gravity = Gravity.CENTER_HORIZONTAL;
        backLP.topMargin = dp(12);
        backBtn.setLayoutParams(backLP);
        backBtn.setOnClickListener(v -> switchToInfoState());
        pinState.addView(backBtn);

        root.addView(pinState);

        scroll.addView(root);
        dialog.setContentView(scroll);

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

    // ═══════ Public API ═══════

    void switchToPinState() {
        if (infoState != null && pinState != null) {
            infoState.setVisibility(View.GONE);
            pinState.setVisibility(View.VISIBLE);
            AlphaAnimation fadeIn = new AlphaAnimation(0f, 1f);
            fadeIn.setDuration(150);
            pinState.startAnimation(fadeIn);
        }
    }

    void dismiss() {
        if (dialog != null && dialog.isShowing()) dialog.dismiss();
    }

    void openUrl(String url) {
        try { activity.startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url))); }
        catch (Exception ignored) {}
    }

    void showError(String msg) {
        if (errorText != null) { errorText.setText(msg); errorText.setVisibility(View.VISIBLE); }
        if (pinInput != null) pinInput.setText("");
        updateAttemptsText();
    }

    void setGetPinLoading(boolean loading) {
        if (generateBtn == null) return;
        generateBtn.setEnabled(!loading);
        generateBtn.setText(loading ? "Generating..." :
            (getPinBtnText != null && !getPinBtnText.isEmpty() ? getPinBtnText : "Generate PIN & Verify"));
        generateBtn.setAlpha(loading ? 0.45f : 1f);
    }

    void setVerifyLoading(boolean loading) {
        if (verifyBtn == null) return;
        verifyBtn.setEnabled(!loading);
        verifyBtn.setText(loading ? "Verifying..." : "Verify");
        verifyBtn.setAlpha(loading ? 0.45f : 1f);
    }

    // ═══════ Drawing ═══════

    /** Draw the black shield with white lock icon. */
    private void drawShieldLock(Canvas canvas, float w, float h) {
        float cx = w / 2f;

        // Shadow
        Paint shadow = new Paint(Paint.ANTI_ALIAS_FLAG);
        shadow.setColor(Color.parseColor("#e8e8e8"));
        Path shadowPath = shieldPath(cx, h * 0.15f, w * 0.7f, h * 0.82f);
        canvas.translate(0, dp(2));
        canvas.drawPath(shadowPath, shadow);
        canvas.translate(0, -dp(2));

        // Main shield
        Paint main = new Paint(Paint.ANTI_ALIAS_FLAG);
        main.setColor(Color.parseColor("#1a1a1a"));
        Path mainPath = shieldPath(cx, h * 0.08f, w * 0.7f, h * 0.82f);
        canvas.drawPath(mainPath, main);

        // Inner bevel
        Paint inner = new Paint(Paint.ANTI_ALIAS_FLAG);
        inner.setColor(Color.parseColor("#222222"));
        Path innerPath = shieldPath(cx, h * 0.15f, w * 0.58f, h * 0.68f);
        canvas.drawPath(innerPath, inner);

        // Lock body
        Paint lockPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
        lockPaint.setColor(Color.WHITE);
        float lockW = w * 0.22f;
        float lockH = w * 0.18f;
        float lockL = cx - lockW / 2f;
        float lockT = h * 0.46f;
        canvas.drawRoundRect(lockL, lockT, lockL + lockW, lockT + lockH, dp(2), dp(2), lockPaint);

        // Lock shackle
        lockPaint.setStyle(Paint.Style.STROKE);
        lockPaint.setStrokeWidth(w * 0.04f);
        lockPaint.setStrokeCap(Paint.Cap.ROUND);
        float shackleR = lockW * 0.3f;
        RectF shackle = new RectF(cx - shackleR, lockT - shackleR * 1.8f, cx + shackleR, lockT);
        canvas.drawArc(shackle, 180, 180, false, lockPaint);
        canvas.drawLine(cx - shackleR, lockT - shackleR * 0.9f, cx - shackleR, lockT, lockPaint);
        canvas.drawLine(cx + shackleR, lockT - shackleR * 0.9f, cx + shackleR, lockT, lockPaint);

        // Keyhole
        Paint keyPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
        keyPaint.setColor(Color.parseColor("#1a1a1a"));
        float kcy = lockT + lockH * 0.4f;
        canvas.drawCircle(cx, kcy, w * 0.025f, keyPaint);
        canvas.drawRect(cx - w * 0.012f, kcy, cx + w * 0.012f, kcy + lockH * 0.35f, keyPaint);
    }

    private Path shieldPath(float cx, float top, float sw, float sh) {
        Path p = new Path();
        p.moveTo(cx, top);
        p.lineTo(cx + sw / 2f, top + sh * 0.15f);
        p.quadTo(cx + sw / 2f, top + sh * 0.65f, cx, top + sh);
        p.quadTo(cx - sw / 2f, top + sh * 0.65f, cx - sw / 2f, top + sh * 0.15f);
        p.close();
        return p;
    }

    // ═══════ Info card ═══════

    private LinearLayout buildInfoCard() {
        LinearLayout card = new LinearLayout(activity);
        card.setOrientation(LinearLayout.VERTICAL);

        GradientDrawable cardBg = new GradientDrawable();
        cardBg.setColor(Color.WHITE);
        cardBg.setCornerRadius(dp(14));
        cardBg.setStroke(dp(1), Color.parseColor(C_BORDER));
        card.setBackground(cardBg);
        card.setClipToPadding(false);

        for (int i = 0; i < infoItems.length; i++) {
            PinInfoItem item = infoItems[i];
            boolean isFirst = (i == 0);

            LinearLayout row = new LinearLayout(activity);
            row.setOrientation(LinearLayout.HORIZONTAL);
            row.setGravity(Gravity.CENTER_VERTICAL);
            row.setPadding(dp(14), dp(12), dp(14), dp(12));

            // Colored icon dot
            int dotColor = getDotBgColor(item);
            int iconColor = getDotIconColor(item);
            String iconType = item.icon != null ? item.icon : "";

            View dot = new View(activity) {
                @Override
                protected void onDraw(Canvas canvas) {
                    super.onDraw(canvas);
                    float w = getWidth(), h = getHeight();
                    Paint bg = new Paint(Paint.ANTI_ALIAS_FLAG);
                    bg.setColor(dotColor);
                    canvas.drawRoundRect(0, 0, w, h, dp(8), dp(8), bg);
                    drawDotIcon(canvas, w, h, iconColor, iconType);
                }
            };
            LinearLayout.LayoutParams dotLP = new LinearLayout.LayoutParams(dp(30), dp(30));
            dotLP.rightMargin = dp(12);
            dot.setLayoutParams(dotLP);
            row.addView(dot);

            // Text
            TextView text = new TextView(activity);
            text.setText(item.text);
            text.setTextSize(TypedValue.COMPLEX_UNIT_SP, 13);
            text.setTextColor(isFirst && item.color != null
                ? safeParseColor(item.color, C_BLUE) : Color.parseColor(C_TEXT));
            text.setTypeface(Typeface.DEFAULT, Typeface.NORMAL);
            text.setLayoutParams(new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f));
            row.addView(text);

            // Badge on first row
            if (isFirst) {
                TextView badge = new TextView(activity);
                badge.setText("PENDING");
                badge.setTextSize(TypedValue.COMPLEX_UNIT_SP, 9);
                badge.setTextColor(Color.parseColor(C_BLUE));
                badge.setTypeface(Typeface.MONOSPACE, Typeface.NORMAL);
                badge.setLetterSpacing(0.05f);
                badge.setPadding(dp(8), dp(3), dp(8), dp(3));
                GradientDrawable badgeBg = new GradientDrawable();
                badgeBg.setColor(Color.parseColor("#eef6ff"));
                badgeBg.setCornerRadius(dp(6));
                badge.setBackground(badgeBg);
                row.addView(badge);
            }

            card.addView(row);

            // Divider after first row
            if (isFirst && infoItems.length > 1) {
                View div = new View(activity);
                div.setBackgroundColor(Color.parseColor(C_DIV));
                LinearLayout.LayoutParams divLP = new LinearLayout.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT, dp(1));
                div.setLayoutParams(divLP);
                card.addView(div);
            }
        }
        return card;
    }

    /** Draw a simple icon inside the 30dp colored dot based on type. */
    private void drawDotIcon(Canvas canvas, float w, float h, int color, String type) {
        float cx = w / 2f, cy = h / 2f;
        Paint p = new Paint(Paint.ANTI_ALIAS_FLAG);
        p.setColor(color);
        p.setStyle(Paint.Style.STROKE);
        p.setStrokeWidth(w * 0.08f);
        p.setStrokeCap(Paint.Cap.ROUND);
        p.setStrokeJoin(Paint.Join.ROUND);

        float s = w * 0.3f; // scale unit

        switch (type.toLowerCase()) {
            case "device":
            case "info":
                // Phone outline
                canvas.drawRoundRect(cx - s * 0.5f, cy - s * 0.85f, cx + s * 0.5f, cy + s * 0.85f, s * 0.15f, s * 0.15f, p);
                // Screen fill
                p.setStyle(Paint.Style.FILL);
                p.setAlpha(40);
                canvas.drawRect(cx - s * 0.35f, cy - s * 0.55f, cx + s * 0.35f, cy + s * 0.4f, p);
                p.setAlpha(255);
                // Home dot
                canvas.drawCircle(cx, cy + s * 0.65f, s * 0.08f, p);
                // Signal wave
                p.setStyle(Paint.Style.STROKE);
                p.setStrokeWidth(w * 0.06f);
                Path wave = new Path();
                wave.addArc(cx + s * 0.3f, cy - s * 0.7f, cx + s * 0.7f, cy - s * 0.3f, -90, 180);
                canvas.drawPath(wave, p);
                break;

            case "clock":
            case "hourglass":
                // Hourglass caps
                canvas.drawLine(cx - s * 0.5f, cy - s * 0.8f, cx + s * 0.5f, cy - s * 0.8f, p);
                canvas.drawLine(cx - s * 0.5f, cy + s * 0.8f, cx + s * 0.5f, cy + s * 0.8f, p);
                // Glass body
                Path glass = new Path();
                glass.moveTo(cx - s * 0.4f, cy - s * 0.7f);
                glass.lineTo(cx, cy);
                glass.lineTo(cx - s * 0.4f, cy + s * 0.7f);
                glass.moveTo(cx + s * 0.4f, cy - s * 0.7f);
                glass.lineTo(cx, cy);
                glass.lineTo(cx + s * 0.4f, cy + s * 0.7f);
                canvas.drawPath(glass, p);
                // Sand
                p.setStyle(Paint.Style.FILL);
                p.setAlpha(80);
                Path sand = new Path();
                sand.moveTo(cx - s * 0.2f, cy + s * 0.5f);
                sand.lineTo(cx + s * 0.2f, cy + s * 0.5f);
                sand.lineTo(cx, cy + s * 0.15f);
                sand.close();
                canvas.drawPath(sand, p);
                break;

            case "key":
            case "sparkle":
                // Key head circle
                canvas.drawCircle(cx - s * 0.2f, cy - s * 0.2f, s * 0.35f, p);
                // Key shaft
                canvas.drawLine(cx + s * 0.1f, cy + s * 0.05f, cx + s * 0.6f, cy + s * 0.55f, p);
                // Key teeth
                canvas.drawLine(cx + s * 0.35f, cy + s * 0.4f, cx + s * 0.55f, cy + s * 0.2f, p);
                // Sparkle
                p.setStyle(Paint.Style.FILL);
                p.setAlpha(150);
                drawSparkle(canvas, cx + s * 0.5f, cy - s * 0.55f, s * 0.2f, p);
                break;

            case "star":
            case "crown":
                // Crown shape
                p.setStyle(Paint.Style.FILL_AND_STROKE);
                p.setAlpha(40);
                Path crown = new Path();
                crown.moveTo(cx - s * 0.6f, cy + s * 0.3f);
                crown.lineTo(cx - s * 0.7f, cy - s * 0.35f);
                crown.lineTo(cx - s * 0.25f, cy);
                crown.lineTo(cx, cy - s * 0.55f);
                crown.lineTo(cx + s * 0.25f, cy);
                crown.lineTo(cx + s * 0.7f, cy - s * 0.35f);
                crown.lineTo(cx + s * 0.6f, cy + s * 0.3f);
                crown.close();
                canvas.drawPath(crown, p);
                p.setAlpha(255);
                p.setStyle(Paint.Style.STROKE);
                canvas.drawPath(crown, p);
                // Base
                p.setStyle(Paint.Style.FILL);
                p.setAlpha(80);
                canvas.drawRoundRect(cx - s * 0.55f, cy + s * 0.3f, cx + s * 0.55f, cy + s * 0.55f, s * 0.1f, s * 0.1f, p);
                // Gems
                p.setAlpha(255);
                canvas.drawCircle(cx, cy - s * 0.05f, s * 0.08f, p);
                break;

            case "warning":
            case "shield-x":
                // Shield outline
                Path shield = shieldPath(cx, cy - s * 0.7f, s * 1.3f, s * 1.5f);
                p.setStyle(Paint.Style.FILL);
                p.setAlpha(20);
                canvas.drawPath(shield, p);
                p.setAlpha(255);
                p.setStyle(Paint.Style.STROKE);
                canvas.drawPath(shield, p);
                // X
                float xs = s * 0.25f;
                canvas.drawLine(cx - xs, cy - xs * 0.3f, cx + xs, cy + xs * 0.7f, p);
                canvas.drawLine(cx + xs, cy - xs * 0.3f, cx - xs, cy + xs * 0.7f, p);
                break;

            default:
                // Filled circle fallback
                p.setStyle(Paint.Style.FILL);
                canvas.drawCircle(cx, cy, s * 0.25f, p);
                break;
        }
    }

    private void drawSparkle(Canvas canvas, float cx, float cy, float r, Paint p) {
        Path sp = new Path();
        sp.moveTo(cx, cy - r);
        sp.lineTo(cx + r * 0.3f, cy - r * 0.3f);
        sp.lineTo(cx + r, cy);
        sp.lineTo(cx + r * 0.3f, cy + r * 0.3f);
        sp.lineTo(cx, cy + r);
        sp.lineTo(cx - r * 0.3f, cy + r * 0.3f);
        sp.lineTo(cx - r, cy);
        sp.lineTo(cx - r * 0.3f, cy - r * 0.3f);
        sp.close();
        canvas.drawPath(sp, p);
    }

    // ═══════ Helpers ═══════

    private void switchToInfoState() {
        if (infoState != null && pinState != null) {
            pinState.setVisibility(View.GONE);
            infoState.setVisibility(View.VISIBLE);
            if (errorText != null) errorText.setVisibility(View.GONE);
            AlphaAnimation fadeIn = new AlphaAnimation(0f, 1f);
            fadeIn.setDuration(150);
            infoState.startAnimation(fadeIn);
        }
    }

    private void updateAttemptsText() {
        if (attemptsText == null) return;
        int remaining = maxAttempts - attempts;
        if (remaining > 0 && attempts > 0) {
            attemptsText.setText(remaining + " attempt" + (remaining != 1 ? "s" : "") + " remaining");
            attemptsText.setVisibility(View.VISIBLE);
        }
    }

    private Button buildGhostButton(String text) {
        Button btn = new Button(activity);
        btn.setText(text);
        btn.setTextColor(Color.parseColor("#666666"));
        btn.setTextSize(TypedValue.COMPLEX_UNIT_SP, 12);
        btn.setAllCaps(false);
        GradientDrawable bg = new GradientDrawable();
        bg.setColor(Color.WHITE);
        bg.setCornerRadius(dp(10));
        bg.setStroke(dp(1), Color.parseColor(C_BORDER));
        btn.setBackground(createRipple(Color.parseColor("#f0f0f0"), bg));
        btn.setPadding(dp(12), dp(11), dp(12), dp(11));
        return btn;
    }

    private int getDotBgColor(PinInfoItem item) {
        String icon = item.icon != null ? item.icon.toLowerCase() : "";
        if (icon.contains("device") || icon.contains("info")) return Color.parseColor("#eef6ff");
        if (icon.contains("clock") || icon.contains("hour")) return Color.parseColor("#eefbf4");
        if (icon.contains("key") || icon.contains("sparkle")) return Color.parseColor("#f3f0ff");
        if (icon.contains("star") || icon.contains("crown")) return Color.parseColor("#fefce8");
        if (icon.contains("warn") || icon.contains("shield")) return Color.parseColor("#fef2f2");
        return Color.parseColor("#f5f5f5");
    }

    private int getDotIconColor(PinInfoItem item) {
        String icon = item.icon != null ? item.icon.toLowerCase() : "";
        if (icon.contains("device") || icon.contains("info")) return Color.parseColor(C_BLUE);
        if (icon.contains("clock") || icon.contains("hour")) return Color.parseColor(C_GREEN);
        if (icon.contains("key") || icon.contains("sparkle")) return Color.parseColor(C_VIOLET);
        if (icon.contains("star") || icon.contains("crown")) return Color.parseColor(C_AMBER);
        if (icon.contains("warn") || icon.contains("shield")) return Color.parseColor(C_RED);
        return Color.parseColor("#999999");
    }

    private int safeParseColor(String hex, String fallback) {
        try { return Color.parseColor(hex); }
        catch (Exception e) { return Color.parseColor(fallback); }
    }

    private RippleDrawable createRipple(int pressedColor, GradientDrawable content) {
        return new RippleDrawable(ColorStateList.valueOf(pressedColor), content, null);
    }

    private int dp(int value) {
        return (int) TypedValue.applyDimension(
            TypedValue.COMPLEX_UNIT_DIP, value,
            activity.getResources().getDisplayMetrics());
    }
}
