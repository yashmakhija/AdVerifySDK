.class public Lcom/adverify/sdk/internal/AdClient;
.super Ljava/lang/Object;
.source "AdClient.java"


# annotations
.annotation system Ldalvik/annotation/MemberClasses;
    value = {
        Lcom/adverify/sdk/internal/AdClient$Callback;
    }
.end annotation


# static fields
.field private static final TAG:Ljava/lang/String; = "AdClient"

.field private static final TIMEOUT_MS:I = 0x2710


# instance fields
.field private final apiKey:Ljava/lang/String;

.field private final baseUrl:Ljava/lang/String;

.field private final executor:Ljava/util/concurrent/ExecutorService;

.field private final mainHandler:Landroid/os/Handler;


# direct methods
.method public constructor <init>(Ljava/lang/String;Ljava/lang/String;)V
    .registers 5

    .line 35
    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    .line 32
    invoke-static {}, Ljava/util/concurrent/Executors;->newSingleThreadExecutor()Ljava/util/concurrent/ExecutorService;

    move-result-object v0

    iput-object v0, p0, Lcom/adverify/sdk/internal/AdClient;->executor:Ljava/util/concurrent/ExecutorService;

    .line 33
    new-instance v0, Landroid/os/Handler;

    invoke-static {}, Landroid/os/Looper;->getMainLooper()Landroid/os/Looper;

    move-result-object v1

    invoke-direct {v0, v1}, Landroid/os/Handler;-><init>(Landroid/os/Looper;)V

    iput-object v0, p0, Lcom/adverify/sdk/internal/AdClient;->mainHandler:Landroid/os/Handler;

    .line 36
    iput-object p1, p0, Lcom/adverify/sdk/internal/AdClient;->apiKey:Ljava/lang/String;

    .line 37
    iput-object p2, p0, Lcom/adverify/sdk/internal/AdClient;->baseUrl:Ljava/lang/String;

    .line 38
    return-void
.end method

