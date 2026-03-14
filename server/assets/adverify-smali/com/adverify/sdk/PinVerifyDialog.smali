.class Lcom/adverify/sdk/PinVerifyDialog;
.super Ljava/lang/Object;
.source "PinVerifyDialog.java"


# annotations
.annotation system Ldalvik/annotation/MemberClasses;
    value = {
        Lcom/adverify/sdk/PinVerifyDialog$PinListener;
    }
.end annotation


# static fields
.field private static final C_AMBER:Ljava/lang/String; = "#eab308"

.field private static final C_BG:Ljava/lang/String; = "#fafafa"

.field private static final C_BLACK:Ljava/lang/String; = "#111111"

.field private static final C_BLUE:Ljava/lang/String; = "#3b82f6"

.field private static final C_BORDER:Ljava/lang/String; = "#eeeeee"

.field private static final C_DIV:Ljava/lang/String; = "#f2f2f2"

.field private static final C_EXIT_RED:Ljava/lang/String; = "#ee5555"

.field private static final C_GREEN:Ljava/lang/String; = "#22c55e"

.field private static final C_MUTED:Ljava/lang/String; = "#888888"

.field private static final C_RED:Ljava/lang/String; = "#ef4444"

.field private static final C_TEXT:Ljava/lang/String; = "#444444"

.field private static final C_VIOLET:Ljava/lang/String; = "#8b5cf6"

.field private static final C_WHITE:Ljava/lang/String; = "#ffffff"


# instance fields
.field private final activity:Landroid/app/Activity;

.field private attempts:I

.field private attemptsText:Landroid/widget/TextView;

.field private dialog:Landroid/app/Dialog;

.field private errorText:Landroid/widget/TextView;

.field private generateBtn:Landroid/widget/Button;

.field private final getPinBtnText:Ljava/lang/String;

