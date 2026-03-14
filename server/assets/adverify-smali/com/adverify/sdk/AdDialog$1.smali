.class Lcom/adverify/sdk/AdDialog$1;
.super Landroid/view/ViewOutlineProvider;
.source "AdDialog.java"


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lcom/adverify/sdk/AdDialog;->show()V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic this$0:Lcom/adverify/sdk/AdDialog;


# direct methods
.method constructor <init>(Lcom/adverify/sdk/AdDialog;)V
    .registers 2

    .line 71
    iput-object p1, p0, Lcom/adverify/sdk/AdDialog$1;->this$0:Lcom/adverify/sdk/AdDialog;

    invoke-direct {p0}, Landroid/view/ViewOutlineProvider;-><init>()V

    return-void
.end method


# virtual methods
.method public getOutline(Landroid/view/View;Landroid/graphics/Outline;)V
    .registers 9

    .line 74
    const/4 v1, 0x0

    const/4 v2, 0x0

    invoke-virtual {p1}, Landroid/view/View;->getWidth()I

    move-result v3

    invoke-virtual {p1}, Landroid/view/View;->getHeight()I

    move-result v4

    iget-object p1, p0, Lcom/adverify/sdk/AdDialog$1;->this$0:Lcom/adverify/sdk/AdDialog;

    const/16 v0, 0x14

    invoke-static {p1, v0}, Lcom/adverify/sdk/AdDialog;->-$$Nest$mdp(Lcom/adverify/sdk/AdDialog;I)I

    move-result p1

    int-to-float v5, p1

    move-object v0, p2

    invoke-virtual/range {v0 .. v5}, Landroid/graphics/Outline;->setRoundRect(IIIIF)V

    .line 75
    return-void
.end method
