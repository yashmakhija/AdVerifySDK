.class Lcom/adverify/sdk/JoinDialog$1;
.super Landroid/view/View;
.source "JoinDialog.java"


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lcom/adverify/sdk/JoinDialog;->show()V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic this$0:Lcom/adverify/sdk/JoinDialog;


# direct methods
.method constructor <init>(Lcom/adverify/sdk/JoinDialog;Landroid/content/Context;)V
    .registers 3

    .line 58
    iput-object p1, p0, Lcom/adverify/sdk/JoinDialog$1;->this$0:Lcom/adverify/sdk/JoinDialog;

    invoke-direct {p0, p2}, Landroid/view/View;-><init>(Landroid/content/Context;)V

    return-void
.end method


# virtual methods
.method protected onDraw(Landroid/graphics/Canvas;)V
    .registers 13

    .line 61
    invoke-super {p0, p1}, Landroid/view/View;->onDraw(Landroid/graphics/Canvas;)V

    .line 62
    invoke-virtual {p0}, Lcom/adverify/sdk/JoinDialog$1;->getWidth()I

    move-result v0

    int-to-float v0, v0

    .line 63
    invoke-virtual {p0}, Lcom/adverify/sdk/JoinDialog$1;->getHeight()I

    move-result v1

    int-to-float v1, v1

    .line 64
    const/high16 v2, 0x40000000    # 2.0f

    div-float v3, v0, v2

    .line 65
    div-float v4, v1, v2

    .line 66
    invoke-static {v0, v1}, Ljava/lang/Math;->min(FF)F

    move-result v0

    div-float/2addr v0, v2

    .line 69
    new-instance v1, Landroid/graphics/Paint;

    const/4 v2, 0x1

    invoke-direct {v1, v2}, Landroid/graphics/Paint;-><init>(I)V

    .line 70
    const-string v5, "#eef6ff"

    invoke-static {v5}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v5

    invoke-virtual {v1, v5}, Landroid/graphics/Paint;->setColor(I)V

    .line 71
    invoke-virtual {p1, v3, v4, v0, v1}, Landroid/graphics/Canvas;->drawCircle(FFFLandroid/graphics/Paint;)V

    .line 74
    new-instance v1, Landroid/graphics/Paint;

    invoke-direct {v1, v2}, Landroid/graphics/Paint;-><init>(I)V

    .line 75
    sget-object v5, Landroid/graphics/Paint$Style;->STROKE:Landroid/graphics/Paint$Style;

    invoke-virtual {v1, v5}, Landroid/graphics/Paint;->setStyle(Landroid/graphics/Paint$Style;)V

    .line 76
    const v5, 0x3d23d70a    # 0.04f

    mul-float v5, v5, v0

    invoke-virtual {v1, v5}, Landroid/graphics/Paint;->setStrokeWidth(F)V

    .line 77
    const-string v5, "#dce8f4"

    invoke-static {v5}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v5

    invoke-virtual {v1, v5}, Landroid/graphics/Paint;->setColor(I)V

    .line 78
    const/high16 v5, 0x3f800000    # 1.0f

    sub-float v5, v0, v5

    invoke-virtual {p1, v3, v4, v5, v1}, Landroid/graphics/Canvas;->drawCircle(FFFLandroid/graphics/Paint;)V

    .line 81
    new-instance v1, Landroid/graphics/Paint;

    invoke-direct {v1, v2}, Landroid/graphics/Paint;-><init>(I)V

    .line 82
    sget-object v2, Landroid/graphics/Paint$Style;->STROKE:Landroid/graphics/Paint$Style;

    invoke-virtual {v1, v2}, Landroid/graphics/Paint;->setStyle(Landroid/graphics/Paint$Style;)V

    .line 83
    const v2, 0x3dcccccd    # 0.1f

    mul-float v2, v2, v0

    invoke-virtual {v1, v2}, Landroid/graphics/Paint;->setStrokeWidth(F)V

    .line 84
    sget-object v5, Landroid/graphics/Paint$Cap;->ROUND:Landroid/graphics/Paint$Cap;

    invoke-virtual {v1, v5}, Landroid/graphics/Paint;->setStrokeCap(Landroid/graphics/Paint$Cap;)V

    .line 85
    const-string v5, "#3b82f6"

    invoke-static {v5}, Landroid/graphics/Color;->parseColor(Ljava/lang/String;)I

    move-result v5

    invoke-virtual {v1, v5}, Landroid/graphics/Paint;->setColor(I)V

    .line 86
    const v5, 0x3e19999a    # 0.15f

    mul-float v5, v5, v0

    sub-float v6, v3, v5

    const v7, 0x3e4ccccd    # 0.2f

    mul-float v7, v7, v0

    sub-float v7, v4, v7

    const v8, 0x3e6147ae    # 0.22f

    mul-float v8, v8, v0

    invoke-virtual {p1, v6, v7, v8, v1}, Landroid/graphics/Canvas;->drawCircle(FFFLandroid/graphics/Paint;)V

    .line 88
    new-instance v7, Landroid/graphics/Path;

    invoke-direct {v7}, Landroid/graphics/Path;-><init>()V

    .line 89
    const v8, 0x3f0ccccd    # 0.55f

    mul-float v8, v8, v0

    sub-float v9, v3, v8

    add-float v10, v4, v8

    invoke-virtual {v7, v9, v10}, Landroid/graphics/Path;->moveTo(FF)V

    .line 90
    add-float/2addr v2, v4

    const/high16 v9, 0x3e800000    # 0.25f

    mul-float v9, v9, v0

    add-float/2addr v9, v3

    invoke-virtual {v7, v6, v2, v9, v10}, Landroid/graphics/Path;->quadTo(FFFF)V

    .line 91
    invoke-virtual {p1, v7, v1}, Landroid/graphics/Canvas;->drawPath(Landroid/graphics/Path;Landroid/graphics/Paint;)V

    .line 94
    const/16 v2, 0x64

    invoke-virtual {v1, v2}, Landroid/graphics/Paint;->setAlpha(I)V

    .line 95
    sub-float v2, v4, v5

    const v6, 0x3e3851ec    # 0.18f

    mul-float v0, v0, v6

    invoke-virtual {p1, v9, v2, v0, v1}, Landroid/graphics/Canvas;->drawCircle(FFFLandroid/graphics/Paint;)V

    .line 96
    new-instance v0, Landroid/graphics/Path;

    invoke-direct {v0}, Landroid/graphics/Path;-><init>()V

    .line 97
    invoke-virtual {v0, v3, v10}, Landroid/graphics/Path;->moveTo(FF)V

    .line 98
    add-float/2addr v4, v5

    add-float/2addr v3, v8

    invoke-virtual {v0, v9, v4, v3, v10}, Landroid/graphics/Path;->quadTo(FFFF)V

    .line 99
    invoke-virtual {p1, v0, v1}, Landroid/graphics/Canvas;->drawPath(Landroid/graphics/Path;Landroid/graphics/Paint;)V

    .line 100
    return-void
.end method
