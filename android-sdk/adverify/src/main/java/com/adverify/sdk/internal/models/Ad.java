package com.adverify.sdk.internal.models;

public class Ad {

    public final int id;
    public final String title;
    public final String description;
    public final String imageUrl;
    public final String redirectUrl;
    public final String adType;
    public final String buttonText;
    public final int priority;

    public Ad(int id, String title, String description, String imageUrl,
              String redirectUrl, String adType, String buttonText, int priority) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.redirectUrl = redirectUrl;
        this.adType = adType;
        this.buttonText = buttonText;
        this.priority = priority;
    }
}
