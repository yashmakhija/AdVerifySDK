# AdVerify Android SDK — Technical Documentation

## Overview

AdVerify is an ad monetization SDK for Android that gates ad display behind a device PIN verification flow. It supports two integration methods: standard Android Studio library integration and MT Manager smali injection into third-party APKs.

---

## Module Structure

```
android-sdk/
├── adverify/          # SDK library (zero external deps)
│   └── src/main/java/com/adverify/sdk/
│       ├── AdVerify.java           # Public entry point
│       ├── AdVerifyCallback.java   # Callback interface
│       ├── AdLoader.java           # Flow orchestrator (package-private)
│       ├── AdDialog.java           # Ad renderer (package-private)
│       ├── PinVerifyDialog.java    # PIN UI (package-private)
│       ├── JoinDialog.java         # Community links UI (package-private)
│       └── internal/
│           ├── AdClient.java       # HTTP networking
│           └── models/             # Immutable value objects
├── app/               # Demo application
├── out/adverify.dex   # Pre-built DEX for MT Manager
├── mt-manager-hook.smali  # Smali injection snippet
└── build-dex.sh       # Standalone DEX build script (no Gradle)
```

---

## Public API (`AdVerify.java`)

All methods are static. The class is final with a private constructor.

```java
// Standard integration (call once in Application.onCreate)
AdVerify.init(Context context, String apiKey, String baseUrl);

// Show ad (no callback)
AdVerify.show(Activity activity);

// Show ad with lifecycle callbacks
AdVerify.show(Activity activity, AdVerifyCallback callback);

// MT Manager one-step: reads config from AndroidManifest <meta-data>
AdVerify.start(Activity activity);

// MT Manager one-step: explicit params
AdVerify.start(Activity activity, String apiKey, String baseUrl);
```

**Static state:** `sApiKey`, `sBaseUrl`, `sDeviceId` (Android ID), `sAppSignature` (SHA-256 of APK signing cert), `sInitialized`.

---

## Callback Interface (`AdVerifyCallback.java`)

```java
interface AdVerifyCallback {
    void onAdShown();
    void onAdClosed();
    void onAdClicked(String redirectUrl);
    void onError(String message);
}
```

---

## Full SDK Flow (`AdLoader.java`)

`AdVerify.show()` creates an `AdClient` and `AdLoader`, then calls `AdLoader.load()`:

1. **POST `/api/sdk/init`** with `deviceId` → returns `InitResponse`
2. Branch logic:
   - `pinEnabled && !pinVerified` → show `PinVerifyDialog`
   - `!pinEnabled || hasBroadcastAds` → `fetchAndShowAds()`
   - `pinEnabled && pinVerified && !hasBroadcastAds` → silent close, call `onAdClosed()`

### PinVerifyDialog Flow
- **"Get PIN"** → POST `/api/sdk/create-link` → open URL in browser → switch to PIN entry state
- **"Enter PIN"** → switch directly to PIN entry state
- **"Verify"** → POST `/api/sdk/verify-pin` → on success: dismiss + show ad; on locked: disable input; on error: show message
- **"Tutorial"** → open `tutorialUrl` in browser (fallback: `https://t.me/EllieTutorials/36`)
- **"Join Us"** → open `JoinDialog`
- **"Exit"** → `activity.finish()` (terminates host app)

### Ad Display Flow
- POST `/api/sdk/ads` → take `ads[0]`
- Fire-and-forget POST `/api/sdk/impression`
- Show `AdDialog`
- On CTA tap: fire-and-forget POST `/api/sdk/click` → open `redirectUrl` in browser

---

## Backend API (`AdClient.java`)

All requests are POST with JSON body. Single-thread `ExecutorService` for background, `Handler(mainLooper)` to post results to UI thread. 10-second timeout.

| Endpoint | Body | Purpose |
|---|---|---|
| `POST /api/sdk/init` | `{deviceId}` | PIN status + config |
| `POST /api/sdk/ads` | `{deviceId}` | Fetch ads |
| `POST /api/sdk/verify-pin` | `{pin, deviceId}` | Verify PIN |
| `POST /api/sdk/create-link` | `{deviceId}` | Get one-time PIN URL |
| `POST /api/sdk/impression` | `{adId, deviceId}` | Track impression (fire-and-forget) |
| `POST /api/sdk/click` | `{adId, deviceId}` | Track click (fire-and-forget) |

