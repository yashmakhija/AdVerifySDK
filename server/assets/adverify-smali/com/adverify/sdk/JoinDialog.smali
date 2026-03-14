.class Lcom/adverify/sdk/JoinDialog;
.super Ljava/lang/Object;
.source "JoinDialog.java"


# instance fields
.field private final activity:Landroid/app/Activity;

.field private dialog:Landroid/app/Dialog;

.field private final links:[Lcom/adverify/sdk/internal/models/JoinLink;


# direct methods
.method constructor <init>(Landroid/app/Activity;[Lcom/adverify/sdk/internal/models/JoinLink;)V
    .registers 3

    .line 37
    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    .line 38
    iput-object p1, p0, Lcom/adverify/sdk/JoinDialog;->activity:Landroid/app/Activity;

    .line 39
    iput-object p2, p0, Lcom/adverify/sdk/JoinDialog;->links:[Lcom/adverify/sdk/internal/models/JoinLink;

    .line 40
    return-void
.end method

.method private buildLinkCard(Lcom/adverify/sdk/internal/models/JoinLink;)Landroid/widget/LinearLayout;
    .registers 16

    .line 185
    new-instance v0, Landroid/widget/LinearLayout;

    iget-object v1, p0, Lcom/adverify/sdk/JoinDialog;->activity:Landroid/app/Activity;

    invoke-direct {v0, v1}, Landroid/widget/LinearLayout;-><init>(Landroid/content/Context;)V

    .line 186
    const/4 v1, 0x0

    invoke-virtual {v0, v1}, Landroid/widget/LinearLayout;->setOrientation(I)V

    .line 187
    const/16 v2, 0x10

    invoke-virtual {v0, v2}, Landroid/widget/LinearLayout;->setGravity(I)V

    .line 188
    const/16 v2, 0xe

    invoke-direct {p0, v2}, Lcom/adverify/sdk/JoinDialog;->dp(I)I

    move-result v3

    const/16 v4, 0xc

    invoke-direct {p0, v4}, Lcom/adverify/sdk/JoinDialog;->dp(I)I

    move-result v5

    invoke-direct {p0, v2}, Lcom/adverify/sdk/JoinDialog;->dp(I)I

    move-result v2

    invoke-direct {p0, v4}, Lcom/adverify/sdk/JoinDialog;->dp(I)I

    move-result v6

    invoke-virtual {v0, v3, v5, v2, v6}, Landroid/widget/LinearLayout;->setPadding(IIII)V

    .line 190
    new-instance v2, Landroid/graphics/drawable/GradientDrawable;

    invoke-direct {v2}, Landroid/graphics/drawable/GradientDrawable;-><init>()V

    .line 191
    const/4 v3, -0x1

    invoke-virtual {v2, v3}, Landroid/graphics/drawable/GradientDrawable;->setColor(I)V

    .line 192
    invoke-direct {p0, v4}, Lcom/adverify/sdk/JoinDialog;->dp(I)I

    move-result v5

    int-to-float v5, v5

    invoke-virtual {v2, v5}, Landroid/graphics/drawable/GradientDrawable;->setCornerRadius(F)V

    .line 193
    const/4 v5, 0x1

    invoke-direct {p0, v5}, Lcom/adverify/sdk/JoinDialog;->dp(I)I

    move-result v6

    const-string v7, "#eeeeee"

    invoke-static {v7}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v7

    invoke-virtual {v2, v6, v7}, Landroid/graphics/drawable/GradientDrawable;->setStroke(II)V

    .line 194
    new-instance v6, Landroid/graphics/drawable/RippleDrawable;

    .line 195
    const-string v7, "#f0f0f0"

    invoke-static {v7}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v7

    invoke-static {v7}, Landroid/content/res/ColorStateList;->valueOf(I)Landroid/content/res/ColorStateList;

    move-result-object v7

    const/4 v8, 0x0

    invoke-direct {v6, v7, v2, v8}, Landroid/graphics/drawable/RippleDrawable;-><init>(Landroid/content/res/ColorStateList;Landroid/graphics/drawable/Drawable;Landroid/graphics/drawable/Drawable;)V

    .line 194
    invoke-virtual {v0, v6}, Landroid/widget/LinearLayout;->setBackground(Landroid/graphics/drawable/Drawable;)V

    .line 197
    new-instance v2, Landroid/widget/LinearLayout$LayoutParams;

    const/4 v6, -0x2

    invoke-direct {v2, v3, v6}, Landroid/widget/LinearLayout$LayoutParams;-><init>(II)V

    .line 200
    const/16 v7, 0x8

    invoke-direct {p0, v7}, Lcom/adverify/sdk/JoinDialog;->dp(I)I

    move-result v7

    iput v7, v2, Landroid/widget/LinearLayout$LayoutParams;->bottomMargin:I

    .line 201
    invoke-virtual {v0, v2}, Landroid/widget/LinearLayout;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 204
    const-string v2, "telegram"

    iget-object v7, p1, Lcom/adverify/sdk/internal/models/JoinLink;->iconType:Ljava/lang/String;

    invoke-virtual {v2, v7}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v13

    .line 205
    if-eqz v13, :cond_77

    const-string v2, "#e8f4fd"

    goto :goto_79

    :cond_77
    const-string v2, "#eef8ee"

    :goto_79
    invoke-static {v2}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v2

    move v11, v2

    .line 206
    if-eqz v13, :cond_83

    const-string v2, "#0088cc"

    goto :goto_85

    :cond_83
    const-string v2, "#22c55e"

    :goto_85
    invoke-static {v2}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v2

    move v12, v2

    .line 208
    new-instance v2, Lcom/adverify/sdk/JoinDialog$2;

    iget-object v10, p0, Lcom/adverify/sdk/JoinDialog;->activity:Landroid/app/Activity;

    move-object v8, v2

    move-object v9, p0

    invoke-direct/range {v8 .. v13}, Lcom/adverify/sdk/JoinDialog$2;-><init>(Lcom/adverify/sdk/JoinDialog;Landroid/content/Context;IIZ)V

    .line 269
    new-instance v7, Landroid/widget/LinearLayout$LayoutParams;

    const/16 v8, 0x24

    invoke-direct {p0, v8}, Lcom/adverify/sdk/JoinDialog;->dp(I)I

    move-result v9

    invoke-direct {p0, v8}, Lcom/adverify/sdk/JoinDialog;->dp(I)I

    move-result v8

    invoke-direct {v7, v9, v8}, Landroid/widget/LinearLayout$LayoutParams;-><init>(II)V

    .line 270
    invoke-direct {p0, v4}, Lcom/adverify/sdk/JoinDialog;->dp(I)I

    move-result v4

    iput v4, v7, Landroid/widget/LinearLayout$LayoutParams;->rightMargin:I

    .line 271
    invoke-virtual {v2, v7}, Landroid/view/View;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 272
    invoke-virtual {v0, v2}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 275
    new-instance v2, Landroid/widget/LinearLayout;

    iget-object v4, p0, Lcom/adverify/sdk/JoinDialog;->activity:Landroid/app/Activity;

    invoke-direct {v2, v4}, Landroid/widget/LinearLayout;-><init>(Landroid/content/Context;)V

    .line 276
    invoke-virtual {v2, v5}, Landroid/widget/LinearLayout;->setOrientation(I)V

    .line 277
    new-instance v4, Landroid/widget/LinearLayout$LayoutParams;

    const/high16 v7, 0x3f800000    # 1.0f

    invoke-direct {v4, v1, v6, v7}, Landroid/widget/LinearLayout$LayoutParams;-><init>(IIF)V

    invoke-virtual {v2, v4}, Landroid/widget/LinearLayout;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 281
    new-instance v1, Landroid/widget/TextView;

    iget-object v4, p0, Lcom/adverify/sdk/JoinDialog;->activity:Landroid/app/Activity;

    invoke-direct {v1, v4}, Landroid/widget/TextView;-><init>(Landroid/content/Context;)V

    .line 282
    iget-object v4, p1, Lcom/adverify/sdk/internal/models/JoinLink;->name:Ljava/lang/String;

    invoke-virtual {v1, v4}, Landroid/widget/TextView;->setText(Ljava/lang/CharSequence;)V

    .line 283
    const/high16 v4, 0x41500000    # 13.0f

    const/4 v7, 0x2

    invoke-virtual {v1, v7, v4}, Landroid/widget/TextView;->setTextSize(IF)V

    .line 284
    const-string v4, "#222222"

    invoke-static {v4}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v4

    invoke-virtual {v1, v4}, Landroid/widget/TextView;->setTextColor(I)V

    .line 285
    sget-object v4, Landroid/graphics/Typeface;->DEFAULT:Landroid/graphics/Typeface;

    invoke-virtual {v1, v4, v5}, Landroid/widget/TextView;->setTypeface(Landroid/graphics/Typeface;I)V

    .line 286
    invoke-virtual {v2, v1}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 288
    iget-object v1, p1, Lcom/adverify/sdk/internal/models/JoinLink;->description:Ljava/lang/String;

    if-eqz v1, :cond_11c

    iget-object v1, p1, Lcom/adverify/sdk/internal/models/JoinLink;->description:Ljava/lang/String;

    invoke-virtual {v1}, Ljava/lang/String;->isEmpty()Z

    move-result v1

    if-nez v1, :cond_11c

    .line 289
    new-instance v1, Landroid/widget/TextView;

    iget-object v4, p0, Lcom/adverify/sdk/JoinDialog;->activity:Landroid/app/Activity;

    invoke-direct {v1, v4}, Landroid/widget/TextView;-><init>(Landroid/content/Context;)V

    .line 290
    iget-object v4, p1, Lcom/adverify/sdk/internal/models/JoinLink;->description:Ljava/lang/String;

    invoke-virtual {v1, v4}, Landroid/widget/TextView;->setText(Ljava/lang/CharSequence;)V

    .line 291
    const/high16 v4, 0x41300000    # 11.0f

    invoke-virtual {v1, v7, v4}, Landroid/widget/TextView;->setTextSize(IF)V

    .line 292
    const-string v4, "#999999"

    invoke-static {v4}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v4

    invoke-virtual {v1, v4}, Landroid/widget/TextView;->setTextColor(I)V

    .line 293
    new-instance v4, Landroid/widget/LinearLayout$LayoutParams;

    invoke-direct {v4, v3, v6}, Landroid/widget/LinearLayout$LayoutParams;-><init>(II)V

    .line 296
    invoke-direct {p0, v5}, Lcom/adverify/sdk/JoinDialog;->dp(I)I

    move-result v3

    iput v3, v4, Landroid/widget/LinearLayout$LayoutParams;->topMargin:I

    .line 297
    invoke-virtual {v1, v4}, Landroid/widget/TextView;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 298
    invoke-virtual {v2, v1}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 301
    :cond_11c
    invoke-virtual {v0, v2}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 304
    new-instance v1, Landroid/widget/TextView;

    iget-object v2, p0, Lcom/adverify/sdk/JoinDialog;->activity:Landroid/app/Activity;

    invoke-direct {v1, v2}, Landroid/widget/TextView;-><init>(Landroid/content/Context;)V

    .line 305
    const-string v2, "\u203a"

    invoke-virtual {v1, v2}, Landroid/widget/TextView;->setText(Ljava/lang/CharSequence;)V

    .line 306
    const/high16 v2, 0x41900000    # 18.0f

    invoke-virtual {v1, v7, v2}, Landroid/widget/TextView;->setTextSize(IF)V

    .line 307
    const-string v2, "#cccccc"

    invoke-static {v2}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v2

    invoke-virtual {v1, v2}, Landroid/widget/TextView;->setTextColor(I)V

    .line 308
    invoke-virtual {v0, v1}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 310
    new-instance v1, Lcom/adverify/sdk/JoinDialog$$ExternalSyntheticLambda0;

    invoke-direct {v1, p0, p1}, Lcom/adverify/sdk/JoinDialog$$ExternalSyntheticLambda0;-><init>(Lcom/adverify/sdk/JoinDialog;Lcom/adverify/sdk/internal/models/JoinLink;)V

    invoke-virtual {v0, v1}, Landroid/widget/LinearLayout;->setOnClickListener(Landroid/view/View$OnClickListener;)V

    .line 318
    return-object v0
.end method

.method private dp(I)I
    .registers 4

    .line 322
    int-to-float p1, p1

    iget-object v0, p0, Lcom/adverify/sdk/JoinDialog;->activity:Landroid/app/Activity;

    .line 324
    invoke-virtual {v0}, Landroid/app/Activity;->getResources()Landroid/content/res/Resources;

    move-result-object v0

    invoke-virtual {v0}, Landroid/content/res/Resources;->getDisplayMetrics()Landroid/util/DisplayMetrics;

    move-result-object v0

    .line 322
    const/4 v1, 0x1

    invoke-static {v1, p1, v0}, Landroid/util/TypedValue;->applyDimension(IFLandroid/util/DisplayMetrics;)F

    move-result p1

    float-to-int p1, p1

    return p1
.end method


# virtual methods
.method synthetic lambda$buildLinkCard$1$com-adverify-sdk-JoinDialog(Lcom/adverify/sdk/internal/models/JoinLink;Landroid/view/View;)V
    .registers 5

    .line 311
    iget-object p2, p1, Lcom/adverify/sdk/internal/models/JoinLink;->url:Ljava/lang/String;

    if-eqz p2, :cond_21

    iget-object p2, p1, Lcom/adverify/sdk/internal/models/JoinLink;->url:Ljava/lang/String;

    invoke-virtual {p2}, Ljava/lang/String;->isEmpty()Z

    move-result p2

    if-nez p2, :cond_21

    .line 313
    :try_start_c
    iget-object p2, p0, Lcom/adverify/sdk/JoinDialog;->activity:Landroid/app/Activity;

    new-instance v0, Landroid/content/Intent;

    const-string v1, "android.intent.action.VIEW"

    iget-object p1, p1, Lcom/adverify/sdk/internal/models/JoinLink;->url:Ljava/lang/String;

    invoke-static {p1}, Landroid/net/Uri;->parse(Ljava/lang/String;)Landroid/net/Uri;

    move-result-object p1

    invoke-direct {v0, v1, p1}, Landroid/content/Intent;-><init>(Ljava/lang/String;Landroid/net/Uri;)V

    invoke-virtual {p2, v0}, Landroid/app/Activity;->startActivity(Landroid/content/Intent;)V
    :try_end_1e
    .catch Ljava/lang/Exception; {:try_start_c .. :try_end_1e} :catch_1f

    goto :goto_20

    .line 314
    :catch_1f
    move-exception p1

    :goto_20
    nop

    .line 316
    :cond_21
    return-void
.end method

.method synthetic lambda$show$0$com-adverify-sdk-JoinDialog(Landroid/view/View;)V
    .registers 2

    .line 159
    iget-object p1, p0, Lcom/adverify/sdk/JoinDialog;->dialog:Landroid/app/Dialog;

    invoke-virtual {p1}, Landroid/app/Dialog;->dismiss()V

    return-void
.end method

.method show()V
    .registers 15

    .line 43
    new-instance v0, Landroid/app/Dialog;

    iget-object v1, p0, Lcom/adverify/sdk/JoinDialog;->activity:Landroid/app/Activity;

    invoke-direct {v0, v1}, Landroid/app/Dialog;-><init>(Landroid/content/Context;)V

    iput-object v0, p0, Lcom/adverify/sdk/JoinDialog;->dialog:Landroid/app/Dialog;

    .line 44
    const/4 v1, 0x1

    invoke-virtual {v0, v1}, Landroid/app/Dialog;->requestWindowFeature(I)Z

    .line 45
    iget-object v0, p0, Lcom/adverify/sdk/JoinDialog;->dialog:Landroid/app/Dialog;

    invoke-virtual {v0, v1}, Landroid/app/Dialog;->setCancelable(Z)V

    .line 47
    new-instance v0, Landroid/widget/LinearLayout;

    iget-object v2, p0, Lcom/adverify/sdk/JoinDialog;->activity:Landroid/app/Activity;

    invoke-direct {v0, v2}, Landroid/widget/LinearLayout;-><init>(Landroid/content/Context;)V

    .line 48
    invoke-virtual {v0, v1}, Landroid/widget/LinearLayout;->setOrientation(I)V

    .line 49
    const/16 v2, 0x16

    invoke-direct {p0, v2}, Lcom/adverify/sdk/JoinDialog;->dp(I)I

    move-result v3

    const/16 v4, 0x1c

    invoke-direct {p0, v4}, Lcom/adverify/sdk/JoinDialog;->dp(I)I

    move-result v4

    invoke-direct {p0, v2}, Lcom/adverify/sdk/JoinDialog;->dp(I)I

    move-result v5

    invoke-direct {p0, v2}, Lcom/adverify/sdk/JoinDialog;->dp(I)I

    move-result v2

    invoke-virtual {v0, v3, v4, v5, v2}, Landroid/widget/LinearLayout;->setPadding(IIII)V

    .line 50
    invoke-virtual {v0, v1}, Landroid/widget/LinearLayout;->setGravity(I)V

    .line 52
    new-instance v2, Landroid/graphics/drawable/GradientDrawable;

    invoke-direct {v2}, Landroid/graphics/drawable/GradientDrawable;-><init>()V

    .line 53
    const-string v3, "#fafafa"

    invoke-static {v3}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v3

    invoke-virtual {v2, v3}, Landroid/graphics/drawable/GradientDrawable;->setColor(I)V

    .line 54
    const/16 v3, 0x12

    invoke-direct {p0, v3}, Lcom/adverify/sdk/JoinDialog;->dp(I)I

    move-result v3

    int-to-float v3, v3

    invoke-virtual {v2, v3}, Landroid/graphics/drawable/GradientDrawable;->setCornerRadius(F)V

    .line 55
    invoke-virtual {v0, v2}, Landroid/widget/LinearLayout;->setBackground(Landroid/graphics/drawable/Drawable;)V

    .line 58
    new-instance v2, Lcom/adverify/sdk/JoinDialog$1;

    iget-object v3, p0, Lcom/adverify/sdk/JoinDialog;->activity:Landroid/app/Activity;

    invoke-direct {v2, p0, v3}, Lcom/adverify/sdk/JoinDialog$1;-><init>(Lcom/adverify/sdk/JoinDialog;Landroid/content/Context;)V

    .line 102
    new-instance v3, Landroid/widget/LinearLayout$LayoutParams;

    const/16 v4, 0x2c

    invoke-direct {p0, v4}, Lcom/adverify/sdk/JoinDialog;->dp(I)I

    move-result v5

    invoke-direct {p0, v4}, Lcom/adverify/sdk/JoinDialog;->dp(I)I

    move-result v4

    invoke-direct {v3, v5, v4}, Landroid/widget/LinearLayout$LayoutParams;-><init>(II)V

    .line 103
    iput v1, v3, Landroid/widget/LinearLayout$LayoutParams;->gravity:I

    .line 104
    const/16 v4, 0xc

    invoke-direct {p0, v4}, Lcom/adverify/sdk/JoinDialog;->dp(I)I

    move-result v4

    iput v4, v3, Landroid/widget/LinearLayout$LayoutParams;->bottomMargin:I

    .line 105
    invoke-virtual {v2, v3}, Landroid/view/View;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 106
    invoke-virtual {v0, v2}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 109
    new-instance v2, Landroid/widget/TextView;

    iget-object v3, p0, Lcom/adverify/sdk/JoinDialog;->activity:Landroid/app/Activity;

    invoke-direct {v2, v3}, Landroid/widget/TextView;-><init>(Landroid/content/Context;)V

    .line 110
    const-string v3, "Join Our Community"

    invoke-virtual {v2, v3}, Landroid/widget/TextView;->setText(Ljava/lang/CharSequence;)V

    .line 111
    const/high16 v3, 0x41800000    # 16.0f

    const/4 v4, 0x2

    invoke-virtual {v2, v4, v3}, Landroid/widget/TextView;->setTextSize(IF)V

    .line 112
    const-string v3, "#111111"

    invoke-static {v3}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v3

    invoke-virtual {v2, v3}, Landroid/widget/TextView;->setTextColor(I)V

    .line 113
    sget-object v3, Landroid/graphics/Typeface;->DEFAULT_BOLD:Landroid/graphics/Typeface;

    invoke-virtual {v2, v3}, Landroid/widget/TextView;->setTypeface(Landroid/graphics/Typeface;)V

    .line 114
    const/16 v3, 0x11

    invoke-virtual {v2, v3}, Landroid/widget/TextView;->setGravity(I)V

    .line 115
    invoke-virtual {v0, v2}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 118
    new-instance v2, Landroid/widget/TextView;

    iget-object v5, p0, Lcom/adverify/sdk/JoinDialog;->activity:Landroid/app/Activity;

    invoke-direct {v2, v5}, Landroid/widget/TextView;-><init>(Landroid/content/Context;)V

    .line 119
    const-string v5, "Get updates, mods & support"

    invoke-virtual {v2, v5}, Landroid/widget/TextView;->setText(Ljava/lang/CharSequence;)V

    .line 120
    const/high16 v5, 0x41400000    # 12.0f

    invoke-virtual {v2, v4, v5}, Landroid/widget/TextView;->setTextSize(IF)V

    .line 121
    const-string v5, "#999999"

    invoke-static {v5}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v5

    invoke-virtual {v2, v5}, Landroid/widget/TextView;->setTextColor(I)V

    .line 122
    invoke-virtual {v2, v3}, Landroid/widget/TextView;->setGravity(I)V

    .line 123
    new-instance v3, Landroid/widget/LinearLayout$LayoutParams;

    const/4 v5, -0x1

    const/4 v6, -0x2

    invoke-direct {v3, v5, v6}, Landroid/widget/LinearLayout$LayoutParams;-><init>(II)V

    .line 126
    invoke-direct {p0, v4}, Lcom/adverify/sdk/JoinDialog;->dp(I)I

    move-result v7

    iput v7, v3, Landroid/widget/LinearLayout$LayoutParams;->topMargin:I

    .line 127
    const/16 v7, 0x10

    invoke-direct {p0, v7}, Lcom/adverify/sdk/JoinDialog;->dp(I)I

    move-result v7

    iput v7, v3, Landroid/widget/LinearLayout$LayoutParams;->bottomMargin:I

    .line 128
    invoke-virtual {v2, v3}, Landroid/widget/TextView;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 129
    invoke-virtual {v0, v2}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 132
    iget-object v2, p0, Lcom/adverify/sdk/JoinDialog;->links:[Lcom/adverify/sdk/internal/models/JoinLink;

    const/4 v3, 0x0

    if-eqz v2, :cond_ec

    .line 133
    array-length v7, v2

    const/4 v8, 0x0

    :goto_de
    if-ge v8, v7, :cond_ec

    aget-object v9, v2, v8

    .line 134
    invoke-direct {p0, v9}, Lcom/adverify/sdk/JoinDialog;->buildLinkCard(Lcom/adverify/sdk/internal/models/JoinLink;)Landroid/widget/LinearLayout;

    move-result-object v9

    invoke-virtual {v0, v9}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 133
    add-int/lit8 v8, v8, 0x1

    goto :goto_de

    .line 139
    :cond_ec
    new-instance v2, Landroid/widget/Button;

    iget-object v7, p0, Lcom/adverify/sdk/JoinDialog;->activity:Landroid/app/Activity;

    invoke-direct {v2, v7}, Landroid/widget/Button;-><init>(Landroid/content/Context;)V

    .line 140
    const-string v7, "Close"

    invoke-virtual {v2, v7}, Landroid/widget/Button;->setText(Ljava/lang/CharSequence;)V

    .line 141
    const-string v7, "#888888"

    invoke-static {v7}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v7

    invoke-virtual {v2, v7}, Landroid/widget/Button;->setTextColor(I)V

    .line 142
    const/high16 v7, 0x41500000    # 13.0f

    invoke-virtual {v2, v4, v7}, Landroid/widget/Button;->setTextSize(IF)V

    .line 143
    invoke-virtual {v2, v3}, Landroid/widget/Button;->setAllCaps(Z)V

    .line 144
    sget-object v4, Landroid/graphics/Typeface;->DEFAULT:Landroid/graphics/Typeface;

    invoke-virtual {v2, v4, v3}, Landroid/widget/Button;->setTypeface(Landroid/graphics/Typeface;I)V

    .line 146
    new-instance v3, Landroid/graphics/drawable/GradientDrawable;

    invoke-direct {v3}, Landroid/graphics/drawable/GradientDrawable;-><init>()V

    .line 147
    invoke-virtual {v3, v5}, Landroid/graphics/drawable/GradientDrawable;->setColor(I)V

    .line 148
    const/16 v4, 0xa

    invoke-direct {p0, v4}, Lcom/adverify/sdk/JoinDialog;->dp(I)I

    move-result v7

    int-to-float v7, v7

    invoke-virtual {v3, v7}, Landroid/graphics/drawable/GradientDrawable;->setCornerRadius(F)V

    .line 149
    invoke-direct {p0, v1}, Lcom/adverify/sdk/JoinDialog;->dp(I)I

    move-result v7

    const-string v8, "#eeeeee"

    invoke-static {v8}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v8

    invoke-virtual {v3, v7, v8}, Landroid/graphics/drawable/GradientDrawable;->setStroke(II)V

    .line 150
    new-instance v7, Landroid/graphics/drawable/RippleDrawable;

    .line 151
    const-string v8, "#f0f0f0"

    invoke-static {v8}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v8

    invoke-static {v8}, Landroid/content/res/ColorStateList;->valueOf(I)Landroid/content/res/ColorStateList;

    move-result-object v8

    const/4 v9, 0x0

    invoke-direct {v7, v8, v3, v9}, Landroid/graphics/drawable/RippleDrawable;-><init>(Landroid/content/res/ColorStateList;Landroid/graphics/drawable/Drawable;Landroid/graphics/drawable/Drawable;)V

    .line 150
    invoke-virtual {v2, v7}, Landroid/widget/Button;->setBackground(Landroid/graphics/drawable/Drawable;)V

    .line 152
    const/16 v3, 0x18

    invoke-direct {p0, v3}, Lcom/adverify/sdk/JoinDialog;->dp(I)I

    move-result v7

    invoke-direct {p0, v4}, Lcom/adverify/sdk/JoinDialog;->dp(I)I

    move-result v8

    invoke-direct {p0, v3}, Lcom/adverify/sdk/JoinDialog;->dp(I)I

    move-result v3

    invoke-direct {p0, v4}, Lcom/adverify/sdk/JoinDialog;->dp(I)I

    move-result v4

    invoke-virtual {v2, v7, v8, v3, v4}, Landroid/widget/Button;->setPadding(IIII)V

    .line 154
    new-instance v3, Landroid/widget/LinearLayout$LayoutParams;

    invoke-direct {v3, v5, v6}, Landroid/widget/LinearLayout$LayoutParams;-><init>(II)V

    .line 157
    const/16 v4, 0xe

    invoke-direct {p0, v4}, Lcom/adverify/sdk/JoinDialog;->dp(I)I

    move-result v4

    iput v4, v3, Landroid/widget/LinearLayout$LayoutParams;->topMargin:I

    .line 158
    invoke-virtual {v2, v3}, Landroid/widget/Button;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 159
    new-instance v3, Lcom/adverify/sdk/JoinDialog$$ExternalSyntheticLambda1;

    invoke-direct {v3, p0}, Lcom/adverify/sdk/JoinDialog$$ExternalSyntheticLambda1;-><init>(Lcom/adverify/sdk/JoinDialog;)V

    invoke-virtual {v2, v3}, Landroid/widget/Button;->setOnClickListener(Landroid/view/View$OnClickListener;)V

    .line 160
    invoke-virtual {v0, v2}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 162
    iget-object v2, p0, Lcom/adverify/sdk/JoinDialog;->dialog:Landroid/app/Dialog;

    invoke-virtual {v2, v0}, Landroid/app/Dialog;->setContentView(Landroid/view/View;)V

    .line 164
    iget-object v2, p0, Lcom/adverify/sdk/JoinDialog;->dialog:Landroid/app/Dialog;

    invoke-virtual {v2}, Landroid/app/Dialog;->getWindow()Landroid/view/Window;

    move-result-object v2

    if-eqz v2, :cond_198

    .line 165
    iget-object v2, p0, Lcom/adverify/sdk/JoinDialog;->dialog:Landroid/app/Dialog;

    invoke-virtual {v2}, Landroid/app/Dialog;->getWindow()Landroid/view/Window;

    move-result-object v2

    const v3, 0x106000d

    invoke-virtual {v2, v3}, Landroid/view/Window;->setBackgroundDrawableResource(I)V

    .line 166
    iget-object v2, p0, Lcom/adverify/sdk/JoinDialog;->dialog:Landroid/app/Dialog;

    invoke-virtual {v2}, Landroid/app/Dialog;->getWindow()Landroid/view/Window;

    move-result-object v2

    const/16 v3, 0x136

    invoke-direct {p0, v3}, Lcom/adverify/sdk/JoinDialog;->dp(I)I

    move-result v3

    invoke-virtual {v2, v3, v6}, Landroid/view/Window;->setLayout(II)V

    .line 169
    :cond_198
    iget-object v2, p0, Lcom/adverify/sdk/JoinDialog;->dialog:Landroid/app/Dialog;

    invoke-virtual {v2}, Landroid/app/Dialog;->show()V

    .line 172
    new-instance v2, Landroid/view/animation/AnimationSet;

    invoke-direct {v2, v1}, Landroid/view/animation/AnimationSet;-><init>(Z)V

    .line 173
    new-instance v1, Landroid/view/animation/DecelerateInterpolator;

    invoke-direct {v1}, Landroid/view/animation/DecelerateInterpolator;-><init>()V

    invoke-virtual {v2, v1}, Landroid/view/animation/AnimationSet;->setInterpolator(Landroid/view/animation/Interpolator;)V

    .line 174
    const-wide/16 v3, 0xc8

    invoke-virtual {v2, v3, v4}, Landroid/view/animation/AnimationSet;->setDuration(J)V

    .line 175
    new-instance v1, Landroid/view/animation/AlphaAnimation;

    const/4 v3, 0x0

    const/high16 v4, 0x3f800000    # 1.0f

    invoke-direct {v1, v3, v4}, Landroid/view/animation/AlphaAnimation;-><init>(FF)V

    invoke-virtual {v2, v1}, Landroid/view/animation/AnimationSet;->addAnimation(Landroid/view/animation/Animation;)V

    .line 176
    new-instance v1, Landroid/view/animation/ScaleAnimation;

    const v6, 0x3f733333    # 0.95f

    const/high16 v7, 0x3f800000    # 1.0f

    const v8, 0x3f733333    # 0.95f

    const/high16 v9, 0x3f800000    # 1.0f

    const/4 v10, 0x1

    const/high16 v11, 0x3f000000    # 0.5f

    const/4 v12, 0x1

    const/high16 v13, 0x3f000000    # 0.5f

    move-object v5, v1

    invoke-direct/range {v5 .. v13}, Landroid/view/animation/ScaleAnimation;-><init>(FFFFIFIF)V

    invoke-virtual {v2, v1}, Landroid/view/animation/AnimationSet;->addAnimation(Landroid/view/animation/Animation;)V

    .line 181
    invoke-virtual {v0, v2}, Landroid/widget/LinearLayout;->startAnimation(Landroid/view/animation/Animation;)V

    .line 182
    return-void
.end method
