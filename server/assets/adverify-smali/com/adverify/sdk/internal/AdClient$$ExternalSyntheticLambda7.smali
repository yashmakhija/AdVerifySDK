.class public final synthetic Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda7;
.super Ljava/lang/Object;
.source "D8$$SyntheticClass"

# interfaces
.implements Ljava/lang/Runnable;


# instance fields
.field public final synthetic f$0:Lcom/adverify/sdk/internal/AdClient$Callback;

.field public final synthetic f$1:[Lcom/adverify/sdk/internal/models/Ad;


# direct methods
.method public synthetic constructor <init>(Lcom/adverify/sdk/internal/AdClient$Callback;[Lcom/adverify/sdk/internal/models/Ad;)V
    .registers 3

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    iput-object p1, p0, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda7;->f$0:Lcom/adverify/sdk/internal/AdClient$Callback;

    iput-object p2, p0, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda7;->f$1:[Lcom/adverify/sdk/internal/models/Ad;

    return-void
.end method


# virtual methods
.method public final run()V
    .registers 3

    iget-object v0, p0, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda7;->f$0:Lcom/adverify/sdk/internal/AdClient$Callback;

    iget-object v1, p0, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda7;->f$1:[Lcom/adverify/sdk/internal/models/Ad;

    invoke-static {v0, v1}, Lcom/adverify/sdk/internal/AdClient;->lambda$fetchAds$3(Lcom/adverify/sdk/internal/AdClient$Callback;[Lcom/adverify/sdk/internal/models/Ad;)V

    return-void
.end method
