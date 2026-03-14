.class public Lcom/adverify/sdk/internal/models/PinInfoItem;
.super Ljava/lang/Object;
.source "PinInfoItem.java"


# instance fields
.field public final color:Ljava/lang/String;

.field public final icon:Ljava/lang/String;

.field public final text:Ljava/lang/String;


# direct methods
.method public constructor <init>(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V
    .registers 4

    .line 10
    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    .line 11
    iput-object p1, p0, Lcom/adverify/sdk/internal/models/PinInfoItem;->icon:Ljava/lang/String;

    .line 12
    iput-object p2, p0, Lcom/adverify/sdk/internal/models/PinInfoItem;->text:Ljava/lang/String;

    .line 13
    iput-object p3, p0, Lcom/adverify/sdk/internal/models/PinInfoItem;->color:Ljava/lang/String;

    .line 14
    return-void
.end method
