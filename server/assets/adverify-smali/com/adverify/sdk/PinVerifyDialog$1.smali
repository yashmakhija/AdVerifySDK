.class Lcom/adverify/sdk/PinVerifyDialog$1;
.super Landroid/view/View;
.source "PinVerifyDialog.java"


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lcom/adverify/sdk/PinVerifyDialog;->show()V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic this$0:Lcom/adverify/sdk/PinVerifyDialog;


# direct methods
.method constructor <init>(Lcom/adverify/sdk/PinVerifyDialog;Landroid/content/Context;)V
    .registers 3

    .line 109
    iput-object p1, p0, Lcom/adverify/sdk/PinVerifyDialog$1;->this$0:Lcom/adverify/sdk/PinVerifyDialog;

    invoke-direct {p0, p2}, Landroid/view/View;-><init>(Landroid/content/Context;)V

    return-void
.end method


# virtual methods
.method protected onDraw(Landroid/graphics/Canvas;)V
    .registers 5

    .line 112
    invoke-super {p0, p1}, Landroid/view/View;->onDraw(Landroid/graphics/Canvas;)V

    .line 113
    iget-object v0, p0, Lcom/adverify/sdk/PinVerifyDialog$1;->this$0:Lcom/adverify/sdk/PinVerifyDialog;

    invoke-virtual {p0}, Lcom/adverify/sdk/PinVerifyDialog$1;->getWidth()I

    move-result v1

    int-to-float v1, v1

    invoke-virtual {p0}, Lcom/adverify/sdk/PinVerifyDialog$1;->getHeight()I

    move-result v2

    int-to-float v2, v2

    invoke-static {v0, p1, v1, v2}, Lcom/adverify/sdk/PinVerifyDialog;->-$$Nest$mdrawShieldLock(Lcom/adverify/sdk/PinVerifyDialog;Landroid/graphics/Canvas;FF)V

    .line 114
    return-void
.end method
