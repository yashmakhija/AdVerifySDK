.class Lcom/adverify/sdk/AdLoader;
.super Ljava/lang/Object;
.source "AdLoader.java"


# static fields
.field private static final TAG:Ljava/lang/String; = "AdLoader"


# instance fields
.field private final activity:Landroid/app/Activity;

.field private final callback:Lcom/adverify/sdk/AdVerifyCallback;

.field private final client:Lcom/adverify/sdk/internal/AdClient;

.field private final deviceId:Ljava/lang/String;


# direct methods
.method static bridge synthetic -$$Nest$fgetactivity(Lcom/adverify/sdk/AdLoader;)Landroid/app/Activity;
    .registers 1

    iget-object p0, p0, Lcom/adverify/sdk/AdLoader;->activity:Landroid/app/Activity;

    return-object p0
.end method

.method static bridge synthetic -$$Nest$fgetcallback(Lcom/adverify/sdk/AdLoader;)Lcom/adverify/sdk/AdVerifyCallback;
    .registers 1

    iget-object p0, p0, Lcom/adverify/sdk/AdLoader;->callback:Lcom/adverify/sdk/AdVerifyCallback;

    return-object p0
.end method

.method static bridge synthetic -$$Nest$fgetclient(Lcom/adverify/sdk/AdLoader;)Lcom/adverify/sdk/internal/AdClient;
    .registers 1

    iget-object p0, p0, Lcom/adverify/sdk/AdLoader;->client:Lcom/adverify/sdk/internal/AdClient;

    return-object p0
.end method

.method static bridge synthetic -$$Nest$fgetdeviceId(Lcom/adverify/sdk/AdLoader;)Ljava/lang/String;
    .registers 1

    iget-object p0, p0, Lcom/adverify/sdk/AdLoader;->deviceId:Ljava/lang/String;

    return-object p0
.end method

.method static bridge synthetic -$$Nest$mfetchAndShowAds(Lcom/adverify/sdk/AdLoader;)V
    .registers 1

    invoke-direct {p0}, Lcom/adverify/sdk/AdLoader;->fetchAndShowAds()V

    return-void
.end method

.method static bridge synthetic -$$Nest$mshowAd(Lcom/adverify/sdk/AdLoader;Lcom/adverify/sdk/internal/models/Ad;)V
    .registers 2

    invoke-direct {p0, p1}, Lcom/adverify/sdk/AdLoader;->showAd(Lcom/adverify/sdk/internal/models/Ad;)V

    return-void
.end method

.method static bridge synthetic -$$Nest$mshowPinDialog(Lcom/adverify/sdk/AdLoader;Lcom/adverify/sdk/internal/models/InitResponse;)V
    .registers 2

    invoke-direct {p0, p1}, Lcom/adverify/sdk/AdLoader;->showPinDialog(Lcom/adverify/sdk/internal/models/InitResponse;)V

    return-void
.end method

.method constructor <init>(Landroid/app/Activity;Lcom/adverify/sdk/internal/AdClient;Ljava/lang/String;Lcom/adverify/sdk/AdVerifyCallback;)V
    .registers 5

    .line 22
    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    .line 23
    iput-object p1, p0, Lcom/adverify/sdk/AdLoader;->activity:Landroid/app/Activity;

    .line 24
    iput-object p2, p0, Lcom/adverify/sdk/AdLoader;->client:Lcom/adverify/sdk/internal/AdClient;

    .line 25
    iput-object p3, p0, Lcom/adverify/sdk/AdLoader;->deviceId:Ljava/lang/String;

    .line 26
    iput-object p4, p0, Lcom/adverify/sdk/AdLoader;->callback:Lcom/adverify/sdk/AdVerifyCallback;

    .line 27
    return-void
.end method

.method private fetchAndShowAds()V
    .registers 3

    .line 133
    iget-object v0, p0, Lcom/adverify/sdk/AdLoader;->client:Lcom/adverify/sdk/internal/AdClient;

    new-instance v1, Lcom/adverify/sdk/AdLoader$3;

    invoke-direct {v1, p0}, Lcom/adverify/sdk/AdLoader$3;-><init>(Lcom/adverify/sdk/AdLoader;)V

    invoke-virtual {v0, v1}, Lcom/adverify/sdk/internal/AdClient;->fetchAds(Lcom/adverify/sdk/internal/AdClient$Callback;)V

    .line 149
    return-void
.end method

