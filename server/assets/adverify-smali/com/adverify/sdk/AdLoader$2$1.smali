.class Lcom/adverify/sdk/AdLoader$2$1;
.super Ljava/lang/Object;
.source "AdLoader.java"

# interfaces
.implements Lcom/adverify/sdk/internal/AdClient$Callback;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lcom/adverify/sdk/AdLoader$2;->onPinSubmit(Ljava/lang/String;Lcom/adverify/sdk/PinVerifyDialog;)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation

.annotation system Ldalvik/annotation/Signature;
    value = {
        "Ljava/lang/Object;",
        "Lcom/adverify/sdk/internal/AdClient$Callback<",
        "Ljava/lang/Boolean;",
        ">;"
    }
.end annotation


# instance fields
.field final synthetic this$1:Lcom/adverify/sdk/AdLoader$2;

.field final synthetic val$dlg:Lcom/adverify/sdk/PinVerifyDialog;


# direct methods
.method constructor <init>(Lcom/adverify/sdk/AdLoader$2;Lcom/adverify/sdk/PinVerifyDialog;)V
    .registers 3
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "()V"
        }
    .end annotation

    .line 62
    iput-object p1, p0, Lcom/adverify/sdk/AdLoader$2$1;->this$1:Lcom/adverify/sdk/AdLoader$2;

    iput-object p2, p0, Lcom/adverify/sdk/AdLoader$2$1;->val$dlg:Lcom/adverify/sdk/PinVerifyDialog;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public onError(Ljava/lang/String;)V
    .registers 3

    .line 76
    iget-object p1, p0, Lcom/adverify/sdk/AdLoader$2$1;->val$dlg:Lcom/adverify/sdk/PinVerifyDialog;

    const/4 v0, 0x0

    invoke-virtual {p1, v0}, Lcom/adverify/sdk/PinVerifyDialog;->setVerifyLoading(Z)V

    .line 77
    iget-object p1, p0, Lcom/adverify/sdk/AdLoader$2$1;->val$dlg:Lcom/adverify/sdk/PinVerifyDialog;

    const-string v0, "Verification failed"

    invoke-virtual {p1, v0}, Lcom/adverify/sdk/PinVerifyDialog;->showError(Ljava/lang/String;)V

    .line 78
    return-void
.end method

.method public onSuccess(Ljava/lang/Boolean;)V
    .registers 4

    .line 65
    iget-object v0, p0, Lcom/adverify/sdk/AdLoader$2$1;->val$dlg:Lcom/adverify/sdk/PinVerifyDialog;

    const/4 v1, 0x0

    invoke-virtual {v0, v1}, Lcom/adverify/sdk/PinVerifyDialog;->setVerifyLoading(Z)V

    .line 66
    invoke-virtual {p1}, Ljava/lang/Boolean;->booleanValue()Z

    move-result p1

    if-eqz p1, :cond_19

    .line 67
    iget-object p1, p0, Lcom/adverify/sdk/AdLoader$2$1;->val$dlg:Lcom/adverify/sdk/PinVerifyDialog;

    invoke-virtual {p1}, Lcom/adverify/sdk/PinVerifyDialog;->dismiss()V

    .line 68
    iget-object p1, p0, Lcom/adverify/sdk/AdLoader$2$1;->this$1:Lcom/adverify/sdk/AdLoader$2;

    iget-object p1, p1, Lcom/adverify/sdk/AdLoader$2;->this$0:Lcom/adverify/sdk/AdLoader;

    invoke-static {p1}, Lcom/adverify/sdk/AdLoader;->-$$Nest$mfetchAndShowAds(Lcom/adverify/sdk/AdLoader;)V

    goto :goto_20

    .line 70
    :cond_19
    iget-object p1, p0, Lcom/adverify/sdk/AdLoader$2$1;->val$dlg:Lcom/adverify/sdk/PinVerifyDialog;

    const-string v0, "Invalid PIN. Try again."

    invoke-virtual {p1, v0}, Lcom/adverify/sdk/PinVerifyDialog;->showError(Ljava/lang/String;)V

    .line 72
    :goto_20
    return-void
.end method

.method public bridge synthetic onSuccess(Ljava/lang/Object;)V
    .registers 2

    .line 62
    check-cast p1, Ljava/lang/Boolean;

    invoke-virtual {p0, p1}, Lcom/adverify/sdk/AdLoader$2$1;->onSuccess(Ljava/lang/Boolean;)V

    return-void
.end method