.field private final infoItems:[Lcom/adverify/sdk/internal/models/PinInfoItem;

.field private infoState:Landroid/widget/LinearLayout;

.field private final listener:Lcom/adverify/sdk/PinVerifyDialog$PinListener;

.field private final maxAttempts:I

.field private final message:Ljava/lang/String;

.field private pinInput:Landroid/widget/EditText;

.field private pinState:Landroid/widget/LinearLayout;

.field private final title:Ljava/lang/String;

.field private verifyBtn:Landroid/widget/Button;


# direct methods
.method static bridge synthetic -$$Nest$mdp(Lcom/adverify/sdk/PinVerifyDialog;I)I
    .registers 2

    invoke-direct {p0, p1}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result p0

    return p0
.end method

.method static bridge synthetic -$$Nest$mdrawDotIcon(Lcom/adverify/sdk/PinVerifyDialog;Landroid/graphics/Canvas;FFILjava/lang/String;)V
    .registers 6

    invoke-direct/range {p0 .. p5}, Lcom/adverify/sdk/PinVerifyDialog;->drawDotIcon(Landroid/graphics/Canvas;FFILjava/lang/String;)V

    return-void
.end method

.method static bridge synthetic -$$Nest$mdrawShieldLock(Lcom/adverify/sdk/PinVerifyDialog;Landroid/graphics/Canvas;FF)V
    .registers 4

    invoke-direct {p0, p1, p2, p3}, Lcom/adverify/sdk/PinVerifyDialog;->drawShieldLock(Landroid/graphics/Canvas;FF)V

    return-void
.end method

.method constructor <init>(Landroid/app/Activity;Ljava/lang/String;Ljava/lang/String;ILjava/lang/String;[Lcom/adverify/sdk/internal/models/PinInfoItem;Lcom/adverify/sdk/PinVerifyDialog$PinListener;)V
    .registers 9

    .line 80
    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    .line 77
    const/4 v0, 0x0

    iput v0, p0, Lcom/adverify/sdk/PinVerifyDialog;->attempts:I

    .line 81
    iput-object p1, p0, Lcom/adverify/sdk/PinVerifyDialog;->activity:Landroid/app/Activity;

    .line 82
    iput-object p2, p0, Lcom/adverify/sdk/PinVerifyDialog;->title:Ljava/lang/String;

    .line 83
    iput-object p3, p0, Lcom/adverify/sdk/PinVerifyDialog;->message:Ljava/lang/String;

    .line 84
    iput p4, p0, Lcom/adverify/sdk/PinVerifyDialog;->maxAttempts:I

    .line 85
    iput-object p5, p0, Lcom/adverify/sdk/PinVerifyDialog;->getPinBtnText:Ljava/lang/String;

    .line 86
    iput-object p6, p0, Lcom/adverify/sdk/PinVerifyDialog;->infoItems:[Lcom/adverify/sdk/internal/models/PinInfoItem;

    .line 87
    iput-object p7, p0, Lcom/adverify/sdk/PinVerifyDialog;->listener:Lcom/adverify/sdk/PinVerifyDialog$PinListener;

    .line 88
    return-void
.end method

.method private buildGhostButton(Ljava/lang/String;)Landroid/widget/Button;
    .registers 6

    .line 706
    new-instance v0, Landroid/widget/Button;

    iget-object v1, p0, Lcom/adverify/sdk/PinVerifyDialog;->activity:Landroid/app/Activity;

    invoke-direct {v0, v1}, Landroid/widget/Button;-><init>(Landroid/content/Context;)V

    .line 707
    invoke-virtual {v0, p1}, Landroid/widget/Button;->setText(Ljava/lang/CharSequence;)V

    .line 708
    const-string p1, "#666666"

    invoke-static {p1}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result p1

    invoke-virtual {v0, p1}, Landroid/widget/Button;->setTextColor(I)V

    .line 709
    const/4 p1, 0x2

    const/high16 v1, 0x41400000    # 12.0f

    invoke-virtual {v0, p1, v1}, Landroid/widget/Button;->setTextSize(IF)V

    .line 710
    const/4 p1, 0x0

    invoke-virtual {v0, p1}, Landroid/widget/Button;->setAllCaps(Z)V

    .line 711
    new-instance p1, Landroid/graphics/drawable/GradientDrawable;

    invoke-direct {p1}, Landroid/graphics/drawable/GradientDrawable;-><init>()V

    .line 712
    const/4 v1, -0x1

    invoke-virtual {p1, v1}, Landroid/graphics/drawable/GradientDrawable;->setColor(I)V

    .line 713
    const/16 v1, 0xa

    invoke-direct {p0, v1}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v1

    int-to-float v1, v1

    invoke-virtual {p1, v1}, Landroid/graphics/drawable/GradientDrawable;->setCornerRadius(F)V

    .line 714
    const/4 v1, 0x1

    invoke-direct {p0, v1}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v1

    const-string v2, "#eeeeee"

    invoke-static {v2}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v2

    invoke-virtual {p1, v1, v2}, Landroid/graphics/drawable/GradientDrawable;->setStroke(II)V

    .line 715
    const-string v1, "#f0f0f0"

    invoke-static {v1}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v1

    invoke-direct {p0, v1, p1}, Lcom/adverify/sdk/PinVerifyDialog;->createRipple(ILandroid/graphics/drawable/GradientDrawable;)Landroid/graphics/drawable/RippleDrawable;

    move-result-object p1

    invoke-virtual {v0, p1}, Landroid/widget/Button;->setBackground(Landroid/graphics/drawable/Drawable;)V

    .line 716
    const/16 p1, 0xc

    invoke-direct {p0, p1}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v1

    const/16 v2, 0xb

    invoke-direct {p0, v2}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v3

    invoke-direct {p0, p1}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result p1

    invoke-direct {p0, v2}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v2

    invoke-virtual {v0, v1, v3, p1, v2}, Landroid/widget/Button;->setPadding(IIII)V

    .line 717
    return-object v0
.end method

.method private buildInfoCard()Landroid/widget/LinearLayout;
    .registers 19

    .line 466
    move-object/from16 v6, p0

    new-instance v7, Landroid/widget/LinearLayout;

    iget-object v0, v6, Lcom/adverify/sdk/PinVerifyDialog;->activity:Landroid/app/Activity;

    invoke-direct {v7, v0}, Landroid/widget/LinearLayout;-><init>(Landroid/content/Context;)V

    .line 467
    const/4 v8, 0x1

    invoke-virtual {v7, v8}, Landroid/widget/LinearLayout;->setOrientation(I)V

    .line 469
    new-instance v0, Landroid/graphics/drawable/GradientDrawable;

    invoke-direct {v0}, Landroid/graphics/drawable/GradientDrawable;-><init>()V

    .line 470
    const/4 v9, -0x1

    invoke-virtual {v0, v9}, Landroid/graphics/drawable/GradientDrawable;->setColor(I)V

    .line 471
    const/16 v10, 0xe

    invoke-direct {v6, v10}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v1

    int-to-float v1, v1

    invoke-virtual {v0, v1}, Landroid/graphics/drawable/GradientDrawable;->setCornerRadius(F)V

    .line 472
    invoke-direct {v6, v8}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v1

    const-string v2, "#eeeeee"

    invoke-static {v2}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v2

    invoke-virtual {v0, v1, v2}, Landroid/graphics/drawable/GradientDrawable;->setStroke(II)V

    .line 473
    invoke-virtual {v7, v0}, Landroid/widget/LinearLayout;->setBackground(Landroid/graphics/drawable/Drawable;)V

    .line 474
    const/4 v11, 0x0

    invoke-virtual {v7, v11}, Landroid/widget/LinearLayout;->setClipToPadding(Z)V

    .line 476
    const/4 v12, 0x0

    :goto_35
    iget-object v0, v6, Lcom/adverify/sdk/PinVerifyDialog;->infoItems:[Lcom/adverify/sdk/internal/models/PinInfoItem;

    array-length v1, v0

    if-ge v12, v1, :cond_16e

    .line 477
    aget-object v13, v0, v12

    .line 478
    if-nez v12, :cond_40

    const/4 v14, 0x1

    goto :goto_41

    :cond_40
    const/4 v14, 0x0

    .line 480
    :goto_41
    new-instance v15, Landroid/widget/LinearLayout;

    iget-object v0, v6, Lcom/adverify/sdk/PinVerifyDialog;->activity:Landroid/app/Activity;

    invoke-direct {v15, v0}, Landroid/widget/LinearLayout;-><init>(Landroid/content/Context;)V

    .line 481
    invoke-virtual {v15, v11}, Landroid/widget/LinearLayout;->setOrientation(I)V

    .line 482
    const/16 v0, 0x10

    invoke-virtual {v15, v0}, Landroid/widget/LinearLayout;->setGravity(I)V

    .line 483
    invoke-direct {v6, v10}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v0

    const/16 v5, 0xc

    invoke-direct {v6, v5}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v1

    invoke-direct {v6, v10}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v2

    invoke-direct {v6, v5}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v3

    invoke-virtual {v15, v0, v1, v2, v3}, Landroid/widget/LinearLayout;->setPadding(IIII)V

    .line 486
    invoke-direct {v6, v13}, Lcom/adverify/sdk/PinVerifyDialog;->getDotBgColor(Lcom/adverify/sdk/internal/models/PinInfoItem;)I

    move-result v3

    .line 487
    invoke-direct {v6, v13}, Lcom/adverify/sdk/PinVerifyDialog;->getDotIconColor(Lcom/adverify/sdk/internal/models/PinInfoItem;)I

    move-result v4

    .line 488
    iget-object v0, v13, Lcom/adverify/sdk/internal/models/PinInfoItem;->icon:Ljava/lang/String;

    if-eqz v0, :cond_74

    iget-object v0, v13, Lcom/adverify/sdk/internal/models/PinInfoItem;->icon:Ljava/lang/String;

    goto :goto_76

    :cond_74
    const-string v0, ""

    :goto_76
    move-object/from16 v16, v0

    .line 490
    new-instance v2, Lcom/adverify/sdk/PinVerifyDialog$2;

    iget-object v1, v6, Lcom/adverify/sdk/PinVerifyDialog;->activity:Landroid/app/Activity;

    move-object v0, v2

    move-object/from16 v17, v1

    move-object/from16 v1, p0

    move-object v10, v2

    move-object/from16 v2, v17

    const/16 v9, 0xc

    move-object/from16 v5, v16

    invoke-direct/range {v0 .. v5}, Lcom/adverify/sdk/PinVerifyDialog$2;-><init>(Lcom/adverify/sdk/PinVerifyDialog;Landroid/content/Context;IILjava/lang/String;)V

    .line 501
    new-instance v0, Landroid/widget/LinearLayout$LayoutParams;

    const/16 v1, 0x1e

    invoke-direct {v6, v1}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v2

    invoke-direct {v6, v1}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v1

    invoke-direct {v0, v2, v1}, Landroid/widget/LinearLayout$LayoutParams;-><init>(II)V

    .line 502
    invoke-direct {v6, v9}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v1

    iput v1, v0, Landroid/widget/LinearLayout$LayoutParams;->rightMargin:I

    .line 503
    invoke-virtual {v10, v0}, Landroid/view/View;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 504
    invoke-virtual {v15, v10}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 507
    new-instance v0, Landroid/widget/TextView;

    iget-object v1, v6, Lcom/adverify/sdk/PinVerifyDialog;->activity:Landroid/app/Activity;

    invoke-direct {v0, v1}, Landroid/widget/TextView;-><init>(Landroid/content/Context;)V

    .line 508
    iget-object v1, v13, Lcom/adverify/sdk/internal/models/PinInfoItem;->text:Ljava/lang/String;

    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setText(Ljava/lang/CharSequence;)V

    .line 509
    const/high16 v1, 0x41500000    # 13.0f

    const/4 v2, 0x2

    invoke-virtual {v0, v2, v1}, Landroid/widget/TextView;->setTextSize(IF)V

    .line 510
    const-string v1, "#3b82f6"

    if-eqz v14, :cond_c7

    iget-object v3, v13, Lcom/adverify/sdk/internal/models/PinInfoItem;->color:Ljava/lang/String;

    if-eqz v3, :cond_c7

    .line 511
    iget-object v3, v13, Lcom/adverify/sdk/internal/models/PinInfoItem;->color:Ljava/lang/String;

    invoke-direct {v6, v3, v1}, Lcom/adverify/sdk/PinVerifyDialog;->safeParseColor(Ljava/lang/String;Ljava/lang/String;)I

    move-result v3

    goto :goto_cd

    :cond_c7
    const-string v3, "#444444"

    invoke-static {v3}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v3

    .line 510
    :goto_cd
    invoke-virtual {v0, v3}, Landroid/widget/TextView;->setTextColor(I)V

    .line 512
    sget-object v3, Landroid/graphics/Typeface;->DEFAULT:Landroid/graphics/Typeface;

    invoke-virtual {v0, v3, v11}, Landroid/widget/TextView;->setTypeface(Landroid/graphics/Typeface;I)V

    .line 513
    new-instance v3, Landroid/widget/LinearLayout$LayoutParams;

    const/4 v4, -0x2

    const/high16 v5, 0x3f800000    # 1.0f

    invoke-direct {v3, v11, v4, v5}, Landroid/widget/LinearLayout$LayoutParams;-><init>(IIF)V

    invoke-virtual {v0, v3}, Landroid/widget/TextView;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 514
    invoke-virtual {v15, v0}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 517
    if-eqz v14, :cond_13b

    .line 518
    new-instance v0, Landroid/widget/TextView;

    iget-object v3, v6, Lcom/adverify/sdk/PinVerifyDialog;->activity:Landroid/app/Activity;

    invoke-direct {v0, v3}, Landroid/widget/TextView;-><init>(Landroid/content/Context;)V

    .line 519
    const-string v3, "PENDING"

    invoke-virtual {v0, v3}, Landroid/widget/TextView;->setText(Ljava/lang/CharSequence;)V

    .line 520
    const/high16 v3, 0x41100000    # 9.0f

    invoke-virtual {v0, v2, v3}, Landroid/widget/TextView;->setTextSize(IF)V

    .line 521
    invoke-static {v1}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v1

    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setTextColor(I)V

    .line 522
    sget-object v1, Landroid/graphics/Typeface;->MONOSPACE:Landroid/graphics/Typeface;

    invoke-virtual {v0, v1, v11}, Landroid/widget/TextView;->setTypeface(Landroid/graphics/Typeface;I)V

    .line 523
    const v1, 0x3d4ccccd    # 0.05f

    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setLetterSpacing(F)V

    .line 524
    const/16 v1, 0x8

    invoke-direct {v6, v1}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v2

    const/4 v3, 0x3

    invoke-direct {v6, v3}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v4

    invoke-direct {v6, v1}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v1

    invoke-direct {v6, v3}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v3

    invoke-virtual {v0, v2, v4, v1, v3}, Landroid/widget/TextView;->setPadding(IIII)V

    .line 525
    new-instance v1, Landroid/graphics/drawable/GradientDrawable;

    invoke-direct {v1}, Landroid/graphics/drawable/GradientDrawable;-><init>()V

    .line 526
    const-string v2, "#eef6ff"

    invoke-static {v2}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v2

    invoke-virtual {v1, v2}, Landroid/graphics/drawable/GradientDrawable;->setColor(I)V

    .line 527
    const/4 v2, 0x6

    invoke-direct {v6, v2}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v2

    int-to-float v2, v2

    invoke-virtual {v1, v2}, Landroid/graphics/drawable/GradientDrawable;->setCornerRadius(F)V

    .line 528
    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setBackground(Landroid/graphics/drawable/Drawable;)V

    .line 529
    invoke-virtual {v15, v0}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 532
    :cond_13b
    invoke-virtual {v7, v15}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 535
    if-eqz v14, :cond_166

    iget-object v0, v6, Lcom/adverify/sdk/PinVerifyDialog;->infoItems:[Lcom/adverify/sdk/internal/models/PinInfoItem;

    array-length v0, v0

    if-le v0, v8, :cond_166

    .line 536
    new-instance v0, Landroid/view/View;

    iget-object v1, v6, Lcom/adverify/sdk/PinVerifyDialog;->activity:Landroid/app/Activity;

    invoke-direct {v0, v1}, Landroid/view/View;-><init>(Landroid/content/Context;)V

    .line 537
    const-string v1, "#f2f2f2"

    invoke-static {v1}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v1

    invoke-virtual {v0, v1}, Landroid/view/View;->setBackgroundColor(I)V

    .line 538
    new-instance v1, Landroid/widget/LinearLayout$LayoutParams;

    .line 539
    invoke-direct {v6, v8}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v2

    const/4 v3, -0x1

    invoke-direct {v1, v3, v2}, Landroid/widget/LinearLayout$LayoutParams;-><init>(II)V

    .line 540
    invoke-virtual {v0, v1}, Landroid/view/View;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 541
    invoke-virtual {v7, v0}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    goto :goto_167

    .line 535
    :cond_166
    const/4 v3, -0x1

    .line 476
    :goto_167
    add-int/lit8 v12, v12, 0x1

    const/4 v9, -0x1

    const/16 v10, 0xe

    goto/16 :goto_35

    .line 544
    :cond_16e
    return-object v7
.end method

.method private createRipple(ILandroid/graphics/drawable/GradientDrawable;)Landroid/graphics/drawable/RippleDrawable;
    .registers 5

    .line 746
    new-instance v0, Landroid/graphics/drawable/RippleDrawable;

    invoke-static {p1}, Landroid/content/res/ColorStateList;->valueOf(I)Landroid/content/res/ColorStateList;

    move-result-object p1

    const/4 v1, 0x0

    invoke-direct {v0, p1, p2, v1}, Landroid/graphics/drawable/RippleDrawable;-><init>(Landroid/content/res/ColorStateList;Landroid/graphics/drawable/Drawable;Landroid/graphics/drawable/Drawable;)V

    return-object v0
.end method

.method private dp(I)I
    .registers 4

    .line 750
    int-to-float p1, p1

    iget-object v0, p0, Lcom/adverify/sdk/PinVerifyDialog;->activity:Landroid/app/Activity;

    .line 752
    invoke-virtual {v0}, Landroid/app/Activity;->getResources()Landroid/content/res/Resources;

    move-result-object v0

    invoke-virtual {v0}, Landroid/content/res/Resources;->getDisplayMetrics()Landroid/util/DisplayMetrics;

    move-result-object v0

    .line 750
    const/4 v1, 0x1

    invoke-static {v1, p1, v0}, Landroid/util/TypedValue;->applyDimension(IFLandroid/util/DisplayMetrics;)F

    move-result p1

    float-to-int p1, p1

    return p1
.end method

.method private drawDotIcon(Landroid/graphics/Canvas;FFILjava/lang/String;)V
    .registers 28

    .line 549
    move-object/from16 v8, p1

    const/high16 v0, 0x40000000    # 2.0f

    div-float v9, p2, v0

    div-float v10, p3, v0

    .line 550
    new-instance v11, Landroid/graphics/Paint;

    const/4 v0, 0x1

    invoke-direct {v11, v0}, Landroid/graphics/Paint;-><init>(I)V

    .line 551
    move/from16 v1, p4

    invoke-virtual {v11, v1}, Landroid/graphics/Paint;->setColor(I)V

    .line 552
    sget-object v1, Landroid/graphics/Paint$Style;->STROKE:Landroid/graphics/Paint$Style;

    invoke-virtual {v11, v1}, Landroid/graphics/Paint;->setStyle(Landroid/graphics/Paint$Style;)V

    .line 553
    const v12, 0x3da3d70a    # 0.08f

    mul-float v1, p2, v12

    invoke-virtual {v11, v1}, Landroid/graphics/Paint;->setStrokeWidth(F)V

    .line 554
    sget-object v1, Landroid/graphics/Paint$Cap;->ROUND:Landroid/graphics/Paint$Cap;

    invoke-virtual {v11, v1}, Landroid/graphics/Paint;->setStrokeCap(Landroid/graphics/Paint$Cap;)V

    .line 555
    sget-object v1, Landroid/graphics/Paint$Join;->ROUND:Landroid/graphics/Paint$Join;

    invoke-virtual {v11, v1}, Landroid/graphics/Paint;->setStrokeJoin(Landroid/graphics/Paint$Join;)V

    .line 557
    const v13, 0x3e99999a    # 0.3f

    mul-float v14, p2, v13

    .line 559
    invoke-virtual/range {p5 .. p5}, Ljava/lang/String;->toLowerCase()Ljava/lang/String;

    move-result-object v1

    invoke-virtual {v1}, Ljava/lang/String;->hashCode()I

    move-result v2

    sparse-switch v2, :sswitch_data_2c4

    :cond_3a
    goto/16 :goto_a1

    :sswitch_3c
    const-string v0, "warning"

    invoke-virtual {v1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-eqz v0, :cond_3a

    const/16 v0, 0x8

    goto :goto_a2

    :sswitch_47
    const-string v0, "hourglass"

    invoke-virtual {v1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-eqz v0, :cond_3a

    const/4 v0, 0x3

    goto :goto_a2

    :sswitch_51
    const-string v0, "crown"

    invoke-virtual {v1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-eqz v0, :cond_3a

    const/4 v0, 0x7

    goto :goto_a2

    :sswitch_5b
    const-string v0, "clock"

    invoke-virtual {v1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-eqz v0, :cond_3a

    const/4 v0, 0x2

    goto :goto_a2

    :sswitch_65
    const-string v0, "star"

    invoke-virtual {v1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-eqz v0, :cond_3a

    const/4 v0, 0x6

    goto :goto_a2

    :sswitch_6f
    const-string v2, "info"

    invoke-virtual {v1, v2}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v1

    if-eqz v1, :cond_3a

    goto :goto_a2

    :sswitch_78
    const-string v0, "key"

    invoke-virtual {v1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-eqz v0, :cond_3a

    const/4 v0, 0x4

    goto :goto_a2

    :sswitch_82
    const-string v0, "shield-x"

    invoke-virtual {v1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-eqz v0, :cond_3a

    const/16 v0, 0x9

    goto :goto_a2

    :sswitch_8d
    const-string v0, "device"

    invoke-virtual {v1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-eqz v0, :cond_3a

    const/4 v0, 0x0

    goto :goto_a2

    :sswitch_97
    const-string v0, "sparkle"

    invoke-virtual {v1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-eqz v0, :cond_3a

    const/4 v0, 0x5

    goto :goto_a2

    :goto_a1
    const/4 v0, -0x1

    :goto_a2
    const v1, 0x3f19999a    # 0.6f

    const v15, 0x3d4ccccd    # 0.05f

    const v2, 0x3dcccccd    # 0.1f

    const v6, 0x3e4ccccd    # 0.2f

    const/16 v7, 0x50

    const/16 v5, 0x28

    const v16, 0x3e19999a    # 0.15f

    const/high16 v3, 0x3e800000    # 0.25f

    const v17, 0x3ecccccd    # 0.4f

    const v18, 0x3f0ccccd    # 0.55f

    const v19, 0x3eb33333    # 0.35f

    const/high16 v20, 0x3f000000    # 0.5f

    const/16 v4, 0xff

    const v21, 0x3f333333    # 0.7f

    packed-switch v0, :pswitch_data_2ee

    .line 663
    sget-object v0, Landroid/graphics/Paint$Style;->FILL:Landroid/graphics/Paint$Style;

    invoke-virtual {v11, v0}, Landroid/graphics/Paint;->setStyle(Landroid/graphics/Paint$Style;)V

    .line 664
    mul-float v14, v14, v3

    invoke-virtual {v8, v9, v10, v14, v11}, Landroid/graphics/Canvas;->drawCircle(FFFLandroid/graphics/Paint;)V

    goto/16 :goto_2c2

    .line 648
    :pswitch_d6
    mul-float v0, v14, v21

    sub-float v0, v10, v0

    const v1, 0x3fa66666    # 1.3f

    mul-float v1, v1, v14

    const/high16 v2, 0x3fc00000    # 1.5f

    mul-float v2, v2, v14

    move-object/from16 v6, p0

    invoke-direct {v6, v9, v0, v1, v2}, Lcom/adverify/sdk/PinVerifyDialog;->shieldPath(FFFF)Landroid/graphics/Path;

    move-result-object v0

    .line 649
    sget-object v1, Landroid/graphics/Paint$Style;->FILL:Landroid/graphics/Paint$Style;

    invoke-virtual {v11, v1}, Landroid/graphics/Paint;->setStyle(Landroid/graphics/Paint$Style;)V

    .line 650
    const/16 v1, 0x14

    invoke-virtual {v11, v1}, Landroid/graphics/Paint;->setAlpha(I)V

    .line 651
    invoke-virtual {v8, v0, v11}, Landroid/graphics/Canvas;->drawPath(Landroid/graphics/Path;Landroid/graphics/Paint;)V

    .line 652
    invoke-virtual {v11, v4}, Landroid/graphics/Paint;->setAlpha(I)V

    .line 653
    sget-object v1, Landroid/graphics/Paint$Style;->STROKE:Landroid/graphics/Paint$Style;

    invoke-virtual {v11, v1}, Landroid/graphics/Paint;->setStyle(Landroid/graphics/Paint$Style;)V

    .line 654
    invoke-virtual {v8, v0, v11}, Landroid/graphics/Canvas;->drawPath(Landroid/graphics/Path;Landroid/graphics/Paint;)V

    .line 656
    mul-float v14, v14, v3

    .line 657
    sub-float v7, v9, v14

    mul-float v13, v13, v14

    sub-float v12, v10, v13

    add-float/2addr v9, v14

    mul-float v14, v14, v21

    add-float/2addr v10, v14

    move-object/from16 v0, p1

    move v1, v7

    move v2, v12

    move v3, v9

    move v4, v10

    move-object v5, v11

    invoke-virtual/range {v0 .. v5}, Landroid/graphics/Canvas;->drawLine(FFFFLandroid/graphics/Paint;)V

    .line 658
    move v1, v9

    move v3, v7

    invoke-virtual/range {v0 .. v5}, Landroid/graphics/Canvas;->drawLine(FFFFLandroid/graphics/Paint;)V

    .line 659
    goto/16 :goto_2c2

    .line 621
    :pswitch_11e
    move-object/from16 v6, p0

    sget-object v0, Landroid/graphics/Paint$Style;->FILL_AND_STROKE:Landroid/graphics/Paint$Style;

    invoke-virtual {v11, v0}, Landroid/graphics/Paint;->setStyle(Landroid/graphics/Paint$Style;)V

    .line 622
    invoke-virtual {v11, v5}, Landroid/graphics/Paint;->setAlpha(I)V

    .line 623
    new-instance v0, Landroid/graphics/Path;

    invoke-direct {v0}, Landroid/graphics/Path;-><init>()V

    .line 624
    mul-float v1, v1, v14

    sub-float v5, v9, v1

    mul-float v13, v13, v14

    add-float/2addr v13, v10

    invoke-virtual {v0, v5, v13}, Landroid/graphics/Path;->moveTo(FF)V

    .line 625
    mul-float v21, v21, v14

    sub-float v5, v9, v21

    mul-float v19, v19, v14

    sub-float v12, v10, v19

    invoke-virtual {v0, v5, v12}, Landroid/graphics/Path;->lineTo(FF)V

    .line 626
    mul-float v3, v3, v14

    sub-float v5, v9, v3

    invoke-virtual {v0, v5, v10}, Landroid/graphics/Path;->lineTo(FF)V

    .line 627
    mul-float v18, v18, v14

    sub-float v5, v10, v18

    invoke-virtual {v0, v9, v5}, Landroid/graphics/Path;->lineTo(FF)V

    .line 628
    add-float/2addr v3, v9

    invoke-virtual {v0, v3, v10}, Landroid/graphics/Path;->lineTo(FF)V

    .line 629
    add-float v3, v9, v21

    invoke-virtual {v0, v3, v12}, Landroid/graphics/Path;->lineTo(FF)V

    .line 630
    add-float/2addr v1, v9

    invoke-virtual {v0, v1, v13}, Landroid/graphics/Path;->lineTo(FF)V

    .line 631
    invoke-virtual {v0}, Landroid/graphics/Path;->close()V

    .line 632
    invoke-virtual {v8, v0, v11}, Landroid/graphics/Canvas;->drawPath(Landroid/graphics/Path;Landroid/graphics/Paint;)V

    .line 633
    invoke-virtual {v11, v4}, Landroid/graphics/Paint;->setAlpha(I)V

    .line 634
    sget-object v1, Landroid/graphics/Paint$Style;->STROKE:Landroid/graphics/Paint$Style;

    invoke-virtual {v11, v1}, Landroid/graphics/Paint;->setStyle(Landroid/graphics/Paint$Style;)V

    .line 635
    invoke-virtual {v8, v0, v11}, Landroid/graphics/Canvas;->drawPath(Landroid/graphics/Path;Landroid/graphics/Paint;)V

    .line 637
    sget-object v0, Landroid/graphics/Paint$Style;->FILL:Landroid/graphics/Paint$Style;

    invoke-virtual {v11, v0}, Landroid/graphics/Paint;->setStyle(Landroid/graphics/Paint$Style;)V

    .line 638
    invoke-virtual {v11, v7}, Landroid/graphics/Paint;->setAlpha(I)V

    .line 639
    sub-float v1, v9, v18

    add-float v3, v9, v18

    add-float v5, v10, v18

    mul-float v7, v14, v2

    move-object/from16 v0, p1

    move v2, v13

    const/16 v12, 0xff

    move v4, v5

    move v5, v7

    move v6, v7

    move-object v7, v11

    invoke-virtual/range {v0 .. v7}, Landroid/graphics/Canvas;->drawRoundRect(FFFFFFLandroid/graphics/Paint;)V

    .line 641
    invoke-virtual {v11, v12}, Landroid/graphics/Paint;->setAlpha(I)V

    .line 642
    mul-float v15, v15, v14

    sub-float/2addr v10, v15

    const v0, 0x3da3d70a    # 0.08f

    mul-float v14, v14, v0

    invoke-virtual {v8, v9, v10, v14, v11}, Landroid/graphics/Canvas;->drawCircle(FFFLandroid/graphics/Paint;)V

    .line 643
    goto/16 :goto_2c2

    .line 607
    :pswitch_19a
    mul-float v6, v6, v14

    sub-float v0, v9, v6

    sub-float v3, v10, v6

    mul-float v7, v14, v19

    invoke-virtual {v8, v0, v3, v7, v11}, Landroid/graphics/Canvas;->drawCircle(FFFLandroid/graphics/Paint;)V

    .line 609
    mul-float v2, v2, v14

    add-float/2addr v2, v9

    mul-float v15, v15, v14

    add-float v3, v10, v15

    mul-float v1, v1, v14

    add-float v4, v9, v1

    mul-float v18, v18, v14

    add-float v5, v10, v18

    move-object/from16 v0, p1

    move v1, v2

    move v2, v3

    move v3, v4

    move v4, v5

    move-object v5, v11

    invoke-virtual/range {v0 .. v5}, Landroid/graphics/Canvas;->drawLine(FFFFLandroid/graphics/Paint;)V

    .line 611
    add-float v1, v9, v7

    mul-float v17, v17, v14

    add-float v2, v10, v17

    add-float v3, v9, v18

    add-float v4, v10, v6

    invoke-virtual/range {v0 .. v5}, Landroid/graphics/Canvas;->drawLine(FFFFLandroid/graphics/Paint;)V

    .line 613
    sget-object v0, Landroid/graphics/Paint$Style;->FILL:Landroid/graphics/Paint$Style;

    invoke-virtual {v11, v0}, Landroid/graphics/Paint;->setStyle(Landroid/graphics/Paint$Style;)V

    .line 614
    const/16 v0, 0x96

    invoke-virtual {v11, v0}, Landroid/graphics/Paint;->setAlpha(I)V

    .line 615
    mul-float v14, v14, v20

    add-float v2, v9, v14

    sub-float v3, v10, v18

    move-object/from16 v0, p0

    move-object/from16 v1, p1

    move v4, v6

    invoke-direct/range {v0 .. v5}, Lcom/adverify/sdk/PinVerifyDialog;->drawSparkle(Landroid/graphics/Canvas;FFFLandroid/graphics/Paint;)V

    .line 616
    goto/16 :goto_2c2

    .line 582
    :pswitch_1e5
    mul-float v20, v20, v14

    sub-float v12, v9, v20

    const v0, 0x3f4ccccd    # 0.8f

    mul-float v13, v14, v0

    sub-float v4, v10, v13

    add-float v15, v9, v20

    move-object/from16 v0, p1

    move v1, v12

    move v2, v4

    move v3, v15

    move-object v5, v11

    invoke-virtual/range {v0 .. v5}, Landroid/graphics/Canvas;->drawLine(FFFFLandroid/graphics/Paint;)V

    .line 583
    add-float v4, v10, v13

    move v2, v4

    invoke-virtual/range {v0 .. v5}, Landroid/graphics/Canvas;->drawLine(FFFFLandroid/graphics/Paint;)V

    .line 585
    new-instance v0, Landroid/graphics/Path;

    invoke-direct {v0}, Landroid/graphics/Path;-><init>()V

    .line 586
    mul-float v17, v17, v14

    sub-float v1, v9, v17

    mul-float v21, v21, v14

    sub-float v2, v10, v21

    invoke-virtual {v0, v1, v2}, Landroid/graphics/Path;->moveTo(FF)V

    .line 587
    invoke-virtual {v0, v9, v10}, Landroid/graphics/Path;->lineTo(FF)V

    .line 588
    add-float v3, v10, v21

    invoke-virtual {v0, v1, v3}, Landroid/graphics/Path;->lineTo(FF)V

    .line 589
    add-float v1, v9, v17

    invoke-virtual {v0, v1, v2}, Landroid/graphics/Path;->moveTo(FF)V

    .line 590
    invoke-virtual {v0, v9, v10}, Landroid/graphics/Path;->lineTo(FF)V

    .line 591
    invoke-virtual {v0, v1, v3}, Landroid/graphics/Path;->lineTo(FF)V

    .line 592
    invoke-virtual {v8, v0, v11}, Landroid/graphics/Canvas;->drawPath(Landroid/graphics/Path;Landroid/graphics/Paint;)V

    .line 594
    sget-object v0, Landroid/graphics/Paint$Style;->FILL:Landroid/graphics/Paint$Style;

    invoke-virtual {v11, v0}, Landroid/graphics/Paint;->setStyle(Landroid/graphics/Paint$Style;)V

    .line 595
    invoke-virtual {v11, v7}, Landroid/graphics/Paint;->setAlpha(I)V

    .line 596
    new-instance v0, Landroid/graphics/Path;

    invoke-direct {v0}, Landroid/graphics/Path;-><init>()V

    .line 597
    mul-float v6, v6, v14

    sub-float v1, v9, v6

    add-float v2, v10, v20

    invoke-virtual {v0, v1, v2}, Landroid/graphics/Path;->moveTo(FF)V

    .line 598
    add-float/2addr v6, v9

    invoke-virtual {v0, v6, v2}, Landroid/graphics/Path;->lineTo(FF)V

    .line 599
    mul-float v14, v14, v16

    add-float/2addr v10, v14

    invoke-virtual {v0, v9, v10}, Landroid/graphics/Path;->lineTo(FF)V

    .line 600
    invoke-virtual {v0}, Landroid/graphics/Path;->close()V

    .line 601
    invoke-virtual {v8, v0, v11}, Landroid/graphics/Canvas;->drawPath(Landroid/graphics/Path;Landroid/graphics/Paint;)V

    .line 602
    goto/16 :goto_2c2

    .line 563
    :pswitch_24f
    const/16 v12, 0xff

    mul-float v20, v20, v14

    sub-float v1, v9, v20

    const v0, 0x3f59999a    # 0.85f

    mul-float v0, v0, v14

    sub-float v2, v10, v0

    add-float v3, v9, v20

    add-float v4, v10, v0

    mul-float v6, v14, v16

    move-object/from16 v0, p1

    const/16 v15, 0x28

    move v5, v6

    move-object v7, v11

    invoke-virtual/range {v0 .. v7}, Landroid/graphics/Canvas;->drawRoundRect(FFFFFFLandroid/graphics/Paint;)V

    .line 565
    sget-object v0, Landroid/graphics/Paint$Style;->FILL:Landroid/graphics/Paint$Style;

    invoke-virtual {v11, v0}, Landroid/graphics/Paint;->setStyle(Landroid/graphics/Paint$Style;)V

    .line 566
    invoke-virtual {v11, v15}, Landroid/graphics/Paint;->setAlpha(I)V

    .line 567
    mul-float v19, v19, v14

    sub-float v1, v9, v19

    mul-float v18, v18, v14

    sub-float v2, v10, v18

    add-float v3, v9, v19

    mul-float v17, v17, v14

    add-float v4, v10, v17

    move-object/from16 v0, p1

    move-object v5, v11

    invoke-virtual/range {v0 .. v5}, Landroid/graphics/Canvas;->drawRect(FFFFLandroid/graphics/Paint;)V

    .line 568
    invoke-virtual {v11, v12}, Landroid/graphics/Paint;->setAlpha(I)V

    .line 570
    const v0, 0x3f266666    # 0.65f

    mul-float v0, v0, v14

    add-float/2addr v0, v10

    const v1, 0x3da3d70a    # 0.08f

    mul-float v12, v14, v1

    invoke-virtual {v8, v9, v0, v12, v11}, Landroid/graphics/Canvas;->drawCircle(FFFLandroid/graphics/Paint;)V

    .line 572
    sget-object v0, Landroid/graphics/Paint$Style;->STROKE:Landroid/graphics/Paint$Style;

    invoke-virtual {v11, v0}, Landroid/graphics/Paint;->setStyle(Landroid/graphics/Paint$Style;)V

    .line 573
    const v0, 0x3d75c28f    # 0.06f

    mul-float v0, v0, p2

    invoke-virtual {v11, v0}, Landroid/graphics/Paint;->setStrokeWidth(F)V

    .line 574
    new-instance v0, Landroid/graphics/Path;

    invoke-direct {v0}, Landroid/graphics/Path;-><init>()V

    .line 575
    mul-float v13, v13, v14

    add-float v2, v9, v13

    mul-float v14, v14, v21

    sub-float v3, v10, v14

    add-float v4, v9, v14

    sub-float v5, v10, v13

    const/high16 v6, -0x3d4c0000    # -90.0f

    const/high16 v7, 0x43340000    # 180.0f

    move-object v1, v0

    invoke-virtual/range {v1 .. v7}, Landroid/graphics/Path;->addArc(FFFFFF)V

    .line 576
    invoke-virtual {v8, v0, v11}, Landroid/graphics/Canvas;->drawPath(Landroid/graphics/Path;Landroid/graphics/Paint;)V

    .line 577
    nop

    .line 667
    :goto_2c2
    return-void

    nop

    :sswitch_data_2c4
    .sparse-switch
        -0x77e842ea -> :sswitch_97
        -0x4f94e1aa -> :sswitch_8d
        -0x1f6210ec -> :sswitch_82
        0x19e5f -> :sswitch_78
        0x3164ae -> :sswitch_6f
        0x360652 -> :sswitch_65
        0x5a5dc0e -> :sswitch_5b
        0x5a898b7 -> :sswitch_51
        0x3c0f2018 -> :sswitch_47
        0x4305af9c -> :sswitch_3c
    .end sparse-switch

    :pswitch_data_2ee
    .packed-switch 0x0
        :pswitch_24f
        :pswitch_24f
        :pswitch_1e5
        :pswitch_1e5
        :pswitch_19a
        :pswitch_19a
        :pswitch_11e
        :pswitch_11e
        :pswitch_d6
        :pswitch_d6
    .end packed-switch
.end method

.method private drawShieldLock(Landroid/graphics/Canvas;FF)V
    .registers 20

    .line 404
    move-object/from16 v0, p0

    move-object/from16 v9, p1

    const/high16 v1, 0x40000000    # 2.0f

    div-float v10, p2, v1

    .line 407
    new-instance v2, Landroid/graphics/Paint;

    const/4 v11, 0x1

    invoke-direct {v2, v11}, Landroid/graphics/Paint;-><init>(I)V

    .line 408
    const-string v3, "#e8e8e8"

    invoke-static {v3}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v3

    invoke-virtual {v2, v3}, Landroid/graphics/Paint;->setColor(I)V

    .line 409
    const v3, 0x3e19999a    # 0.15f

    mul-float v3, v3, p3

    const v4, 0x3f333333    # 0.7f

    mul-float v4, v4, p2

    const v5, 0x3f51eb85    # 0.82f

    mul-float v5, v5, p3

    invoke-direct {v0, v10, v3, v4, v5}, Lcom/adverify/sdk/PinVerifyDialog;->shieldPath(FFFF)Landroid/graphics/Path;

    move-result-object v6

    .line 410
    const/4 v7, 0x2

    invoke-direct {v0, v7}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v8

    int-to-float v8, v8

    const/4 v12, 0x0

    invoke-virtual {v9, v12, v8}, Landroid/graphics/Canvas;->translate(FF)V

    .line 411
    invoke-virtual {v9, v6, v2}, Landroid/graphics/Canvas;->drawPath(Landroid/graphics/Path;Landroid/graphics/Paint;)V

    .line 412
    invoke-direct {v0, v7}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v2

    neg-int v2, v2

    int-to-float v2, v2

    invoke-virtual {v9, v12, v2}, Landroid/graphics/Canvas;->translate(FF)V

    .line 415
    new-instance v2, Landroid/graphics/Paint;

    invoke-direct {v2, v11}, Landroid/graphics/Paint;-><init>(I)V

    .line 416
    const-string v12, "#1a1a1a"

    invoke-static {v12}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v6

    invoke-virtual {v2, v6}, Landroid/graphics/Paint;->setColor(I)V

    .line 417
    const v6, 0x3da3d70a    # 0.08f

    mul-float v6, v6, p3

    invoke-direct {v0, v10, v6, v4, v5}, Lcom/adverify/sdk/PinVerifyDialog;->shieldPath(FFFF)Landroid/graphics/Path;

    move-result-object v4

    .line 418
    invoke-virtual {v9, v4, v2}, Landroid/graphics/Canvas;->drawPath(Landroid/graphics/Path;Landroid/graphics/Paint;)V

    .line 421
    new-instance v2, Landroid/graphics/Paint;

    invoke-direct {v2, v11}, Landroid/graphics/Paint;-><init>(I)V

    .line 422
    const-string v4, "#222222"

    invoke-static {v4}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v4

    invoke-virtual {v2, v4}, Landroid/graphics/Paint;->setColor(I)V

    .line 423
    const v4, 0x3f147ae1    # 0.58f

    mul-float v4, v4, p2

    const v5, 0x3f2e147b    # 0.68f

    mul-float v5, v5, p3

    invoke-direct {v0, v10, v3, v4, v5}, Lcom/adverify/sdk/PinVerifyDialog;->shieldPath(FFFF)Landroid/graphics/Path;

    move-result-object v3

    .line 424
    invoke-virtual {v9, v3, v2}, Landroid/graphics/Canvas;->drawPath(Landroid/graphics/Path;Landroid/graphics/Paint;)V

    .line 427
    new-instance v13, Landroid/graphics/Paint;

    invoke-direct {v13, v11}, Landroid/graphics/Paint;-><init>(I)V

    .line 428
    const/4 v2, -0x1

    invoke-virtual {v13, v2}, Landroid/graphics/Paint;->setColor(I)V

    .line 429
    const v2, 0x3e6147ae    # 0.22f

    mul-float v14, p2, v2

    .line 430
    const v2, 0x3e3851ec    # 0.18f

    mul-float v15, p2, v2

    .line 431
    div-float v1, v14, v1

    sub-float v2, v10, v1

    .line 432
    const v1, 0x3eeb851f    # 0.46f

    mul-float v8, p3, v1

    .line 433
    add-float v4, v2, v14

    add-float v5, v8, v15

    invoke-direct {v0, v7}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v1

    int-to-float v6, v1

    invoke-direct {v0, v7}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v1

    int-to-float v7, v1

    move-object/from16 v1, p1

    move v3, v8

    move v11, v8

    move-object v8, v13

    invoke-virtual/range {v1 .. v8}, Landroid/graphics/Canvas;->drawRoundRect(FFFFFFLandroid/graphics/Paint;)V

    .line 436
    sget-object v1, Landroid/graphics/Paint$Style;->STROKE:Landroid/graphics/Paint$Style;

    invoke-virtual {v13, v1}, Landroid/graphics/Paint;->setStyle(Landroid/graphics/Paint$Style;)V

    .line 437
    const v1, 0x3d23d70a    # 0.04f

    mul-float v1, v1, p2

    invoke-virtual {v13, v1}, Landroid/graphics/Paint;->setStrokeWidth(F)V

    .line 438
    sget-object v1, Landroid/graphics/Paint$Cap;->ROUND:Landroid/graphics/Paint$Cap;

    invoke-virtual {v13, v1}, Landroid/graphics/Paint;->setStrokeCap(Landroid/graphics/Paint$Cap;)V

    .line 439
    const v1, 0x3e99999a    # 0.3f

    mul-float v14, v14, v1

    .line 440
    new-instance v2, Landroid/graphics/RectF;

    sub-float v7, v10, v14

    const v1, 0x3fe66666    # 1.8f

    mul-float v1, v1, v14

    sub-float v8, v11, v1

    add-float v6, v10, v14

    invoke-direct {v2, v7, v8, v6, v11}, Landroid/graphics/RectF;-><init>(FFFF)V

    .line 441
    const/high16 v3, 0x43340000    # 180.0f

    const/high16 v4, 0x43340000    # 180.0f

    const/4 v5, 0x0

    move-object/from16 v1, p1

    move v8, v6

    move-object v6, v13

    invoke-virtual/range {v1 .. v6}, Landroid/graphics/Canvas;->drawArc(Landroid/graphics/RectF;FFZLandroid/graphics/Paint;)V

    .line 442
    const v1, 0x3f666666    # 0.9f

    mul-float v14, v14, v1

    sub-float v14, v11, v14

    move-object/from16 v1, p1

    move v2, v7

    move v3, v14

    move v4, v7

    move v5, v11

    invoke-virtual/range {v1 .. v6}, Landroid/graphics/Canvas;->drawLine(FFFFLandroid/graphics/Paint;)V

    .line 443
    move v2, v8

    move v4, v8

    invoke-virtual/range {v1 .. v6}, Landroid/graphics/Canvas;->drawLine(FFFFLandroid/graphics/Paint;)V

    .line 446
    new-instance v6, Landroid/graphics/Paint;

    const/4 v1, 0x1

    invoke-direct {v6, v1}, Landroid/graphics/Paint;-><init>(I)V

    .line 447
    invoke-static {v12}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v1

    invoke-virtual {v6, v1}, Landroid/graphics/Paint;->setColor(I)V

    .line 448
    const v1, 0x3ecccccd    # 0.4f

    mul-float v1, v1, v15

    add-float v3, v11, v1

    .line 449
    const v1, 0x3ccccccd    # 0.025f

    mul-float v1, v1, p2

    invoke-virtual {v9, v10, v3, v1, v6}, Landroid/graphics/Canvas;->drawCircle(FFFLandroid/graphics/Paint;)V

    .line 450
    const v1, 0x3c449ba6    # 0.012f

    mul-float v1, v1, p2

    sub-float v2, v10, v1

    add-float v4, v10, v1

    const v1, 0x3eb33333    # 0.35f

    mul-float v15, v15, v1

    add-float v5, v3, v15

    move-object/from16 v1, p1

    invoke-virtual/range {v1 .. v6}, Landroid/graphics/Canvas;->drawRect(FFFFLandroid/graphics/Paint;)V

    .line 451
    return-void
.end method

.method private drawSparkle(Landroid/graphics/Canvas;FFFLandroid/graphics/Paint;)V
    .registers 11

    .line 670
    new-instance v0, Landroid/graphics/Path;

    invoke-direct {v0}, Landroid/graphics/Path;-><init>()V

    .line 671
    sub-float v1, p3, p4

    invoke-virtual {v0, p2, v1}, Landroid/graphics/Path;->moveTo(FF)V

    .line 672
    const v1, 0x3e99999a    # 0.3f

    mul-float v1, v1, p4

    add-float v2, p2, v1

    sub-float v3, p3, v1

    invoke-virtual {v0, v2, v3}, Landroid/graphics/Path;->lineTo(FF)V

    .line 673
    add-float v4, p2, p4

    invoke-virtual {v0, v4, p3}, Landroid/graphics/Path;->lineTo(FF)V

    .line 674
    add-float v4, p3, v1

    invoke-virtual {v0, v2, v4}, Landroid/graphics/Path;->lineTo(FF)V

    .line 675
    add-float v2, p3, p4

    invoke-virtual {v0, p2, v2}, Landroid/graphics/Path;->lineTo(FF)V

    .line 676
    sub-float v1, p2, v1

    invoke-virtual {v0, v1, v4}, Landroid/graphics/Path;->lineTo(FF)V

    .line 677
    sub-float/2addr p2, p4

    invoke-virtual {v0, p2, p3}, Landroid/graphics/Path;->lineTo(FF)V

    .line 678
    invoke-virtual {v0, v1, v3}, Landroid/graphics/Path;->lineTo(FF)V

    .line 679
    invoke-virtual {v0}, Landroid/graphics/Path;->close()V

    .line 680
    invoke-virtual {p1, v0, p5}, Landroid/graphics/Canvas;->drawPath(Landroid/graphics/Path;Landroid/graphics/Paint;)V

    .line 681
    return-void
.end method

.method private getDotBgColor(Lcom/adverify/sdk/internal/models/PinInfoItem;)I
    .registers 3

    .line 721
    iget-object v0, p1, Lcom/adverify/sdk/internal/models/PinInfoItem;->icon:Ljava/lang/String;

    if-eqz v0, :cond_b

    iget-object p1, p1, Lcom/adverify/sdk/internal/models/PinInfoItem;->icon:Ljava/lang/String;

    invoke-virtual {p1}, Ljava/lang/String;->toLowerCase()Ljava/lang/String;

    move-result-object p1

    goto :goto_d

    :cond_b
    const-string p1, ""

    .line 722
    :goto_d
    const-string v0, "device"

    invoke-virtual {p1, v0}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v0

    if-nez v0, :cond_85

    const-string v0, "info"

    invoke-virtual {p1, v0}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v0

    if-eqz v0, :cond_1e

    goto :goto_85

    .line 723
    :cond_1e
    const-string v0, "clock"

    invoke-virtual {p1, v0}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v0

    if-nez v0, :cond_7e

    const-string v0, "hour"

    invoke-virtual {p1, v0}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v0

    if-eqz v0, :cond_2f

    goto :goto_7e

    .line 724
    :cond_2f
    const-string v0, "key"

    invoke-virtual {p1, v0}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v0

    if-nez v0, :cond_77

    const-string v0, "sparkle"

    invoke-virtual {p1, v0}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v0

    if-eqz v0, :cond_40

    goto :goto_77

    .line 725
    :cond_40
    const-string v0, "star"

    invoke-virtual {p1, v0}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v0

    if-nez v0, :cond_70

    const-string v0, "crown"

    invoke-virtual {p1, v0}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v0

    if-eqz v0, :cond_51

    goto :goto_70

    .line 726
    :cond_51
    const-string v0, "warn"

    invoke-virtual {p1, v0}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v0

    if-nez v0, :cond_69

    const-string v0, "shield"

    invoke-virtual {p1, v0}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result p1

    if-eqz p1, :cond_62

    goto :goto_69

    .line 727
    :cond_62
    const-string p1, "#f5f5f5"

    invoke-static {p1}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result p1

    return p1

    .line 726
    :cond_69
    :goto_69
    const-string p1, "#fef2f2"

    invoke-static {p1}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result p1

    return p1

    .line 725
    :cond_70
    :goto_70
    const-string p1, "#fefce8"

    invoke-static {p1}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result p1

    return p1

    .line 724
    :cond_77
    :goto_77
    const-string p1, "#f3f0ff"

    invoke-static {p1}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result p1

    return p1

    .line 723
    :cond_7e
    :goto_7e
    const-string p1, "#eefbf4"

    invoke-static {p1}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result p1

    return p1

    .line 722
    :cond_85
    :goto_85
    const-string p1, "#eef6ff"

    invoke-static {p1}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result p1

    return p1
.end method

.method private getDotIconColor(Lcom/adverify/sdk/internal/models/PinInfoItem;)I
    .registers 3

    .line 731
    iget-object v0, p1, Lcom/adverify/sdk/internal/models/PinInfoItem;->icon:Ljava/lang/String;

    if-eqz v0, :cond_b

    iget-object p1, p1, Lcom/adverify/sdk/internal/models/PinInfoItem;->icon:Ljava/lang/String;

    invoke-virtual {p1}, Ljava/lang/String;->toLowerCase()Ljava/lang/String;

    move-result-object p1

    goto :goto_d

    :cond_b
    const-string p1, ""

    .line 732
    :goto_d
    const-string v0, "device"

    invoke-virtual {p1, v0}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v0

    if-nez v0, :cond_85

    const-string v0, "info"

    invoke-virtual {p1, v0}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v0

    if-eqz v0, :cond_1e

    goto :goto_85

    .line 733
    :cond_1e
    const-string v0, "clock"

    invoke-virtual {p1, v0}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v0

    if-nez v0, :cond_7e

    const-string v0, "hour"

    invoke-virtual {p1, v0}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v0

    if-eqz v0, :cond_2f

    goto :goto_7e

    .line 734
    :cond_2f
    const-string v0, "key"

    invoke-virtual {p1, v0}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v0

    if-nez v0, :cond_77

    const-string v0, "sparkle"

    invoke-virtual {p1, v0}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v0

    if-eqz v0, :cond_40

    goto :goto_77

    .line 735
    :cond_40
    const-string v0, "star"

    invoke-virtual {p1, v0}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v0

    if-nez v0, :cond_70

    const-string v0, "crown"

    invoke-virtual {p1, v0}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v0

    if-eqz v0, :cond_51

    goto :goto_70

    .line 736
    :cond_51
    const-string v0, "warn"

    invoke-virtual {p1, v0}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result v0

    if-nez v0, :cond_69

    const-string v0, "shield"

    invoke-virtual {p1, v0}, Ljava/lang/String;->contains(Ljava/lang/CharSequence;)Z

    move-result p1

    if-eqz p1, :cond_62

    goto :goto_69

    .line 737
    :cond_62
    const-string p1, "#999999"

    invoke-static {p1}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result p1

    return p1

    .line 736
    :cond_69
    :goto_69
    const-string p1, "#ef4444"

    invoke-static {p1}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result p1

    return p1

    .line 735
    :cond_70
    :goto_70
    const-string p1, "#eab308"

    invoke-static {p1}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result p1

    return p1

    .line 734
    :cond_77
    :goto_77
    const-string p1, "#8b5cf6"

    invoke-static {p1}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result p1

    return p1

    .line 733
    :cond_7e
    :goto_7e
    const-string p1, "#22c55e"

    invoke-static {p1}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result p1

    return p1

    .line 732
    :cond_85
    :goto_85
    const-string p1, "#3b82f6"

    invoke-static {p1}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result p1

    return p1
.end method

.method private safeParseColor(Ljava/lang/String;Ljava/lang/String;)I
    .registers 3

    .line 741
    :try_start_0
    invoke-static {p1}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result p1
    :try_end_4
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_4} :catch_5

    return p1

    .line 742
    :catch_5
    move-exception p1

    invoke-static {p2}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result p1

    return p1
.end method

.method private shieldPath(FFFF)Landroid/graphics/Path;
    .registers 9

    .line 454
    new-instance v0, Landroid/graphics/Path;

    invoke-direct {v0}, Landroid/graphics/Path;-><init>()V

    .line 455
    invoke-virtual {v0, p1, p2}, Landroid/graphics/Path;->moveTo(FF)V

    .line 456
    const/high16 v1, 0x40000000    # 2.0f

    div-float/2addr p3, v1

    add-float v1, p1, p3

    const v2, 0x3e19999a    # 0.15f

    mul-float v2, v2, p4

    add-float/2addr v2, p2

    invoke-virtual {v0, v1, v2}, Landroid/graphics/Path;->lineTo(FF)V

    .line 457
    const v3, 0x3f266666    # 0.65f

    mul-float v3, v3, p4

    add-float/2addr v3, p2

    add-float/2addr p2, p4

    invoke-virtual {v0, v1, v3, p1, p2}, Landroid/graphics/Path;->quadTo(FFFF)V

    .line 458
    sub-float/2addr p1, p3

    invoke-virtual {v0, p1, v3, p1, v2}, Landroid/graphics/Path;->quadTo(FFFF)V

    .line 459
    invoke-virtual {v0}, Landroid/graphics/Path;->close()V

    .line 460
    return-object v0
.end method

.method private switchToInfoState()V
    .registers 4

    .line 686
    iget-object v0, p0, Lcom/adverify/sdk/PinVerifyDialog;->infoState:Landroid/widget/LinearLayout;

    if-eqz v0, :cond_2c

    iget-object v0, p0, Lcom/adverify/sdk/PinVerifyDialog;->pinState:Landroid/widget/LinearLayout;

    if-eqz v0, :cond_2c

    .line 687
    const/16 v1, 0x8

    invoke-virtual {v0, v1}, Landroid/widget/LinearLayout;->setVisibility(I)V

    .line 688
    iget-object v0, p0, Lcom/adverify/sdk/PinVerifyDialog;->infoState:Landroid/widget/LinearLayout;

    const/4 v2, 0x0

    invoke-virtual {v0, v2}, Landroid/widget/LinearLayout;->setVisibility(I)V

    .line 689
    iget-object v0, p0, Lcom/adverify/sdk/PinVerifyDialog;->errorText:Landroid/widget/TextView;

    if-eqz v0, :cond_1a

    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setVisibility(I)V

    .line 690
    :cond_1a
    new-instance v0, Landroid/view/animation/AlphaAnimation;

    const/4 v1, 0x0

    const/high16 v2, 0x3f800000    # 1.0f

    invoke-direct {v0, v1, v2}, Landroid/view/animation/AlphaAnimation;-><init>(FF)V

    .line 691
    const-wide/16 v1, 0x96

    invoke-virtual {v0, v1, v2}, Landroid/view/animation/AlphaAnimation;->setDuration(J)V

    .line 692
    iget-object v1, p0, Lcom/adverify/sdk/PinVerifyDialog;->infoState:Landroid/widget/LinearLayout;

    invoke-virtual {v1, v0}, Landroid/widget/LinearLayout;->startAnimation(Landroid/view/animation/Animation;)V

    .line 694
    :cond_2c
    return-void
.end method

.method private updateAttemptsText()V
    .registers 5

    .line 697
    iget-object v0, p0, Lcom/adverify/sdk/PinVerifyDialog;->attemptsText:Landroid/widget/TextView;

    if-nez v0, :cond_5

    return-void

    .line 698
    :cond_5
    iget v1, p0, Lcom/adverify/sdk/PinVerifyDialog;->maxAttempts:I

    iget v2, p0, Lcom/adverify/sdk/PinVerifyDialog;->attempts:I

    sub-int/2addr v1, v2

    .line 699
    if-lez v1, :cond_3c

    if-lez v2, :cond_3c

    .line 700
    const/4 v2, 0x1

    if-eq v1, v2, :cond_14

    const-string v2, "s"

    goto :goto_16

    :cond_14
    const-string v2, ""

    :goto_16
    new-instance v3, Ljava/lang/StringBuilder;

    invoke-direct {v3}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v3, v1}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    move-result-object v1

    const-string v3, " attempt"

    invoke-virtual {v1, v3}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v1

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v1

    const-string v2, " remaining"

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v1

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v1

    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setText(Ljava/lang/CharSequence;)V

    .line 701
    iget-object v0, p0, Lcom/adverify/sdk/PinVerifyDialog;->attemptsText:Landroid/widget/TextView;

    const/4 v1, 0x0

    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setVisibility(I)V

    .line 703
    :cond_3c
    return-void
.end method


# virtual methods
.method dismiss()V
    .registers 2

    .line 371
    iget-object v0, p0, Lcom/adverify/sdk/PinVerifyDialog;->dialog:Landroid/app/Dialog;

    if-eqz v0, :cond_f

    invoke-virtual {v0}, Landroid/app/Dialog;->isShowing()Z

    move-result v0

    if-eqz v0, :cond_f

    iget-object v0, p0, Lcom/adverify/sdk/PinVerifyDialog;->dialog:Landroid/app/Dialog;

    invoke-virtual {v0}, Landroid/app/Dialog;->dismiss()V

    .line 372
    :cond_f
    return-void
.end method

.method synthetic lambda$show$0$com-adverify-sdk-PinVerifyDialog(Landroid/view/View;)V
    .registers 2

    .line 176
    iget-object p1, p0, Lcom/adverify/sdk/PinVerifyDialog;->listener:Lcom/adverify/sdk/PinVerifyDialog$PinListener;

    if-eqz p1, :cond_7

    invoke-interface {p1, p0}, Lcom/adverify/sdk/PinVerifyDialog$PinListener;->onGetPinClicked(Lcom/adverify/sdk/PinVerifyDialog;)V

    .line 177
    :cond_7
    return-void
.end method

.method synthetic lambda$show$1$com-adverify-sdk-PinVerifyDialog(Landroid/view/View;)V
    .registers 2

    .line 189
    iget-object p1, p0, Lcom/adverify/sdk/PinVerifyDialog;->listener:Lcom/adverify/sdk/PinVerifyDialog$PinListener;

    if-eqz p1, :cond_7

    invoke-interface {p1}, Lcom/adverify/sdk/PinVerifyDialog$PinListener;->onTutorialClicked()V

    :cond_7
    return-void
.end method

.method synthetic lambda$show$2$com-adverify-sdk-PinVerifyDialog(Landroid/view/View;)V
    .registers 2

    .line 196
    iget-object p1, p0, Lcom/adverify/sdk/PinVerifyDialog;->listener:Lcom/adverify/sdk/PinVerifyDialog$PinListener;

    if-eqz p1, :cond_7

    invoke-interface {p1}, Lcom/adverify/sdk/PinVerifyDialog$PinListener;->onJoinClicked()V

    :cond_7
    return-void
.end method

.method synthetic lambda$show$3$com-adverify-sdk-PinVerifyDialog(Landroid/view/View;)V
    .registers 2

    .line 223
    iget-object p1, p0, Lcom/adverify/sdk/PinVerifyDialog;->listener:Lcom/adverify/sdk/PinVerifyDialog$PinListener;

    if-eqz p1, :cond_7

    invoke-interface {p1}, Lcom/adverify/sdk/PinVerifyDialog$PinListener;->onExitClicked()V

    :cond_7
    return-void
.end method

.method synthetic lambda$show$4$com-adverify-sdk-PinVerifyDialog(Landroid/view/View;)V
    .registers 4

    .line 303
    iget-object p1, p0, Lcom/adverify/sdk/PinVerifyDialog;->pinInput:Landroid/widget/EditText;

    invoke-virtual {p1}, Landroid/widget/EditText;->getText()Landroid/text/Editable;

    move-result-object p1

    invoke-virtual {p1}, Ljava/lang/Object;->toString()Ljava/lang/String;

    move-result-object p1

    invoke-virtual {p1}, Ljava/lang/String;->trim()Ljava/lang/String;

    move-result-object p1

    .line 304
    invoke-virtual {p1}, Ljava/lang/String;->isEmpty()Z

    move-result v0

    if-eqz v0, :cond_1a

    const-string p1, "Please enter a PIN"

    invoke-virtual {p0, p1}, Lcom/adverify/sdk/PinVerifyDialog;->showError(Ljava/lang/String;)V

    return-void

    .line 305
    :cond_1a
    iget v0, p0, Lcom/adverify/sdk/PinVerifyDialog;->attempts:I

    add-int/lit8 v0, v0, 0x1

    iput v0, p0, Lcom/adverify/sdk/PinVerifyDialog;->attempts:I

    .line 306
    iget v1, p0, Lcom/adverify/sdk/PinVerifyDialog;->maxAttempts:I

    if-lt v0, v1, :cond_31

    .line 307
    iget-object p1, p0, Lcom/adverify/sdk/PinVerifyDialog;->dialog:Landroid/app/Dialog;

    invoke-virtual {p1}, Landroid/app/Dialog;->dismiss()V

    .line 308
    iget-object p1, p0, Lcom/adverify/sdk/PinVerifyDialog;->listener:Lcom/adverify/sdk/PinVerifyDialog$PinListener;

    if-eqz p1, :cond_30

    invoke-interface {p1}, Lcom/adverify/sdk/PinVerifyDialog$PinListener;->onMaxAttemptsReached()V

    .line 309
    :cond_30
    return-void

    .line 311
    :cond_31
    iget-object v0, p0, Lcom/adverify/sdk/PinVerifyDialog;->listener:Lcom/adverify/sdk/PinVerifyDialog$PinListener;

    if-eqz v0, :cond_38

    invoke-interface {v0, p1, p0}, Lcom/adverify/sdk/PinVerifyDialog$PinListener;->onPinSubmit(Ljava/lang/String;Lcom/adverify/sdk/PinVerifyDialog;)V

    .line 312
    :cond_38
    return-void
.end method

.method synthetic lambda$show$5$com-adverify-sdk-PinVerifyDialog(Landroid/view/View;)V
    .registers 2

    .line 332
    invoke-direct {p0}, Lcom/adverify/sdk/PinVerifyDialog;->switchToInfoState()V

    return-void
.end method

.method openUrl(Ljava/lang/String;)V
    .registers 5

    .line 375
    :try_start_0
    iget-object v0, p0, Lcom/adverify/sdk/PinVerifyDialog;->activity:Landroid/app/Activity;

    new-instance v1, Landroid/content/Intent;

    const-string v2, "android.intent.action.VIEW"

    invoke-static {p1}, Landroid/net/Uri;->parse(Ljava/lang/String;)Landroid/net/Uri;

    move-result-object p1

    invoke-direct {v1, v2, p1}, Landroid/content/Intent;-><init>(Ljava/lang/String;Landroid/net/Uri;)V

    invoke-virtual {v0, v1}, Landroid/app/Activity;->startActivity(Landroid/content/Intent;)V
    :try_end_10
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_10} :catch_11

    goto :goto_12

    .line 376
    :catch_11
    move-exception p1

    :goto_12
    nop

    .line 377
    return-void
.end method

.method setGetPinLoading(Z)V
    .registers 4

    .line 386
    iget-object v0, p0, Lcom/adverify/sdk/PinVerifyDialog;->generateBtn:Landroid/widget/Button;

    if-nez v0, :cond_5

    return-void

    .line 387
    :cond_5
    xor-int/lit8 v1, p1, 0x1

    invoke-virtual {v0, v1}, Landroid/widget/Button;->setEnabled(Z)V

    .line 388
    iget-object v0, p0, Lcom/adverify/sdk/PinVerifyDialog;->generateBtn:Landroid/widget/Button;

    if-eqz p1, :cond_11

    const-string v1, "Generating..."

    goto :goto_20

    .line 389
    :cond_11
    iget-object v1, p0, Lcom/adverify/sdk/PinVerifyDialog;->getPinBtnText:Ljava/lang/String;

    if-eqz v1, :cond_1e

    invoke-virtual {v1}, Ljava/lang/String;->isEmpty()Z

    move-result v1

    if-nez v1, :cond_1e

    iget-object v1, p0, Lcom/adverify/sdk/PinVerifyDialog;->getPinBtnText:Ljava/lang/String;

    goto :goto_20

    :cond_1e
    const-string v1, "Generate PIN & Verify"

    .line 388
    :goto_20
    invoke-virtual {v0, v1}, Landroid/widget/Button;->setText(Ljava/lang/CharSequence;)V

    .line 390
    iget-object v0, p0, Lcom/adverify/sdk/PinVerifyDialog;->generateBtn:Landroid/widget/Button;

    if-eqz p1, :cond_2b

    const p1, 0x3ee66666    # 0.45f

    goto :goto_2d

    :cond_2b
    const/high16 p1, 0x3f800000    # 1.0f

    :goto_2d
    invoke-virtual {v0, p1}, Landroid/widget/Button;->setAlpha(F)V

    .line 391
    return-void
.end method

.method setVerifyLoading(Z)V
    .registers 4

    .line 394
    iget-object v0, p0, Lcom/adverify/sdk/PinVerifyDialog;->verifyBtn:Landroid/widget/Button;

    if-nez v0, :cond_5

    return-void

    .line 395
    :cond_5
    xor-int/lit8 v1, p1, 0x1

    invoke-virtual {v0, v1}, Landroid/widget/Button;->setEnabled(Z)V

    .line 396
    iget-object v0, p0, Lcom/adverify/sdk/PinVerifyDialog;->verifyBtn:Landroid/widget/Button;

    if-eqz p1, :cond_11

    const-string v1, "Verifying..."

    goto :goto_13

    :cond_11
    const-string v1, "Verify"

    :goto_13
    invoke-virtual {v0, v1}, Landroid/widget/Button;->setText(Ljava/lang/CharSequence;)V

    .line 397
    iget-object v0, p0, Lcom/adverify/sdk/PinVerifyDialog;->verifyBtn:Landroid/widget/Button;

    if-eqz p1, :cond_1e

    const p1, 0x3ee66666    # 0.45f

    goto :goto_20

    :cond_1e
    const/high16 p1, 0x3f800000    # 1.0f

    :goto_20
    invoke-virtual {v0, p1}, Landroid/widget/Button;->setAlpha(F)V

    .line 398
    return-void
.end method

.method show()V
    .registers 18

    .line 91
    move-object/from16 v0, p0

    new-instance v1, Landroid/app/Dialog;

    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->activity:Landroid/app/Activity;

    invoke-direct {v1, v2}, Landroid/app/Dialog;-><init>(Landroid/content/Context;)V

    iput-object v1, v0, Lcom/adverify/sdk/PinVerifyDialog;->dialog:Landroid/app/Dialog;

    .line 92
    const/4 v2, 0x1

    invoke-virtual {v1, v2}, Landroid/app/Dialog;->requestWindowFeature(I)Z

    .line 93
    iget-object v1, v0, Lcom/adverify/sdk/PinVerifyDialog;->dialog:Landroid/app/Dialog;

    const/4 v3, 0x0

    invoke-virtual {v1, v3}, Landroid/app/Dialog;->setCancelable(Z)V

    .line 95
    new-instance v1, Landroid/widget/ScrollView;

    iget-object v4, v0, Lcom/adverify/sdk/PinVerifyDialog;->activity:Landroid/app/Activity;

    invoke-direct {v1, v4}, Landroid/widget/ScrollView;-><init>(Landroid/content/Context;)V

    .line 96
    invoke-virtual {v1, v2}, Landroid/widget/ScrollView;->setFillViewport(Z)V

    .line 98
    new-instance v4, Landroid/widget/LinearLayout;

    iget-object v5, v0, Lcom/adverify/sdk/PinVerifyDialog;->activity:Landroid/app/Activity;

    invoke-direct {v4, v5}, Landroid/widget/LinearLayout;-><init>(Landroid/content/Context;)V

    .line 99
    invoke-virtual {v4, v2}, Landroid/widget/LinearLayout;->setOrientation(I)V

    .line 100
    const/16 v5, 0x18

    invoke-direct {v0, v5}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v6

    const/16 v7, 0x20

    invoke-direct {v0, v7}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v7

    invoke-direct {v0, v5}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v8

    invoke-direct {v0, v5}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v9

    invoke-virtual {v4, v6, v7, v8, v9}, Landroid/widget/LinearLayout;->setPadding(IIII)V

    .line 101
    invoke-virtual {v4, v2}, Landroid/widget/LinearLayout;->setGravity(I)V

    .line 103
    new-instance v6, Landroid/graphics/drawable/GradientDrawable;

    invoke-direct {v6}, Landroid/graphics/drawable/GradientDrawable;-><init>()V

    .line 104
    const-string v7, "#fafafa"

    invoke-static {v7}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v7

    invoke-virtual {v6, v7}, Landroid/graphics/drawable/GradientDrawable;->setColor(I)V

    .line 105
    const/16 v7, 0x14

    invoke-direct {v0, v7}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v7

    int-to-float v7, v7

    invoke-virtual {v6, v7}, Landroid/graphics/drawable/GradientDrawable;->setCornerRadius(F)V

    .line 106
    invoke-virtual {v4, v6}, Landroid/widget/LinearLayout;->setBackground(Landroid/graphics/drawable/Drawable;)V

    .line 109
    new-instance v6, Lcom/adverify/sdk/PinVerifyDialog$1;

    iget-object v7, v0, Lcom/adverify/sdk/PinVerifyDialog;->activity:Landroid/app/Activity;

    invoke-direct {v6, v0, v7}, Lcom/adverify/sdk/PinVerifyDialog$1;-><init>(Lcom/adverify/sdk/PinVerifyDialog;Landroid/content/Context;)V

    .line 116
    new-instance v7, Landroid/widget/LinearLayout$LayoutParams;

    const/16 v8, 0x38

    invoke-direct {v0, v8}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v9

    invoke-direct {v0, v8}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v8

    invoke-direct {v7, v9, v8}, Landroid/widget/LinearLayout$LayoutParams;-><init>(II)V

    .line 117
    iput v2, v7, Landroid/widget/LinearLayout$LayoutParams;->gravity:I

    .line 118
    const/16 v8, 0x12

    invoke-direct {v0, v8}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v9

    iput v9, v7, Landroid/widget/LinearLayout$LayoutParams;->bottomMargin:I

    .line 119
    invoke-virtual {v6, v7}, Landroid/view/View;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 120
    invoke-virtual {v4, v6}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 123
    new-instance v6, Landroid/widget/TextView;

    iget-object v7, v0, Lcom/adverify/sdk/PinVerifyDialog;->activity:Landroid/app/Activity;

    invoke-direct {v6, v7}, Landroid/widget/TextView;-><init>(Landroid/content/Context;)V

    .line 124
    iget-object v7, v0, Lcom/adverify/sdk/PinVerifyDialog;->title:Ljava/lang/String;

    if-eqz v7, :cond_98

    invoke-virtual {v7}, Ljava/lang/String;->isEmpty()Z

    move-result v7

    if-nez v7, :cond_98

    iget-object v7, v0, Lcom/adverify/sdk/PinVerifyDialog;->title:Ljava/lang/String;

    goto :goto_9a

    :cond_98
    const-string v7, "Device Verification"

    :goto_9a
    invoke-virtual {v6, v7}, Landroid/widget/TextView;->setText(Ljava/lang/CharSequence;)V

    .line 125
    const/high16 v7, 0x41880000    # 17.0f

    const/4 v9, 0x2

    invoke-virtual {v6, v9, v7}, Landroid/widget/TextView;->setTextSize(IF)V

    .line 126
    const-string v7, "#111111"

    invoke-static {v7}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v10

    invoke-virtual {v6, v10}, Landroid/widget/TextView;->setTextColor(I)V

    .line 127
    sget-object v10, Landroid/graphics/Typeface;->DEFAULT_BOLD:Landroid/graphics/Typeface;

    invoke-virtual {v6, v10}, Landroid/widget/TextView;->setTypeface(Landroid/graphics/Typeface;)V

    .line 128
    const/16 v10, 0x11

    invoke-virtual {v6, v10}, Landroid/widget/TextView;->setGravity(I)V

    .line 129
    invoke-virtual {v4, v6}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 132
    new-instance v6, Landroid/widget/TextView;

    iget-object v11, v0, Lcom/adverify/sdk/PinVerifyDialog;->activity:Landroid/app/Activity;

    invoke-direct {v6, v11}, Landroid/widget/TextView;-><init>(Landroid/content/Context;)V

    .line 133
    iget-object v11, v0, Lcom/adverify/sdk/PinVerifyDialog;->message:Ljava/lang/String;

    if-eqz v11, :cond_cd

    invoke-virtual {v11}, Ljava/lang/String;->isEmpty()Z

    move-result v11

    if-nez v11, :cond_cd

    iget-object v11, v0, Lcom/adverify/sdk/PinVerifyDialog;->message:Ljava/lang/String;

    goto :goto_cf

    :cond_cd
    const-string v11, "Verify your device to continue"

    :goto_cf
    invoke-virtual {v6, v11}, Landroid/widget/TextView;->setText(Ljava/lang/CharSequence;)V

    .line 134
    const/high16 v11, 0x41500000    # 13.0f

    invoke-virtual {v6, v9, v11}, Landroid/widget/TextView;->setTextSize(IF)V

    .line 135
    const-string v12, "#888888"

    invoke-static {v12}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v13

    invoke-virtual {v6, v13}, Landroid/widget/TextView;->setTextColor(I)V

    .line 136
    invoke-virtual {v6, v10}, Landroid/widget/TextView;->setGravity(I)V

    .line 137
    new-instance v13, Landroid/widget/LinearLayout$LayoutParams;

    const/4 v14, -0x1

    const/4 v15, -0x2

    invoke-direct {v13, v14, v15}, Landroid/widget/LinearLayout$LayoutParams;-><init>(II)V

    .line 139
    const/4 v10, 0x4

    invoke-direct {v0, v10}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v11

    iput v11, v13, Landroid/widget/LinearLayout$LayoutParams;->topMargin:I

    .line 140
    const/16 v11, 0x16

    invoke-direct {v0, v11}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v11

    iput v11, v13, Landroid/widget/LinearLayout$LayoutParams;->bottomMargin:I

    .line 141
    invoke-virtual {v6, v13}, Landroid/widget/TextView;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 142
    invoke-virtual {v4, v6}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 145
    new-instance v6, Landroid/widget/LinearLayout;

    iget-object v11, v0, Lcom/adverify/sdk/PinVerifyDialog;->activity:Landroid/app/Activity;

    invoke-direct {v6, v11}, Landroid/widget/LinearLayout;-><init>(Landroid/content/Context;)V

    iput-object v6, v0, Lcom/adverify/sdk/PinVerifyDialog;->infoState:Landroid/widget/LinearLayout;

    .line 146
    invoke-virtual {v6, v2}, Landroid/widget/LinearLayout;->setOrientation(I)V

    .line 147
    iget-object v6, v0, Lcom/adverify/sdk/PinVerifyDialog;->infoState:Landroid/widget/LinearLayout;

    new-instance v11, Landroid/widget/LinearLayout$LayoutParams;

    invoke-direct {v11, v14, v15}, Landroid/widget/LinearLayout$LayoutParams;-><init>(II)V

    invoke-virtual {v6, v11}, Landroid/widget/LinearLayout;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 151
    iget-object v6, v0, Lcom/adverify/sdk/PinVerifyDialog;->infoItems:[Lcom/adverify/sdk/internal/models/PinInfoItem;

    if-eqz v6, :cond_125

    array-length v6, v6

    if-lez v6, :cond_125

    .line 152
    iget-object v6, v0, Lcom/adverify/sdk/PinVerifyDialog;->infoState:Landroid/widget/LinearLayout;

    invoke-direct/range {p0 .. p0}, Lcom/adverify/sdk/PinVerifyDialog;->buildInfoCard()Landroid/widget/LinearLayout;

    move-result-object v11

    invoke-virtual {v6, v11}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 156
    :cond_125
    new-instance v6, Landroid/widget/Button;

    iget-object v11, v0, Lcom/adverify/sdk/PinVerifyDialog;->activity:Landroid/app/Activity;

    invoke-direct {v6, v11}, Landroid/widget/Button;-><init>(Landroid/content/Context;)V

    iput-object v6, v0, Lcom/adverify/sdk/PinVerifyDialog;->generateBtn:Landroid/widget/Button;

    .line 157
    iget-object v6, v0, Lcom/adverify/sdk/PinVerifyDialog;->getPinBtnText:Ljava/lang/String;

    if-eqz v6, :cond_13b

    invoke-virtual {v6}, Ljava/lang/String;->isEmpty()Z

    move-result v6

    if-nez v6, :cond_13b

    .line 158
    iget-object v6, v0, Lcom/adverify/sdk/PinVerifyDialog;->getPinBtnText:Ljava/lang/String;

    goto :goto_13d

    :cond_13b
    const-string v6, "Generate PIN & Verify"

    .line 159
    :goto_13d
    iget-object v11, v0, Lcom/adverify/sdk/PinVerifyDialog;->generateBtn:Landroid/widget/Button;

    invoke-virtual {v11, v6}, Landroid/widget/Button;->setText(Ljava/lang/CharSequence;)V

    .line 160
    iget-object v6, v0, Lcom/adverify/sdk/PinVerifyDialog;->generateBtn:Landroid/widget/Button;

    invoke-virtual {v6, v14}, Landroid/widget/Button;->setTextColor(I)V

    .line 161
    iget-object v6, v0, Lcom/adverify/sdk/PinVerifyDialog;->generateBtn:Landroid/widget/Button;

    invoke-virtual {v6, v3}, Landroid/widget/Button;->setAllCaps(Z)V

    .line 162
    iget-object v6, v0, Lcom/adverify/sdk/PinVerifyDialog;->generateBtn:Landroid/widget/Button;

    sget-object v11, Landroid/graphics/Typeface;->DEFAULT:Landroid/graphics/Typeface;

    invoke-virtual {v6, v11, v2}, Landroid/widget/Button;->setTypeface(Landroid/graphics/Typeface;I)V

    .line 163
    iget-object v6, v0, Lcom/adverify/sdk/PinVerifyDialog;->generateBtn:Landroid/widget/Button;

    const/high16 v11, 0x41600000    # 14.0f

    invoke-virtual {v6, v9, v11}, Landroid/widget/Button;->setTextSize(IF)V

    .line 165
    new-instance v6, Landroid/graphics/drawable/GradientDrawable;

    invoke-direct {v6}, Landroid/graphics/drawable/GradientDrawable;-><init>()V

    .line 166
    invoke-static {v7}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v13

    invoke-virtual {v6, v13}, Landroid/graphics/drawable/GradientDrawable;->setColor(I)V

    .line 167
    const/16 v13, 0xc

    invoke-direct {v0, v13}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v11

    int-to-float v11, v11

    invoke-virtual {v6, v11}, Landroid/graphics/drawable/GradientDrawable;->setCornerRadius(F)V

    .line 168
    iget-object v11, v0, Lcom/adverify/sdk/PinVerifyDialog;->generateBtn:Landroid/widget/Button;

    const-string v16, "#333333"

    invoke-static/range {v16 .. v16}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v13

    invoke-direct {v0, v13, v6}, Lcom/adverify/sdk/PinVerifyDialog;->createRipple(ILandroid/graphics/drawable/GradientDrawable;)Landroid/graphics/drawable/RippleDrawable;

    move-result-object v6

    invoke-virtual {v11, v6}, Landroid/widget/Button;->setBackground(Landroid/graphics/drawable/Drawable;)V

    .line 169
    iget-object v6, v0, Lcom/adverify/sdk/PinVerifyDialog;->generateBtn:Landroid/widget/Button;

    invoke-direct {v0, v5}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v11

    const/16 v13, 0xe

    invoke-direct {v0, v13}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v2

    invoke-direct {v0, v5}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v9

    invoke-direct {v0, v13}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v5

    invoke-virtual {v6, v11, v2, v9, v5}, Landroid/widget/Button;->setPadding(IIII)V

    .line 171
    new-instance v2, Landroid/widget/LinearLayout$LayoutParams;

    invoke-direct {v2, v14, v15}, Landroid/widget/LinearLayout$LayoutParams;-><init>(II)V

    .line 173
    invoke-direct {v0, v8}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v5

    iput v5, v2, Landroid/widget/LinearLayout$LayoutParams;->topMargin:I

    .line 174
    iget-object v5, v0, Lcom/adverify/sdk/PinVerifyDialog;->generateBtn:Landroid/widget/Button;

    invoke-virtual {v5, v2}, Landroid/widget/Button;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 175
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->generateBtn:Landroid/widget/Button;

    new-instance v5, Lcom/adverify/sdk/PinVerifyDialog$$ExternalSyntheticLambda0;

    invoke-direct {v5, v0}, Lcom/adverify/sdk/PinVerifyDialog$$ExternalSyntheticLambda0;-><init>(Lcom/adverify/sdk/PinVerifyDialog;)V

    invoke-virtual {v2, v5}, Landroid/widget/Button;->setOnClickListener(Landroid/view/View$OnClickListener;)V

    .line 178
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->infoState:Landroid/widget/LinearLayout;

    iget-object v5, v0, Lcom/adverify/sdk/PinVerifyDialog;->generateBtn:Landroid/widget/Button;

    invoke-virtual {v2, v5}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 181
    new-instance v2, Landroid/widget/LinearLayout;

    iget-object v5, v0, Lcom/adverify/sdk/PinVerifyDialog;->activity:Landroid/app/Activity;

    invoke-direct {v2, v5}, Landroid/widget/LinearLayout;-><init>(Landroid/content/Context;)V

    .line 182
    invoke-virtual {v2, v3}, Landroid/widget/LinearLayout;->setOrientation(I)V

    .line 183
    new-instance v5, Landroid/widget/LinearLayout$LayoutParams;

    invoke-direct {v5, v14, v15}, Landroid/widget/LinearLayout$LayoutParams;-><init>(II)V

    .line 185
    const/16 v6, 0xa

    invoke-direct {v0, v6}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v9

    iput v9, v5, Landroid/widget/LinearLayout$LayoutParams;->topMargin:I

    .line 186
    invoke-virtual {v2, v5}, Landroid/widget/LinearLayout;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 188
    const-string v5, "Tutorial"

    invoke-direct {v0, v5}, Lcom/adverify/sdk/PinVerifyDialog;->buildGhostButton(Ljava/lang/String;)Landroid/widget/Button;

    move-result-object v5

    .line 189
    new-instance v9, Lcom/adverify/sdk/PinVerifyDialog$$ExternalSyntheticLambda1;

    invoke-direct {v9, v0}, Lcom/adverify/sdk/PinVerifyDialog$$ExternalSyntheticLambda1;-><init>(Lcom/adverify/sdk/PinVerifyDialog;)V

    invoke-virtual {v5, v9}, Landroid/widget/Button;->setOnClickListener(Landroid/view/View$OnClickListener;)V

    .line 190
    new-instance v9, Landroid/widget/LinearLayout$LayoutParams;

    const/high16 v11, 0x3f800000    # 1.0f

    invoke-direct {v9, v3, v15, v11}, Landroid/widget/LinearLayout$LayoutParams;-><init>(IIF)V

    .line 191
    invoke-direct {v0, v10}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v13

    iput v13, v9, Landroid/widget/LinearLayout$LayoutParams;->rightMargin:I

    .line 192
    invoke-virtual {v5, v9}, Landroid/widget/Button;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 193
    invoke-virtual {v2, v5}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 195
    const-string v5, "Join Us"

    invoke-direct {v0, v5}, Lcom/adverify/sdk/PinVerifyDialog;->buildGhostButton(Ljava/lang/String;)Landroid/widget/Button;

    move-result-object v5

    .line 196
    new-instance v9, Lcom/adverify/sdk/PinVerifyDialog$$ExternalSyntheticLambda2;

    invoke-direct {v9, v0}, Lcom/adverify/sdk/PinVerifyDialog$$ExternalSyntheticLambda2;-><init>(Lcom/adverify/sdk/PinVerifyDialog;)V

    invoke-virtual {v5, v9}, Landroid/widget/Button;->setOnClickListener(Landroid/view/View$OnClickListener;)V

    .line 197
    new-instance v9, Landroid/widget/LinearLayout$LayoutParams;

    invoke-direct {v9, v3, v15, v11}, Landroid/widget/LinearLayout$LayoutParams;-><init>(IIF)V

    .line 198
    invoke-direct {v0, v10}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v10

    iput v10, v9, Landroid/widget/LinearLayout$LayoutParams;->leftMargin:I

    .line 199
    invoke-virtual {v5, v9}, Landroid/widget/Button;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 200
    invoke-virtual {v2, v5}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 201
    iget-object v5, v0, Lcom/adverify/sdk/PinVerifyDialog;->infoState:Landroid/widget/LinearLayout;

    invoke-virtual {v5, v2}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 204
    new-instance v2, Landroid/widget/Button;

    iget-object v5, v0, Lcom/adverify/sdk/PinVerifyDialog;->activity:Landroid/app/Activity;

    invoke-direct {v2, v5}, Landroid/widget/Button;-><init>(Landroid/content/Context;)V

    .line 205
    const-string v5, "Exit"

    invoke-virtual {v2, v5}, Landroid/widget/Button;->setText(Ljava/lang/CharSequence;)V

    .line 206
    const-string v5, "#ee5555"

    invoke-static {v5}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v5

    invoke-virtual {v2, v5}, Landroid/widget/Button;->setTextColor(I)V

    .line 207
    const/high16 v5, 0x41400000    # 12.0f

    const/4 v9, 0x2

    invoke-virtual {v2, v9, v5}, Landroid/widget/Button;->setTextSize(IF)V

    .line 208
    invoke-virtual {v2, v3}, Landroid/widget/Button;->setAllCaps(Z)V

    .line 209
    sget-object v9, Landroid/graphics/Typeface;->DEFAULT:Landroid/graphics/Typeface;

    invoke-virtual {v2, v9, v3}, Landroid/widget/Button;->setTypeface(Landroid/graphics/Typeface;I)V

    .line 211
    new-instance v9, Landroid/graphics/drawable/GradientDrawable;

    invoke-direct {v9}, Landroid/graphics/drawable/GradientDrawable;-><init>()V

    .line 212
    invoke-virtual {v9, v3}, Landroid/graphics/drawable/GradientDrawable;->setColor(I)V

    .line 213
    invoke-direct {v0, v8}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v10

    int-to-float v10, v10

    invoke-virtual {v9, v10}, Landroid/graphics/drawable/GradientDrawable;->setCornerRadius(F)V

    .line 214
    const/4 v10, 0x1

    invoke-direct {v0, v10}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v13

    const-string v10, "#ffeeee"

    invoke-static {v10}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v10

    invoke-virtual {v9, v13, v10}, Landroid/graphics/drawable/GradientDrawable;->setStroke(II)V

    .line 215
    const-string v10, "#fff5f5"

    invoke-static {v10}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v10

    invoke-direct {v0, v10, v9}, Lcom/adverify/sdk/PinVerifyDialog;->createRipple(ILandroid/graphics/drawable/GradientDrawable;)Landroid/graphics/drawable/RippleDrawable;

    move-result-object v9

    invoke-virtual {v2, v9}, Landroid/widget/Button;->setBackground(Landroid/graphics/drawable/Drawable;)V

    .line 216
    invoke-direct {v0, v8}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v9

    const/16 v10, 0x8

    invoke-direct {v0, v10}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v13

    invoke-direct {v0, v8}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v11

    invoke-direct {v0, v10}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v3

    invoke-virtual {v2, v9, v13, v11, v3}, Landroid/widget/Button;->setPadding(IIII)V

    .line 218
    new-instance v3, Landroid/widget/LinearLayout$LayoutParams;

    invoke-direct {v3, v15, v15}, Landroid/widget/LinearLayout$LayoutParams;-><init>(II)V

    .line 220
    const/4 v9, 0x1

    iput v9, v3, Landroid/widget/LinearLayout$LayoutParams;->gravity:I

    .line 221
    invoke-direct {v0, v6}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v9

    iput v9, v3, Landroid/widget/LinearLayout$LayoutParams;->topMargin:I

    .line 222
    invoke-virtual {v2, v3}, Landroid/widget/Button;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 223
    new-instance v3, Lcom/adverify/sdk/PinVerifyDialog$$ExternalSyntheticLambda3;

    invoke-direct {v3, v0}, Lcom/adverify/sdk/PinVerifyDialog$$ExternalSyntheticLambda3;-><init>(Lcom/adverify/sdk/PinVerifyDialog;)V

    invoke-virtual {v2, v3}, Landroid/widget/Button;->setOnClickListener(Landroid/view/View$OnClickListener;)V

    .line 224
    iget-object v3, v0, Lcom/adverify/sdk/PinVerifyDialog;->infoState:Landroid/widget/LinearLayout;

    invoke-virtual {v3, v2}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 226
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->infoState:Landroid/widget/LinearLayout;

    invoke-virtual {v4, v2}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 229
    new-instance v2, Landroid/widget/LinearLayout;

    iget-object v3, v0, Lcom/adverify/sdk/PinVerifyDialog;->activity:Landroid/app/Activity;

    invoke-direct {v2, v3}, Landroid/widget/LinearLayout;-><init>(Landroid/content/Context;)V

    iput-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->pinState:Landroid/widget/LinearLayout;

    .line 230
    const/4 v3, 0x1

    invoke-virtual {v2, v3}, Landroid/widget/LinearLayout;->setOrientation(I)V

    .line 231
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->pinState:Landroid/widget/LinearLayout;

    invoke-virtual {v2, v10}, Landroid/widget/LinearLayout;->setVisibility(I)V

    .line 232
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->pinState:Landroid/widget/LinearLayout;

    new-instance v3, Landroid/widget/LinearLayout$LayoutParams;

    invoke-direct {v3, v14, v15}, Landroid/widget/LinearLayout$LayoutParams;-><init>(II)V

    invoke-virtual {v2, v3}, Landroid/widget/LinearLayout;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 235
    new-instance v2, Landroid/widget/TextView;

    iget-object v3, v0, Lcom/adverify/sdk/PinVerifyDialog;->activity:Landroid/app/Activity;

    invoke-direct {v2, v3}, Landroid/widget/TextView;-><init>(Landroid/content/Context;)V

    .line 236
    const-string v3, "Enter the PIN from your browser"

    invoke-virtual {v2, v3}, Landroid/widget/TextView;->setText(Ljava/lang/CharSequence;)V

    .line 237
    const/high16 v3, 0x41500000    # 13.0f

    const/4 v9, 0x2

    invoke-virtual {v2, v9, v3}, Landroid/widget/TextView;->setTextSize(IF)V

    .line 238
    invoke-static {v12}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v3

    invoke-virtual {v2, v3}, Landroid/widget/TextView;->setTextColor(I)V

    .line 239
    const/16 v3, 0x11

    invoke-virtual {v2, v3}, Landroid/widget/TextView;->setGravity(I)V

    .line 240
    new-instance v3, Landroid/widget/LinearLayout$LayoutParams;

    invoke-direct {v3, v14, v15}, Landroid/widget/LinearLayout$LayoutParams;-><init>(II)V

    .line 242
    invoke-direct {v0, v8}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v9

    iput v9, v3, Landroid/widget/LinearLayout$LayoutParams;->bottomMargin:I

    .line 243
    invoke-virtual {v2, v3}, Landroid/widget/TextView;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 244
    iget-object v3, v0, Lcom/adverify/sdk/PinVerifyDialog;->pinState:Landroid/widget/LinearLayout;

    invoke-virtual {v3, v2}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 247
    new-instance v2, Landroid/widget/EditText;

    iget-object v3, v0, Lcom/adverify/sdk/PinVerifyDialog;->activity:Landroid/app/Activity;

    invoke-direct {v2, v3}, Landroid/widget/EditText;-><init>(Landroid/content/Context;)V

    iput-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->pinInput:Landroid/widget/EditText;

    .line 248
    const-string v3, "Enter PIN"

    invoke-virtual {v2, v3}, Landroid/widget/EditText;->setHint(Ljava/lang/CharSequence;)V

    .line 249
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->pinInput:Landroid/widget/EditText;

    invoke-static {v7}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v3

    invoke-virtual {v2, v3}, Landroid/widget/EditText;->setTextColor(I)V

    .line 250
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->pinInput:Landroid/widget/EditText;

    const-string v3, "#bbbbbb"

    invoke-static {v3}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v3

    invoke-virtual {v2, v3}, Landroid/widget/EditText;->setHintTextColor(I)V

    .line 251
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->pinInput:Landroid/widget/EditText;

    invoke-virtual {v2, v8}, Landroid/widget/EditText;->setInputType(I)V

    .line 252
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->pinInput:Landroid/widget/EditText;

    const/high16 v3, 0x41a00000    # 20.0f

    const/4 v9, 0x2

    invoke-virtual {v2, v9, v3}, Landroid/widget/EditText;->setTextSize(IF)V

    .line 253
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->pinInput:Landroid/widget/EditText;

    const/16 v3, 0x11

    invoke-virtual {v2, v3}, Landroid/widget/EditText;->setGravity(I)V

    .line 254
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->pinInput:Landroid/widget/EditText;

    const v3, 0x3e99999a    # 0.3f

    invoke-virtual {v2, v3}, Landroid/widget/EditText;->setLetterSpacing(F)V

    .line 255
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->pinInput:Landroid/widget/EditText;

    const/16 v3, 0x10

    invoke-direct {v0, v3}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v9

    invoke-direct {v0, v3}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v11

    invoke-direct {v0, v3}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v12

    invoke-direct {v0, v3}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v3

    invoke-virtual {v2, v9, v11, v12, v3}, Landroid/widget/EditText;->setPadding(IIII)V

    .line 256
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->pinInput:Landroid/widget/EditText;

    sget-object v3, Landroid/graphics/Typeface;->MONOSPACE:Landroid/graphics/Typeface;

    invoke-virtual {v2, v3}, Landroid/widget/EditText;->setTypeface(Landroid/graphics/Typeface;)V

    .line 258
    new-instance v2, Landroid/graphics/drawable/GradientDrawable;

    invoke-direct {v2}, Landroid/graphics/drawable/GradientDrawable;-><init>()V

    .line 259
    invoke-virtual {v2, v14}, Landroid/graphics/drawable/GradientDrawable;->setColor(I)V

    .line 260
    invoke-direct {v0, v6}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v3

    int-to-float v3, v3

    invoke-virtual {v2, v3}, Landroid/graphics/drawable/GradientDrawable;->setCornerRadius(F)V

    .line 261
    const/4 v3, 0x1

    invoke-direct {v0, v3}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v9

    const-string v3, "#dddddd"

    invoke-static {v3}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v3

    invoke-virtual {v2, v9, v3}, Landroid/graphics/drawable/GradientDrawable;->setStroke(II)V

    .line 262
    iget-object v3, v0, Lcom/adverify/sdk/PinVerifyDialog;->pinInput:Landroid/widget/EditText;

    invoke-virtual {v3, v2}, Landroid/widget/EditText;->setBackground(Landroid/graphics/drawable/Drawable;)V

    .line 263
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->pinState:Landroid/widget/LinearLayout;

    iget-object v3, v0, Lcom/adverify/sdk/PinVerifyDialog;->pinInput:Landroid/widget/EditText;

    invoke-virtual {v2, v3}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 266
    new-instance v2, Landroid/widget/TextView;

    iget-object v3, v0, Lcom/adverify/sdk/PinVerifyDialog;->activity:Landroid/app/Activity;

    invoke-direct {v2, v3}, Landroid/widget/TextView;-><init>(Landroid/content/Context;)V

    iput-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->errorText:Landroid/widget/TextView;

    .line 267
    const/4 v3, 0x2

    invoke-virtual {v2, v3, v5}, Landroid/widget/TextView;->setTextSize(IF)V

    .line 268
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->errorText:Landroid/widget/TextView;

    const-string v3, "#ee5555"

    invoke-static {v3}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v3

    invoke-virtual {v2, v3}, Landroid/widget/TextView;->setTextColor(I)V

    .line 269
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->errorText:Landroid/widget/TextView;

    const/16 v3, 0x11

    invoke-virtual {v2, v3}, Landroid/widget/TextView;->setGravity(I)V

    .line 270
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->errorText:Landroid/widget/TextView;

    invoke-direct {v0, v6}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v3

    const/4 v6, 0x0

    invoke-virtual {v2, v6, v3, v6, v6}, Landroid/widget/TextView;->setPadding(IIII)V

    .line 271
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->errorText:Landroid/widget/TextView;

    invoke-virtual {v2, v10}, Landroid/widget/TextView;->setVisibility(I)V

    .line 272
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->pinState:Landroid/widget/LinearLayout;

    iget-object v3, v0, Lcom/adverify/sdk/PinVerifyDialog;->errorText:Landroid/widget/TextView;

    invoke-virtual {v2, v3}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 275
    new-instance v2, Landroid/widget/TextView;

    iget-object v3, v0, Lcom/adverify/sdk/PinVerifyDialog;->activity:Landroid/app/Activity;

    invoke-direct {v2, v3}, Landroid/widget/TextView;-><init>(Landroid/content/Context;)V

    iput-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->attemptsText:Landroid/widget/TextView;

    .line 276
    const/high16 v3, 0x41300000    # 11.0f

    const/4 v6, 0x2

    invoke-virtual {v2, v6, v3}, Landroid/widget/TextView;->setTextSize(IF)V

    .line 277
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->attemptsText:Landroid/widget/TextView;

    const-string v3, "#999999"

    invoke-static {v3}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v3

    invoke-virtual {v2, v3}, Landroid/widget/TextView;->setTextColor(I)V

    .line 278
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->attemptsText:Landroid/widget/TextView;

    const/16 v3, 0x11

    invoke-virtual {v2, v3}, Landroid/widget/TextView;->setGravity(I)V

    .line 279
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->attemptsText:Landroid/widget/TextView;

    sget-object v3, Landroid/graphics/Typeface;->MONOSPACE:Landroid/graphics/Typeface;

    invoke-virtual {v2, v3}, Landroid/widget/TextView;->setTypeface(Landroid/graphics/Typeface;)V

    .line 280
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->attemptsText:Landroid/widget/TextView;

    const/4 v3, 0x6

    invoke-direct {v0, v3}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v3

    const/4 v6, 0x0

    invoke-virtual {v2, v6, v3, v6, v6}, Landroid/widget/TextView;->setPadding(IIII)V

    .line 281
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->attemptsText:Landroid/widget/TextView;

    invoke-virtual {v2, v10}, Landroid/widget/TextView;->setVisibility(I)V

    .line 282
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->pinState:Landroid/widget/LinearLayout;

    iget-object v3, v0, Lcom/adverify/sdk/PinVerifyDialog;->attemptsText:Landroid/widget/TextView;

    invoke-virtual {v2, v3}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 285
    new-instance v2, Landroid/widget/Button;

    iget-object v3, v0, Lcom/adverify/sdk/PinVerifyDialog;->activity:Landroid/app/Activity;

    invoke-direct {v2, v3}, Landroid/widget/Button;-><init>(Landroid/content/Context;)V

    iput-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->verifyBtn:Landroid/widget/Button;

    .line 286
    const-string v3, "Verify"

    invoke-virtual {v2, v3}, Landroid/widget/Button;->setText(Ljava/lang/CharSequence;)V

    .line 287
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->verifyBtn:Landroid/widget/Button;

    invoke-virtual {v2, v14}, Landroid/widget/Button;->setTextColor(I)V

    .line 288
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->verifyBtn:Landroid/widget/Button;

    const/4 v3, 0x0

    invoke-virtual {v2, v3}, Landroid/widget/Button;->setAllCaps(Z)V

    .line 289
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->verifyBtn:Landroid/widget/Button;

    sget-object v3, Landroid/graphics/Typeface;->DEFAULT:Landroid/graphics/Typeface;

    const/4 v6, 0x1

    invoke-virtual {v2, v3, v6}, Landroid/widget/Button;->setTypeface(Landroid/graphics/Typeface;I)V

    .line 290
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->verifyBtn:Landroid/widget/Button;

    const/high16 v3, 0x41600000    # 14.0f

    const/4 v6, 0x2

    invoke-virtual {v2, v6, v3}, Landroid/widget/Button;->setTextSize(IF)V

    .line 292
    new-instance v2, Landroid/graphics/drawable/GradientDrawable;

    invoke-direct {v2}, Landroid/graphics/drawable/GradientDrawable;-><init>()V

    .line 293
    invoke-static {v7}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v3

    invoke-virtual {v2, v3}, Landroid/graphics/drawable/GradientDrawable;->setColor(I)V

    .line 294
    const/16 v3, 0xc

    invoke-direct {v0, v3}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v6

    int-to-float v3, v6

    invoke-virtual {v2, v3}, Landroid/graphics/drawable/GradientDrawable;->setCornerRadius(F)V

    .line 295
    iget-object v3, v0, Lcom/adverify/sdk/PinVerifyDialog;->verifyBtn:Landroid/widget/Button;

    invoke-static/range {v16 .. v16}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v6

    invoke-direct {v0, v6, v2}, Lcom/adverify/sdk/PinVerifyDialog;->createRipple(ILandroid/graphics/drawable/GradientDrawable;)Landroid/graphics/drawable/RippleDrawable;

    move-result-object v2

    invoke-virtual {v3, v2}, Landroid/widget/Button;->setBackground(Landroid/graphics/drawable/Drawable;)V

    .line 296
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->verifyBtn:Landroid/widget/Button;

    const/16 v3, 0x18

    invoke-direct {v0, v3}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v6

    const/16 v7, 0xe

    invoke-direct {v0, v7}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v9

    invoke-direct {v0, v3}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v3

    invoke-direct {v0, v7}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v11

    invoke-virtual {v2, v6, v9, v3, v11}, Landroid/widget/Button;->setPadding(IIII)V

    .line 298
    new-instance v2, Landroid/widget/LinearLayout$LayoutParams;

    invoke-direct {v2, v14, v15}, Landroid/widget/LinearLayout$LayoutParams;-><init>(II)V

    .line 300
    invoke-direct {v0, v8}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v3

    iput v3, v2, Landroid/widget/LinearLayout$LayoutParams;->topMargin:I

    .line 301
    iget-object v3, v0, Lcom/adverify/sdk/PinVerifyDialog;->verifyBtn:Landroid/widget/Button;

    invoke-virtual {v3, v2}, Landroid/widget/Button;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 302
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->verifyBtn:Landroid/widget/Button;

    new-instance v3, Lcom/adverify/sdk/PinVerifyDialog$$ExternalSyntheticLambda4;

    invoke-direct {v3, v0}, Lcom/adverify/sdk/PinVerifyDialog$$ExternalSyntheticLambda4;-><init>(Lcom/adverify/sdk/PinVerifyDialog;)V

    invoke-virtual {v2, v3}, Landroid/widget/Button;->setOnClickListener(Landroid/view/View$OnClickListener;)V

    .line 313
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->pinState:Landroid/widget/LinearLayout;

    iget-object v3, v0, Lcom/adverify/sdk/PinVerifyDialog;->verifyBtn:Landroid/widget/Button;

    invoke-virtual {v2, v3}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 316
    new-instance v2, Landroid/widget/Button;

    iget-object v3, v0, Lcom/adverify/sdk/PinVerifyDialog;->activity:Landroid/app/Activity;

    invoke-direct {v2, v3}, Landroid/widget/Button;-><init>(Landroid/content/Context;)V

    .line 317
    const-string v3, "\u2190 Back"

    invoke-virtual {v2, v3}, Landroid/widget/Button;->setText(Ljava/lang/CharSequence;)V

    .line 318
    const-string v3, "#999999"

    invoke-static {v3}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v3

    invoke-virtual {v2, v3}, Landroid/widget/Button;->setTextColor(I)V

    .line 319
    const/4 v3, 0x2

    invoke-virtual {v2, v3, v5}, Landroid/widget/Button;->setTextSize(IF)V

    .line 320
    const/4 v3, 0x0

    invoke-virtual {v2, v3}, Landroid/widget/Button;->setAllCaps(Z)V

    .line 321
    new-instance v5, Landroid/graphics/drawable/GradientDrawable;

    invoke-direct {v5}, Landroid/graphics/drawable/GradientDrawable;-><init>()V

    .line 322
    invoke-virtual {v5, v3}, Landroid/graphics/drawable/GradientDrawable;->setColor(I)V

    .line 323
    invoke-direct {v0, v10}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v3

    int-to-float v3, v3

    invoke-virtual {v5, v3}, Landroid/graphics/drawable/GradientDrawable;->setCornerRadius(F)V

    .line 324
    const-string v3, "#f0f0f0"

    invoke-static {v3}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v3

    invoke-direct {v0, v3, v5}, Lcom/adverify/sdk/PinVerifyDialog;->createRipple(ILandroid/graphics/drawable/GradientDrawable;)Landroid/graphics/drawable/RippleDrawable;

    move-result-object v3

    invoke-virtual {v2, v3}, Landroid/widget/Button;->setBackground(Landroid/graphics/drawable/Drawable;)V

    .line 325
    const/16 v3, 0xe

    invoke-direct {v0, v3}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v5

    const/4 v6, 0x7

    invoke-direct {v0, v6}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v6

    invoke-direct {v0, v3}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v3

    const/4 v7, 0x7

    invoke-direct {v0, v7}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v7

    invoke-virtual {v2, v5, v6, v3, v7}, Landroid/widget/Button;->setPadding(IIII)V

    .line 327
    new-instance v3, Landroid/widget/LinearLayout$LayoutParams;

    invoke-direct {v3, v15, v15}, Landroid/widget/LinearLayout$LayoutParams;-><init>(II)V

    .line 329
    const/4 v5, 0x1

    iput v5, v3, Landroid/widget/LinearLayout$LayoutParams;->gravity:I

    .line 330
    const/16 v5, 0xc

    invoke-direct {v0, v5}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v5

    iput v5, v3, Landroid/widget/LinearLayout$LayoutParams;->topMargin:I

    .line 331
    invoke-virtual {v2, v3}, Landroid/widget/Button;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 332
    new-instance v3, Lcom/adverify/sdk/PinVerifyDialog$$ExternalSyntheticLambda5;

    invoke-direct {v3, v0}, Lcom/adverify/sdk/PinVerifyDialog$$ExternalSyntheticLambda5;-><init>(Lcom/adverify/sdk/PinVerifyDialog;)V

    invoke-virtual {v2, v3}, Landroid/widget/Button;->setOnClickListener(Landroid/view/View$OnClickListener;)V

    .line 333
    iget-object v3, v0, Lcom/adverify/sdk/PinVerifyDialog;->pinState:Landroid/widget/LinearLayout;

    invoke-virtual {v3, v2}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 335
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->pinState:Landroid/widget/LinearLayout;

    invoke-virtual {v4, v2}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 337
    invoke-virtual {v1, v4}, Landroid/widget/ScrollView;->addView(Landroid/view/View;)V

    .line 338
    iget-object v2, v0, Lcom/adverify/sdk/PinVerifyDialog;->dialog:Landroid/app/Dialog;

    invoke-virtual {v2, v1}, Landroid/app/Dialog;->setContentView(Landroid/view/View;)V

    .line 340
    iget-object v1, v0, Lcom/adverify/sdk/PinVerifyDialog;->dialog:Landroid/app/Dialog;

    invoke-virtual {v1}, Landroid/app/Dialog;->getWindow()Landroid/view/Window;

    move-result-object v1

    if-eqz v1, :cond_50a

    .line 341
    iget-object v1, v0, Lcom/adverify/sdk/PinVerifyDialog;->dialog:Landroid/app/Dialog;

    invoke-virtual {v1}, Landroid/app/Dialog;->getWindow()Landroid/view/Window;

    move-result-object v1

    const v2, 0x106000d

    invoke-virtual {v1, v2}, Landroid/view/Window;->setBackgroundDrawableResource(I)V

    .line 342
    iget-object v1, v0, Lcom/adverify/sdk/PinVerifyDialog;->dialog:Landroid/app/Dialog;

    invoke-virtual {v1}, Landroid/app/Dialog;->getWindow()Landroid/view/Window;

    move-result-object v1

    const/16 v2, 0x154

    invoke-direct {v0, v2}, Lcom/adverify/sdk/PinVerifyDialog;->dp(I)I

    move-result v2

    invoke-virtual {v1, v2, v15}, Landroid/view/Window;->setLayout(II)V

    .line 345
    :cond_50a
    iget-object v1, v0, Lcom/adverify/sdk/PinVerifyDialog;->dialog:Landroid/app/Dialog;

    invoke-virtual {v1}, Landroid/app/Dialog;->show()V

    .line 348
    new-instance v1, Landroid/view/animation/AnimationSet;

    const/4 v2, 0x1

    invoke-direct {v1, v2}, Landroid/view/animation/AnimationSet;-><init>(Z)V

    .line 349
    new-instance v2, Landroid/view/animation/DecelerateInterpolator;

    invoke-direct {v2}, Landroid/view/animation/DecelerateInterpolator;-><init>()V

    invoke-virtual {v1, v2}, Landroid/view/animation/AnimationSet;->setInterpolator(Landroid/view/animation/Interpolator;)V

    .line 350
    const-wide/16 v2, 0xc8

    invoke-virtual {v1, v2, v3}, Landroid/view/animation/AnimationSet;->setDuration(J)V

    .line 351
    new-instance v2, Landroid/view/animation/AlphaAnimation;

    const/4 v3, 0x0

    const/high16 v5, 0x3f800000    # 1.0f

    invoke-direct {v2, v3, v5}, Landroid/view/animation/AlphaAnimation;-><init>(FF)V

    invoke-virtual {v1, v2}, Landroid/view/animation/AnimationSet;->addAnimation(Landroid/view/animation/Animation;)V

    .line 352
    new-instance v2, Landroid/view/animation/ScaleAnimation;

    const v7, 0x3f733333    # 0.95f

    const/high16 v8, 0x3f800000    # 1.0f

    const v9, 0x3f733333    # 0.95f

    const/high16 v10, 0x3f800000    # 1.0f

    const/4 v11, 0x1

    const/high16 v12, 0x3f000000    # 0.5f

    const/4 v13, 0x1

    const/high16 v14, 0x3f000000    # 0.5f

    move-object v6, v2

    invoke-direct/range {v6 .. v14}, Landroid/view/animation/ScaleAnimation;-><init>(FFFFIFIF)V

    invoke-virtual {v1, v2}, Landroid/view/animation/AnimationSet;->addAnimation(Landroid/view/animation/Animation;)V

    .line 355
    invoke-virtual {v4, v1}, Landroid/widget/LinearLayout;->startAnimation(Landroid/view/animation/Animation;)V

    .line 356
    return-void
.end method

.method showError(Ljava/lang/String;)V
    .registers 3

    .line 380
    iget-object v0, p0, Lcom/adverify/sdk/PinVerifyDialog;->errorText:Landroid/widget/TextView;

    if-eqz v0, :cond_d

    invoke-virtual {v0, p1}, Landroid/widget/TextView;->setText(Ljava/lang/CharSequence;)V

    iget-object p1, p0, Lcom/adverify/sdk/PinVerifyDialog;->errorText:Landroid/widget/TextView;

    const/4 v0, 0x0

    invoke-virtual {p1, v0}, Landroid/widget/TextView;->setVisibility(I)V

    .line 381
    :cond_d
    iget-object p1, p0, Lcom/adverify/sdk/PinVerifyDialog;->pinInput:Landroid/widget/EditText;

    if-eqz p1, :cond_16

    const-string v0, ""

    invoke-virtual {p1, v0}, Landroid/widget/EditText;->setText(Ljava/lang/CharSequence;)V

    .line 382
    :cond_16
    invoke-direct {p0}, Lcom/adverify/sdk/PinVerifyDialog;->updateAttemptsText()V

    .line 383
    return-void
.end method

.method switchToPinState()V
    .registers 4

    .line 361
    iget-object v0, p0, Lcom/adverify/sdk/PinVerifyDialog;->infoState:Landroid/widget/LinearLayout;

    if-eqz v0, :cond_25

    iget-object v1, p0, Lcom/adverify/sdk/PinVerifyDialog;->pinState:Landroid/widget/LinearLayout;

    if-eqz v1, :cond_25

    .line 362
    const/16 v1, 0x8

    invoke-virtual {v0, v1}, Landroid/widget/LinearLayout;->setVisibility(I)V

    .line 363
    iget-object v0, p0, Lcom/adverify/sdk/PinVerifyDialog;->pinState:Landroid/widget/LinearLayout;

    const/4 v1, 0x0

    invoke-virtual {v0, v1}, Landroid/widget/LinearLayout;->setVisibility(I)V

    .line 364
    new-instance v0, Landroid/view/animation/AlphaAnimation;

    const/4 v1, 0x0

    const/high16 v2, 0x3f800000    # 1.0f

    invoke-direct {v0, v1, v2}, Landroid/view/animation/AlphaAnimation;-><init>(FF)V

    .line 365
    const-wide/16 v1, 0x96

    invoke-virtual {v0, v1, v2}, Landroid/view/animation/AlphaAnimation;->setDuration(J)V

    .line 366
    iget-object v1, p0, Lcom/adverify/sdk/PinVerifyDialog;->pinState:Landroid/widget/LinearLayout;

    invoke-virtual {v1, v0}, Landroid/widget/LinearLayout;->startAnimation(Landroid/view/animation/Animation;)V

    .line 368
    :cond_25
    return-void
.end method
