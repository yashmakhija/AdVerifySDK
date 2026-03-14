.class Lcom/adverify/sdk/AdLoader$2;
.super Ljava/lang/Object;
.source "AdLoader.java"

# interfaces
.implements Lcom/adverify/sdk/PinVerifyDialog$PinListener;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lcom/adverify/sdk/AdLoader;->showPinDialog(Lcom/adverify/sdk/internal/models/InitResponse;)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic this$0:Lcom/adverify/sdk/AdLoader;

.field final synthetic val$config:Lcom/adverify/sdk/internal/models/InitResponse;


# direct methods
.method constructor <init>(Lcom/adverify/sdk/AdLoader;Lcom/adverify/sdk/internal/models/InitResponse;)V
    .registers 3
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "()V"
        }
    .end annotation

    .line 58
    iput-object p1, p0, Lcom/adverify/sdk/AdLoader$2;->this$0:Lcom/adverify/sdk/AdLoader;

    iput-object p2, p0, Lcom/adverify/sdk/AdLoader$2;->val$config:Lcom/adverify/sdk/internal/models/InitResponse;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public onExitClicked()V
    .registers 2

    .line 125
    iget-object v0, p0, Lcom/adverify/sdk/AdLoader$2;->this$0:Lcom/adverify/sdk/AdLoader;

    invoke-static {v0}, Lcom/adverify/sdk/AdLoader;->-$$Nest$fgetactivity(Lcom/adverify/sdk/AdLoader;)Landroid/app/Activity;

    move-result-object v0

    invoke-virtual {v0}, Landroid/app/Activity;->finish()V

    .line 126
    return-void
.end method

.method public onGetPinClicked(Lcom/adverify/sdk/PinVerifyDialog;)V
    .registers 5

    .line 84
    const/4 v0, 0x1

    invoke-virtual {p1, v0}, Lcom/adverify/sdk/PinVerifyDialog;->setGetPinLoading(Z)V

    .line 85
    iget-object v0, p0, Lcom/adverify/sdk/AdLoader$2;->this$0:Lcom/adverify/sdk/AdLoader;

    invoke-static {v0}, Lcom/adverify/sdk/AdLoader;->-$$Nest$fgetclient(Lcom/adverify/sdk/AdLoader;)Lcom/adverify/sdk/internal/AdClient;

    move-result-object v0

    iget-object v1, p0, Lcom/adverify/sdk/AdLoader$2;->this$0:Lcom/adverify/sdk/AdLoader;

    invoke-static {v1}, Lcom/adverify/sdk/AdLoader;->-$$Nest$fgetdeviceId(Lcom/adverify/sdk/AdLoader;)Ljava/lang/String;

    move-result-object v1

    new-instance v2, Lcom/adverify/sdk/AdLoader$2$2;

    invoke-direct {v2, p0, p1}, Lcom/adverify/sdk/AdLoader$2$2;-><init>(Lcom/adverify/sdk/AdLoader$2;Lcom/adverify/sdk/PinVerifyDialog;)V

    invoke-virtual {v0, v1, v2}, Lcom/adverify/sdk/internal/AdClient;->createLink(Ljava/lang/String;Lcom/adverify/sdk/internal/AdClient$Callback;)V

    .line 99
    return-void
.end method

