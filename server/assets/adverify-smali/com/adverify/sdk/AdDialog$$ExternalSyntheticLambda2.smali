.class public final synthetic Lcom/adverify/sdk/AdDialog$$ExternalSyntheticLambda2;
.super Ljava/lang/Object;
.source "D8$$SyntheticClass"

# interfaces
.implements Landroid/view/View$OnClickListener;


# instance fields
.field public final synthetic f$0:Lcom/adverify/sdk/AdDialog;

.field public final synthetic f$1:Landroid/app/Dialog;


# direct methods
.method public synthetic constructor <init>(Lcom/adverify/sdk/AdDialog;Landroid/app/Dialog;)V
    .registers 3

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    iput-object p1, p0, Lcom/adverify/sdk/AdDialog$$ExternalSyntheticLambda2;->f$0:Lcom/adverify/sdk/AdDialog;

    iput-object p2, p0, Lcom/adverify/sdk/AdDialog$$ExternalSyntheticLambda2;->f$1:Landroid/app/Dialog;

    return-void
.end method


# virtual methods
.method public final onClick(Landroid/view/View;)V
    .registers 4

    iget-object v0, p0, Lcom/adverify/sdk/AdDialog$$ExternalSyntheticLambda2;->f$0:Lcom/adverify/sdk/AdDialog;

    iget-object v1, p0, Lcom/adverify/sdk/AdDialog$$ExternalSyntheticLambda2;->f$1:Landroid/app/Dialog;

    invoke-virtual {v0, v1, p1}, Lcom/adverify/sdk/AdDialog;->lambda$show$2$com-adverify-sdk-AdDialog(Landroid/app/Dialog;Landroid/view/View;)V

    return-void
.end method
