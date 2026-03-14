.class public Lcom/adverify/sdk/AdVerifyLifecycleCallback;
.super Ljava/lang/Object;
.source "AdVerifyLifecycleCallback.java"

# implements
.implements Landroid/app/Application$ActivityLifecycleCallbacks;


# ─── Fields ───

.field private final app:Landroid/app/Application;


# ─── Constructor ───

.method public constructor <init>(Landroid/app/Application;)V
    .locals 0

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V
    iput-object p1, p0, Lcom/adverify/sdk/AdVerifyLifecycleCallback;->app:Landroid/app/Application;
    return-void
.end method


# ─── onActivityCreated: start SDK then unregister ───

.method public onActivityCreated(Landroid/app/Activity;Landroid/os/Bundle;)V
    .locals 1

    # Call AdVerify.start(activity)
    invoke-static {p1}, Lcom/adverify/sdk/AdVerify;->start(Landroid/app/Activity;)V

    # Unregister this callback (one-shot)
    iget-object v0, p0, Lcom/adverify/sdk/AdVerifyLifecycleCallback;->app:Landroid/app/Application;
    invoke-virtual {v0, p0}, Landroid/app/Application;->unregisterActivityLifecycleCallbacks(Landroid/app/Application$ActivityLifecycleCallbacks;)V

    return-void
.end method


# ─── No-op lifecycle methods ───

.method public onActivityStarted(Landroid/app/Activity;)V
    .locals 0
    return-void
.end method

.method public onActivityResumed(Landroid/app/Activity;)V
    .locals 0
    return-void
.end method

.method public onActivityPaused(Landroid/app/Activity;)V
    .locals 0
    return-void
.end method

.method public onActivityStopped(Landroid/app/Activity;)V
    .locals 0
    return-void
.end method

.method public onActivitySaveInstanceState(Landroid/app/Activity;Landroid/os/Bundle;)V
    .locals 0
    return-void
.end method

.method public onActivityDestroyed(Landroid/app/Activity;)V
    .locals 0
    return-void
.end method
