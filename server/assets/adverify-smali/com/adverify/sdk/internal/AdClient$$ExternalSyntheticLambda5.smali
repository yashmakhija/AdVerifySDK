.class public final synthetic Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda5;
.super Ljava/lang/Object;
.source "D8$$SyntheticClass"

# interfaces
.implements Ljava/lang/Runnable;


# instance fields
.field public final synthetic f$0:Lcom/adverify/sdk/internal/AdClient;

.field public final synthetic f$1:Ljava/lang/String;

.field public final synthetic f$2:Lcom/adverify/sdk/internal/AdClient$Callback;


# direct methods
.method public synthetic constructor <init>(Lcom/adverify/sdk/internal/AdClient;Ljava/lang/String;Lcom/adverify/sdk/internal/AdClient$Callback;)V
    .registers 4

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    iput-object p1, p0, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda5;->f$0:Lcom/adverify/sdk/internal/AdClient;

    iput-object p2, p0, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda5;->f$1:Ljava/lang/String;

    iput-object p3, p0, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda5;->f$2:Lcom/adverify/sdk/internal/AdClient$Callback;

    return-void
.end method


# virtual methods
.method public final run()V
    .registers 4

    iget-object v0, p0, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda5;->f$0:Lcom/adverify/sdk/internal/AdClient;

    iget-object v1, p0, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda5;->f$1:Ljava/lang/String;

    iget-object v2, p0, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda5;->f$2:Lcom/adverify/sdk/internal/AdClient$Callback;

    invoke-virtual {v0, v1, v2}, Lcom/adverify/sdk/internal/AdClient;->lambda$init$2$com-adverify-sdk-internal-AdClient(Ljava/lang/String;Lcom/adverify/sdk/internal/AdClient$Callback;)V

    return-void
.end method
