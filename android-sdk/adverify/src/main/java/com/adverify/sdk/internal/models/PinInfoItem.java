package com.adverify.sdk.internal.models;

/** A single info row displayed in the PIN verification dialog. */
public class PinInfoItem {

    public final String icon;
    public final String text;
    public final String color; // hex color or null for default

    public PinInfoItem(String icon, String text, String color) {
        this.icon = icon;
        this.text = text;
        this.color = color;
    }
}
