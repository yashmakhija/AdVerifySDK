.class Lcom/adverify/sdk/JoinDialog$2;
.super Landroid/view/View;
.source "JoinDialog.java"


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lcom/adverify/sdk/JoinDialog;->buildLinkCard(Lcom/adverify/sdk/internal/models/JoinLink;)Landroid/widget/LinearLayout;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic this$0:Lcom/adverify/sdk/JoinDialog;

.field final synthetic val$iconBgColor:I

.field final synthetic val$iconColor:I

.field final synthetic val$isTelegram:Z


# direct methods
.method constructor <init>(Lcom/adverify/sdk/JoinDialog;Landroid/content/Context;IIZ)V
    .registers 6

    .line 208
    iput-object p1, p0, Lcom/adverify/sdk/JoinDialog$2;->this$0:Lcom/adverify/sdk/JoinDialog;

    iput p3, p0, Lcom/adverify/sdk/JoinDialog$2;->val$iconBgColor:I

    iput p4, p0, Lcom/adverify/sdk/JoinDialog$2;->val$iconColor:I

    iput-boolean p5, p0, Lcom/adverify/sdk/JoinDialog$2;->val$isTelegram:Z

    invoke-direct {p0, p2}, Landroid/view/View;-><init>(Landroid/content/Context;)V

    return-void
.end method


