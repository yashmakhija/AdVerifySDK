package com.adverify.sdk;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;

import com.adverify.sdk.internal.AdClient;
import com.adverify.sdk.internal.models.Ad;
import com.adverify.sdk.internal.models.InitResponse;
import com.adverify.sdk.internal.models.JoinLink;
import com.adverify.sdk.internal.models.PinInfoItem;

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
                    showPinDialog(config);
                } else {
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

    private static final String FALLBACK_TUTORIAL_URL = "https://t.me/EllieTutorials/36";
    private static final JoinLink[] FALLBACK_JOIN_LINKS = new JoinLink[] {
        new JoinLink("Public Channel", "Apps, APKs & Mods", "https://t.me/Android_apps_apks_mod", "channel"),
        new JoinLink("Private Channel", "Exclusive Content", "https://t.me/+PXcn1RVLom0xMzU1", "telegram"),
    };
    private static final PinInfoItem[] FALLBACK_INFO_ITEMS = new PinInfoItem[] {
        new PinInfoItem("device", "Device Not Registered", "#3b82f6"),
        new PinInfoItem("hourglass", "Access Duration: 24 Hours", "#22c55e"),
        new PinInfoItem("key", "Automatic Password System", "#8b5cf6"),
        new PinInfoItem("crown", "Premium Users Only", "#eab308"),
        new PinInfoItem("shield", "VPN & Emulators Not Allowed", "#ef4444"),
    };

    private void showPinDialog(InitResponse config) {
        if (activity.isFinishing()) return;

        // Use server values if available, otherwise hardcoded defaults
        final PinInfoItem[] infoItems = (config.pinInfoItems != null && config.pinInfoItems.length > 0)
            ? config.pinInfoItems : FALLBACK_INFO_ITEMS;
        final String tutorialUrl = (config.tutorialUrl != null && !config.tutorialUrl.isEmpty())
            ? config.tutorialUrl : FALLBACK_TUTORIAL_URL;
        final JoinLink[] joinLinks = (config.joinLinks != null && config.joinLinks.length > 0)
            ? config.joinLinks : FALLBACK_JOIN_LINKS;

        // Use server value if available, otherwise default
        final String enterPinBtnText = (config.enterPinBtnText != null && !config.enterPinBtnText.isEmpty())
            ? config.enterPinBtnText : "Enter PIN";

        PinVerifyDialog dialog = new PinVerifyDialog(
            activity,
            config.appName,
            config.pinMessage,
            config.maxAttempts,
            config.getPinBtnText,
            enterPinBtnText,
            infoItems,
            new PinVerifyDialog.PinListener() {
                @Override
                public void onPinSubmit(String pin, PinVerifyDialog dlg) {
                    dlg.setVerifyLoading(true);
                    client.verifyPin(pin, deviceId, new AdClient.Callback<Boolean>() {
                        @Override
                        public void onSuccess(Boolean verified) {
                            dlg.setVerifyLoading(false);
                            if (verified) {
                                dlg.dismiss();
                                fetchAndShowAds();
                            } else {
                                dlg.showError("Invalid PIN. Try again.");
                            }
                        }

                        @Override
                        public void onError(String message) {
                            dlg.setVerifyLoading(false);
                            dlg.showError("Verification failed");
                        }
                    });
                }

                @Override
                public void onGetPinClicked(PinVerifyDialog dlg) {
                    dlg.setGetPinLoading(true);
                    client.createLink(deviceId, new AdClient.Callback<String>() {
                        @Override
                        public void onSuccess(String url) {
                            dlg.setGetPinLoading(false);
                            dlg.openUrl(url);
                            dlg.switchToPinState();
                        }

                        @Override
                        public void onError(String message) {
                            dlg.setGetPinLoading(false);
                            dlg.showError("Failed to get PIN link");
                        }
                    });
                }

                @Override
                public void onEnterPinClicked(PinVerifyDialog dlg) {
                    dlg.switchToPinState();
                }

                @Override
                public void onMaxAttemptsReached() {
                    if (callback != null) callback.onError("Max PIN attempts reached");
                }

                @Override
                public void onTutorialClicked() {
                    try {
                        activity.startActivity(new Intent(Intent.ACTION_VIEW,
                            Uri.parse(tutorialUrl)));
                    } catch (Exception ignored) {}
                }

                @Override
                public void onJoinClicked() {
                    new JoinDialog(activity, joinLinks).show();
                }

                @Override
                public void onExitClicked() {
                    activity.finish();
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
