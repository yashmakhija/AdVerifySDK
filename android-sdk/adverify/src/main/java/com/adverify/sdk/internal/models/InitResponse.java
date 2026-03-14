package com.adverify.sdk.internal.models;

public class InitResponse {

    public final String appName;
    public final boolean pinEnabled;
    public final boolean pinVerified;
    public final String pinMessage;
    public final int maxAttempts;
    public final String getPinUrl;
    public final String getPinBtnText;
    public final PinInfoItem[] pinInfoItems;
    public final String tutorialUrl;
    public final JoinLink[] joinLinks;

    public InitResponse(String appName, boolean pinEnabled, boolean pinVerified,
                        String pinMessage, int maxAttempts,
                        String getPinUrl, String getPinBtnText,
                        PinInfoItem[] pinInfoItems, String tutorialUrl,
                        JoinLink[] joinLinks) {
        this.appName = appName;
        this.pinEnabled = pinEnabled;
        this.pinVerified = pinVerified;
        this.pinMessage = pinMessage;
        this.maxAttempts = maxAttempts;
        this.getPinUrl = getPinUrl;
        this.getPinBtnText = getPinBtnText;
        this.pinInfoItems = pinInfoItems;
        this.tutorialUrl = tutorialUrl;
        this.joinLinks = joinLinks;
    }
}