# virtual methods
.method protected onDraw(Landroid/graphics/Canvas;)V
    .registers 19

    .line 211
    move-object/from16 v0, p0

    move-object/from16 v9, p1

    invoke-super/range {p0 .. p1}, Landroid/view/View;->onDraw(Landroid/graphics/Canvas;)V

    .line 212
    invoke-virtual/range {p0 .. p0}, Lcom/adverify/sdk/JoinDialog$2;->getWidth()I

    move-result v1

    int-to-float v10, v1

    .line 213
    invoke-virtual/range {p0 .. p0}, Lcom/adverify/sdk/JoinDialog$2;->getHeight()I

    move-result v1

    int-to-float v11, v1

    .line 214
    const/high16 v1, 0x40000000    # 2.0f

    div-float v12, v10, v1

    .line 215
    div-float v13, v11, v1

    .line 218
    new-instance v8, Landroid/graphics/Paint;

    const/4 v14, 0x1

    invoke-direct {v8, v14}, Landroid/graphics/Paint;-><init>(I)V

    .line 219
    iget v1, v0, Lcom/adverify/sdk/JoinDialog$2;->val$iconBgColor:I

    invoke-virtual {v8, v1}, Landroid/graphics/Paint;->setColor(I)V

    .line 220
    const/4 v2, 0x0

    const/4 v3, 0x0

    const v1, 0x3e8a3d71    # 0.27f

    mul-float v6, v10, v1

    mul-float v7, v11, v1

    move-object/from16 v1, p1

    move v4, v10

    move v5, v11

    invoke-virtual/range {v1 .. v8}, Landroid/graphics/Canvas;->drawRoundRect(FFFFFFLandroid/graphics/Paint;)V

    .line 222
    new-instance v6, Landroid/graphics/Paint;

    invoke-direct {v6, v14}, Landroid/graphics/Paint;-><init>(I)V

    .line 223
    iget v1, v0, Lcom/adverify/sdk/JoinDialog$2;->val$iconColor:I

    invoke-virtual {v6, v1}, Landroid/graphics/Paint;->setColor(I)V

    .line 224
    sget-object v1, Landroid/graphics/Paint$Style;->STROKE:Landroid/graphics/Paint$Style;

    invoke-virtual {v6, v1}, Landroid/graphics/Paint;->setStyle(Landroid/graphics/Paint$Style;)V

    .line 225
    const v1, 0x3d851eb8    # 0.065f

    mul-float v1, v1, v10

    invoke-virtual {v6, v1}, Landroid/graphics/Paint;->setStrokeWidth(F)V

    .line 226
    sget-object v1, Landroid/graphics/Paint$Cap;->ROUND:Landroid/graphics/Paint$Cap;

    invoke-virtual {v6, v1}, Landroid/graphics/Paint;->setStrokeCap(Landroid/graphics/Paint$Cap;)V

    .line 227
    sget-object v1, Landroid/graphics/Paint$Join;->ROUND:Landroid/graphics/Paint$Join;

    invoke-virtual {v6, v1}, Landroid/graphics/Paint;->setStrokeJoin(Landroid/graphics/Paint$Join;)V

    .line 229
    iget-boolean v1, v0, Lcom/adverify/sdk/JoinDialog$2;->val$isTelegram:Z

    const v2, 0x3dcccccd    # 0.1f

    const/16 v3, 0xff

    const/16 v4, 0x1e

    const/high16 v5, 0x3e800000    # 0.25f

    if-eqz v1, :cond_af

    .line 231
    new-instance v1, Landroid/graphics/Path;

    invoke-direct {v1}, Landroid/graphics/Path;-><init>()V

    .line 232
    const v7, 0x3e99999a    # 0.3f

    mul-float v7, v7, v10

    sub-float v8, v12, v7

    invoke-virtual {v1, v8, v13}, Landroid/graphics/Path;->moveTo(FF)V

    .line 233
    add-float/2addr v7, v12

    mul-float v5, v5, v11

    sub-float v8, v13, v5

    invoke-virtual {v1, v7, v8}, Landroid/graphics/Path;->lineTo(FF)V

    .line 234
    mul-float v2, v2, v10

    add-float/2addr v2, v12

    add-float/2addr v5, v13

    invoke-virtual {v1, v2, v5}, Landroid/graphics/Path;->lineTo(FF)V

    .line 235
    const v2, 0x3d4ccccd    # 0.05f

    mul-float v10, v10, v2

    sub-float v5, v12, v10

    mul-float v11, v11, v2

    add-float v10, v13, v11

    invoke-virtual {v1, v5, v10}, Landroid/graphics/Path;->lineTo(FF)V

    .line 236
    invoke-virtual {v1}, Landroid/graphics/Path;->close()V

    .line 237
    sget-object v2, Landroid/graphics/Paint$Style;->FILL_AND_STROKE:Landroid/graphics/Paint$Style;

    invoke-virtual {v6, v2}, Landroid/graphics/Paint;->setStyle(Landroid/graphics/Paint$Style;)V

    .line 238
    invoke-virtual {v6, v4}, Landroid/graphics/Paint;->setAlpha(I)V

    .line 239
    invoke-virtual {v9, v1, v6}, Landroid/graphics/Canvas;->drawPath(Landroid/graphics/Path;Landroid/graphics/Paint;)V

    .line 240
    invoke-virtual {v6, v3}, Landroid/graphics/Paint;->setAlpha(I)V

    .line 241
    sget-object v2, Landroid/graphics/Paint$Style;->STROKE:Landroid/graphics/Paint$Style;

    invoke-virtual {v6, v2}, Landroid/graphics/Paint;->setStyle(Landroid/graphics/Paint$Style;)V

    .line 242
    invoke-virtual {v9, v1, v6}, Landroid/graphics/Canvas;->drawPath(Landroid/graphics/Path;Landroid/graphics/Paint;)V

    .line 243
    move-object/from16 v1, p1

    move v2, v7

    move v3, v8

    move v4, v12

    move v5, v10

    invoke-virtual/range {v1 .. v6}, Landroid/graphics/Canvas;->drawLine(FFFFLandroid/graphics/Paint;)V

    .line 244
    goto :goto_11a

    .line 246
    :cond_af
    new-instance v1, Landroid/graphics/Path;

    invoke-direct {v1}, Landroid/graphics/Path;-><init>()V

    .line 247
    const v7, 0x3e4ccccd    # 0.2f

    mul-float v8, v10, v7

    sub-float v14, v12, v8

    const v15, 0x3da3d70a    # 0.08f

    mul-float v16, v11, v15

    sub-float v2, v13, v16

    invoke-virtual {v1, v14, v2}, Landroid/graphics/Path;->moveTo(FF)V

    .line 248
    mul-float v15, v15, v10

    sub-float v15, v12, v15

    invoke-virtual {v1, v15, v2}, Landroid/graphics/Path;->lineTo(FF)V

    .line 249
    add-float/2addr v8, v12

    mul-float v2, v11, v5

    sub-float v2, v13, v2

    invoke-virtual {v1, v8, v2}, Landroid/graphics/Path;->lineTo(FF)V

    .line 250
    mul-float v7, v7, v11

    add-float/2addr v7, v13

    invoke-virtual {v1, v8, v7}, Landroid/graphics/Path;->lineTo(FF)V

    .line 251
    add-float v2, v13, v16

    invoke-virtual {v1, v15, v2}, Landroid/graphics/Path;->lineTo(FF)V

    .line 252
    invoke-virtual {v1, v14, v2}, Landroid/graphics/Path;->lineTo(FF)V

    .line 253
    invoke-virtual {v1}, Landroid/graphics/Path;->close()V

    .line 254
    sget-object v2, Landroid/graphics/Paint$Style;->FILL_AND_STROKE:Landroid/graphics/Paint$Style;

    invoke-virtual {v6, v2}, Landroid/graphics/Paint;->setStyle(Landroid/graphics/Paint$Style;)V

    .line 255
    invoke-virtual {v6, v4}, Landroid/graphics/Paint;->setAlpha(I)V

    .line 256
    invoke-virtual {v9, v1, v6}, Landroid/graphics/Canvas;->drawPath(Landroid/graphics/Path;Landroid/graphics/Paint;)V

    .line 257
    invoke-virtual {v6, v3}, Landroid/graphics/Paint;->setAlpha(I)V

    .line 258
    sget-object v2, Landroid/graphics/Paint$Style;->STROKE:Landroid/graphics/Paint$Style;

    invoke-virtual {v6, v2}, Landroid/graphics/Paint;->setStyle(Landroid/graphics/Paint$Style;)V

    .line 259
    invoke-virtual {v9, v1, v6}, Landroid/graphics/Canvas;->drawPath(Landroid/graphics/Path;Landroid/graphics/Paint;)V

    .line 262
    new-instance v1, Landroid/graphics/Path;

    invoke-direct {v1}, Landroid/graphics/Path;-><init>()V

    .line 263
    mul-float v5, v5, v10

    add-float/2addr v5, v12

    const v2, 0x3dcccccd    # 0.1f

    mul-float v11, v11, v2

    sub-float v2, v13, v11

    invoke-virtual {v1, v5, v2}, Landroid/graphics/Path;->moveTo(FF)V

    .line 264
    const v2, 0x3eb33333    # 0.35f

    mul-float v10, v10, v2

    add-float/2addr v12, v10

    add-float/2addr v11, v13

    invoke-virtual {v1, v12, v13, v5, v11}, Landroid/graphics/Path;->quadTo(FFFF)V

    .line 265
    invoke-virtual {v9, v1, v6}, Landroid/graphics/Canvas;->drawPath(Landroid/graphics/Path;Landroid/graphics/Paint;)V

    .line 267
    :goto_11a
    return-void
.end method
