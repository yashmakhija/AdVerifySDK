package com.adverify.sdk;

import android.app.Activity;
import android.util.Log;

import com.adverify.sdk.internal.AdClient;
import com.adverify.sdk.internal.models.Ad;
import com.adverify.sdk.internal.models.InitResponse;

/** Coordinates the SDK flow: init -> check PIN status -> optional PIN -> show ad. */
class AdLoader {

    private static final String TAG = "AdLoader";

    private final Activity activity;
    private final AdClient client;
    private final String deviceId;
    private final AdVerifyCallback callback;

    AdLoader(Activity activity, AdClient client, String deviceId, AdVerifyCallback callback) {
        this.activity = activity;
        this.client = client;
        this.deviceId = deviceId;
        this.callback = callback;
    }

    void load() {
        client.init(deviceId, new AdClient.Callback<InitResponse>() {
            @Override
            public void onSuccess(InitResponse config) {
                if (config.pinEnabled && !config.pinVerified) {
                    // PIN required but this device hasn't verified yet
                    showPinDialog(config);
                } else {
                    // Either PIN not enabled or already verified for this device
                    fetchAndShowAds();
                }
            }

            @Override
            public void onError(String message) {
                Log.e(TAG, "Init error: " + message);
                if (callback != null) callback.onError(message);
            }
        });
    }

    private void showPinDialog(InitResponse config) {
        if (activity.isFinishing()) return;

        PinVerifyDialog dialog = new PinVerifyDialog(
            activity,
            config.pinMessage,
            config.maxAttempts,
            config.getPinBtnText,
            new PinVerifyDialog.PinListener() {
                @Override
                public void onPinSubmit(String pin, PinVerifyDialog dlg) {
                    client.verifyPin(pin, deviceId, new AdClient.Callback<Boolean>() {
                        @Override
                        public void onSuccess(Boolean verified) {
                            if (verified) {
                                dlg.dismiss();
                                fetchAndShowAds();
                            } else {
                                dlg.showError("Invalid PIN. Try again.");
                            }
                        }

                        @Override
                        public void onError(String message) {
                            dlg.showError("Verification failed");
                        }
                    });
                }

                @Override
                public void onGetPinClicked(PinVerifyDialog dlg) {
                    // Call server to create shortener link, then open in browser
                    client.createLink(deviceId, new AdClient.Callback<String>() {
                        @Override
                        public void onSuccess(String url) {
                            dlg.openUrl(url);
                        }

                        @Override
                        public void onError(String message) {
                            dlg.showError("Failed to get PIN link");
                        }
                    });
                }

                @Override
                public void onMaxAttemptsReached() {
                    if (callback != null) callback.onError("Max PIN attempts reached");
                }
            });

        dialog.show();
    }

    private void fetchAndShowAds() {
        client.fetchAds(new AdClient.Callback<Ad[]>() {
            @Override
            public void onSuccess(Ad[] ads) {
                if (ads.length == 0) {
                    if (callback != null) callback.onError("No ads available");
                    return;
                }
                showAd(ads[0]);
            }

            @Override
            public void onError(String message) {
                Log.e(TAG, "Fetch ads error: " + message);
                if (callback != null) callback.onError(message);
            }
        });
    }

    private void showAd(Ad ad) {
        if (activity.isFinishing()) return;

        client.trackImpression(ad.id);

        AdDialog dialog = new AdDialog(activity, ad, new AdDialog.AdDialogListener() {
            @Override
            public void onClicked(String url) {
                client.trackClick(ad.id);
                if (callback != null) callback.onAdClicked(url);
            }

            @Override
            public void onClosed() {
                if (callback != null) callback.onAdClosed();
            }
        });

        dialog.show();
        if (callback != null) callback.onAdShown();
    }
}
