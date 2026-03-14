.class public final Lcom/adverify/sdk/AdVerify;
.super Ljava/lang/Object;
.source "AdVerify.java"


# static fields
.field private static final TAG:Ljava/lang/String; = "AdVerify"

.field private static sApiKey:Ljava/lang/String;

.field private static sBaseUrl:Ljava/lang/String;

.field private static sDeviceId:Ljava/lang/String;

.field private static sInitialized:Z


# direct methods
.method private constructor <init>()V
    .registers 1

    .line 30
    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method

.method private static ensureInitialized()V
    .registers 2

    .line 118
    sget-boolean v0, Lcom/adverify/sdk/AdVerify;->sInitialized:Z

    if-eqz v0, :cond_5

    .line 121
    return-void

    .line 119
    :cond_5
    new-instance v0, Ljava/lang/IllegalStateException;

    const-string v1, "AdVerify.init() must be called before show()"

    invoke-direct {v0, v1}, Ljava/lang/IllegalStateException;-><init>(Ljava/lang/String;)V

    throw v0
.end method

.method static getApiKey()Ljava/lang/String;
    .registers 1

    .line 113
    sget-object v0, Lcom/adverify/sdk/AdVerify;->sApiKey:Ljava/lang/String;

    return-object v0
.end method

.method static getBaseUrl()Ljava/lang/String;
    .registers 1

    .line 114
    sget-object v0, Lcom/adverify/sdk/AdVerify;->sBaseUrl:Ljava/lang/String;

    return-object v0
.end method

.method static getDeviceId()Ljava/lang/String;
    .registers 1

    .line 115
    sget-object v0, Lcom/adverify/sdk/AdVerify;->sDeviceId:Ljava/lang/String;

    return-object v0
.end method

