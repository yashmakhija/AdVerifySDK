.class public final synthetic Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda6;
.super Ljava/lang/Object;
.source "D8$$SyntheticClass"

# interfaces
.implements Ljava/lang/Runnable;


# instance fields
.field public final synthetic f$0:Lcom/adverify/sdk/internal/AdClient;

.field public final synthetic f$1:Lcom/adverify/sdk/internal/AdClient$Callback;


# direct methods
.method public synthetic constructor <init>(Lcom/adverify/sdk/internal/AdClient;Lcom/adverify/sdk/internal/AdClient$Callback;)V
    .registers 3

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    iput-object p1, p0, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda6;->f$0:Lcom/adverify/sdk/internal/AdClient;

    iput-object p2, p0, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda6;->f$1:Lcom/adverify/sdk/internal/AdClient$Callback;

    return-void
.end method


# virtual methods
.method public final run()V
    .registers 3

    iget-object v0, p0, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda6;->f$0:Lcom/adverify/sdk/internal/AdClient;

    iget-object v1, p0, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda6;->f$1:Lcom/adverify/sdk/internal/AdClient$Callback;

    invoke-virtual {v0, v1}, Lcom/adverify/sdk/internal/AdClient;->lambda$fetchAds$5$com-adverify-sdk-internal-AdClient(Lcom/adverify/sdk/internal/AdClient$Callback;)V

    return-void
.end method
