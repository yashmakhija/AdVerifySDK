.class Lcom/adverify/sdk/AdLoader$3;
.super Ljava/lang/Object;
.source "AdLoader.java"

# interfaces
.implements Lcom/adverify/sdk/internal/AdClient$Callback;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lcom/adverify/sdk/AdLoader;->fetchAndShowAds()V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation

.annotation system Ldalvik/annotation/Signature;
    value = {
        "Ljava/lang/Object;",
        "Lcom/adverify/sdk/internal/AdClient$Callback<",
        "[",
        "Lcom/adverify/sdk/internal/models/Ad;",
        ">;"
    }
.end annotation


# instance fields
.field final synthetic this$0:Lcom/adverify/sdk/AdLoader;


# direct methods
.method constructor <init>(Lcom/adverify/sdk/AdLoader;)V
    .registers 2

    .line 133
    iput-object p1, p0, Lcom/adverify/sdk/AdLoader$3;->this$0:Lcom/adverify/sdk/AdLoader;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public onError(Ljava/lang/String;)V
    .registers 4

    .line 145
    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    const-string v1, "Fetch ads error: "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v0

    invoke-virtual {v0, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v0

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    const-string v1, "AdLoader"

    invoke-static {v1, v0}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    .line 146
    iget-object v0, p0, Lcom/adverify/sdk/AdLoader$3;->this$0:Lcom/adverify/sdk/AdLoader;

    invoke-static {v0}, Lcom/adverify/sdk/AdLoader;->-$$Nest$fgetcallback(Lcom/adverify/sdk/AdLoader;)Lcom/adverify/sdk/AdVerifyCallback;

    move-result-object v0

    if-eqz v0, :cond_29

    iget-object v0, p0, Lcom/adverify/sdk/AdLoader$3;->this$0:Lcom/adverify/sdk/AdLoader;

    invoke-static {v0}, Lcom/adverify/sdk/AdLoader;->-$$Nest$fgetcallback(Lcom/adverify/sdk/AdLoader;)Lcom/adverify/sdk/AdVerifyCallback;

    move-result-object v0

    invoke-interface {v0, p1}, Lcom/adverify/sdk/AdVerifyCallback;->onError(Ljava/lang/String;)V

    .line 147
    :cond_29
    return-void
.end method

.method public bridge synthetic onSuccess(Ljava/lang/Object;)V
    .registers 2

    .line 133
    check-cast p1, [Lcom/adverify/sdk/internal/models/Ad;

    invoke-virtual {p0, p1}, Lcom/adverify/sdk/AdLoader$3;->onSuccess([Lcom/adverify/sdk/internal/models/Ad;)V

    return-void
.end method

.method public onSuccess([Lcom/adverify/sdk/internal/models/Ad;)V
    .registers 4

    .line 136
    array-length v0, p1

    if-nez v0, :cond_17

    .line 137
    iget-object p1, p0, Lcom/adverify/sdk/AdLoader$3;->this$0:Lcom/adverify/sdk/AdLoader;

    invoke-static {p1}, Lcom/adverify/sdk/AdLoader;->-$$Nest$fgetcallback(Lcom/adverify/sdk/AdLoader;)Lcom/adverify/sdk/AdVerifyCallback;

    move-result-object p1

    if-eqz p1, :cond_16

    iget-object p1, p0, Lcom/adverify/sdk/AdLoader$3;->this$0:Lcom/adverify/sdk/AdLoader;

    invoke-static {p1}, Lcom/adverify/sdk/AdLoader;->-$$Nest$fgetcallback(Lcom/adverify/sdk/AdLoader;)Lcom/adverify/sdk/AdVerifyCallback;

    move-result-object p1

    const-string v0, "No ads available"

    invoke-interface {p1, v0}, Lcom/adverify/sdk/AdVerifyCallback;->onError(Ljava/lang/String;)V

    .line 138
    :cond_16
    return-void

    .line 140
    :cond_17
    iget-object v0, p0, Lcom/adverify/sdk/AdLoader$3;->this$0:Lcom/adverify/sdk/AdLoader;

    const/4 v1, 0x0

    aget-object p1, p1, v1

    invoke-static {v0, p1}, Lcom/adverify/sdk/AdLoader;->-$$Nest$mshowAd(Lcom/adverify/sdk/AdLoader;Lcom/adverify/sdk/internal/models/Ad;)V

    .line 141
    return-void
.end method
