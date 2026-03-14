.class Lcom/adverify/sdk/AdLoader$4;
.super Ljava/lang/Object;
.source "AdLoader.java"

# interfaces
.implements Lcom/adverify/sdk/AdDialog$AdDialogListener;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lcom/adverify/sdk/AdLoader;->showAd(Lcom/adverify/sdk/internal/models/Ad;)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic this$0:Lcom/adverify/sdk/AdLoader;

.field final synthetic val$ad:Lcom/adverify/sdk/internal/models/Ad;


# direct methods
.method constructor <init>(Lcom/adverify/sdk/AdLoader;Lcom/adverify/sdk/internal/models/Ad;)V
    .registers 3
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "()V"
        }
    .end annotation

    .line 156
    iput-object p1, p0, Lcom/adverify/sdk/AdLoader$4;->this$0:Lcom/adverify/sdk/AdLoader;

    iput-object p2, p0, Lcom/adverify/sdk/AdLoader$4;->val$ad:Lcom/adverify/sdk/internal/models/Ad;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public onClicked(Ljava/lang/String;)V
    .registers 4

    .line 159
    iget-object v0, p0, Lcom/adverify/sdk/AdLoader$4;->this$0:Lcom/adverify/sdk/AdLoader;

    invoke-static {v0}, Lcom/adverify/sdk/AdLoader;->-$$Nest$fgetclient(Lcom/adverify/sdk/AdLoader;)Lcom/adverify/sdk/internal/AdClient;

    move-result-object v0

    iget-object v1, p0, Lcom/adverify/sdk/AdLoader$4;->val$ad:Lcom/adverify/sdk/internal/models/Ad;

    iget v1, v1, Lcom/adverify/sdk/internal/models/Ad;->id:I

    invoke-virtual {v0, v1}, Lcom/adverify/sdk/internal/AdClient;->trackClick(I)V

    .line 160
    iget-object v0, p0, Lcom/adverify/sdk/AdLoader$4;->this$0:Lcom/adverify/sdk/AdLoader;

    invoke-static {v0}, Lcom/adverify/sdk/AdLoader;->-$$Nest$fgetcallback(Lcom/adverify/sdk/AdLoader;)Lcom/adverify/sdk/AdVerifyCallback;

    move-result-object v0

    if-eqz v0, :cond_1e

    iget-object v0, p0, Lcom/adverify/sdk/AdLoader$4;->this$0:Lcom/adverify/sdk/AdLoader;

    invoke-static {v0}, Lcom/adverify/sdk/AdLoader;->-$$Nest$fgetcallback(Lcom/adverify/sdk/AdLoader;)Lcom/adverify/sdk/AdVerifyCallback;

    move-result-object v0

    invoke-interface {v0, p1}, Lcom/adverify/sdk/AdVerifyCallback;->onAdClicked(Ljava/lang/String;)V

    .line 161
    :cond_1e
    return-void
.end method

.method public onClosed()V
    .registers 2

    .line 165
    iget-object v0, p0, Lcom/adverify/sdk/AdLoader$4;->this$0:Lcom/adverify/sdk/AdLoader;

    invoke-static {v0}, Lcom/adverify/sdk/AdLoader;->-$$Nest$fgetcallback(Lcom/adverify/sdk/AdLoader;)Lcom/adverify/sdk/AdVerifyCallback;

    move-result-object v0

    if-eqz v0, :cond_11

    iget-object v0, p0, Lcom/adverify/sdk/AdLoader$4;->this$0:Lcom/adverify/sdk/AdLoader;

    invoke-static {v0}, Lcom/adverify/sdk/AdLoader;->-$$Nest$fgetcallback(Lcom/adverify/sdk/AdLoader;)Lcom/adverify/sdk/AdVerifyCallback;

    move-result-object v0

    invoke-interface {v0}, Lcom/adverify/sdk/AdVerifyCallback;->onAdClosed()V

    .line 166
    :cond_11
    return-void
.end method
