package com.adverify.sdk.internal.models;

public class InitResponse {

    public final String appName;
    public final boolean pinEnabled;
    public final boolean pinVerified;
    public final boolean hasBroadcastAds;
    public final String pinMessage;
    public final int maxAttempts;
    public final String getPinUrl;
    public final String getPinBtnText;
    public final String enterPinBtnText;
    public final PinInfoItem[] pinInfoItems;
    public final String tutorialUrl;
    public final JoinLink[] joinLinks;

    public InitResponse(String appName, boolean pinEnabled, boolean pinVerified,
                        boolean hasBroadcastAds,
                        String pinMessage, int maxAttempts,
                        String getPinUrl, String getPinBtnText,
                        String enterPinBtnText,
                        PinInfoItem[] pinInfoItems, String tutorialUrl,
                        JoinLink[] joinLinks) {
        this.appName = appName;
        this.pinEnabled = pinEnabled;
        this.pinVerified = pinVerified;
        this.hasBroadcastAds = hasBroadcastAds;
        this.pinMessage = pinMessage;
        this.maxAttempts = maxAttempts;
        this.getPinUrl = getPinUrl;
        this.getPinBtnText = getPinBtnText;
        this.enterPinBtnText = enterPinBtnText;
        this.pinInfoItems = pinInfoItems;
        this.tutorialUrl = tutorialUrl;
        this.joinLinks = joinLinks;
    }
}