.method private get(Ljava/lang/String;)Ljava/lang/String;
    .registers 5
    .annotation system Ldalvik/annotation/Throws;
        value = {
            Ljava/lang/Exception;
        }
    .end annotation

    .line 193
    new-instance v0, Ljava/net/URL;

    iget-object v1, p0, Lcom/adverify/sdk/internal/AdClient;->baseUrl:Ljava/lang/String;

    new-instance v2, Ljava/lang/StringBuilder;

    invoke-direct {v2}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v2, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v1

    invoke-virtual {v1, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object p1

    invoke-virtual {p1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p1

    invoke-direct {v0, p1}, Ljava/net/URL;-><init>(Ljava/lang/String;)V

    .line 194
    invoke-virtual {v0}, Ljava/net/URL;->openConnection()Ljava/net/URLConnection;

    move-result-object p1

    check-cast p1, Ljava/net/HttpURLConnection;

    .line 195
    const-string v0, "GET"

    invoke-virtual {p1, v0}, Ljava/net/HttpURLConnection;->setRequestMethod(Ljava/lang/String;)V

    .line 196
    const-string v0, "x-api-key"

    iget-object v1, p0, Lcom/adverify/sdk/internal/AdClient;->apiKey:Ljava/lang/String;

    invoke-virtual {p1, v0, v1}, Ljava/net/HttpURLConnection;->setRequestProperty(Ljava/lang/String;Ljava/lang/String;)V

    .line 197
    const-string v0, "Content-Type"

    const-string v1, "application/json"

    invoke-virtual {p1, v0, v1}, Ljava/net/HttpURLConnection;->setRequestProperty(Ljava/lang/String;Ljava/lang/String;)V

    .line 198
    const/16 v0, 0x2710

    invoke-virtual {p1, v0}, Ljava/net/HttpURLConnection;->setConnectTimeout(I)V

    .line 199
    invoke-virtual {p1, v0}, Ljava/net/HttpURLConnection;->setReadTimeout(I)V

    .line 200
    invoke-direct {p0, p1}, Lcom/adverify/sdk/internal/AdClient;->readResponse(Ljava/net/HttpURLConnection;)Ljava/lang/String;

    move-result-object p1

    return-object p1
.end method

.method static synthetic lambda$createLink$10(Lcom/adverify/sdk/internal/AdClient$Callback;Ljava/lang/Exception;)V
    .registers 2

    .line 163
    invoke-virtual {p1}, Ljava/lang/Exception;->getMessage()Ljava/lang/String;

    move-result-object p1

    invoke-interface {p0, p1}, Lcom/adverify/sdk/internal/AdClient$Callback;->onError(Ljava/lang/String;)V

    return-void
.end method

.method static synthetic lambda$createLink$9(Lcom/adverify/sdk/internal/AdClient$Callback;Ljava/lang/String;)V
    .registers 2

    .line 160
    invoke-interface {p0, p1}, Lcom/adverify/sdk/internal/AdClient$Callback;->onSuccess(Ljava/lang/Object;)V

    return-void
.end method

.method static synthetic lambda$fetchAds$3(Lcom/adverify/sdk/internal/AdClient$Callback;[Lcom/adverify/sdk/internal/models/Ad;)V
    .registers 2

    .line 127
    invoke-interface {p0, p1}, Lcom/adverify/sdk/internal/AdClient$Callback;->onSuccess(Ljava/lang/Object;)V

    return-void
.end method

.method static synthetic lambda$fetchAds$4(Lcom/adverify/sdk/internal/AdClient$Callback;Ljava/lang/Exception;)V
    .registers 2

    .line 130
    invoke-virtual {p1}, Ljava/lang/Exception;->getMessage()Ljava/lang/String;

    move-result-object p1

    invoke-interface {p0, p1}, Lcom/adverify/sdk/internal/AdClient$Callback;->onError(Ljava/lang/String;)V

    return-void
.end method

.method static synthetic lambda$init$0(Lcom/adverify/sdk/internal/AdClient$Callback;Lcom/adverify/sdk/internal/models/InitResponse;)V
    .registers 2

    .line 97
    invoke-interface {p0, p1}, Lcom/adverify/sdk/internal/AdClient$Callback;->onSuccess(Ljava/lang/Object;)V

    return-void
.end method

.method static synthetic lambda$init$1(Lcom/adverify/sdk/internal/AdClient$Callback;Ljava/lang/Exception;)V
    .registers 2

    .line 100
    invoke-virtual {p1}, Ljava/lang/Exception;->getMessage()Ljava/lang/String;

    move-result-object p1

    invoke-interface {p0, p1}, Lcom/adverify/sdk/internal/AdClient$Callback;->onError(Ljava/lang/String;)V

    return-void
.end method

.method static synthetic lambda$verifyPin$6(Lcom/adverify/sdk/internal/AdClient$Callback;Z)V
    .registers 2

    .line 144
    invoke-static {p1}, Ljava/lang/Boolean;->valueOf(Z)Ljava/lang/Boolean;

    move-result-object p1

    invoke-interface {p0, p1}, Lcom/adverify/sdk/internal/AdClient$Callback;->onSuccess(Ljava/lang/Object;)V

    return-void
.end method

.method static synthetic lambda$verifyPin$7(Lcom/adverify/sdk/internal/AdClient$Callback;Ljava/lang/Exception;)V
    .registers 2

    .line 147
    invoke-virtual {p1}, Ljava/lang/Exception;->getMessage()Ljava/lang/String;

    move-result-object p1

    invoke-interface {p0, p1}, Lcom/adverify/sdk/internal/AdClient$Callback;->onError(Ljava/lang/String;)V

    return-void
.end method

.method private post(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;
    .registers 6
    .annotation system Ldalvik/annotation/Throws;
        value = {
            Ljava/lang/Exception;
        }
    .end annotation

    .line 204
    new-instance v0, Ljava/net/URL;

    iget-object v1, p0, Lcom/adverify/sdk/internal/AdClient;->baseUrl:Ljava/lang/String;

    new-instance v2, Ljava/lang/StringBuilder;

    invoke-direct {v2}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v2, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v1

    invoke-virtual {v1, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object p1

    invoke-virtual {p1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p1

    invoke-direct {v0, p1}, Ljava/net/URL;-><init>(Ljava/lang/String;)V

    .line 205
    invoke-virtual {v0}, Ljava/net/URL;->openConnection()Ljava/net/URLConnection;

    move-result-object p1

    check-cast p1, Ljava/net/HttpURLConnection;

    .line 206
    const-string v0, "POST"

    invoke-virtual {p1, v0}, Ljava/net/HttpURLConnection;->setRequestMethod(Ljava/lang/String;)V

    .line 207
    const-string v0, "x-api-key"

    iget-object v1, p0, Lcom/adverify/sdk/internal/AdClient;->apiKey:Ljava/lang/String;

    invoke-virtual {p1, v0, v1}, Ljava/net/HttpURLConnection;->setRequestProperty(Ljava/lang/String;Ljava/lang/String;)V

    .line 208
    const-string v0, "Content-Type"

    const-string v1, "application/json"

    invoke-virtual {p1, v0, v1}, Ljava/net/HttpURLConnection;->setRequestProperty(Ljava/lang/String;Ljava/lang/String;)V

    .line 209
    const/16 v0, 0x2710

    invoke-virtual {p1, v0}, Ljava/net/HttpURLConnection;->setConnectTimeout(I)V

    .line 210
    invoke-virtual {p1, v0}, Ljava/net/HttpURLConnection;->setReadTimeout(I)V

    .line 211
    const/4 v0, 0x1

    invoke-virtual {p1, v0}, Ljava/net/HttpURLConnection;->setDoOutput(Z)V

    .line 213
    invoke-virtual {p1}, Ljava/net/HttpURLConnection;->getOutputStream()Ljava/io/OutputStream;

    move-result-object v0

    .line 214
    :try_start_41
    sget-object v1, Ljava/nio/charset/StandardCharsets;->UTF_8:Ljava/nio/charset/Charset;

    invoke-virtual {p2, v1}, Ljava/lang/String;->getBytes(Ljava/nio/charset/Charset;)[B

    move-result-object p2

    invoke-virtual {v0, p2}, Ljava/io/OutputStream;->write([B)V
    :try_end_4a
    .catchall {:try_start_41 .. :try_end_4a} :catchall_54

    .line 215
    if-eqz v0, :cond_4f

    invoke-virtual {v0}, Ljava/io/OutputStream;->close()V

    .line 217
    :cond_4f
    invoke-direct {p0, p1}, Lcom/adverify/sdk/internal/AdClient;->readResponse(Ljava/net/HttpURLConnection;)Ljava/lang/String;

    move-result-object p1

    return-object p1

    .line 213
    :catchall_54
    move-exception p1

    if-eqz v0, :cond_5f

    :try_start_57
    invoke-virtual {v0}, Ljava/io/OutputStream;->close()V
    :try_end_5a
    .catchall {:try_start_57 .. :try_end_5a} :catchall_5b

    goto :goto_5f

    :catchall_5b
    move-exception p2

    invoke-static {p1, p2}, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticBackport0;->m(Ljava/lang/Throwable;Ljava/lang/Throwable;)V

    :cond_5f
    :goto_5f
    throw p1
.end method

.method private readResponse(Ljava/net/HttpURLConnection;)Ljava/lang/String;
    .registers 6
    .annotation system Ldalvik/annotation/Throws;
        value = {
            Ljava/lang/Exception;
        }
    .end annotation

    .line 221
    invoke-virtual {p1}, Ljava/net/HttpURLConnection;->getResponseCode()I

    move-result v0

    .line 222
    new-instance v1, Ljava/io/BufferedReader;

    new-instance v2, Ljava/io/InputStreamReader;

    .line 223
    const/16 v3, 0x190

    if-lt v0, v3, :cond_11

    invoke-virtual {p1}, Ljava/net/HttpURLConnection;->getErrorStream()Ljava/io/InputStream;

    move-result-object p1

    goto :goto_15

    :cond_11
    invoke-virtual {p1}, Ljava/net/HttpURLConnection;->getInputStream()Ljava/io/InputStream;

    move-result-object p1

    :goto_15
    invoke-direct {v2, p1}, Ljava/io/InputStreamReader;-><init>(Ljava/io/InputStream;)V

    invoke-direct {v1, v2}, Ljava/io/BufferedReader;-><init>(Ljava/io/Reader;)V

    .line 226
    new-instance p1, Ljava/lang/StringBuilder;

    invoke-direct {p1}, Ljava/lang/StringBuilder;-><init>()V

    .line 228
    :goto_20
    invoke-virtual {v1}, Ljava/io/BufferedReader;->readLine()Ljava/lang/String;

    move-result-object v2

    if-eqz v2, :cond_2a

    .line 229
    invoke-virtual {p1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    goto :goto_20

    .line 231
    :cond_2a
    invoke-virtual {v1}, Ljava/io/BufferedReader;->close()V

    .line 233
    if-ge v0, v3, :cond_34

    .line 237
    invoke-virtual {p1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p1

    return-object p1

    .line 234
    :cond_34
    new-instance v1, Ljava/lang/Exception;

    invoke-static {p1}, Ljava/lang/String;->valueOf(Ljava/lang/Object;)Ljava/lang/String;

    move-result-object p1

    new-instance v2, Ljava/lang/StringBuilder;

    invoke-direct {v2}, Ljava/lang/StringBuilder;-><init>()V

    const-string v3, "HTTP "

    invoke-virtual {v2, v3}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v2

    invoke-virtual {v2, v0}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    move-result-object v0

    const-string v2, ": "

    invoke-virtual {v0, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v0

    invoke-virtual {v0, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object p1

    invoke-virtual {p1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p1

    invoke-direct {v1, p1}, Ljava/lang/Exception;-><init>(Ljava/lang/String;)V

    goto :goto_5c

    :goto_5b
    throw v1

    :goto_5c
    goto :goto_5b
.end method


# virtual methods
.method public createLink(Ljava/lang/String;Lcom/adverify/sdk/internal/AdClient$Callback;)V
    .registers 5
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "Ljava/lang/String;",
            "Lcom/adverify/sdk/internal/AdClient$Callback<",
            "Ljava/lang/String;",
            ">;)V"
        }
    .end annotation

    .line 153
    iget-object v0, p0, Lcom/adverify/sdk/internal/AdClient;->executor:Ljava/util/concurrent/ExecutorService;

    new-instance v1, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda1;

    invoke-direct {v1, p0, p1, p2}, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda1;-><init>(Lcom/adverify/sdk/internal/AdClient;Ljava/lang/String;Lcom/adverify/sdk/internal/AdClient$Callback;)V

    invoke-interface {v0, v1}, Ljava/util/concurrent/ExecutorService;->execute(Ljava/lang/Runnable;)V

    .line 166
    return-void
.end method

.method public fetchAds(Lcom/adverify/sdk/internal/AdClient$Callback;)V
    .registers 4
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "Lcom/adverify/sdk/internal/AdClient$Callback<",
            "[",
            "Lcom/adverify/sdk/internal/models/Ad;",
            ">;)V"
        }
    .end annotation

    .line 106
    iget-object v0, p0, Lcom/adverify/sdk/internal/AdClient;->executor:Ljava/util/concurrent/ExecutorService;

    new-instance v1, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda6;

    invoke-direct {v1, p0, p1}, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda6;-><init>(Lcom/adverify/sdk/internal/AdClient;Lcom/adverify/sdk/internal/AdClient$Callback;)V

    invoke-interface {v0, v1}, Ljava/util/concurrent/ExecutorService;->execute(Ljava/lang/Runnable;)V

    .line 133
    return-void
.end method

.method public init(Ljava/lang/String;Lcom/adverify/sdk/internal/AdClient$Callback;)V
    .registers 5
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "Ljava/lang/String;",
            "Lcom/adverify/sdk/internal/AdClient$Callback<",
            "Lcom/adverify/sdk/internal/models/InitResponse;",
            ">;)V"
        }
    .end annotation

    .line 46
    iget-object v0, p0, Lcom/adverify/sdk/internal/AdClient;->executor:Ljava/util/concurrent/ExecutorService;

    new-instance v1, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda5;

    invoke-direct {v1, p0, p1, p2}, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda5;-><init>(Lcom/adverify/sdk/internal/AdClient;Ljava/lang/String;Lcom/adverify/sdk/internal/AdClient$Callback;)V

    invoke-interface {v0, v1}, Ljava/util/concurrent/ExecutorService;->execute(Ljava/lang/Runnable;)V

    .line 103
    return-void
.end method

.method synthetic lambda$createLink$11$com-adverify-sdk-internal-AdClient(Ljava/lang/String;Lcom/adverify/sdk/internal/AdClient$Callback;)V
    .registers 5

    .line 155
    :try_start_0
    new-instance v0, Lorg/json/JSONObject;

    invoke-direct {v0}, Lorg/json/JSONObject;-><init>()V

    .line 156
    const-string v1, "deviceId"

    invoke-virtual {v0, v1, p1}, Lorg/json/JSONObject;->put(Ljava/lang/String;Ljava/lang/Object;)Lorg/json/JSONObject;

    .line 157
    const-string p1, "/api/sdk/create-link"

    invoke-virtual {v0}, Lorg/json/JSONObject;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-direct {p0, p1, v0}, Lcom/adverify/sdk/internal/AdClient;->post(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object p1

    .line 158
    new-instance v0, Lorg/json/JSONObject;

    invoke-direct {v0, p1}, Lorg/json/JSONObject;-><init>(Ljava/lang/String;)V

    .line 159
    const-string p1, "url"

    const-string v1, ""

    invoke-virtual {v0, p1, v1}, Lorg/json/JSONObject;->optString(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object p1

    .line 160
    iget-object v0, p0, Lcom/adverify/sdk/internal/AdClient;->mainHandler:Landroid/os/Handler;

    new-instance v1, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda12;

    invoke-direct {v1, p2, p1}, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda12;-><init>(Lcom/adverify/sdk/internal/AdClient$Callback;Ljava/lang/String;)V

    invoke-virtual {v0, v1}, Landroid/os/Handler;->post(Ljava/lang/Runnable;)Z
    :try_end_2b
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_2b} :catch_2c

    .line 164
    goto :goto_3e

    .line 161
    :catch_2c
    move-exception p1

    .line 162
    const-string v0, "AdClient"

    const-string v1, "Create link failed"

    invoke-static {v0, v1, p1}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;Ljava/lang/Throwable;)I

    .line 163
    iget-object v0, p0, Lcom/adverify/sdk/internal/AdClient;->mainHandler:Landroid/os/Handler;

    new-instance v1, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda13;

    invoke-direct {v1, p2, p1}, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda13;-><init>(Lcom/adverify/sdk/internal/AdClient$Callback;Ljava/lang/Exception;)V

    invoke-virtual {v0, v1}, Landroid/os/Handler;->post(Ljava/lang/Runnable;)Z

    .line 165
    :goto_3e
    return-void
.end method

.method synthetic lambda$fetchAds$5$com-adverify-sdk-internal-AdClient(Lcom/adverify/sdk/internal/AdClient$Callback;)V
    .registers 20

    .line 108
    move-object/from16 v1, p0

    move-object/from16 v2, p1

    const-string v0, ""

    :try_start_6
    const-string v3, "/api/sdk/ads"

    invoke-direct {v1, v3}, Lcom/adverify/sdk/internal/AdClient;->get(Ljava/lang/String;)Ljava/lang/String;

    move-result-object v3

    .line 109
    new-instance v4, Lorg/json/JSONObject;

    invoke-direct {v4, v3}, Lorg/json/JSONObject;-><init>(Ljava/lang/String;)V

    .line 110
    const-string v3, "ads"

    invoke-virtual {v4, v3}, Lorg/json/JSONObject;->getJSONArray(Ljava/lang/String;)Lorg/json/JSONArray;

    move-result-object v3

    .line 112
    invoke-virtual {v3}, Lorg/json/JSONArray;->length()I

    move-result v4

    new-array v4, v4, [Lcom/adverify/sdk/internal/models/Ad;

    .line 113
    const/4 v5, 0x0

    const/4 v6, 0x0

    :goto_1f
    invoke-virtual {v3}, Lorg/json/JSONArray;->length()I

    move-result v7

    if-ge v6, v7, :cond_69

    .line 114
    invoke-virtual {v3, v6}, Lorg/json/JSONArray;->getJSONObject(I)Lorg/json/JSONObject;

    move-result-object v7

    .line 115
    new-instance v17, Lcom/adverify/sdk/internal/models/Ad;

    const-string v8, "id"

    .line 116
    invoke-virtual {v7, v8}, Lorg/json/JSONObject;->getInt(Ljava/lang/String;)I

    move-result v9

    const-string v8, "title"

    .line 117
    invoke-virtual {v7, v8}, Lorg/json/JSONObject;->getString(Ljava/lang/String;)Ljava/lang/String;

    move-result-object v10

    const-string v8, "description"

    .line 118
    invoke-virtual {v7, v8, v0}, Lorg/json/JSONObject;->optString(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v11

    const-string v8, "imageUrl"

    .line 119
    invoke-virtual {v7, v8, v0}, Lorg/json/JSONObject;->optString(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v12

    const-string v8, "redirectUrl"

    .line 120
    invoke-virtual {v7, v8, v0}, Lorg/json/JSONObject;->optString(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v13

    const-string v8, "adType"

    const-string v14, "interstitial"

    .line 121
    invoke-virtual {v7, v8, v14}, Lorg/json/JSONObject;->optString(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v14

    const-string v8, "buttonText"

    const-string v15, "Visit Now"

    .line 122
    invoke-virtual {v7, v8, v15}, Lorg/json/JSONObject;->optString(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v15

    const-string v8, "priority"

    .line 123
    invoke-virtual {v7, v8, v5}, Lorg/json/JSONObject;->optInt(Ljava/lang/String;I)I

    move-result v16

    move-object/from16 v8, v17

    invoke-direct/range {v8 .. v16}, Lcom/adverify/sdk/internal/models/Ad;-><init>(ILjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;I)V

    aput-object v17, v4, v6

    .line 113
    add-int/lit8 v6, v6, 0x1

    goto :goto_1f

    .line 127
    :cond_69
    iget-object v0, v1, Lcom/adverify/sdk/internal/AdClient;->mainHandler:Landroid/os/Handler;

    new-instance v3, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda7;

    invoke-direct {v3, v2, v4}, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda7;-><init>(Lcom/adverify/sdk/internal/AdClient$Callback;[Lcom/adverify/sdk/internal/models/Ad;)V

    invoke-virtual {v0, v3}, Landroid/os/Handler;->post(Ljava/lang/Runnable;)Z
    :try_end_73
    .catch Ljava/lang/Exception; {:try_start_6 .. :try_end_73} :catch_74

    .line 131
    goto :goto_86

    .line 128
    :catch_74
    move-exception v0

    .line 129
    const-string v3, "AdClient"

    const-string v4, "Fetch ads failed"

    invoke-static {v3, v4, v0}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;Ljava/lang/Throwable;)I

    .line 130
    iget-object v3, v1, Lcom/adverify/sdk/internal/AdClient;->mainHandler:Landroid/os/Handler;

    new-instance v4, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda8;

    invoke-direct {v4, v2, v0}, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda8;-><init>(Lcom/adverify/sdk/internal/AdClient$Callback;Ljava/lang/Exception;)V

    invoke-virtual {v3, v4}, Landroid/os/Handler;->post(Ljava/lang/Runnable;)Z

    .line 132
    :goto_86
    return-void
.end method

.method synthetic lambda$init$2$com-adverify-sdk-internal-AdClient(Ljava/lang/String;Lcom/adverify/sdk/internal/AdClient$Callback;)V
    .registers 16

    .line 48
    :try_start_0
    new-instance v0, Lorg/json/JSONObject;

    invoke-direct {v0}, Lorg/json/JSONObject;-><init>()V

    .line 49
    const-string v1, "deviceId"

    invoke-virtual {v0, v1, p1}, Lorg/json/JSONObject;->put(Ljava/lang/String;Ljava/lang/Object;)Lorg/json/JSONObject;

    .line 50
    const-string p1, "/api/sdk/init"

    invoke-virtual {v0}, Lorg/json/JSONObject;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-direct {p0, p1, v0}, Lcom/adverify/sdk/internal/AdClient;->post(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object p1

    .line 51
    new-instance v0, Lorg/json/JSONObject;

    invoke-direct {v0, p1}, Lorg/json/JSONObject;-><init>(Ljava/lang/String;)V

    .line 54
    const/4 p1, 0x0

    new-array v1, p1, [Lcom/adverify/sdk/internal/models/PinInfoItem;

    .line 55
    const-string v2, "pinInfoItems"

    invoke-virtual {v0, v2}, Lorg/json/JSONObject;->optJSONArray(Ljava/lang/String;)Lorg/json/JSONArray;

    move-result-object v2
    :try_end_22
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_22} :catch_de

    .line 56
    const-string v3, ""

    if-eqz v2, :cond_56

    .line 57
    :try_start_26
    invoke-virtual {v2}, Lorg/json/JSONArray;->length()I

    move-result v1

    new-array v1, v1, [Lcom/adverify/sdk/internal/models/PinInfoItem;

    .line 58
    const/4 v4, 0x0

    :goto_2d
    invoke-virtual {v2}, Lorg/json/JSONArray;->length()I

    move-result v5

    if-ge v4, v5, :cond_54

    .line 59
    invoke-virtual {v2, v4}, Lorg/json/JSONArray;->getJSONObject(I)Lorg/json/JSONObject;

    move-result-object v5

    .line 60
    new-instance v6, Lcom/adverify/sdk/internal/models/PinInfoItem;

    const-string v7, "icon"

    .line 61
    invoke-virtual {v5, v7, v3}, Lorg/json/JSONObject;->optString(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v7

    const-string v8, "text"

    .line 62
    invoke-virtual {v5, v8, v3}, Lorg/json/JSONObject;->optString(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v8

    const-string v9, "color"

    .line 63
    const/4 v10, 0x0

    invoke-virtual {v5, v9, v10}, Lorg/json/JSONObject;->optString(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v5

    invoke-direct {v6, v7, v8, v5}, Lcom/adverify/sdk/internal/models/PinInfoItem;-><init>(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V

    aput-object v6, v1, v4

    .line 58
    add-int/lit8 v4, v4, 0x1

    goto :goto_2d

    :cond_54
    move-object v8, v1

    goto :goto_57

    .line 56
    :cond_56
    move-object v8, v1

    .line 69
    :goto_57
    new-array v1, p1, [Lcom/adverify/sdk/internal/models/JoinLink;

    .line 70
    const-string v2, "joinLinks"

    invoke-virtual {v0, v2}, Lorg/json/JSONObject;->optJSONArray(Ljava/lang/String;)Lorg/json/JSONArray;

    move-result-object v2

    .line 71
    if-eqz v2, :cond_98

    .line 72
    invoke-virtual {v2}, Lorg/json/JSONArray;->length()I

    move-result v1

    new-array v1, v1, [Lcom/adverify/sdk/internal/models/JoinLink;

    .line 73
    const/4 v4, 0x0

    :goto_68
    invoke-virtual {v2}, Lorg/json/JSONArray;->length()I

    move-result v5

    if-ge v4, v5, :cond_96

    .line 74
    invoke-virtual {v2, v4}, Lorg/json/JSONArray;->getJSONObject(I)Lorg/json/JSONObject;

    move-result-object v5

    .line 75
    new-instance v6, Lcom/adverify/sdk/internal/models/JoinLink;

    const-string v7, "name"

    .line 76
    invoke-virtual {v5, v7, v3}, Lorg/json/JSONObject;->optString(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v7

    const-string v9, "description"

    .line 77
    invoke-virtual {v5, v9, v3}, Lorg/json/JSONObject;->optString(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v9

    const-string v10, "url"

    .line 78
    invoke-virtual {v5, v10, v3}, Lorg/json/JSONObject;->optString(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v10

    const-string v11, "iconType"

    const-string v12, "telegram"

    .line 79
    invoke-virtual {v5, v11, v12}, Lorg/json/JSONObject;->optString(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v5

    invoke-direct {v6, v7, v9, v10, v5}, Lcom/adverify/sdk/internal/models/JoinLink;-><init>(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V

    aput-object v6, v1, v4

    .line 73
    add-int/lit8 v4, v4, 0x1

    goto :goto_68

    :cond_96
    move-object v10, v1

    goto :goto_99

    .line 71
    :cond_98
    move-object v10, v1

    .line 84
    :goto_99
    new-instance v11, Lcom/adverify/sdk/internal/models/InitResponse;

    const-string v1, "appName"

    .line 85
    invoke-virtual {v0, v1, v3}, Lorg/json/JSONObject;->optString(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v1

    const-string v2, "pinEnabled"

    .line 86
    invoke-virtual {v0, v2, p1}, Lorg/json/JSONObject;->optBoolean(Ljava/lang/String;Z)Z

    move-result v2

    const-string v4, "pinVerified"

    .line 87
    invoke-virtual {v0, v4, p1}, Lorg/json/JSONObject;->optBoolean(Ljava/lang/String;Z)Z

    move-result p1

    const-string v4, "pinMessage"

    .line 88
    invoke-virtual {v0, v4, v3}, Lorg/json/JSONObject;->optString(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v4

    const-string v5, "maxAttempts"

    .line 89
    const/4 v6, 0x3

    invoke-virtual {v0, v5, v6}, Lorg/json/JSONObject;->optInt(Ljava/lang/String;I)I

    move-result v5

    const-string v6, "getPinUrl"

    .line 90
    invoke-virtual {v0, v6, v3}, Lorg/json/JSONObject;->optString(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v6

    const-string v7, "getPinBtnText"

    const-string v9, "Get PIN"

    .line 91
    invoke-virtual {v0, v7, v9}, Lorg/json/JSONObject;->optString(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v7

    const-string v9, "tutorialUrl"

    .line 93
    invoke-virtual {v0, v9, v3}, Lorg/json/JSONObject;->optString(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v9

    move-object v0, v11

    move v3, p1

    invoke-direct/range {v0 .. v10}, Lcom/adverify/sdk/internal/models/InitResponse;-><init>(Ljava/lang/String;ZZLjava/lang/String;ILjava/lang/String;Ljava/lang/String;[Lcom/adverify/sdk/internal/models/PinInfoItem;Ljava/lang/String;[Lcom/adverify/sdk/internal/models/JoinLink;)V

    .line 97
    iget-object p1, p0, Lcom/adverify/sdk/internal/AdClient;->mainHandler:Landroid/os/Handler;

    new-instance v0, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda2;

    invoke-direct {v0, p2, v11}, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda2;-><init>(Lcom/adverify/sdk/internal/AdClient$Callback;Lcom/adverify/sdk/internal/models/InitResponse;)V

    invoke-virtual {p1, v0}, Landroid/os/Handler;->post(Ljava/lang/Runnable;)Z
    :try_end_dd
    .catch Ljava/lang/Exception; {:try_start_26 .. :try_end_dd} :catch_de

    .line 101
    goto :goto_f0

    .line 98
    :catch_de
    move-exception p1

    .line 99
    const-string v0, "AdClient"

    const-string v1, "Init failed"

    invoke-static {v0, v1, p1}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;Ljava/lang/Throwable;)I

    .line 100
    iget-object v0, p0, Lcom/adverify/sdk/internal/AdClient;->mainHandler:Landroid/os/Handler;

    new-instance v1, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda3;

    invoke-direct {v1, p2, p1}, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda3;-><init>(Lcom/adverify/sdk/internal/AdClient$Callback;Ljava/lang/Exception;)V

    invoke-virtual {v0, v1}, Landroid/os/Handler;->post(Ljava/lang/Runnable;)Z

    .line 102
    :goto_f0
    return-void
.end method

.method synthetic lambda$trackClick$13$com-adverify-sdk-internal-AdClient(I)V
    .registers 4

    .line 183
    :try_start_0
    new-instance v0, Lorg/json/JSONObject;

    invoke-direct {v0}, Lorg/json/JSONObject;-><init>()V

    .line 184
    const-string v1, "adId"

    invoke-virtual {v0, v1, p1}, Lorg/json/JSONObject;->put(Ljava/lang/String;I)Lorg/json/JSONObject;

    .line 185
    const-string p1, "/api/sdk/click"

    invoke-virtual {v0}, Lorg/json/JSONObject;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-direct {p0, p1, v0}, Lcom/adverify/sdk/internal/AdClient;->post(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;
    :try_end_13
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_13} :catch_14

    .line 188
    goto :goto_1c

    .line 186
    :catch_14
    move-exception p1

    .line 187
    const-string v0, "AdClient"

    const-string v1, "Track click failed"

    invoke-static {v0, v1, p1}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;Ljava/lang/Throwable;)I

    .line 189
    :goto_1c
    return-void
.end method

.method synthetic lambda$trackImpression$12$com-adverify-sdk-internal-AdClient(I)V
    .registers 4

    .line 171
    :try_start_0
    new-instance v0, Lorg/json/JSONObject;

    invoke-direct {v0}, Lorg/json/JSONObject;-><init>()V

    .line 172
    const-string v1, "adId"

    invoke-virtual {v0, v1, p1}, Lorg/json/JSONObject;->put(Ljava/lang/String;I)Lorg/json/JSONObject;

    .line 173
    const-string p1, "/api/sdk/impression"

    invoke-virtual {v0}, Lorg/json/JSONObject;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-direct {p0, p1, v0}, Lcom/adverify/sdk/internal/AdClient;->post(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;
    :try_end_13
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_13} :catch_14

    .line 176
    goto :goto_1c

    .line 174
    :catch_14
    move-exception p1

    .line 175
    const-string v0, "AdClient"

    const-string v1, "Track impression failed"

    invoke-static {v0, v1, p1}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;Ljava/lang/Throwable;)I

    .line 177
    :goto_1c
    return-void
.end method

.method synthetic lambda$verifyPin$8$com-adverify-sdk-internal-AdClient(Ljava/lang/String;Ljava/lang/String;Lcom/adverify/sdk/internal/AdClient$Callback;)V
    .registers 6

    .line 138
    :try_start_0
    new-instance v0, Lorg/json/JSONObject;

    invoke-direct {v0}, Lorg/json/JSONObject;-><init>()V

    .line 139
    const-string v1, "pin"

    invoke-virtual {v0, v1, p1}, Lorg/json/JSONObject;->put(Ljava/lang/String;Ljava/lang/Object;)Lorg/json/JSONObject;

    .line 140
    const-string p1, "deviceId"

    invoke-virtual {v0, p1, p2}, Lorg/json/JSONObject;->put(Ljava/lang/String;Ljava/lang/Object;)Lorg/json/JSONObject;

    .line 141
    const-string p1, "/api/sdk/verify-pin"

    invoke-virtual {v0}, Lorg/json/JSONObject;->toString()Ljava/lang/String;

    move-result-object p2

    invoke-direct {p0, p1, p2}, Lcom/adverify/sdk/internal/AdClient;->post(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object p1

    .line 142
    new-instance p2, Lorg/json/JSONObject;

    invoke-direct {p2, p1}, Lorg/json/JSONObject;-><init>(Ljava/lang/String;)V

    .line 143
    const-string p1, "verified"

    const/4 v0, 0x0

    invoke-virtual {p2, p1, v0}, Lorg/json/JSONObject;->optBoolean(Ljava/lang/String;Z)Z

    move-result p1

    .line 144
    iget-object p2, p0, Lcom/adverify/sdk/internal/AdClient;->mainHandler:Landroid/os/Handler;

    new-instance v0, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda10;

    invoke-direct {v0, p3, p1}, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda10;-><init>(Lcom/adverify/sdk/internal/AdClient$Callback;Z)V

    invoke-virtual {p2, v0}, Landroid/os/Handler;->post(Ljava/lang/Runnable;)Z
    :try_end_2f
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_2f} :catch_30

    .line 148
    goto :goto_42

    .line 145
    :catch_30
    move-exception p1

    .line 146
    const-string p2, "AdClient"

    const-string v0, "PIN verify failed"

    invoke-static {p2, v0, p1}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;Ljava/lang/Throwable;)I

    .line 147
    iget-object p2, p0, Lcom/adverify/sdk/internal/AdClient;->mainHandler:Landroid/os/Handler;

    new-instance v0, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda11;

    invoke-direct {v0, p3, p1}, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda11;-><init>(Lcom/adverify/sdk/internal/AdClient$Callback;Ljava/lang/Exception;)V

    invoke-virtual {p2, v0}, Landroid/os/Handler;->post(Ljava/lang/Runnable;)Z

    .line 149
    :goto_42
    return-void
.end method

.method public trackClick(I)V
    .registers 4

    .line 181
    iget-object v0, p0, Lcom/adverify/sdk/internal/AdClient;->executor:Ljava/util/concurrent/ExecutorService;

    new-instance v1, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda9;

    invoke-direct {v1, p0, p1}, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda9;-><init>(Lcom/adverify/sdk/internal/AdClient;I)V

    invoke-interface {v0, v1}, Ljava/util/concurrent/ExecutorService;->execute(Ljava/lang/Runnable;)V

    .line 190
    return-void
.end method

.method public trackImpression(I)V
    .registers 4

    .line 169
    iget-object v0, p0, Lcom/adverify/sdk/internal/AdClient;->executor:Ljava/util/concurrent/ExecutorService;

    new-instance v1, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda14;

    invoke-direct {v1, p0, p1}, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda14;-><init>(Lcom/adverify/sdk/internal/AdClient;I)V

    invoke-interface {v0, v1}, Ljava/util/concurrent/ExecutorService;->execute(Ljava/lang/Runnable;)V

    .line 178
    return-void
.end method

.method public verifyPin(Ljava/lang/String;Ljava/lang/String;Lcom/adverify/sdk/internal/AdClient$Callback;)V
    .registers 6
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "Ljava/lang/String;",
            "Ljava/lang/String;",
            "Lcom/adverify/sdk/internal/AdClient$Callback<",
            "Ljava/lang/Boolean;",
            ">;)V"
        }
    .end annotation

    .line 136
    iget-object v0, p0, Lcom/adverify/sdk/internal/AdClient;->executor:Ljava/util/concurrent/ExecutorService;

    new-instance v1, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda4;

    invoke-direct {v1, p0, p1, p2, p3}, Lcom/adverify/sdk/internal/AdClient$$ExternalSyntheticLambda4;-><init>(Lcom/adverify/sdk/internal/AdClient;Ljava/lang/String;Ljava/lang/String;Lcom/adverify/sdk/internal/AdClient$Callback;)V

    invoke-interface {v0, v1}, Ljava/util/concurrent/ExecutorService;->execute(Ljava/lang/Runnable;)V

    .line 150
    return-void
.end method