**Request headers:**
- `x-api-key: <apiKey>` — always set
- `Content-Type: application/json` — always set
- `x-app-signature: <sha256>` — set only if non-empty; lets server validate APK signing cert

---

## Dialog Classes

### `PinVerifyDialog`

Light-theme modal dialog built entirely in code (no XML layouts). Width fixed at 340dp.

**Two internal states toggled by visibility:**

**Info state:**
- Custom-drawn shield-lock icon (56dp, via `Canvas`/`Path`)
- Title + subtitle from server (`InitResponse.appName`, `pinMessage`)
- Info card: list of `PinInfoItem` rows with colored icon dots (device/hourglass/key/crown/shield-x icon types, each drawn via `Canvas`)
  - First row always gets a "PENDING" badge
- "Get PIN" button (solid black) + "Enter PIN" button (outlined), side by side
- "Tutorial" + "Join Us" ghost buttons
- "Exit" pill button (transparent with red border/text)

**PIN state:**
- Instruction text: "Enter the PIN from your browser"
- Numeric password `EditText` (monospace, centered, letter spacing 0.3)
- Error `TextView` (hidden until needed)
- "Verify" solid black button
- "← Back" ghost button

**Public methods:**
```java
void show()
void switchToPinState()
void dismiss()
void openUrl(String url)
void showError(String msg)
void setLocked(String message)
void setGetPinLoading(boolean loading)
void setVerifyLoading(boolean loading)
```

**Constructor:**
```java
PinVerifyDialog(Activity, String title, String message, int maxAttempts,
                String getPinBtnText, String enterPinBtnText,
                PinInfoItem[] infoItems, PinListener listener)
```

### `AdDialog`

Renders the actual ad. Three types:
- **`card`** — centered modal, 16:9 image, title, description, CTA button
- **`fullscreen`** — translucent full-screen, background image, gradient overlay, bottom-pinned text+button, close X
- **`banner`** — bottom-pinned strip, 52dp thumbnail, title, "Sponsored" label, CTA button

All views built in code. Images loaded on background thread via `HttpURLConnection`.

**Listener:**
```java
interface AdDialogListener {
    void onClicked(String url);
    void onClosed();
}
```

### `JoinDialog`

Community links modal. Shows `JoinLink[]` as clickable cards with custom-drawn icons (telegram paper plane or channel megaphone). Tapping opens `url` via `Intent.ACTION_VIEW`.

---

## Models (`internal/models/`)

All models are simple value objects with `public final` fields:

| Model | Fields |
|---|---|
| `Ad` | `id`, `title`, `description`, `imageUrl`, `redirectUrl`, `adType`, `buttonText`, `priority` |
| `InitResponse` | `appName`, `pinEnabled`, `pinVerified`, `hasBroadcastAds`, `pinMessage`, `maxAttempts`, `getPinUrl`, `getPinBtnText`, `enterPinBtnText`, `pinInfoItems[]`, `tutorialUrl`, `joinLinks[]` |
| `VerifyResult` | `verified`, `message`, `locked` |
| `PinInfoItem` | `icon` (type string), `text`, `color` (hex) |
| `JoinLink` | `name`, `description`, `url`, `iconType` |

---

## Build System

- **SDK library**: `com.android.library`, `compileSdk/targetSdk 34`, `minSdk 21`, Java 11
- **Zero external dependencies** — intentional, enables standalone DEX distribution
- Custom Gradle task `buildDex` on release variant compiles → jars → d8 → `out/adverify.dex`
- **`build-dex.sh`**: standalone script using `javac` + `d8` directly (no Gradle required)

---

## MT Manager / APK Injection

The SDK is designed to be injected into existing APKs:

1. Copy `out/adverify.dex` into APK as `classes2.dex`
2. Paste smali from `mt-manager-hook.smali` into launcher Activity's `onCreate` after `invoke-super`
3. Ensure `.locals` count ≥ 2, `INTERNET` permission exists, and `usesCleartextTraffic="true"` for HTTP URLs

---

## Demo App

Located in `android-sdk/app/`. Connects to `http://10.0.2.2:3042` (emulator localhost alias for dev server on port 3042).

- `DemoApp.java`: calls `AdVerify.init()` in `Application.onCreate()`
- `MainActivity.java`: shows `AdVerify.show()` immediately on launch + on button click