.method public onJoinClicked()V
    .registers 4

    .line 118
    iget-object v0, p0, Lcom/adverify/sdk/AdLoader$2;->val$config:Lcom/adverify/sdk/internal/models/InitResponse;

    iget-object v0, v0, Lcom/adverify/sdk/internal/models/InitResponse;->joinLinks:[Lcom/adverify/sdk/internal/models/JoinLink;

    if-eqz v0, :cond_1f

    iget-object v0, p0, Lcom/adverify/sdk/AdLoader$2;->val$config:Lcom/adverify/sdk/internal/models/InitResponse;

    iget-object v0, v0, Lcom/adverify/sdk/internal/models/InitResponse;->joinLinks:[Lcom/adverify/sdk/internal/models/JoinLink;

    array-length v0, v0

    if-lez v0, :cond_1f

    .line 119
    new-instance v0, Lcom/adverify/sdk/JoinDialog;

    iget-object v1, p0, Lcom/adverify/sdk/AdLoader$2;->this$0:Lcom/adverify/sdk/AdLoader;

    invoke-static {v1}, Lcom/adverify/sdk/AdLoader;->-$$Nest$fgetactivity(Lcom/adverify/sdk/AdLoader;)Landroid/app/Activity;

    move-result-object v1

    iget-object v2, p0, Lcom/adverify/sdk/AdLoader$2;->val$config:Lcom/adverify/sdk/internal/models/InitResponse;

    iget-object v2, v2, Lcom/adverify/sdk/internal/models/InitResponse;->joinLinks:[Lcom/adverify/sdk/internal/models/JoinLink;

    invoke-direct {v0, v1, v2}, Lcom/adverify/sdk/JoinDialog;-><init>(Landroid/app/Activity;[Lcom/adverify/sdk/internal/models/JoinLink;)V

    invoke-virtual {v0}, Lcom/adverify/sdk/JoinDialog;->show()V

    .line 121
    :cond_1f
    return-void
.end method

.method public onMaxAttemptsReached()V
    .registers 3

    .line 103
    iget-object v0, p0, Lcom/adverify/sdk/AdLoader$2;->this$0:Lcom/adverify/sdk/AdLoader;

    invoke-static {v0}, Lcom/adverify/sdk/AdLoader;->-$$Nest$fgetcallback(Lcom/adverify/sdk/AdLoader;)Lcom/adverify/sdk/AdVerifyCallback;

    move-result-object v0

    if-eqz v0, :cond_13

    iget-object v0, p0, Lcom/adverify/sdk/AdLoader$2;->this$0:Lcom/adverify/sdk/AdLoader;

    invoke-static {v0}, Lcom/adverify/sdk/AdLoader;->-$$Nest$fgetcallback(Lcom/adverify/sdk/AdLoader;)Lcom/adverify/sdk/AdVerifyCallback;

    move-result-object v0

    const-string v1, "Max PIN attempts reached"

    invoke-interface {v0, v1}, Lcom/adverify/sdk/AdVerifyCallback;->onError(Ljava/lang/String;)V

    .line 104
    :cond_13
    return-void
.end method

.method public onPinSubmit(Ljava/lang/String;Lcom/adverify/sdk/PinVerifyDialog;)V
    .registers 6

    .line 61
    const/4 v0, 0x1

    invoke-virtual {p2, v0}, Lcom/adverify/sdk/PinVerifyDialog;->setVerifyLoading(Z)V

    .line 62
    iget-object v0, p0, Lcom/adverify/sdk/AdLoader$2;->this$0:Lcom/adverify/sdk/AdLoader;

    invoke-static {v0}, Lcom/adverify/sdk/AdLoader;->-$$Nest$fgetclient(Lcom/adverify/sdk/AdLoader;)Lcom/adverify/sdk/internal/AdClient;

    move-result-object v0

    iget-object v1, p0, Lcom/adverify/sdk/AdLoader$2;->this$0:Lcom/adverify/sdk/AdLoader;

    invoke-static {v1}, Lcom/adverify/sdk/AdLoader;->-$$Nest$fgetdeviceId(Lcom/adverify/sdk/AdLoader;)Ljava/lang/String;

    move-result-object v1

    new-instance v2, Lcom/adverify/sdk/AdLoader$2$1;

    invoke-direct {v2, p0, p2}, Lcom/adverify/sdk/AdLoader$2$1;-><init>(Lcom/adverify/sdk/AdLoader$2;Lcom/adverify/sdk/PinVerifyDialog;)V

    invoke-virtual {v0, p1, v1, v2}, Lcom/adverify/sdk/internal/AdClient;->verifyPin(Ljava/lang/String;Ljava/lang/String;Lcom/adverify/sdk/internal/AdClient$Callback;)V

    .line 80
    return-void
.end method

.method public onTutorialClicked()V
    .registers 5

    .line 108
    iget-object v0, p0, Lcom/adverify/sdk/AdLoader$2;->val$config:Lcom/adverify/sdk/internal/models/InitResponse;

    iget-object v0, v0, Lcom/adverify/sdk/internal/models/InitResponse;->tutorialUrl:Ljava/lang/String;

    if-eqz v0, :cond_2b

    iget-object v0, p0, Lcom/adverify/sdk/AdLoader$2;->val$config:Lcom/adverify/sdk/internal/models/InitResponse;

    iget-object v0, v0, Lcom/adverify/sdk/internal/models/InitResponse;->tutorialUrl:Ljava/lang/String;

    invoke-virtual {v0}, Ljava/lang/String;->isEmpty()Z

    move-result v0

    if-nez v0, :cond_2b

    .line 110
    :try_start_10
    iget-object v0, p0, Lcom/adverify/sdk/AdLoader$2;->this$0:Lcom/adverify/sdk/AdLoader;

    invoke-static {v0}, Lcom/adverify/sdk/AdLoader;->-$$Nest$fgetactivity(Lcom/adverify/sdk/AdLoader;)Landroid/app/Activity;

    move-result-object v0

    new-instance v1, Landroid/content/Intent;

    const-string v2, "android.intent.action.VIEW"

    iget-object v3, p0, Lcom/adverify/sdk/AdLoader$2;->val$config:Lcom/adverify/sdk/internal/models/InitResponse;

    iget-object v3, v3, Lcom/adverify/sdk/internal/models/InitResponse;->tutorialUrl:Ljava/lang/String;

    .line 111
    invoke-static {v3}, Landroid/net/Uri;->parse(Ljava/lang/String;)Landroid/net/Uri;

    move-result-object v3

    invoke-direct {v1, v2, v3}, Landroid/content/Intent;-><init>(Ljava/lang/String;Landroid/net/Uri;)V

    .line 110
    invoke-virtual {v0, v1}, Landroid/app/Activity;->startActivity(Landroid/content/Intent;)V
    :try_end_28
    .catch Ljava/lang/Exception; {:try_start_10 .. :try_end_28} :catch_29

    goto :goto_2a

    .line 112
    :catch_29
    move-exception v0

    :goto_2a
    nop

    .line 114
    :cond_2b
    return-void
.end method
