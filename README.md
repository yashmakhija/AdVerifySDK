# AdVerify SDK

A complete ad monetization and device verification system for Android apps. Includes an Android SDK (zero dependencies), a backend server, and an admin dashboard.

## What It Does

AdVerify lets app developers:

1. **Require PIN verification** before users can access the app — forcing them through a monetized verification flow (view ads/articles to receive a PIN)
2. **Serve interstitial ads** inside the app via a dialog-based ad system
3. **Track impressions and clicks** on ads through the backend
4. **Manage everything** from a web-based admin panel

The SDK is packaged both as a standard Android library and as a DEX file for use with MT Manager (smali injection).

## Architecture

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   Android App    │────>│   Express API    │<────│   Admin Panel    │
│   (SDK inside)   │     │   (Server)       │     │   (Next.js)      │
└──────────────────┘     └──────────────────┘     └──────────────────┘
                                  │
                          ┌───────┴───────┐
                          │   PostgreSQL   │
                          │   (Prisma)     │
                          └───────────────┘
```

## Project Structure

```
.
├── android-sdk/          # Android SDK (Java, zero dependencies)
│   └── adverify/src/main/java/com/adverify/sdk/
│       ├── AdVerify.java          # Public SDK entry point
│       ├── AdLoader.java          # Orchestrates init → PIN → ads flow
│       ├── PinVerifyDialog.java   # PIN verification dialog (light theme, Canvas icons)
│       ├── AdDialog.java          # Ad display dialog with image loading
│       ├── JoinDialog.java        # Community links dialog (Telegram, etc.)
│       └── internal/
│           ├── AdClient.java      # HTTP client for server communication
│           └── models/            # InitResponse, Ad, PinInfoItem, JoinLink
│
├── server/               # Express.js API server
│   ├── prisma/schema.prisma       # Database schema
│   └── src/
│       ├── controllers/           # Route handlers
│       ├── services/              # Business logic (sdk.service.ts)
│       ├── middleware/            # Auth, rate limiting
│       └── routes/               # API route definitions
│
├── web/                  # Next.js admin dashboard
│   └── app/(panel)/
│       ├── dashboard/             # Overview stats
│       ├── pin/                   # PIN configuration
│       ├── user-pins/             # View verified devices/PINs
│       ├── ads/                   # Manage ad creatives
│       ├── keys/                  # API key management
│       ├── mt-manager/            # DEX/smali integration guide
│       └── docs/                  # API documentation
│
└── demo-preview.html     # Visual HTML preview of all dialog states
```

## SDK Flow

```
App Launch
    │
    ▼
SDK calls /api/sdk/init with deviceId
    │
    ├── pinEnabled=false OR pinVerified=true
    │       → Fetch and show ads directly
    │
    └── pinEnabled=true AND pinVerified=false
            → Show PIN Verification Dialog
                │
                ├── "Generate PIN & Verify" button
                │       → Server creates shortener link
                │       → Opens browser (user views articles/ads)
                │       → User receives PIN
                │       → Dialog switches to PIN entry state
                │
                ├── "Tutorial" button → Opens tutorial URL
                ├── "Join Us" button → Shows community links dialog
                └── "Exit" button → Closes app
                │
                ▼
            User enters PIN → /api/sdk/verify-pin
                │
                ├── Valid → Dismiss dialog → Show ads
                └── Invalid → Show error + remaining attempts
```

## PIN Expiry

PIN verification expiry is **configurable per app** in the admin panel:

| Mode | Behavior |
|------|----------|
| `never` | Once verified, the device stays verified permanently |
| `duration` | Verification expires after N hours (default: 24). User must re-verify. |

The server checks expiry on every `/api/sdk/init` call. When a PIN expires, it's deleted from the database and the user sees the verification dialog again.

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/sdk/init` | POST | Initialize SDK, check device PIN status |
| `/api/sdk/verify-pin` | POST | Verify a PIN for a device |
| `/api/sdk/create-link` | POST | Create shortener link for PIN generation |
| `/api/sdk/ads` | GET | Fetch available ads |
| `/api/sdk/impression` | POST | Track ad impression |
| `/api/sdk/click` | POST | Track ad click |

All endpoints require `x-api-key` header.

## Server Init Response

```json
{
  "appName": "MyApp",
  "pinEnabled": true,
  "pinVerified": false,
  "pinMessage": "Verify your device to continue",
  "maxAttempts": 5,
  "getPinBtnText": "Generate PIN & Verify",
  "pinInfoItems": [
    { "icon": "device", "text": "Device Not Registered", "color": "#3b82f6" },
    { "icon": "hourglass", "text": "Access Duration: 24 Hours" },
    { "icon": "key", "text": "Automatic Password System" },
    { "icon": "crown", "text": "Premium Users Only" },
    { "icon": "warning", "text": "VPN & Emulators Not Allowed" }
  ],
  "tutorialUrl": "https://example.com/tutorial",
  "joinLinks": [
    { "name": "OTT Mods", "description": "Telegram Group", "url": "https://t.me/...", "iconType": "telegram" },
    { "name": "Public Channel", "description": "Apps & Mods", "url": "https://t.me/...", "iconType": "channel" }
  ]
}
```

## Dialog Design

The SDK renders all UI programmatically with zero external dependencies using Android's `Canvas`, `Paint`, `Path`, and `GradientDrawable` APIs.

**PinVerifyDialog** — Two-state dialog:
- State 1: Shield icon (Canvas-drawn lock), info card with colored icon dots, Generate/Tutorial/Join/Exit buttons
- State 2: PIN input with error messages, attempts counter, Verify/Back buttons

**AdDialog** — Image + content dialog with background image loading via `HttpURLConnection`

**JoinDialog** — Community links with paper plane and megaphone icons drawn via Canvas

All dialogs use a light `#fafafa` theme with solid `#111` black buttons, `RippleDrawable` feedback, and fade+scale entrance animations.

## Icon Types

The info card icons are drawn with `Canvas` and selected by the `icon` field from the server:

| Icon Value | Drawing | Color |
|-----------|---------|-------|
| `device` / `info` | Phone with signal waves | Blue `#3b82f6` |
| `clock` / `hourglass` | Hourglass with sand | Green `#22c55e` |
| `key` / `sparkle` | Key with sparkle | Violet `#8b5cf6` |
| `star` / `crown` | Crown with gems | Amber `#eab308` |
| `warning` / `shield-x` | Shield with X | Red `#ef4444` |

## Tech Stack

- **Android SDK**: Java, zero dependencies, min API 21, also packaged as DEX
- **Server**: Express.js, TypeScript, Prisma ORM, PostgreSQL
- **Admin Panel**: Next.js (App Router), TypeScript
- **Verification Flow**: Shortener links via paidappstore.com API
