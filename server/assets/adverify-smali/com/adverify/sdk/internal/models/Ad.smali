.class public Lcom/adverify/sdk/internal/models/Ad;
.super Ljava/lang/Object;
.source "Ad.java"


# instance fields
.field public final adType:Ljava/lang/String;

.field public final buttonText:Ljava/lang/String;

.field public final description:Ljava/lang/String;

.field public final id:I

.field public final imageUrl:Ljava/lang/String;

.field public final priority:I

.field public final redirectUrl:Ljava/lang/String;

.field public final title:Ljava/lang/String;


# direct methods
.method public constructor <init>(ILjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;I)V
    .registers 9

    .line 15
    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    .line 16
    iput p1, p0, Lcom/adverify/sdk/internal/models/Ad;->id:I

    .line 17
    iput-object p2, p0, Lcom/adverify/sdk/internal/models/Ad;->title:Ljava/lang/String;

    .line 18
    iput-object p3, p0, Lcom/adverify/sdk/internal/models/Ad;->description:Ljava/lang/String;

    .line 19
    iput-object p4, p0, Lcom/adverify/sdk/internal/models/Ad;->imageUrl:Ljava/lang/String;

    .line 20
    iput-object p5, p0, Lcom/adverify/sdk/internal/models/Ad;->redirectUrl:Ljava/lang/String;

    .line 21
    iput-object p6, p0, Lcom/adverify/sdk/internal/models/Ad;->adType:Ljava/lang/String;

    .line 22
    iput-object p7, p0, Lcom/adverify/sdk/internal/models/Ad;->buttonText:Ljava/lang/String;

    .line 23
    iput p8, p0, Lcom/adverify/sdk/internal/models/Ad;->priority:I

    .line 24
    return-void
.end method
