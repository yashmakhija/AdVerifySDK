.class public final synthetic Lcom/adverify/sdk/JoinDialog$$ExternalSyntheticLambda0;
.super Ljava/lang/Object;
.source "D8$$SyntheticClass"

# interfaces
.implements Landroid/view/View$OnClickListener;


# instance fields
.field public final synthetic f$0:Lcom/adverify/sdk/JoinDialog;

.field public final synthetic f$1:Lcom/adverify/sdk/internal/models/JoinLink;


# direct methods
.method public synthetic constructor <init>(Lcom/adverify/sdk/JoinDialog;Lcom/adverify/sdk/internal/models/JoinLink;)V
    .registers 3

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    iput-object p1, p0, Lcom/adverify/sdk/JoinDialog$$ExternalSyntheticLambda0;->f$0:Lcom/adverify/sdk/JoinDialog;

    iput-object p2, p0, Lcom/adverify/sdk/JoinDialog$$ExternalSyntheticLambda0;->f$1:Lcom/adverify/sdk/internal/models/JoinLink;

    return-void
.end method


# virtual methods
.method public final onClick(Landroid/view/View;)V
    .registers 4

    iget-object v0, p0, Lcom/adverify/sdk/JoinDialog$$ExternalSyntheticLambda0;->f$0:Lcom/adverify/sdk/JoinDialog;

    iget-object v1, p0, Lcom/adverify/sdk/JoinDialog$$ExternalSyntheticLambda0;->f$1:Lcom/adverify/sdk/internal/models/JoinLink;

    invoke-virtual {v0, v1, p1}, Lcom/adverify/sdk/JoinDialog;->lambda$buildLinkCard$1$com-adverify-sdk-JoinDialog(Lcom/adverify/sdk/internal/models/JoinLink;Landroid/view/View;)V

    return-void
.end method
