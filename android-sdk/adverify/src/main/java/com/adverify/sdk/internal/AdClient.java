package com.adverify.sdk.internal;

import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import com.adverify.sdk.internal.models.Ad;
import com.adverify.sdk.internal.models.InitResponse;
import com.adverify.sdk.internal.models.JoinLink;
import com.adverify.sdk.internal.models.PinInfoItem;

/** HTTP client for communicating with the AdVerify server. */
public class AdClient {

    private static final String TAG = "AdClient";
    private static final int TIMEOUT_MS = 10_000;

    private final String apiKey;
    private final String baseUrl;
    private final ExecutorService executor = Executors.newSingleThreadExecutor();
    private final Handler mainHandler = new Handler(Looper.getMainLooper());

    public AdClient(String apiKey, String baseUrl) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    public interface Callback<T> {
        void onSuccess(T result);
        void onError(String message);
    }

    public void init(String deviceId, Callback<InitResponse> callback) {
        executor.execute(() -> {
            try {
                JSONObject body = new JSONObject();
                body.put("deviceId", deviceId);
                String json = post("/api/sdk/init", body.toString());
                JSONObject obj = new JSONObject(json);

                // Parse info items
                PinInfoItem[] infoItems = new PinInfoItem[0];
                JSONArray itemsArr = obj.optJSONArray("pinInfoItems");
                if (itemsArr != null) {
                    infoItems = new PinInfoItem[itemsArr.length()];
                    for (int i = 0; i < itemsArr.length(); i++) {
                        JSONObject item = itemsArr.getJSONObject(i);
                        infoItems[i] = new PinInfoItem(
                            item.optString("icon", ""),
                            item.optString("text", ""),
                            item.optString("color", null)
                        );
                    }
                }

                // Parse join links
                JoinLink[] joinLinks = new JoinLink[0];
                JSONArray linksArr = obj.optJSONArray("joinLinks");
                if (linksArr != null) {
                    joinLinks = new JoinLink[linksArr.length()];
                    for (int i = 0; i < linksArr.length(); i++) {
                        JSONObject link = linksArr.getJSONObject(i);
                        joinLinks[i] = new JoinLink(
                            link.optString("name", ""),
                            link.optString("description", ""),
                            link.optString("url", ""),
                            link.optString("iconType", "telegram")
                        );
                    }
                }

                InitResponse response = new InitResponse(
                    obj.optString("appName", ""),
                    obj.optBoolean("pinEnabled", false),
                    obj.optBoolean("pinVerified", false),
                    obj.optString("pinMessage", ""),
                    obj.optInt("maxAttempts", 3),
                    obj.optString("getPinUrl", ""),
                    obj.optString("getPinBtnText", "Get PIN"),
                    obj.optString("enterPinBtnText", "Enter PIN"),
                    infoItems,
                    obj.optString("tutorialUrl", ""),
                    joinLinks
                );

                mainHandler.post(() -> callback.onSuccess(response));
            } catch (Exception e) {
                Log.e(TAG, "Init failed", e);
                mainHandler.post(() -> callback.onError(e.getMessage()));
            }
        });
    }

    public void fetchAds(Callback<Ad[]> callback) {
        executor.execute(() -> {
            try {
                String json = get("/api/sdk/ads");
                JSONObject obj = new JSONObject(json);
                JSONArray arr = obj.getJSONArray("ads");

                Ad[] ads = new Ad[arr.length()];
                for (int i = 0; i < arr.length(); i++) {
                    JSONObject a = arr.getJSONObject(i);
                    ads[i] = new Ad(
                        a.getInt("id"),
                        a.getString("title"),
                        a.optString("description", ""),
                        a.optString("imageUrl", ""),
                        a.optString("redirectUrl", ""),
                        a.optString("adType", "interstitial"),
                        a.optString("buttonText", "Visit Now"),
                        a.optInt("priority", 0)
                    );
                }

                mainHandler.post(() -> callback.onSuccess(ads));
            } catch (Exception e) {
                Log.e(TAG, "Fetch ads failed", e);
                mainHandler.post(() -> callback.onError(e.getMessage()));
            }
        });
    }

    public void verifyPin(String pin, String deviceId, Callback<Boolean> callback) {
        executor.execute(() -> {
            try {
                JSONObject body = new JSONObject();
                body.put("pin", pin);
                body.put("deviceId", deviceId);
                String json = post("/api/sdk/verify-pin", body.toString());
                JSONObject obj = new JSONObject(json);
                boolean verified = obj.optBoolean("verified", false);
                mainHandler.post(() -> callback.onSuccess(verified));
            } catch (Exception e) {
                Log.e(TAG, "PIN verify failed", e);
                mainHandler.post(() -> callback.onError(e.getMessage()));
            }
        });
    }

    public void createLink(String deviceId, Callback<String> callback) {
        executor.execute(() -> {
            try {
                JSONObject body = new JSONObject();
                body.put("deviceId", deviceId);
                String json = post("/api/sdk/create-link", body.toString());
                JSONObject obj = new JSONObject(json);
                String url = obj.optString("url", "");
                mainHandler.post(() -> callback.onSuccess(url));
            } catch (Exception e) {
                Log.e(TAG, "Create link failed", e);
                mainHandler.post(() -> callback.onError(e.getMessage()));
            }
        });
    }

    public void trackImpression(int adId) {
        executor.execute(() -> {
            try {
                JSONObject body = new JSONObject();
                body.put("adId", adId);
                post("/api/sdk/impression", body.toString());
            } catch (Exception e) {
                Log.e(TAG, "Track impression failed", e);
            }
        });
    }

    public void trackClick(int adId) {
        executor.execute(() -> {
            try {
                JSONObject body = new JSONObject();
                body.put("adId", adId);
                post("/api/sdk/click", body.toString());
            } catch (Exception e) {
                Log.e(TAG, "Track click failed", e);
            }
        });
    }

    private String get(String path) throws Exception {
        URL url = new URL(baseUrl + path);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("x-api-key", apiKey);
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setConnectTimeout(TIMEOUT_MS);
        conn.setReadTimeout(TIMEOUT_MS);
        return readResponse(conn);
    }

    private String post(String path, String body) throws Exception {
        URL url = new URL(baseUrl + path);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("x-api-key", apiKey);
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setConnectTimeout(TIMEOUT_MS);
        conn.setReadTimeout(TIMEOUT_MS);
        conn.setDoOutput(true);

        try (OutputStream os = conn.getOutputStream()) {
            os.write(body.getBytes(StandardCharsets.UTF_8));
        }

        return readResponse(conn);
    }

    private String readResponse(HttpURLConnection conn) throws Exception {
        int code = conn.getResponseCode();
        BufferedReader reader = new BufferedReader(
            new InputStreamReader(code >= 400 ? conn.getErrorStream() : conn.getInputStream())
        );

        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            sb.append(line);
        }
        reader.close();

        if (code >= 400) {
            throw new Exception("HTTP " + code + ": " + sb);
        }

        return sb.toString();
    }
}
