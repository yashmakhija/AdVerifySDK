.class Lcom/adverify/sdk/AdLoader$2$2;
.super Ljava/lang/Object;
.source "AdLoader.java"

# interfaces
.implements Lcom/adverify/sdk/internal/AdClient$Callback;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lcom/adverify/sdk/AdLoader$2;->onGetPinClicked(Lcom/adverify/sdk/PinVerifyDialog;)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation

.annotation system Ldalvik/annotation/Signature;
    value = {
        "Ljava/lang/Object;",
        "Lcom/adverify/sdk/internal/AdClient$Callback<",
        "Ljava/lang/String;",
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

    .line 85
    iput-object p1, p0, Lcom/adverify/sdk/AdLoader$2$2;->this$1:Lcom/adverify/sdk/AdLoader$2;

    iput-object p2, p0, Lcom/adverify/sdk/AdLoader$2$2;->val$dlg:Lcom/adverify/sdk/PinVerifyDialog;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public onError(Ljava/lang/String;)V
    .registers 3

    .line 95
    iget-object p1, p0, Lcom/adverify/sdk/AdLoader$2$2;->val$dlg:Lcom/adverify/sdk/PinVerifyDialog;

    const/4 v0, 0x0

    invoke-virtual {p1, v0}, Lcom/adverify/sdk/PinVerifyDialog;->setGetPinLoading(Z)V

    .line 96
    iget-object p1, p0, Lcom/adverify/sdk/AdLoader$2$2;->val$dlg:Lcom/adverify/sdk/PinVerifyDialog;

    const-string v0, "Failed to get PIN link"

    invoke-virtual {p1, v0}, Lcom/adverify/sdk/PinVerifyDialog;->showError(Ljava/lang/String;)V

    .line 97
    return-void
.end method

.method public bridge synthetic onSuccess(Ljava/lang/Object;)V
    .registers 2

    .line 85
    check-cast p1, Ljava/lang/String;

    invoke-virtual {p0, p1}, Lcom/adverify/sdk/AdLoader$2$2;->onSuccess(Ljava/lang/String;)V

    return-void
.end method

.method public onSuccess(Ljava/lang/String;)V
    .registers 4

    .line 88
    iget-object v0, p0, Lcom/adverify/sdk/AdLoader$2$2;->val$dlg:Lcom/adverify/sdk/PinVerifyDialog;

    const/4 v1, 0x0

    invoke-virtual {v0, v1}, Lcom/adverify/sdk/PinVerifyDialog;->setGetPinLoading(Z)V

    .line 89
    iget-object v0, p0, Lcom/adverify/sdk/AdLoader$2$2;->val$dlg:Lcom/adverify/sdk/PinVerifyDialog;

    invoke-virtual {v0, p1}, Lcom/adverify/sdk/PinVerifyDialog;->openUrl(Ljava/lang/String;)V

    .line 90
    iget-object p1, p0, Lcom/adverify/sdk/AdLoader$2$2;->val$dlg:Lcom/adverify/sdk/PinVerifyDialog;

    invoke-virtual {p1}, Lcom/adverify/sdk/PinVerifyDialog;->switchToPinState()V

    .line 91
    return-void
.end method