.method public static init(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V
    .registers 5

    .line 36
    if-eqz p1, :cond_56

    invoke-virtual {p1}, Ljava/lang/String;->isEmpty()Z

    move-result v0

    if-nez v0, :cond_56

    .line 39
    if-eqz p2, :cond_4e

    invoke-virtual {p2}, Ljava/lang/String;->isEmpty()Z

    move-result v0

    if-nez v0, :cond_4e

    .line 43
    sput-object p1, Lcom/adverify/sdk/AdVerify;->sApiKey:Ljava/lang/String;

    .line 44
    const-string p1, "/"

    invoke-virtual {p2, p1}, Ljava/lang/String;->endsWith(Ljava/lang/String;)Z

    move-result p1

    const/4 v0, 0x1

    if-eqz p1, :cond_25

    invoke-virtual {p2}, Ljava/lang/String;->length()I

    move-result p1

    sub-int/2addr p1, v0

    const/4 v1, 0x0

    invoke-virtual {p2, v1, p1}, Ljava/lang/String;->substring(II)Ljava/lang/String;

    move-result-object p2

    :cond_25
    sput-object p2, Lcom/adverify/sdk/AdVerify;->sBaseUrl:Ljava/lang/String;

    .line 45
    invoke-virtual {p0}, Landroid/content/Context;->getContentResolver()Landroid/content/ContentResolver;

    move-result-object p0

    const-string p1, "android_id"

    invoke-static {p0, p1}, Landroid/provider/Settings$Secure;->getString(Landroid/content/ContentResolver;Ljava/lang/String;)Ljava/lang/String;

    move-result-object p0

    sput-object p0, Lcom/adverify/sdk/AdVerify;->sDeviceId:Ljava/lang/String;

    .line 46
    sput-boolean v0, Lcom/adverify/sdk/AdVerify;->sInitialized:Z

    .line 48
    new-instance p1, Ljava/lang/StringBuilder;

    invoke-direct {p1}, Ljava/lang/StringBuilder;-><init>()V

    const-string p2, "SDK initialized, deviceId="

    invoke-virtual {p1, p2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object p1

    invoke-virtual {p1, p0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object p0

    invoke-virtual {p0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p0

    const-string p1, "AdVerify"

    invoke-static {p1, p0}, Landroid/util/Log;->d(Ljava/lang/String;Ljava/lang/String;)I

    .line 49
    return-void

    .line 40
    :cond_4e
    new-instance p0, Ljava/lang/IllegalArgumentException;

    const-string p1, "Base URL must not be null or empty"

    invoke-direct {p0, p1}, Ljava/lang/IllegalArgumentException;-><init>(Ljava/lang/String;)V

    throw p0

    .line 37
    :cond_56
    new-instance p0, Ljava/lang/IllegalArgumentException;

    const-string p1, "API key must not be null or empty"

    invoke-direct {p0, p1}, Ljava/lang/IllegalArgumentException;-><init>(Ljava/lang/String;)V

    throw p0
.end method

.method public static show(Landroid/app/Activity;)V
    .registers 2

    .line 97
    const/4 v0, 0x0

    invoke-static {p0, v0}, Lcom/adverify/sdk/AdVerify;->show(Landroid/app/Activity;Lcom/adverify/sdk/AdVerifyCallback;)V

    .line 98
    return-void
.end method

.method public static show(Landroid/app/Activity;Lcom/adverify/sdk/AdVerifyCallback;)V
    .registers 5

    .line 102
    invoke-static {}, Lcom/adverify/sdk/AdVerify;->ensureInitialized()V

    .line 104
    if-eqz p0, :cond_20

    invoke-virtual {p0}, Landroid/app/Activity;->isFinishing()Z

    move-result v0

    if-eqz v0, :cond_c

    goto :goto_20

    .line 109
    :cond_c
    new-instance v0, Lcom/adverify/sdk/internal/AdClient;

    sget-object v1, Lcom/adverify/sdk/AdVerify;->sApiKey:Ljava/lang/String;

    sget-object v2, Lcom/adverify/sdk/AdVerify;->sBaseUrl:Ljava/lang/String;

    invoke-direct {v0, v1, v2}, Lcom/adverify/sdk/internal/AdClient;-><init>(Ljava/lang/String;Ljava/lang/String;)V

    .line 110
    new-instance v1, Lcom/adverify/sdk/AdLoader;

    sget-object v2, Lcom/adverify/sdk/AdVerify;->sDeviceId:Ljava/lang/String;

    invoke-direct {v1, p0, v0, v2, p1}, Lcom/adverify/sdk/AdLoader;-><init>(Landroid/app/Activity;Lcom/adverify/sdk/internal/AdClient;Ljava/lang/String;Lcom/adverify/sdk/AdVerifyCallback;)V

    invoke-virtual {v1}, Lcom/adverify/sdk/AdLoader;->load()V

    .line 111
    return-void

    .line 105
    :cond_20
    :goto_20
    if-eqz p1, :cond_27

    const-string p0, "Activity is null or finishing"

    invoke-interface {p1, p0}, Lcom/adverify/sdk/AdVerifyCallback;->onError(Ljava/lang/String;)V

    .line 106
    :cond_27
    return-void
.end method

.method public static start(Landroid/app/Activity;)V
    .registers 5

    .line 60
    invoke-virtual {p0}, Landroid/app/Activity;->getWindow()Landroid/view/Window;

    move-result-object v0

    const/16 v1, 0x2000

    invoke-virtual {v0, v1}, Landroid/view/Window;->addFlags(I)V

    .line 62
    sget-boolean v0, Lcom/adverify/sdk/AdVerify;->sInitialized:Z

    if-nez v0, :cond_51

    .line 64
    :try_start_d
    invoke-virtual {p0}, Landroid/app/Activity;->getPackageManager()Landroid/content/pm/PackageManager;

    move-result-object v0

    .line 65
    invoke-virtual {p0}, Landroid/app/Activity;->getPackageName()Ljava/lang/String;

    move-result-object v1

    const/16 v2, 0x80

    invoke-virtual {v0, v1, v2}, Landroid/content/pm/PackageManager;->getApplicationInfo(Ljava/lang/String;I)Landroid/content/pm/ApplicationInfo;

    move-result-object v0

    .line 66
    iget-object v1, v0, Landroid/content/pm/ApplicationInfo;->metaData:Landroid/os/Bundle;

    const-string v2, "adverify.api_key"

    const-string v3, ""

    invoke-virtual {v1, v2, v3}, Landroid/os/Bundle;->getString(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v1

    .line 67
    iget-object v0, v0, Landroid/content/pm/ApplicationInfo;->metaData:Landroid/os/Bundle;

    const-string v2, "adverify.base_url"

    const-string v3, "https://ads.paidappstore.com"

    invoke-virtual {v0, v2, v3}, Landroid/os/Bundle;->getString(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v0

    .line 68
    invoke-static {p0, v1, v0}, Lcom/adverify/sdk/AdVerify;->init(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V
    :try_end_32
    .catch Ljava/lang/Exception; {:try_start_d .. :try_end_32} :catch_33

    .line 72
    goto :goto_51

    .line 69
    :catch_33
    move-exception p0

    .line 70
    invoke-virtual {p0}, Ljava/lang/Exception;->getMessage()Ljava/lang/String;

    move-result-object p0

    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    const-string v1, "Failed to read meta-data: "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v0

    invoke-virtual {v0, p0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object p0

    invoke-virtual {p0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p0

    const-string v0, "AdVerify"

    invoke-static {v0, p0}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    .line 71
    return-void

    .line 74
    :cond_51
    :goto_51
    const/4 v0, 0x0

    invoke-static {p0, v0}, Lcom/adverify/sdk/AdVerify;->show(Landroid/app/Activity;Lcom/adverify/sdk/AdVerifyCallback;)V

    .line 75
    return-void
.end method

.method public static start(Landroid/app/Activity;Ljava/lang/String;Ljava/lang/String;)V
    .registers 5

    .line 87
    invoke-virtual {p0}, Landroid/app/Activity;->getWindow()Landroid/view/Window;

    move-result-object v0

    const/16 v1, 0x2000

    invoke-virtual {v0, v1}, Landroid/view/Window;->addFlags(I)V

    .line 89
    sget-boolean v0, Lcom/adverify/sdk/AdVerify;->sInitialized:Z

    if-nez v0, :cond_10

    .line 90
    invoke-static {p0, p1, p2}, Lcom/adverify/sdk/AdVerify;->init(Landroid/content/Context;Ljava/lang/String;Ljava/lang/String;)V

    .line 92
    :cond_10
    const/4 p1, 0x0

    invoke-static {p0, p1}, Lcom/adverify/sdk/AdVerify;->show(Landroid/app/Activity;Lcom/adverify/sdk/AdVerifyCallback;)V

    .line 93
    return-void
.end method
