package com.adverify.sdk;

/** Callback interface for ad lifecycle events. */
public interface AdVerifyCallback {
    void onAdShown();
    void onAdClosed();
    void onAdClicked(String redirectUrl);
    void onError(String message);
}
