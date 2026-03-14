.class interface abstract Lcom/adverify/sdk/PinVerifyDialog$PinListener;
.super Ljava/lang/Object;
.source "PinVerifyDialog.java"


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Lcom/adverify/sdk/PinVerifyDialog;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x608
    name = "PinListener"
.end annotation


# virtual methods
.method public abstract onExitClicked()V
.end method

.method public abstract onGetPinClicked(Lcom/adverify/sdk/PinVerifyDialog;)V
.end method

.method public abstract onJoinClicked()V
.end method

.method public abstract onMaxAttemptsReached()V
.end method

.method public abstract onPinSubmit(Ljava/lang/String;Lcom/adverify/sdk/PinVerifyDialog;)V
.end method

.method public abstract onTutorialClicked()V
.end method
