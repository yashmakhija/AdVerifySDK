package com.adverify.sdk.internal.models;

public class InitResponse {

    public final String appName;
    public final boolean pinEnabled;
    public final boolean pinVerified;
    public final String pinMessage;
    public final int maxAttempts;
    public final String getPinUrl;
    public final String getPinBtnText;

    public InitResponse(String appName, boolean pinEnabled, boolean pinVerified,
                        String pinMessage, int maxAttempts,
                        String getPinUrl, String getPinBtnText) {
        this.appName = appName;
        this.pinEnabled = pinEnabled;
        this.pinVerified = pinVerified;
        this.pinMessage = pinMessage;
        this.maxAttempts = maxAttempts;
        this.getPinUrl = getPinUrl;
        this.getPinBtnText = getPinBtnText;
    }
}
