package com.adverify.sdk.internal.models;

/** A community link displayed in the Join Us dialog. */
public class JoinLink {

    public final String name;
    public final String description;
    public final String url;
    public final String iconType; // "telegram", "channel", "discord", "website"

    public JoinLink(String name, String description, String url, String iconType) {
        this.name = name;
        this.description = description;
        this.url = url;
        this.iconType = iconType;
    }
}
