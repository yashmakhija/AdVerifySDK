.class public final synthetic Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda11;
.super Ljava/lang/Object;
.source "D8$$SyntheticClass"

# interfaces
.implements Ljava/lang/Runnable;


# instance fields
.field public final synthetic f$0:Lcom/adverify/sdk/internal/AdClient$Callback;

.field public final synthetic f$1:Ljava/lang/Exception;


# direct methods
.method public synthetic constructor <init>(Lcom/adverify/sdk/internal/AdClient$Callback;Ljava/lang/Exception;)V
    .registers 3

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    iput-object p1, p0, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda11;->f$0:Lcom/adverify/sdk/internal/AdClient$Callback;

    iput-object p2, p0, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda11;->f$1:Ljava/lang/Exception;

    return-void
.end method


# virtual methods
.method public final run()V
    .registers 3

    iget-object v0, p0, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda11;->f$0:Lcom/adverify/sdk/internal/AdClient$Callback;

    iget-object v1, p0, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda11;->f$1:Ljava/lang/Exception;

    invoke-static {v0, v1}, Lcom/adverify/sdk/internal/AdClient;->lambda$verifyPin$7(Lcom/adverify/sdk/internal/AdClient$Callback;Ljava/lang/Exception;)V

    return-void
.end method
