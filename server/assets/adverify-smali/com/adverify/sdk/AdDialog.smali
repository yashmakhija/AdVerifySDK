.class Lcom/adverify/sdk/AdDialog;
.super Ljava/lang/Object;
.source "AdDialog.java"


# annotations
.annotation system Ldalvik/annotation/MemberClasses;
    value = {
        Lcom/adverify/sdk/AdDialog$AdDialogListener;
    }
.end annotation


# instance fields
.field private final activity:Landroid/app/Activity;

.field private final ad:Lcom/adverify/sdk/internal/models/Ad;

.field private final listener:Lcom/adverify/sdk/AdDialog$AdDialogListener;


# direct methods
.method static bridge synthetic -$$Nest$mdp(Lcom/adverify/sdk/AdDialog;I)I
    .registers 2

    invoke-direct {p0, p1}, Lcom/adverify/sdk/AdDialog;->dp(I)I

    move-result p0

    return p0
.end method

.method constructor <init>(Landroid/app/Activity;Lcom/adverify/sdk/internal/models/Ad;Lcom/adverify/sdk/AdDialog$AdDialogListener;)V
    .registers 4

    .line 48
    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    .line 49
    iput-object p1, p0, Lcom/adverify/sdk/AdDialog;->activity:Landroid/app/Activity;

    .line 50
    iput-object p2, p0, Lcom/adverify/sdk/AdDialog;->ad:Lcom/adverify/sdk/internal/models/Ad;

    .line 51
    iput-object p3, p0, Lcom/adverify/sdk/AdDialog;->listener:Lcom/adverify/sdk/AdDialog$AdDialogListener;

    .line 52
    return-void
.end method

.method private dp(I)I
    .registers 4

    .line 221
    int-to-float p1, p1

    iget-object v0, p0, Lcom/adverify/sdk/AdDialog;->activity:Landroid/app/Activity;

    .line 223
    invoke-virtual {v0}, Landroid/app/Activity;->getResources()Landroid/content/res/Resources;

    move-result-object v0

    invoke-virtual {v0}, Landroid/content/res/Resources;->getDisplayMetrics()Landroid/util/DisplayMetrics;

    move-result-object v0

    .line 221
    const/4 v1, 0x1

    invoke-static {v1, p1, v0}, Landroid/util/TypedValue;->applyDimension(IFLandroid/util/DisplayMetrics;)F

    move-result p1

    float-to-int p1, p1

    return p1
.end method

.method static synthetic lambda$loadImage$3(Landroid/widget/ImageView;Landroid/graphics/Bitmap;)V
    .registers 2

    .line 211
    invoke-virtual {p0, p1}, Landroid/widget/ImageView;->setImageBitmap(Landroid/graphics/Bitmap;)V

    return-void
.end method

.method static synthetic lambda$show$1(Landroid/app/Dialog;Landroid/view/View;)V
    .registers 2

    .line 139
    invoke-virtual {p0}, Landroid/app/Dialog;->dismiss()V

    return-void
.end method

.method private loadImage(Ljava/lang/String;Landroid/widget/ImageView;)V
    .registers 5

    .line 198
    new-instance v0, Ljava/lang/Thread;

    new-instance v1, Lcom/adverify/sdk/AdDialog$$ExternalSyntheticLambda4;

    invoke-direct {v1, p0, p1, p2}, Lcom/adverify/sdk/AdDialog$$ExternalSyntheticLambda4;-><init>(Lcom/adverify/sdk/AdDialog;Ljava/lang/String;Landroid/widget/ImageView;)V

    invoke-direct {v0, v1}, Ljava/lang/Thread;-><init>(Ljava/lang/Runnable;)V

    .line 217
    invoke-virtual {v0}, Ljava/lang/Thread;->start()V

    .line 218
    return-void
.end method


