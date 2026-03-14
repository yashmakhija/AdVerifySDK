.class public final synthetic Lcom/adverify/sdk/AdDialog$$ExternalSyntheticLambda4;
.super Ljava/lang/Object;
.source "D8$$SyntheticClass"

# interfaces
.implements Ljava/lang/Runnable;


# instance fields
.field public final synthetic f$0:Lcom/adverify/sdk/AdDialog;

.field public final synthetic f$1:Ljava/lang/String;

.field public final synthetic f$2:Landroid/widget/ImageView;


# direct methods
.method public synthetic constructor <init>(Lcom/adverify/sdk/AdDialog;Ljava/lang/String;Landroid/widget/ImageView;)V
    .registers 4

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    iput-object p1, p0, Lcom/adverify/sdk/AdDialog$$ExternalSyntheticLambda4;->f$0:Lcom/adverify/sdk/AdDialog;

    iput-object p2, p0, Lcom/adverify/sdk/AdDialog$$ExternalSyntheticLambda4;->f$1:Ljava/lang/String;

    iput-object p3, p0, Lcom/adverify/sdk/AdDialog$$ExternalSyntheticLambda4;->f$2:Landroid/widget/ImageView;

    return-void
.end method


# virtual methods
.method public final run()V
    .registers 4

    iget-object v0, p0, Lcom/adverify/sdk/AdDialog$$ExternalSyntheticLambda4;->f$0:Lcom/adverify/sdk/AdDialog;

    iget-object v1, p0, Lcom/adverify/sdk/AdDialog$$ExternalSyntheticLambda4;->f$1:Ljava/lang/String;

    iget-object v2, p0, Lcom/adverify/sdk/AdDialog$$ExternalSyntheticLambda4;->f$2:Landroid/widget/ImageView;

    invoke-virtual {v0, v1, v2}, Lcom/adverify/sdk/AdDialog;->lambda$loadImage$4$com-adverify-sdk-AdDialog(Ljava/lang/String;Landroid/widget/ImageView;)V

    return-void
.end method
