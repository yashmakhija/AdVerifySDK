.class public final synthetic Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda10;
.super Ljava/lang/Object;
.source "D8$$SyntheticClass"

# interfaces
.implements Ljava/lang/Runnable;


# instance fields
.field public final synthetic f$0:Lcom/adverify/sdk/internal/AdClient$Callback;

.field public final synthetic f$1:Z


# direct methods
.method public synthetic constructor <init>(Lcom/adverify/sdk/internal/AdClient$Callback;Z)V
    .registers 3

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    iput-object p1, p0, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda10;->f$0:Lcom/adverify/sdk/internal/AdClient$Callback;

    iput-boolean p2, p0, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda10;->f$1:Z

    return-void
.end method


# virtual methods
.method public final run()V
    .registers 3

    iget-object v0, p0, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda10;->f$0:Lcom/adverify/sdk/internal/AdClient$Callback;

    iget-boolean v1, p0, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda10;->f$1:Z

    invoke-static {v0, v1}, Lcom/adverify/sdk/internal/AdClient;->lambda$verifyPin$6(Lcom/adverify/sdk/internal/AdClient$Callback;Z)V

    return-void
.end method
