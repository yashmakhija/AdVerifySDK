.class Lcom/adverify/sdk/PinVerifyDialog$2;
.super Landroid/view/View;
.source "PinVerifyDialog.java"


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lcom/adverify/sdk/PinVerifyDialog;->buildInfoCard()Landroid/widget/LinearLayout;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic this$0:Lcom/adverify/sdk/PinVerifyDialog;

.field final synthetic val$dotColor:I

.field final synthetic val$iconColor:I

.field final synthetic val$iconType:Ljava/lang/String;


# direct methods
.method constructor <init>(Lcom/adverify/sdk/PinVerifyDialog;Landroid/content/Context;IILjava/lang/String;)V
    .registers 6

    .line 490
    iput-object p1, p0, Lcom/adverify/sdk/PinVerifyDialog$2;->this$0:Lcom/adverify/sdk/PinVerifyDialog;

    iput p3, p0, Lcom/adverify/sdk/PinVerifyDialog$2;->val$dotColor:I

    iput p4, p0, Lcom/adverify/sdk/PinVerifyDialog$2;->val$iconColor:I

    iput-object p5, p0, Lcom/adverify/sdk/PinVerifyDialog$2;->val$iconType:Ljava/lang/String;

    invoke-direct {p0, p2}, Landroid/view/View;-><init>(Landroid/content/Context;)V

    return-void
.end method


# virtual methods
.method protected onDraw(Landroid/graphics/Canvas;)V
    .registers 12

    .line 493
    invoke-super {p0, p1}, Landroid/view/View;->onDraw(Landroid/graphics/Canvas;)V

    .line 494
    invoke-virtual {p0}, Lcom/adverify/sdk/PinVerifyDialog$2;->getWidth()I

    move-result v0

    int-to-float v0, v0

    invoke-virtual {p0}, Lcom/adverify/sdk/PinVerifyDialog$2;->getHeight()I

    move-result v1

    int-to-float v9, v1

    .line 495
    new-instance v8, Landroid/graphics/Paint;

    const/4 v1, 0x1

    invoke-direct {v8, v1}, Landroid/graphics/Paint;-><init>(I)V

    .line 496
    iget v1, p0, Lcom/adverify/sdk/PinVerifyDialog$2;->val$dotColor:I

    invoke-virtual {v8, v1}, Landroid/graphics/Paint;->setColor(I)V

    .line 497
    const/4 v2, 0x0

    const/4 v3, 0x0

    iget-object v1, p0, Lcom/adverify/sdk/PinVerifyDialog$2;->this$0:Lcom/adverify/sdk/PinVerifyDialog;

    const/16 v4, 0x8

    invoke-static {v1, v4}, Lcom/adverify/sdk/PinVerifyDialog;->-$$Nest$mdp(Lcom/adverify/sdk/PinVerifyDialog;I)I

    move-result v1

    int-to-float v6, v1

    iget-object v1, p0, Lcom/adverify/sdk/PinVerifyDialog$2;->this$0:Lcom/adverify/sdk/PinVerifyDialog;

    invoke-static {v1, v4}, Lcom/adverify/sdk/PinVerifyDialog;->-$$Nest$mdp(Lcom/adverify/sdk/PinVerifyDialog;I)I

    move-result v1

    int-to-float v7, v1

    move-object v1, p1

    move v4, v0

    move v5, v9

    invoke-virtual/range {v1 .. v8}, Landroid/graphics/Canvas;->drawRoundRect(FFFFFFLandroid/graphics/Paint;)V

    .line 498
    iget-object v1, p0, Lcom/adverify/sdk/PinVerifyDialog$2;->this$0:Lcom/adverify/sdk/PinVerifyDialog;

    iget v5, p0, Lcom/adverify/sdk/PinVerifyDialog$2;->val$iconColor:I

    iget-object v6, p0, Lcom/adverify/sdk/PinVerifyDialog$2;->val$iconType:Ljava/lang/String;

    move-object v2, p1

    move v3, v0

    move v4, v9

    invoke-static/range {v1 .. v6}, Lcom/adverify/sdk/PinVerifyDialog;->-$$Nest$mdrawDotIcon(Lcom/adverify/sdk/PinVerifyDialog;Landroid/graphics/Canvas;FFILjava/lang/String;)V

    .line 499
    return-void
.end method
