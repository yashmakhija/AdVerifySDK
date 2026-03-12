package com.adverify.sdk;

import android.app.Activity;
import android.content.Context;
import android.provider.Settings;
import android.util.Log;

import com.adverify.sdk.internal.AdClient;

/**
 * Main entry point for the AdVerify SDK.
 *
 * Usage (Android Studio):
 *   AdVerify.init(context, "API_KEY", "https://your-server.com");
 *   AdVerify.show(activity);
 *
 * Usage (MT Manager — single call, no Application class needed):
 *   AdVerify.start(activity, "API_KEY", "https://your-server.com");
 */
public final class AdVerify {

    private static final String TAG = "AdVerify";

    private static String sApiKey;
    private static String sBaseUrl;
    private static String sDeviceId;
    private static boolean sInitialized;

    private AdVerify() {}

    /**
     * Initialize the SDK. Call once in Application.onCreate() or before show().
     */
    public static void init(Context context, String apiKey, String baseUrl) {
        if (apiKey == null || apiKey.isEmpty()) {
            throw new IllegalArgumentException("API key must not be null or empty");
        }
        if (baseUrl == null || baseUrl.isEmpty()) {
            throw new IllegalArgumentException("Base URL must not be null or empty");
        }

        sApiKey = apiKey;
        sBaseUrl = baseUrl.endsWith("/") ? baseUrl.substring(0, baseUrl.length() - 1) : baseUrl;
        sDeviceId = Settings.Secure.getString(context.getContentResolver(), Settings.Secure.ANDROID_ID);
        sInitialized = true;

        Log.d(TAG, "SDK initialized, deviceId=" + sDeviceId);
    }

    /**
     * MT Manager friendly — init + show in one call.
     * Call from any Activity's onCreate(). Safe to call multiple times.
     *
     * Smali:
     *   const-string v0, "YOUR_API_KEY"
     *   const-string v1, "https://your-server.com"
     *   invoke-static {p0, v0, v1}, Lcom/adverify/sdk/AdVerify;->start(Landroid/app/Activity;Ljava/lang/String;Ljava/lang/String;)V
     */
    public static void start(Activity activity, String apiKey, String baseUrl) {
        if (!sInitialized) {
            init(activity, apiKey, baseUrl);
        }
        show(activity, null);
    }

    /** Show ad in the given activity (no callback). */
    public static void show(Activity activity) {
        show(activity, null);
    }

    /** Show ad in the given activity with callback. */
    public static void show(Activity activity, AdVerifyCallback callback) {
        ensureInitialized();

        if (activity == null || activity.isFinishing()) {
            if (callback != null) callback.onError("Activity is null or finishing");
            return;
        }

        AdClient client = new AdClient(sApiKey, sBaseUrl);
        new AdLoader(activity, client, sDeviceId, callback).load();
    }

    static String getApiKey() { return sApiKey; }
    static String getBaseUrl() { return sBaseUrl; }
    static String getDeviceId() { return sDeviceId; }

    private static void ensureInitialized() {
        if (!sInitialized) {
            throw new IllegalStateException("AdVerify.init() must be called before show()");
        }
    }
}
