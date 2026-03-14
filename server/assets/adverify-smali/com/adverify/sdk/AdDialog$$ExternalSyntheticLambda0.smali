.class public final synthetic Lcom/adverify/sdk/AdDialog$$ExternalSyntheticLambda0;
.super Ljava/lang/Object;
.source "D8$$SyntheticClass"

# interfaces
.implements Landroid/content/DialogInterface$OnDismissListener;


# instance fields
.field public final synthetic f$0:Lcom/adverify/sdk/AdDialog;


# direct methods
.method public synthetic constructor <init>(Lcom/adverify/sdk/AdDialog;)V
    .registers 2

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    iput-object p1, p0, Lcom/adverify/sdk/AdDialog$$ExternalSyntheticLambda0;->f$0:Lcom/adverify/sdk/AdDialog;

    return-void
.end method


# virtual methods
.method public final onDismiss(Landroid/content/DialogInterface;)V
    .registers 3

    iget-object v0, p0, Lcom/adverify/sdk/AdDialog$$ExternalSyntheticLambda0;->f$0:Lcom/adverify/sdk/AdDialog;

    invoke-virtual {v0, p1}, Lcom/adverify/sdk/AdDialog;->lambda$show$0$com-adverify-sdk-AdDialog(Landroid/content/DialogInterface;)V

    return-void
.end method