# virtual methods
.method synthetic lambda$loadImage$4$com-adverify-sdk-AdDialog(Ljava/lang/String;Landroid/widget/ImageView;)V
    .registers 5

    .line 200
    :try_start_0
    new-instance v0, Ljava/net/URL;

    invoke-direct {v0, p1}, Ljava/net/URL;-><init>(Ljava/lang/String;)V

    invoke-virtual {v0}, Ljava/net/URL;->openConnection()Ljava/net/URLConnection;

    move-result-object p1

    check-cast p1, Ljava/net/HttpURLConnection;

    .line 201
    const/16 v0, 0x1388

    invoke-virtual {p1, v0}, Ljava/net/HttpURLConnection;->setConnectTimeout(I)V

    .line 202
    invoke-virtual {p1, v0}, Ljava/net/HttpURLConnection;->setReadTimeout(I)V

    .line 203
    const/4 v0, 0x1

    invoke-virtual {p1, v0}, Ljava/net/HttpURLConnection;->setDoInput(Z)V

    .line 204
    invoke-virtual {p1}, Ljava/net/HttpURLConnection;->connect()V

    .line 205
    invoke-virtual {p1}, Ljava/net/HttpURLConnection;->getResponseCode()I

    move-result v0

    const/16 v1, 0xc8

    if-ne v0, v1, :cond_3d

    .line 206
    invoke-virtual {p1}, Ljava/net/HttpURLConnection;->getInputStream()Ljava/io/InputStream;

    move-result-object v0

    .line 207
    invoke-static {v0}, Landroid/graphics/BitmapFactory;->decodeStream(Ljava/io/InputStream;)Landroid/graphics/Bitmap;

    move-result-object v1

    .line 208
    invoke-virtual {v0}, Ljava/io/InputStream;->close()V

    .line 209
    invoke-virtual {p1}, Ljava/net/HttpURLConnection;->disconnect()V

    .line 210
    if-eqz v1, :cond_3c

    .line 211
    iget-object p1, p0, Lcom/adverify/sdk/AdDialog;->activity:Landroid/app/Activity;

    new-instance v0, Lcom/adverify/sdk/AdDialog$$ExternalSyntheticLambda3;

    invoke-direct {v0, p2, v1}, Lcom/adverify/sdk/AdDialog$$ExternalSyntheticLambda3;-><init>(Landroid/widget/ImageView;Landroid/graphics/Bitmap;)V

    invoke-virtual {p1, v0}, Landroid/app/Activity;->runOnUiThread(Ljava/lang/Runnable;)V

    .line 213
    :cond_3c
    goto :goto_42

    .line 214
    :cond_3d
    invoke-virtual {p1}, Ljava/net/HttpURLConnection;->disconnect()V
    :try_end_40
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_40} :catch_41

    goto :goto_42

    .line 216
    :catch_41
    move-exception p1

    :goto_42
    nop

    .line 217
    return-void
.end method

.method synthetic lambda$show$0$com-adverify-sdk-AdDialog(Landroid/content/DialogInterface;)V
    .registers 2

    .line 59
    iget-object p1, p0, Lcom/adverify/sdk/AdDialog;->listener:Lcom/adverify/sdk/AdDialog$AdDialogListener;

    if-eqz p1, :cond_7

    invoke-interface {p1}, Lcom/adverify/sdk/AdDialog$AdDialogListener;->onClosed()V

    .line 60
    :cond_7
    return-void
.end method

