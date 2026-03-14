.class public Lcom/adverify/sdk/internal/models/JoinLink;
.super Ljava/lang/Object;
.source "JoinLink.java"


# instance fields
.field public final description:Ljava/lang/String;

.field public final iconType:Ljava/lang/String;

.field public final name:Ljava/lang/String;

.field public final url:Ljava/lang/String;


# direct methods
.method public constructor <init>(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V
    .registers 5

    .line 11
    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    .line 12
    iput-object p1, p0, Lcom/adverify/sdk/internal/models/JoinLink;->name:Ljava/lang/String;

    .line 13
    iput-object p2, p0, Lcom/adverify/sdk/internal/models/JoinLink;->description:Ljava/lang/String;

    .line 14
    iput-object p3, p0, Lcom/adverify/sdk/internal/models/JoinLink;->url:Ljava/lang/String;

    .line 15
    iput-object p4, p0, Lcom/adverify/sdk/internal/models/JoinLink;->iconType:Ljava/lang/String;

    .line 16
    return-void
.end method
