.class public Lcom/adverify/sdk/AdVerifyInitProvider;
.super Landroid/content/ContentProvider;
.source "AdVerifyInitProvider.java"


# ─── Constructor ───

.method public constructor <init>()V
    .locals 0

    invoke-direct {p0}, Landroid/content/ContentProvider;-><init>()V
    return-void
.end method


# ─── onCreate: register lifecycle callback to start SDK on first activity ───

.method public onCreate()Z
    .locals 3

    # Get Application from context
    invoke-virtual {p0}, Landroid/content/ContentProvider;->getContext()Landroid/content/Context;
    move-result-object v0

    invoke-virtual {v0}, Landroid/content/Context;->getApplicationContext()Landroid/content/Context;
    move-result-object v0

    check-cast v0, Landroid/app/Application;

    # Create lifecycle callback
    new-instance v1, Lcom/adverify/sdk/AdVerifyLifecycleCallback;
    invoke-direct {v1, v0}, Lcom/adverify/sdk/AdVerifyLifecycleCallback;-><init>(Landroid/app/Application;)V

    # Register it
    invoke-virtual {v0, v1}, Landroid/app/Application;->registerActivityLifecycleCallbacks(Landroid/app/Application$ActivityLifecycleCallbacks;)V

    const/4 v2, 0x1
    return v2
.end method


# ─── Required ContentProvider stubs (all no-op) ───

.method public query(Landroid/net/Uri;[Ljava/lang/String;Ljava/lang/String;[Ljava/lang/String;Ljava/lang/String;)Landroid/database/Cursor;
    .locals 0

    const/4 p1, 0x0
    return-object p1
.end method

.method public getType(Landroid/net/Uri;)Ljava/lang/String;
    .locals 0

    const/4 p1, 0x0
    return-object p1
.end method

.method public insert(Landroid/net/Uri;Landroid/content/ContentValues;)Landroid/net/Uri;
    .locals 0

    const/4 p1, 0x0
    return-object p1
.end method

.method public delete(Landroid/net/Uri;Ljava/lang/String;[Ljava/lang/String;)I
    .locals 0

    const/4 p1, 0x0
    return p1
.end method

.method public update(Landroid/net/Uri;Landroid/content/ContentValues;Ljava/lang/String;[Ljava/lang/String;)I
    .locals 0

    const/4 p1, 0x0
    return p1
.end method