.method synthetic lambda$show$2$com-adverify-sdk-AdDialog(Landroid/app/Dialog;Landroid/view/View;)V
    .registers 6

    .line 164
    iget-object p2, p0, Lcom/adverify/sdk/AdDialog;->listener:Lcom/adverify/sdk/AdDialog$AdDialogListener;

    if-eqz p2, :cond_b

    iget-object v0, p0, Lcom/adverify/sdk/AdDialog;->ad:Lcom/adverify/sdk/internal/models/Ad;

    iget-object v0, v0, Lcom/adverify/sdk/internal/models/Ad;->redirectUrl:Ljava/lang/String;

    invoke-interface {p2, v0}, Lcom/adverify/sdk/AdDialog$AdDialogListener;->onClicked(Ljava/lang/String;)V

    .line 165
    :cond_b
    iget-object p2, p0, Lcom/adverify/sdk/AdDialog;->ad:Lcom/adverify/sdk/internal/models/Ad;

    iget-object p2, p2, Lcom/adverify/sdk/internal/models/Ad;->redirectUrl:Ljava/lang/String;

    if-eqz p2, :cond_32

    iget-object p2, p0, Lcom/adverify/sdk/AdDialog;->ad:Lcom/adverify/sdk/internal/models/Ad;

    iget-object p2, p2, Lcom/adverify/sdk/internal/models/Ad;->redirectUrl:Ljava/lang/String;

    invoke-virtual {p2}, Ljava/lang/String;->isEmpty()Z

    move-result p2

    if-nez p2, :cond_32

    .line 167
    :try_start_1b
    iget-object p2, p0, Lcom/adverify/sdk/AdDialog;->activity:Landroid/app/Activity;

    new-instance v0, Landroid/content/Intent;

    const-string v1, "android.intent.action.VIEW"

    iget-object v2, p0, Lcom/adverify/sdk/AdDialog;->ad:Lcom/adverify/sdk/internal/models/Ad;

    iget-object v2, v2, Lcom/adverify/sdk/internal/models/Ad;->redirectUrl:Ljava/lang/String;

    invoke-static {v2}, Landroid/net/Uri;->parse(Ljava/lang/String;)Landroid/net/Uri;

    move-result-object v2

    invoke-direct {v0, v1, v2}, Landroid/content/Intent;-><init>(Ljava/lang/String;Landroid/net/Uri;)V

    invoke-virtual {p2, v0}, Landroid/app/Activity;->startActivity(Landroid/content/Intent;)V
    :try_end_2f
    .catch Ljava/lang/Exception; {:try_start_1b .. :try_end_2f} :catch_30

    goto :goto_31

    .line 168
    :catch_30
    move-exception p2

    :goto_31
    nop

    .line 170
    :cond_32
    invoke-virtual {p1}, Landroid/app/Dialog;->dismiss()V

    .line 171
    return-void
.end method

