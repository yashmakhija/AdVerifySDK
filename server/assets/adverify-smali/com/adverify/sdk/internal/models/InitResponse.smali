.class public Lcom/adverify/sdk/internal/models/InitResponse;
.super Ljava/lang/Object;
.source "InitResponse.java"


# instance fields
.field public final appName:Ljava/lang/String;

.field public final getPinBtnText:Ljava/lang/String;

.field public final getPinUrl:Ljava/lang/String;

.field public final joinLinks:[Lcom/adverify/sdk/internal/models/JoinLink;

.field public final maxAttempts:I

.field public final pinEnabled:Z

.field public final pinInfoItems:[Lcom/adverify/sdk/internal/models/PinInfoItem;

.field public final pinMessage:Ljava/lang/String;

.field public final pinVerified:Z

.field public final tutorialUrl:Ljava/lang/String;


# direct methods
.method public constructor <init>(Ljava/lang/String;ZZLjava/lang/String;ILjava/lang/String;Ljava/lang/String;[Lcom/adverify/sdk/internal/models/PinInfoItem;Ljava/lang/String;[Lcom/adverify/sdk/internal/models/JoinLink;)V
    .registers 11

    .line 20
    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    .line 21
    iput-object p1, p0, Lcom/adverify/sdk/internal/models/InitResponse;->appName:Ljava/lang/String;

    .line 22
    iput-boolean p2, p0, Lcom/adverify/sdk/internal/models/InitResponse;->pinEnabled:Z

    .line 23
    iput-boolean p3, p0, Lcom/adverify/sdk/internal/models/InitResponse;->pinVerified:Z

    .line 24
    iput-object p4, p0, Lcom/adverify/sdk/internal/models/InitResponse;->pinMessage:Ljava/lang/String;

    .line 25
    iput p5, p0, Lcom/adverify/sdk/internal/models/InitResponse;->maxAttempts:I

    .line 26
    iput-object p6, p0, Lcom/adverify/sdk/internal/models/InitResponse;->getPinUrl:Ljava/lang/String;

    .line 27
    iput-object p7, p0, Lcom/adverify/sdk/internal/models/InitResponse;->getPinBtnText:Ljava/lang/String;

    .line 28
    iput-object p8, p0, Lcom/adverify/sdk/internal/models/InitResponse;->pinInfoItems:[Lcom/adverify/sdk/internal/models/PinInfoItem;

    .line 29
    iput-object p9, p0, Lcom/adverify/sdk/internal/models/InitResponse;->tutorialUrl:Ljava/lang/String;

    .line 30
    iput-object p10, p0, Lcom/adverify/sdk/internal/models/InitResponse;->joinLinks:[Lcom/adverify/sdk/internal/models/JoinLink;

    .line 31
    return-void
.end method