.method private showAd(Lcom/adverify/sdk/internal/models/Ad;)V
    .registers 5

    .line 152
    iget-object v0, p0, Lcom/adverify/sdk/AdLoader;->activity:Landroid/app/Activity;

    invoke-virtual {v0}, Landroid/app/Activity;->isFinishing()Z

    move-result v0

    if-eqz v0, :cond_9

    return-void

    .line 154
    :cond_9
    iget-object v0, p0, Lcom/adverify/sdk/AdLoader;->client:Lcom/adverify/sdk/internal/AdClient;

    iget v1, p1, Lcom/adverify/sdk/internal/models/Ad;->id:I

    invoke-virtual {v0, v1}, Lcom/adverify/sdk/internal/AdClient;->trackImpression(I)V

    .line 156
    new-instance v0, Lcom/adverify/sdk/AdDialog;

    iget-object v1, p0, Lcom/adverify/sdk/AdLoader;->activity:Landroid/app/Activity;

    new-instance v2, Lcom/adverify/sdk/AdLoader$4;

    invoke-direct {v2, p0, p1}, Lcom/adverify/sdk/AdLoader$4;-><init>(Lcom/adverify/sdk/AdLoader;Lcom/adverify/sdk/internal/models/Ad;)V

    invoke-direct {v0, v1, p1, v2}, Lcom/adverify/sdk/AdDialog;-><init>(Landroid/app/Activity;Lcom/adverify/sdk/internal/models/Ad;Lcom/adverify/sdk/AdDialog$AdDialogListener;)V

    .line 169
    invoke-virtual {v0}, Lcom/adverify/sdk/AdDialog;->show()V

    .line 170
    iget-object p1, p0, Lcom/adverify/sdk/AdLoader;->callback:Lcom/adverify/sdk/AdVerifyCallback;

    if-eqz p1, :cond_26

    invoke-interface {p1}, Lcom/adverify/sdk/AdVerifyCallback;->onAdShown()V

    .line 171
    :cond_26
    return-void
.end method

.method private showPinDialog(Lcom/adverify/sdk/internal/models/InitResponse;)V
    .registers 11

    .line 49
    iget-object v0, p0, Lcom/adverify/sdk/AdLoader;->activity:Landroid/app/Activity;

    invoke-virtual {v0}, Landroid/app/Activity;->isFinishing()Z

    move-result v0

    if-eqz v0, :cond_9

    return-void

    .line 51
    :cond_9
    new-instance v0, Lcom/adverify/sdk/PinVerifyDialog;

    iget-object v2, p0, Lcom/adverify/sdk/AdLoader;->activity:Landroid/app/Activity;

    iget-object v3, p1, Lcom/adverify/sdk/internal/models/InitResponse;->appName:Ljava/lang/String;

    iget-object v4, p1, Lcom/adverify/sdk/internal/models/InitResponse;->pinMessage:Ljava/lang/String;

    iget v5, p1, Lcom/adverify/sdk/internal/models/InitResponse;->maxAttempts:I

    iget-object v6, p1, Lcom/adverify/sdk/internal/models/InitResponse;->getPinBtnText:Ljava/lang/String;

    iget-object v7, p1, Lcom/adverify/sdk/internal/models/InitResponse;->pinInfoItems:[Lcom/adverify/sdk/internal/models/PinInfoItem;

    new-instance v8, Lcom/adverify/sdk/AdLoader$2;

    invoke-direct {v8, p0, p1}, Lcom/adverify/sdk/AdLoader$2;-><init>(Lcom/adverify/sdk/AdLoader;Lcom/adverify/sdk/internal/models/InitResponse;)V

    move-object v1, v0

    invoke-direct/range {v1 .. v8}, Lcom/adverify/sdk/PinVerifyDialog;-><init>(Landroid/app/Activity;Ljava/lang/String;Ljava/lang/String;ILjava/lang/String;[Lcom/adverify/sdk/internal/models/PinInfoItem;Lcom/adverify/sdk/PinVerifyDialog$PinListener;)V

    .line 129
    invoke-virtual {v0}, Lcom/adverify/sdk/PinVerifyDialog;->show()V

    .line 130
    return-void
.end method


# virtual methods
.method load()V
    .registers 4

    .line 30
    iget-object v0, p0, Lcom/adverify/sdk/AdLoader;->client:Lcom/adverify/sdk/internal/AdClient;

    iget-object v1, p0, Lcom/adverify/sdk/AdLoader;->deviceId:Ljava/lang/String;

    new-instance v2, Lcom/adverify/sdk/AdLoader$1;

    invoke-direct {v2, p0}, Lcom/adverify/sdk/AdLoader$1;-><init>(Lcom/adverify/sdk/AdLoader;)V

    invoke-virtual {v0, v1, v2}, Lcom/adverify/sdk/internal/AdClient;->init(Ljava/lang/String;Lcom/adverify/sdk/internal/AdClient$Callback;)V

    .line 46
    return-void
.end method
