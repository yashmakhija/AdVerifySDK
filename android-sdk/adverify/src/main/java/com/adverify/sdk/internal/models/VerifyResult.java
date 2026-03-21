package com.adverify.sdk.internal.models;

/** Response from the verify-pin endpoint. */
public class VerifyResult {
    public final boolean verified;
    public final String message;
    public final boolean locked;

    public VerifyResult(boolean verified, String message, boolean locked) {
        this.verified = verified;
        this.message = message;
        this.locked = locked;
    }
}
