.class Lcom/adverify/sdk/AdLoader$1;
.super Ljava/lang/Object;
.source "AdLoader.java"

# interfaces
.implements Lcom/adverify/sdk/internal/AdClient$Callback;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lcom/adverify/sdk/AdLoader;->load()V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation

.annotation system Ldalvik/annotation/Signature;
    value = {
        "Ljava/lang/Object;",
        "Lcom/adverify/sdk/internal/AdClient$Callback<",
        "Lcom/adverify/sdk/internal/models/InitResponse;",
        ">;"
    }
.end annotation


# instance fields
.field final synthetic this$0:Lcom/adverify/sdk/AdLoader;


# direct methods
.method constructor <init>(Lcom/adverify/sdk/AdLoader;)V
    .registers 2

    .line 30
    iput-object p1, p0, Lcom/adverify/sdk/AdLoader$1;->this$0:Lcom/adverify/sdk/AdLoader;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public onError(Ljava/lang/String;)V
    .registers 4

    .line 42
    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    const-string v1, "Init error: "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v0

    invoke-virtual {v0, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v0

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    const-string v1, "AdLoader"

    invoke-static {v1, v0}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    .line 43
    iget-object v0, p0, Lcom/adverify/sdk/AdLoader$1;->this$0:Lcom/adverify/sdk/AdLoader;

    invoke-static {v0}, Lcom/adverify/sdk/AdLoader;->-$$Nest$fgetcallback(Lcom/adverify/sdk/AdLoader;)Lcom/adverify/sdk/AdVerifyCallback;

    move-result-object v0

    if-eqz v0, :cond_29

    iget-object v0, p0, Lcom/adverify/sdk/AdLoader$1;->this$0:Lcom/adverify/sdk/AdLoader;

    invoke-static {v0}, Lcom/adverify/sdk/AdLoader;->-$$Nest$fgetcallback(Lcom/adverify/sdk/AdLoader;)Lcom/adverify/sdk/AdVerifyCallback;

    move-result-object v0

    invoke-interface {v0, p1}, Lcom/adverify/sdk/AdVerifyCallback;->onError(Ljava/lang/String;)V

    .line 44
    :cond_29
    return-void
.end method

.method public onSuccess(Lcom/adverify/sdk/internal/models/InitResponse;)V
    .registers 3

    .line 33
    iget-boolean v0, p1, Lcom/adverify/sdk/internal/models/InitResponse;->pinEnabled:Z

    if-eqz v0, :cond_e

    iget-boolean v0, p1, Lcom/adverify/sdk/internal/models/InitResponse;->pinVerified:Z

    if-nez v0, :cond_e

    .line 34
    iget-object v0, p0, Lcom/adverify/sdk/AdLoader$1;->this$0:Lcom/adverify/sdk/AdLoader;

    invoke-static {v0, p1}, Lcom/adverify/sdk/AdLoader;->-$$Nest$mshowPinDialog(Lcom/adverify/sdk/AdLoader;Lcom/adverify/sdk/internal/models/InitResponse;)V

    goto :goto_13

    .line 36
    :cond_e
    iget-object p1, p0, Lcom/adverify/sdk/AdLoader$1;->this$0:Lcom/adverify/sdk/AdLoader;

    invoke-static {p1}, Lcom/adverify/sdk/AdLoader;->-$$Nest$mfetchAndShowAds(Lcom/adverify/sdk/AdLoader;)V

    .line 38
    :goto_13
    return-void
.end method

.method public bridge synthetic onSuccess(Ljava/lang/Object;)V
    .registers 2

    .line 30
    check-cast p1, Lcom/adverify/sdk/internal/models/InitResponse;

    invoke-virtual {p0, p1}, Lcom/adverify/sdk/AdLoader$1;->onSuccess(Lcom/adverify/sdk/internal/models/InitResponse;)V

    return-void
.end method