.method show()V
    .registers 24

    .line 55
    move-object/from16 v0, p0

    new-instance v1, Landroid/app/Dialog;

    iget-object v2, v0, Lcom/adverify/sdk/AdDialog;->activity:Landroid/app/Activity;

    invoke-direct {v1, v2}, Landroid/app/Dialog;-><init>(Landroid/content/Context;)V

    .line 56
    const/4 v2, 0x1

    invoke-virtual {v1, v2}, Landroid/app/Dialog;->requestWindowFeature(I)Z

    .line 57
    invoke-virtual {v1, v2}, Landroid/app/Dialog;->setCancelable(Z)V

    .line 58
    new-instance v3, Lcom/adverify/sdk/AdDialog$$ExternalSyntheticLambda0;

    invoke-direct {v3, v0}, Lcom/adverify/sdk/AdDialog$$ExternalSyntheticLambda0;-><init>(Lcom/adverify/sdk/AdDialog;)V

    invoke-virtual {v1, v3}, Landroid/app/Dialog;->setOnDismissListener(Landroid/content/DialogInterface$OnDismissListener;)V

    .line 62
    new-instance v3, Landroid/widget/LinearLayout;

    iget-object v4, v0, Lcom/adverify/sdk/AdDialog;->activity:Landroid/app/Activity;

    invoke-direct {v3, v4}, Landroid/widget/LinearLayout;-><init>(Landroid/content/Context;)V

    .line 63
    invoke-virtual {v3, v2}, Landroid/widget/LinearLayout;->setOrientation(I)V

    .line 64
    const/16 v4, 0x12c

    invoke-direct {v0, v4}, Lcom/adverify/sdk/AdDialog;->dp(I)I

    move-result v4

    invoke-virtual {v3, v4}, Landroid/widget/LinearLayout;->setMinimumWidth(I)V

    .line 66
    new-instance v4, Landroid/graphics/drawable/GradientDrawable;

    invoke-direct {v4}, Landroid/graphics/drawable/GradientDrawable;-><init>()V

    .line 67
    const-string v5, "#fafafa"

    invoke-static {v5}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v5

    invoke-virtual {v4, v5}, Landroid/graphics/drawable/GradientDrawable;->setColor(I)V

    .line 68
    const/16 v5, 0x14

    invoke-direct {v0, v5}, Lcom/adverify/sdk/AdDialog;->dp(I)I

    move-result v6

    int-to-float v6, v6

    invoke-virtual {v4, v6}, Landroid/graphics/drawable/GradientDrawable;->setCornerRadius(F)V

    .line 69
    invoke-virtual {v3, v4}, Landroid/widget/LinearLayout;->setBackground(Landroid/graphics/drawable/Drawable;)V

    .line 70
    invoke-virtual {v3, v2}, Landroid/widget/LinearLayout;->setClipToOutline(Z)V

    .line 71
    new-instance v4, Lcom/adverify/sdk/AdDialog$1;

    invoke-direct {v4, v0}, Lcom/adverify/sdk/AdDialog$1;-><init>(Lcom/adverify/sdk/AdDialog;)V

    invoke-virtual {v3, v4}, Landroid/widget/LinearLayout;->setOutlineProvider(Landroid/view/ViewOutlineProvider;)V

    .line 79
    iget-object v4, v0, Lcom/adverify/sdk/AdDialog;->ad:Lcom/adverify/sdk/internal/models/Ad;

    iget-object v4, v4, Lcom/adverify/sdk/internal/models/Ad;->imageUrl:Ljava/lang/String;

    const/4 v6, -0x1

    if-eqz v4, :cond_8f

    iget-object v4, v0, Lcom/adverify/sdk/AdDialog;->ad:Lcom/adverify/sdk/internal/models/Ad;

    iget-object v4, v4, Lcom/adverify/sdk/internal/models/Ad;->imageUrl:Ljava/lang/String;

    invoke-virtual {v4}, Ljava/lang/String;->isEmpty()Z

    move-result v4

    if-nez v4, :cond_8f

    .line 80
    new-instance v4, Landroid/widget/ImageView;

    iget-object v7, v0, Lcom/adverify/sdk/AdDialog;->activity:Landroid/app/Activity;

    invoke-direct {v4, v7}, Landroid/widget/ImageView;-><init>(Landroid/content/Context;)V

    .line 81
    sget-object v7, Landroid/widget/ImageView$ScaleType;->CENTER_CROP:Landroid/widget/ImageView$ScaleType;

    invoke-virtual {v4, v7}, Landroid/widget/ImageView;->setScaleType(Landroid/widget/ImageView$ScaleType;)V

    .line 82
    const-string v7, "#eeeeee"

    invoke-static {v7}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v7

    invoke-virtual {v4, v7}, Landroid/widget/ImageView;->setBackgroundColor(I)V

    .line 83
    new-instance v7, Landroid/widget/LinearLayout$LayoutParams;

    .line 84
    const/16 v8, 0xa0

    invoke-direct {v0, v8}, Lcom/adverify/sdk/AdDialog;->dp(I)I

    move-result v8

    invoke-direct {v7, v6, v8}, Landroid/widget/LinearLayout$LayoutParams;-><init>(II)V

    .line 85
    invoke-virtual {v4, v7}, Landroid/widget/ImageView;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 86
    invoke-virtual {v3, v4}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 87
    iget-object v7, v0, Lcom/adverify/sdk/AdDialog;->ad:Lcom/adverify/sdk/internal/models/Ad;

    iget-object v7, v7, Lcom/adverify/sdk/internal/models/Ad;->imageUrl:Ljava/lang/String;

    invoke-direct {v0, v7, v4}, Lcom/adverify/sdk/AdDialog;->loadImage(Ljava/lang/String;Landroid/widget/ImageView;)V

    .line 91
    :cond_8f
    new-instance v4, Landroid/widget/LinearLayout;

    iget-object v7, v0, Lcom/adverify/sdk/AdDialog;->activity:Landroid/app/Activity;

    invoke-direct {v4, v7}, Landroid/widget/LinearLayout;-><init>(Landroid/content/Context;)V

    .line 92
    invoke-virtual {v4, v2}, Landroid/widget/LinearLayout;->setOrientation(I)V

    .line 93
    const/16 v7, 0x18

    invoke-direct {v0, v7}, Lcom/adverify/sdk/AdDialog;->dp(I)I

    move-result v8

    invoke-direct {v0, v5}, Lcom/adverify/sdk/AdDialog;->dp(I)I

    move-result v9

    invoke-direct {v0, v7}, Lcom/adverify/sdk/AdDialog;->dp(I)I

    move-result v7

    invoke-direct {v0, v5}, Lcom/adverify/sdk/AdDialog;->dp(I)I

    move-result v10

    invoke-virtual {v4, v8, v9, v7, v10}, Landroid/widget/LinearLayout;->setPadding(IIII)V

    .line 95
    new-instance v7, Landroid/widget/TextView;

    iget-object v8, v0, Lcom/adverify/sdk/AdDialog;->activity:Landroid/app/Activity;

    invoke-direct {v7, v8}, Landroid/widget/TextView;-><init>(Landroid/content/Context;)V

    .line 96
    iget-object v8, v0, Lcom/adverify/sdk/AdDialog;->ad:Lcom/adverify/sdk/internal/models/Ad;

    iget-object v8, v8, Lcom/adverify/sdk/internal/models/Ad;->title:Ljava/lang/String;

    invoke-virtual {v7, v8}, Landroid/widget/TextView;->setText(Ljava/lang/CharSequence;)V

    .line 97
    const/high16 v8, 0x41880000    # 17.0f

    const/4 v9, 0x2

    invoke-virtual {v7, v9, v8}, Landroid/widget/TextView;->setTextSize(IF)V

    .line 98
    const-string v8, "#111111"

    invoke-static {v8}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v10

    invoke-virtual {v7, v10}, Landroid/widget/TextView;->setTextColor(I)V

    .line 99
    sget-object v10, Landroid/graphics/Typeface;->DEFAULT_BOLD:Landroid/graphics/Typeface;

    invoke-virtual {v7, v10}, Landroid/widget/TextView;->setTypeface(Landroid/graphics/Typeface;)V

    .line 100
    invoke-virtual {v4, v7}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 102
    iget-object v7, v0, Lcom/adverify/sdk/AdDialog;->ad:Lcom/adverify/sdk/internal/models/Ad;

    iget-object v7, v7, Lcom/adverify/sdk/internal/models/Ad;->description:Ljava/lang/String;

    const/4 v10, 0x0

    const/high16 v11, 0x41500000    # 13.0f

    const/4 v12, 0x0

    if-eqz v7, :cond_112

    iget-object v7, v0, Lcom/adverify/sdk/AdDialog;->ad:Lcom/adverify/sdk/internal/models/Ad;

    iget-object v7, v7, Lcom/adverify/sdk/internal/models/Ad;->description:Ljava/lang/String;

    invoke-virtual {v7}, Ljava/lang/String;->isEmpty()Z

    move-result v7

    if-nez v7, :cond_112

    .line 103
    new-instance v7, Landroid/widget/TextView;

    iget-object v13, v0, Lcom/adverify/sdk/AdDialog;->activity:Landroid/app/Activity;

    invoke-direct {v7, v13}, Landroid/widget/TextView;-><init>(Landroid/content/Context;)V

    .line 104
    iget-object v13, v0, Lcom/adverify/sdk/AdDialog;->ad:Lcom/adverify/sdk/internal/models/Ad;

    iget-object v13, v13, Lcom/adverify/sdk/internal/models/Ad;->description:Ljava/lang/String;

    invoke-virtual {v7, v13}, Landroid/widget/TextView;->setText(Ljava/lang/CharSequence;)V

    .line 105
    invoke-virtual {v7, v9, v11}, Landroid/widget/TextView;->setTextSize(IF)V

    .line 106
    const-string v13, "#888888"

    invoke-static {v13}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v13

    invoke-virtual {v7, v13}, Landroid/widget/TextView;->setTextColor(I)V

    .line 107
    const/4 v13, 0x6

    invoke-direct {v0, v13}, Lcom/adverify/sdk/AdDialog;->dp(I)I

    move-result v13

    invoke-virtual {v7, v12, v13, v12, v12}, Landroid/widget/TextView;->setPadding(IIII)V

    .line 108
    const v13, 0x3faccccd    # 1.35f

    invoke-virtual {v7, v10, v13}, Landroid/widget/TextView;->setLineSpacing(FF)V

    .line 109
    invoke-virtual {v4, v7}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 113
    :cond_112
    new-instance v7, Landroid/view/View;

    iget-object v13, v0, Lcom/adverify/sdk/AdDialog;->activity:Landroid/app/Activity;

    invoke-direct {v7, v13}, Landroid/view/View;-><init>(Landroid/content/Context;)V

    .line 114
    const-string v13, "#f2f2f2"

    invoke-static {v13}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v13

    invoke-virtual {v7, v13}, Landroid/view/View;->setBackgroundColor(I)V

    .line 115
    new-instance v13, Landroid/widget/LinearLayout$LayoutParams;

    .line 116
    invoke-direct {v0, v2}, Lcom/adverify/sdk/AdDialog;->dp(I)I

    move-result v14

    invoke-direct {v13, v6, v14}, Landroid/widget/LinearLayout$LayoutParams;-><init>(II)V

    .line 117
    const/16 v14, 0x10

    invoke-direct {v0, v14}, Lcom/adverify/sdk/AdDialog;->dp(I)I

    move-result v15

    iput v15, v13, Landroid/widget/LinearLayout$LayoutParams;->topMargin:I

    .line 118
    invoke-virtual {v7, v13}, Landroid/view/View;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 119
    invoke-virtual {v4, v7}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 122
    new-instance v7, Landroid/widget/LinearLayout;

    iget-object v13, v0, Lcom/adverify/sdk/AdDialog;->activity:Landroid/app/Activity;

    invoke-direct {v7, v13}, Landroid/widget/LinearLayout;-><init>(Landroid/content/Context;)V

    .line 123
    invoke-virtual {v7, v12}, Landroid/widget/LinearLayout;->setOrientation(I)V

    .line 124
    invoke-virtual {v7, v14}, Landroid/widget/LinearLayout;->setGravity(I)V

    .line 125
    const/16 v13, 0xc

    invoke-direct {v0, v13}, Lcom/adverify/sdk/AdDialog;->dp(I)I

    move-result v14

    invoke-virtual {v7, v12, v14, v12, v12}, Landroid/widget/LinearLayout;->setPadding(IIII)V

    .line 128
    new-instance v14, Landroid/widget/Button;

    iget-object v15, v0, Lcom/adverify/sdk/AdDialog;->activity:Landroid/app/Activity;

    invoke-direct {v14, v15}, Landroid/widget/Button;-><init>(Landroid/content/Context;)V

    .line 129
    const-string v15, "Close"

    invoke-virtual {v14, v15}, Landroid/widget/Button;->setText(Ljava/lang/CharSequence;)V

    .line 130
    const-string v15, "#999999"

    invoke-static {v15}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v15

    invoke-virtual {v14, v15}, Landroid/widget/Button;->setTextColor(I)V

    .line 131
    invoke-virtual {v14, v9, v11}, Landroid/widget/Button;->setTextSize(IF)V

    .line 132
    invoke-virtual {v14, v12}, Landroid/widget/Button;->setAllCaps(Z)V

    .line 133
    new-instance v15, Landroid/graphics/drawable/GradientDrawable;

    invoke-direct {v15}, Landroid/graphics/drawable/GradientDrawable;-><init>()V

    .line 134
    invoke-virtual {v15, v12}, Landroid/graphics/drawable/GradientDrawable;->setColor(I)V

    .line 135
    const/16 v10, 0x8

    invoke-direct {v0, v10}, Lcom/adverify/sdk/AdDialog;->dp(I)I

    move-result v5

    int-to-float v5, v5

    invoke-virtual {v15, v5}, Landroid/graphics/drawable/GradientDrawable;->setCornerRadius(F)V

    .line 136
    new-instance v5, Landroid/graphics/drawable/RippleDrawable;

    .line 137
    const-string v18, "#f0f0f0"

    invoke-static/range {v18 .. v18}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v18

    invoke-static/range {v18 .. v18}, Landroid/content/res/ColorStateList;->valueOf(I)Landroid/content/res/ColorStateList;

    move-result-object v2

    const/4 v9, 0x0

    invoke-direct {v5, v2, v15, v9}, Landroid/graphics/drawable/RippleDrawable;-><init>(Landroid/content/res/ColorStateList;Landroid/graphics/drawable/Drawable;Landroid/graphics/drawable/Drawable;)V

    .line 136
    invoke-virtual {v14, v5}, Landroid/widget/Button;->setBackground(Landroid/graphics/drawable/Drawable;)V

    .line 138
    invoke-direct {v0, v13}, Lcom/adverify/sdk/AdDialog;->dp(I)I

    move-result v2

    invoke-direct {v0, v10}, Lcom/adverify/sdk/AdDialog;->dp(I)I

    move-result v5

    invoke-direct {v0, v13}, Lcom/adverify/sdk/AdDialog;->dp(I)I

    move-result v13

    invoke-direct {v0, v10}, Lcom/adverify/sdk/AdDialog;->dp(I)I

    move-result v10

    invoke-virtual {v14, v2, v5, v13, v10}, Landroid/widget/Button;->setPadding(IIII)V

    .line 139
    new-instance v2, Lcom/adverify/sdk/AdDialog$$ExternalSyntheticLambda1;

    invoke-direct {v2, v1}, Lcom/adverify/sdk/AdDialog$$ExternalSyntheticLambda1;-><init>(Landroid/app/Dialog;)V

    invoke-virtual {v14, v2}, Landroid/widget/Button;->setOnClickListener(Landroid/view/View$OnClickListener;)V

    .line 140
    invoke-virtual {v7, v14}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 143
    new-instance v2, Landroid/view/View;

    iget-object v5, v0, Lcom/adverify/sdk/AdDialog;->activity:Landroid/app/Activity;

    invoke-direct {v2, v5}, Landroid/view/View;-><init>(Landroid/content/Context;)V

    .line 144
    new-instance v5, Landroid/widget/LinearLayout$LayoutParams;

    const/4 v10, -0x2

    const/high16 v13, 0x3f800000    # 1.0f

    invoke-direct {v5, v12, v10, v13}, Landroid/widget/LinearLayout$LayoutParams;-><init>(IIF)V

    invoke-virtual {v2, v5}, Landroid/view/View;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 146
    invoke-virtual {v7, v2}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 149
    new-instance v2, Landroid/widget/Button;

    iget-object v5, v0, Lcom/adverify/sdk/AdDialog;->activity:Landroid/app/Activity;

    invoke-direct {v2, v5}, Landroid/widget/Button;-><init>(Landroid/content/Context;)V

    .line 150
    iget-object v5, v0, Lcom/adverify/sdk/AdDialog;->ad:Lcom/adverify/sdk/internal/models/Ad;

    iget-object v5, v5, Lcom/adverify/sdk/internal/models/Ad;->buttonText:Ljava/lang/String;

    invoke-virtual {v2, v5}, Landroid/widget/Button;->setText(Ljava/lang/CharSequence;)V

    .line 151
    invoke-virtual {v2, v6}, Landroid/widget/Button;->setTextColor(I)V

    .line 152
    const/4 v5, 0x2

    invoke-virtual {v2, v5, v11}, Landroid/widget/Button;->setTextSize(IF)V

    .line 153
    invoke-virtual {v2, v12}, Landroid/widget/Button;->setAllCaps(Z)V

    .line 154
    sget-object v5, Landroid/graphics/Typeface;->DEFAULT:Landroid/graphics/Typeface;

    const/4 v6, 0x1

    invoke-virtual {v2, v5, v6}, Landroid/widget/Button;->setTypeface(Landroid/graphics/Typeface;I)V

    .line 156
    new-instance v5, Landroid/graphics/drawable/GradientDrawable;

    invoke-direct {v5}, Landroid/graphics/drawable/GradientDrawable;-><init>()V

    .line 157
    invoke-static {v8}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v6

    invoke-virtual {v5, v6}, Landroid/graphics/drawable/GradientDrawable;->setColor(I)V

    .line 158
    const/16 v6, 0xa

    invoke-direct {v0, v6}, Lcom/adverify/sdk/AdDialog;->dp(I)I

    move-result v8

    int-to-float v8, v8

    invoke-virtual {v5, v8}, Landroid/graphics/drawable/GradientDrawable;->setCornerRadius(F)V

    .line 159
    new-instance v8, Landroid/graphics/drawable/RippleDrawable;

    .line 160
    const-string v11, "#333333"

    invoke-static {v11}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v11

    invoke-static {v11}, Landroid/content/res/ColorStateList;->valueOf(I)Landroid/content/res/ColorStateList;

    move-result-object v11

    invoke-direct {v8, v11, v5, v9}, Landroid/graphics/drawable/RippleDrawable;-><init>(Landroid/content/res/ColorStateList;Landroid/graphics/drawable/Drawable;Landroid/graphics/drawable/Drawable;)V

    .line 159
    invoke-virtual {v2, v8}, Landroid/widget/Button;->setBackground(Landroid/graphics/drawable/Drawable;)V

    .line 161
    const/16 v5, 0x14

    invoke-direct {v0, v5}, Lcom/adverify/sdk/AdDialog;->dp(I)I

    move-result v8

    invoke-direct {v0, v6}, Lcom/adverify/sdk/AdDialog;->dp(I)I

    move-result v9

    invoke-direct {v0, v5}, Lcom/adverify/sdk/AdDialog;->dp(I)I

    move-result v5

    invoke-direct {v0, v6}, Lcom/adverify/sdk/AdDialog;->dp(I)I

    move-result v6

    invoke-virtual {v2, v8, v9, v5, v6}, Landroid/widget/Button;->setPadding(IIII)V

    .line 163
    new-instance v5, Lcom/adverify/sdk/AdDialog$$ExternalSyntheticLambda2;

    invoke-direct {v5, v0, v1}, Lcom/adverify/sdk/AdDialog$$ExternalSyntheticLambda2;-><init>(Lcom/adverify/sdk/AdDialog;Landroid/app/Dialog;)V

    invoke-virtual {v2, v5}, Landroid/widget/Button;->setOnClickListener(Landroid/view/View$OnClickListener;)V

    .line 173
    invoke-virtual {v7, v2}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 174
    invoke-virtual {v4, v7}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 175
    invoke-virtual {v3, v4}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 177
    invoke-virtual {v1, v3}, Landroid/app/Dialog;->setContentView(Landroid/view/View;)V

    .line 179
    invoke-virtual {v1}, Landroid/app/Dialog;->getWindow()Landroid/view/Window;

    move-result-object v2

    if-eqz v2, :cond_24e

    .line 180
    invoke-virtual {v1}, Landroid/app/Dialog;->getWindow()Landroid/view/Window;

    move-result-object v2

    const v4, 0x106000d

    invoke-virtual {v2, v4}, Landroid/view/Window;->setBackgroundDrawableResource(I)V

    .line 181
    invoke-virtual {v1}, Landroid/app/Dialog;->getWindow()Landroid/view/Window;

    move-result-object v2

    const/16 v4, 0x154

    invoke-direct {v0, v4}, Lcom/adverify/sdk/AdDialog;->dp(I)I

    move-result v4

    invoke-virtual {v2, v4, v10}, Landroid/view/Window;->setLayout(II)V

    .line 184
    :cond_24e
    invoke-virtual {v1}, Landroid/app/Dialog;->show()V

    .line 187
    new-instance v1, Landroid/view/animation/AnimationSet;

    const/4 v2, 0x1

    invoke-direct {v1, v2}, Landroid/view/animation/AnimationSet;-><init>(Z)V

    .line 188
    new-instance v2, Landroid/view/animation/DecelerateInterpolator;

    invoke-direct {v2}, Landroid/view/animation/DecelerateInterpolator;-><init>()V

    invoke-virtual {v1, v2}, Landroid/view/animation/AnimationSet;->setInterpolator(Landroid/view/animation/Interpolator;)V

    .line 189
    const-wide/16 v4, 0xc8

    invoke-virtual {v1, v4, v5}, Landroid/view/animation/AnimationSet;->setDuration(J)V

    .line 190
    new-instance v2, Landroid/view/animation/AlphaAnimation;

    const/4 v4, 0x0

    invoke-direct {v2, v4, v13}, Landroid/view/animation/AlphaAnimation;-><init>(FF)V

    invoke-virtual {v1, v2}, Landroid/view/animation/AnimationSet;->addAnimation(Landroid/view/animation/Animation;)V

    .line 191
    new-instance v2, Landroid/view/animation/ScaleAnimation;

    const v15, 0x3f733333    # 0.95f

    const/high16 v16, 0x3f800000    # 1.0f

    const v17, 0x3f733333    # 0.95f

    const/high16 v18, 0x3f800000    # 1.0f

    const/16 v19, 0x1

    const/high16 v20, 0x3f000000    # 0.5f

    const/16 v21, 0x1

    const/high16 v22, 0x3f000000    # 0.5f

    move-object v14, v2

    invoke-direct/range {v14 .. v22}, Landroid/view/animation/ScaleAnimation;-><init>(FFFFIFIF)V

    invoke-virtual {v1, v2}, Landroid/view/animation/AnimationSet;->addAnimation(Landroid/view/animation/Animation;)V

    .line 194
    invoke-virtual {v3, v1}, Landroid/widget/LinearLayout;->startAnimation(Landroid/view/animation/Animation;)V

    .line 195
    return-void
.end method
