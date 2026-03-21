"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { cn } from "@/lib/utils";
import {
  Workflow,
  Wrench,
  Smartphone,
  Link2,
  Code2,
  Server,
  ArrowLeft,
} from "lucide-react";

const TABS = [
  { id: "overview", label: "How It Works", icon: Workflow },
  { id: "admin", label: "Admin Setup", icon: Wrench },
  { id: "mt-manager", label: "MT Manager", icon: Smartphone },
  { id: "shortener", label: "Link Shortener", icon: Link2 },
  { id: "studio", label: "Android Studio", icon: Code2 },
  { id: "api", label: "API Reference", icon: Server },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function PublicDocsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      {/* Hero header */}
      <section className="relative w-full border-b border-white/[0.06] overflow-hidden">
        <div className="absolute inset-0 bg-dot-dark mask-fade-b opacity-50" />
        <div className="relative mx-auto max-w-5xl px-5 pt-10 pb-12 sm:pt-14 sm:pb-16 md:pt-16 md:pb-20">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-300 transition-colors mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to home
          </Link>

          <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600 mb-3">
            Documentation
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Integration Guide
          </h1>
          <p className="mt-3 text-[14px] sm:text-[15px] text-zinc-500 leading-relaxed max-w-lg">
            Everything you need to add AdVerify SDK to your Android app — from
            admin panel setup to MT Manager integration.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="w-full">
        <div className="mx-auto max-w-5xl px-4 sm:px-5 py-6 sm:py-10">
          {/* Tabs */}
          <div className="mb-6 sm:mb-8 flex gap-1 overflow-x-auto scrollbar-hide rounded-xl border border-white/[0.06] bg-white/[0.02] p-1">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-1.5 sm:gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-[12px] sm:text-[13px] font-medium transition-all",
                    isActive
                      ? "bg-white text-black"
                      : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>

          <div className="space-y-4 sm:space-y-5 max-w-4xl">
            {activeTab === "overview" && <OverviewTab />}
            {activeTab === "admin" && <AdminTab />}
            {activeTab === "mt-manager" && <MtManagerTab />}
            {activeTab === "shortener" && <ShortenerTab />}
            {activeTab === "studio" && <StudioTab />}
            {activeTab === "api" && <ApiTab />}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ════════════════════════════════
   TAB CONTENT
   ════════════════════════════════ */

function OverviewTab() {
  const steps = [
    { n: "1", title: "Admin Setup", desc: "Create API key, add ads, configure PIN with your link shortener URL." },
    { n: "2", title: "Patch Your APK", desc: "Add adverify.dex into your APK via MT Manager and add 3 lines of smali." },
    { n: "3", title: "User Opens App", desc: "SDK calls init with the device's Android ID. Server checks if this device is verified." },
    { n: "4", title: "PIN Dialog Appears", desc: "Device not verified → SDK shows a PIN dialog with a \"Get PIN\" button." },
    { n: "5", title: "User Gets PIN", desc: "Taps Get PIN → browser opens your link shortener → user completes action → gets unique 6-digit PIN." },
    { n: "6", title: "PIN Verified", desc: "User enters PIN in app → SDK verifies → device unlocked. Admin controls if PIN never expires or expires after X hours." },
    { n: "7", title: "Ads Start Showing", desc: "Ads are fetched and displayed. Impressions and clicks tracked automatically." },
  ];

  return (
    <>
      <Card title="What is AdVerify?">
        <P>
          AdVerify is a self-hosted ad serving + PIN verification SDK for
          Android apps. Each user must verify a unique PIN (tied to their
          device) before the app is unlocked. PINs are generated through your
          link shortener — users complete an action to earn a PIN that only
          works on their device.
        </P>
      </Card>

      <Card title="Complete Flow">
        <div className="relative">
          {steps.map((step, i) => (
            <div key={step.n} className="flex gap-3 sm:gap-4 pb-5 last:pb-0">
              <div className="flex flex-col items-center">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-bold text-black">
                  {step.n}
                </div>
                {i < steps.length - 1 && <div className="mt-1.5 h-full w-px bg-white/[0.08]" />}
              </div>
              <div className="pt-0.5 min-w-0">
                <p className="text-[13px] sm:text-sm font-semibold text-white">{step.title}</p>
                <p className="mt-0.5 text-[12px] sm:text-[13px] leading-relaxed text-zinc-500">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Architecture">
        <CodeBlock>{`┌──────────────────┐     proxy      ┌──────────────────┐
│  Admin Panel      │ ─────────────▸ │  Backend Server   │
│  (Next.js)        │                │  (Express + DB)   │
└──────────────────┘                 └──────────────────┘
                                              │
                     ┌────────────────────────┤
                     ▼                        ▼
              ┌─────────────┐       ┌─────────────────┐
              │ Android App  │       │ Link Shortener   │
              │ (SDK inside) │       │ (Your existing)  │
              └─────────────┘       └─────────────────┘`}</CodeBlock>
      </Card>
    </>
  );
}

function AdminTab() {
  return (
    <>
      <Card title="Step 1 — Create an API Key">
        <P>Go to <Chip>API Keys</Chip> → click <strong className="text-white">New Key</strong>.</P>
        <BulletList items={[
          <><strong className="text-white">App Name</strong> — a display name like &quot;My Cool App&quot;</>,
          <><strong className="text-white">Package Name</strong> — the Android package, e.g. <Chip>com.example.myapp</Chip></>,
        ]} />
        <P className="mt-3">Copy the generated API key — you&apos;ll need it for the SDK and link shortener.</P>
      </Card>

      <Card title="Step 2 — Create Ads">
        <P>Go to <Chip>Ads</Chip> → click <strong className="text-white">New Ad</strong>.</P>
        <BulletList items={[
          "Select which app this ad belongs to",
          "Set title, description, image URL, redirect URL",
          "Choose type: interstitial, banner, or native",
          "Set button text and priority (higher = shown first)",
        ]} />
      </Card>

      <Card title="Step 3 — Configure PIN Verification">
        <P>Go to <Chip>PIN Config</Chip> → select your app.</P>
        <BulletList items={[
          <><strong className="text-white">Enable PIN</strong> — toggle on</>,
          <><strong className="text-white">PIN Message</strong> — text shown in the PIN dialog</>,
          <><strong className="text-white">Max Attempts</strong> — server locks device after this many wrong PINs (30 min cooldown)</>,
          <><strong className="text-white">Get PIN URL</strong> — your link shortener URL with <Chip>{"{device_id}"}</Chip> placeholder</>,
          <><strong className="text-white">Button Text</strong> — label on the &quot;Get PIN&quot; button</>,
          <><strong className="text-white">PIN Expiry</strong> — choose &quot;Never&quot; (one-time forever) or set hours until PIN expires.</>,
        ]} />
        <CodeBlock>{`Example Get PIN URL:
https://your-shortener.com/get-pin?device={device_id}

The SDK replaces {device_id} with the user's actual
Android ID before opening the URL.`}</CodeBlock>
      </Card>
    </>
  );
}

function MtManagerTab() {
  return (
    <>
      <Card title="Download SDK">
        <P>Download the universal AdVerify DEX file. This is the same file for every app — what makes each app unique is the API key you set in the smali hook.</P>
        <a
          href="/adverify.dex"
          download="adverify.dex"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-[13px] font-semibold text-black transition-colors hover:bg-zinc-200"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download adverify.dex
          <span className="text-zinc-500 text-[11px]">(~25KB)</span>
        </a>
      </Card>

      <Card title="What You Need">
        <BulletList items={[
          <><strong className="text-white">adverify.dex</strong> — downloaded above</>,
          <><strong className="text-white">Your API key</strong> — from the admin panel</>,
          <><strong className="text-white">Your server URL</strong> — where your backend is hosted</>,
          <><strong className="text-white">MT Manager</strong> — installed on your Android device</>,
        ]} />
      </Card>

      <Card title="Step 1 — Open APK in MT Manager">
        <P>Open your target APK in MT Manager. Tap on it to see the APK contents.</P>
      </Card>

      <Card title="Step 2 — Add adverify.dex">
        <P>Go to the DEX section. You&apos;ll see <Chip>classes.dex</Chip> (and maybe classes2.dex, etc.)</P>
        <div className="mt-3 space-y-2">
          <OptionRow letter="A" text={<>Add <Chip>adverify.dex</Chip> as the next DEX file (e.g. classes2.dex or classes3.dex)</>} />
          <OptionRow letter="B" text="Or use MT Manager's DEX Editor → &quot;Merge DEX&quot; to merge into existing classes.dex" />
        </div>
      </Card>

      <Card title="Step 3 — Find Launcher Activity">
        <P>Open <Chip>AndroidManifest.xml</Chip> and find the activity with MAIN + LAUNCHER:</P>
        <CodeBlock lang="xml">{`<activity android:name="com.example.app.MainActivity">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>`}</CodeBlock>
        <P className="mt-3">Note the full class name — you&apos;ll edit its smali file next.</P>
      </Card>

      <Card title="Step 4 — Add Smali Hook (3 Lines Only)">
        <P>Navigate to the launcher Activity&apos;s smali file → find <Chip>onCreate</Chip> → add these 3 lines <strong className="text-white">right after</strong> <Chip>invoke-super</Chip>:</P>
        <CodeBlock lang="smali">{`const-string v0, "YOUR_API_KEY"

const-string v1, "https://your-server.com"

invoke-static {p0, v0, v1}, Lcom/adverify/sdk/AdVerify;->start(Landroid/app/Activity;Ljava/lang/String;Ljava/lang/String;)V`}</CodeBlock>
        <Warning title="Important" items={[
          <>Change <Chip>.locals 0</Chip> or <Chip>.locals 1</Chip> to <Chip>.locals 2</Chip> (you need v0 and v1)</>,
          <><Chip>p0</Chip> = &quot;this&quot; (the Activity) — always available, no extra register needed</>,
          "Replace YOUR_API_KEY with your actual key from admin panel",
          "Replace the URL with your actual server URL",
        ]} />
      </Card>

      <Card title="Step 5 — Full Example">
        <P>Complete <Chip>onCreate</Chip> after adding the hook:</P>
        <CodeBlock lang="smali">{`.method protected onCreate(Landroid/os/Bundle;)V
    .locals 2

    invoke-super {p0, p1}, Landroid/app/Activity;->onCreate(Landroid/os/Bundle;)V

    # ── AdVerify hook start ──
    const-string v0, "a1b2c3d4e5f6789..."
    const-string v1, "https://your-server.com"
    invoke-static {p0, v0, v1}, Lcom/adverify/sdk/AdVerify;->start(Landroid/app/Activity;Ljava/lang/String;Ljava/lang/String;)V
    # ── AdVerify hook end ──

    # ... rest of original onCreate code ...
    return-void
.end method`}</CodeBlock>
      </Card>

      <Card title="Step 6 — Check Permissions">
        <P>In <Chip>AndroidManifest.xml</Chip>, make sure these exist:</P>
        <CodeBlock lang="xml">{`<!-- Required — add if not present -->
<uses-permission android:name="android.permission.INTERNET" />

<!-- Required if server uses HTTP not HTTPS -->
<!-- Add to the <application> tag: -->
android:usesCleartextTraffic="true"`}</CodeBlock>
      </Card>

      <Card title="Step 7 — Rebuild & Sign">
        <P>Save all changes → rebuild APK in MT Manager → sign with your keystore → install → done!</P>
      </Card>

      <Card title="Building From Source (Optional)">
        <P>If you want to build the DEX from source instead of downloading:</P>
        <CodeBlock>{`cd android-sdk
./build-dex.sh

# Output: out/adverify.dex (~25KB)`}</CodeBlock>
      </Card>
    </>
  );
}

function ShortenerTab() {
  return (
    <>
      <Card title="How It Connects">
        <P>
          Your link shortener is the bridge between users and PINs. When a
          user taps &quot;Get PIN&quot; in the app, they go to your shortener.
          After completing an action, your shortener calls the generate-pin
          API to create a unique PIN for that device.
        </P>
      </Card>

      <Card title="Step 1 — Set Get PIN URL in Admin Panel">
        <P>In <Chip>PIN Config</Chip>, set the Get PIN URL with <Chip>{"{device_id}"}</Chip> placeholder:</P>
        <CodeBlock>{`https://your-shortener.com/get-pin?device={device_id}

The SDK replaces {device_id} with the actual Android ID
before opening the URL in the user's browser.`}</CodeBlock>
      </Card>

      <Card title="Step 2 — Call Generate PIN API">
        <P>When the user completes the action, call this <strong className="text-white">public</strong> endpoint:</P>
        <CodeBlock>{`POST https://your-server.com/api/sdk/generate-pin
Content-Type: application/json

{
  "apiKey": "your-api-key-from-admin-panel",
  "deviceId": "the-device-id-from-url-param"
}`}</CodeBlock>
      </Card>

      <Card title="Step 3 — Show PIN to User">
        <P>The API returns a unique 6-digit PIN. Display it on your page:</P>
        <CodeBlock>{`Response:
{
  "success": true,
  "pin": "482916",
  "message": "PIN generated successfully"
}

→ Show to user: "Your PIN is 482916 — enter it in the app"`}</CodeBlock>
      </Card>

      <Card title="Node.js Example">
        <CodeBlock lang="javascript">{`const res = await fetch(
  "https://your-server.com/api/sdk/generate-pin",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey: "a1b2c3d4e5f6...",
      deviceId: req.query.device,
    }),
  }
);
const { pin } = await res.json();
// Display pin to user`}</CodeBlock>
      </Card>

      <Card title="PHP Example">
        <CodeBlock lang="php">{`$data = json_encode([
    "apiKey"   => "a1b2c3d4e5f6...",
    "deviceId" => $_GET["device"]
]);

$ch = curl_init("https://your-server.com/api/sdk/generate-pin");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$result = json_decode(curl_exec($ch));
echo "Your PIN: " . $result->pin;`}</CodeBlock>
      </Card>

      <Card title="How PINs Work">
        <BulletList items={[
          <><strong className="text-white">Per-device</strong> — each device gets its own unique PIN bound to their Android ID</>,
          <><strong className="text-white">Anyone can generate</strong> — users tap &quot;Get PIN&quot; in the app, no admin needed</>,
          <><strong className="text-white">Cannot be shared</strong> — PIN for Device A won&apos;t work on Device B</>,
          <><strong className="text-white">Idempotent</strong> — requesting PIN for the same device returns the same unused PIN</>,
          <><strong className="text-white">Expiry control</strong> — admin sets per app: never expire, or expire after X hours.</>,
          <>You can <strong className="text-white">revoke</strong> a device from the admin panel → User PINs</>,
        ]} />
      </Card>
    </>
  );
}

function StudioTab() {
  return (
    <>
      <Card title="Module Setup">
        <P>Copy the <Chip>adverify</Chip> folder into your project root, then:</P>
        <CodeBlock lang="gradle">{`// settings.gradle
include ':adverify'

// app/build.gradle
dependencies {
    implementation project(':adverify')
}`}</CodeBlock>
      </Card>

      <Card title="Add Permission">
        <CodeBlock>{`<!-- AndroidManifest.xml -->
<uses-permission android:name="android.permission.INTERNET" />`}</CodeBlock>
      </Card>

      <Card title="Option A — Application Class (Recommended)">
        <CodeBlock lang="java">{`public class MyApp extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        AdVerify.init(this, "YOUR_API_KEY",
            "https://your-server.com");
    }
}

// Then in any Activity:
AdVerify.show(activity);`}</CodeBlock>
      </Card>

      <Card title="Option B — Single Call (No Application Class)">
        <P>Same method used in MT Manager — init + show in one call:</P>
        <CodeBlock lang="java">{`// In any Activity's onCreate
AdVerify.start(this, "YOUR_API_KEY",
    "https://your-server.com");`}</CodeBlock>
      </Card>

      <Card title="With Callback">
        <CodeBlock lang="java">{`AdVerify.show(activity, new AdVerifyCallback() {
    @Override
    public void onAdShown() {
        // Ad displayed
    }

    @Override
    public void onAdClosed() {
        // User closed the ad
    }

    @Override
    public void onAdClicked(String url) {
        // User clicked — url is the redirect URL
    }

    @Override
    public void onError(String message) {
        // Something went wrong
    }
});`}</CodeBlock>
      </Card>
    </>
  );
}

function ApiTab() {
  return (
    <>
      <Card title="SDK Endpoints">
        <P>Used by the Android SDK. Auth via <Chip>x-api-key</Chip> header (except generate-pin).</P>
        <EndpointTable showAuth endpoints={[
          { m: "POST", p: "/api/sdk/init", d: "Initialize for a device", a: "x-api-key" },
          { m: "GET", p: "/api/sdk/ads", d: "Fetch active ads", a: "x-api-key" },
          { m: "POST", p: "/api/sdk/verify-pin", d: "Verify PIN for device", a: "x-api-key" },
          { m: "POST", p: "/api/sdk/generate-pin", d: "Generate PIN (webhook)", a: "Public" },
          { m: "POST", p: "/api/sdk/impression", d: "Track impression", a: "x-api-key" },
          { m: "POST", p: "/api/sdk/click", d: "Track click", a: "x-api-key" },
          { m: "GET", p: "/api/sdk/status", d: "Check device status", a: "x-api-key" },
        ]} />
      </Card>

      <Card title="Admin Endpoints">
        <P>Used by the admin panel. Auth via <Chip>Basic</Chip> header.</P>
        <EndpointTable endpoints={[
          { m: "GET", p: "/api/health", d: "Health check (public)" },
          { m: "GET", p: "/api/admin/me", d: "Verify auth token" },
          { m: "GET", p: "/api/admin/stats", d: "Dashboard statistics" },
          { m: "GET", p: "/api/admin/keys", d: "List all API keys" },
          { m: "POST", p: "/api/admin/keys", d: "Create API key" },
          { m: "PATCH", p: "/api/admin/keys/:id", d: "Update API key" },
          { m: "DELETE", p: "/api/admin/keys/:id", d: "Delete API key" },
          { m: "GET", p: "/api/admin/ads", d: "List all ads" },
          { m: "POST", p: "/api/admin/ads", d: "Create ad" },
          { m: "PATCH", p: "/api/admin/ads/:id", d: "Update ad" },
          { m: "DELETE", p: "/api/admin/ads/:id", d: "Delete ad" },
          { m: "GET", p: "/api/admin/pin-config", d: "List PIN configs" },
          { m: "POST", p: "/api/admin/pin-config", d: "Create/update PIN config" },
          { m: "GET", p: "/api/admin/user-pins", d: "List user PINs" },
          { m: "POST", p: "/api/admin/user-pins/revoke", d: "Revoke device" },
        ]} />
      </Card>

      <Card title="Generate PIN — Request / Response">
        <CodeBlock lang="http">{`POST /api/sdk/generate-pin
Content-Type: application/json

{
  "apiKey": "your-api-key",
  "deviceId": "android-device-id"
}

── Success:
{
  "success": true,
  "pin": "482916",
  "message": "PIN generated successfully"
}

── Same device (unused PIN exists):
{
  "success": true,
  "pin": "482916",     ← returns same PIN
  "message": "PIN generated successfully"
}`}</CodeBlock>
      </Card>

      <Card title="Verify PIN — Request / Response">
        <CodeBlock lang="http">{`POST /api/sdk/verify-pin
x-api-key: your-api-key
Content-Type: application/json

{
  "pin": "482916",
  "deviceId": "android-device-id"
}

── Success:
{ "verified": true,  "message": "PIN verified. App unlocked!" }

── Wrong PIN:
{ "verified": false, "message": "Invalid PIN. 2 attempts remaining." }

── Locked (too many attempts):
{ "verified": false, "message": "Too many attempts. Locked for 30 minutes.", "locked": true }

── Already verified:
{ "verified": true,  "message": "Already verified" }`}</CodeBlock>
      </Card>
    </>
  );
}

/* ════════════════════════════════
   SHARED COMPONENTS
   ════════════════════════════════ */

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 md:p-6">
      <h2 className="mb-3 sm:mb-4 text-[13px] sm:text-sm font-semibold text-white">{title}</h2>
      {children}
    </div>
  );
}

function CodeBlock({ children, lang }: { children: string; lang?: string }) {
  return <CodeSnippet code={children} lang={lang} />;
}

function CodeSnippet({ code, lang }: { code: string; lang?: string }) {
  const id = code.slice(0, 30).replace(/\W/g, "");

  function handleCopy() {
    navigator.clipboard.writeText(code);
    const btn = document.getElementById(`copy-${id}`);
    if (btn) {
      btn.textContent = "Copied!";
      setTimeout(() => { btn.textContent = "Copy"; }, 2000);
    }
  }

  return (
    <div className="group relative mt-3 rounded-xl border border-white/[0.08] bg-[#08080a] overflow-hidden">
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

      {/* Header bar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-white/[0.05]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="h-2 w-2 rounded-full bg-white/[0.06]" />
            <div className="h-2 w-2 rounded-full bg-white/[0.06]" />
            <div className="h-2 w-2 rounded-full bg-white/[0.06]" />
          </div>
          {lang && (
            <span className="text-[10px] font-medium text-zinc-600 uppercase tracking-wider">{lang}</span>
          )}
        </div>
        <button
          id={`copy-${id}`}
          onClick={handleCopy}
          className="flex items-center gap-1 rounded-md bg-white/[0.05] border border-white/[0.06] px-2.5 py-1 text-[10px] font-medium text-zinc-500 transition-all hover:bg-white/[0.08] hover:text-zinc-300 active:scale-95"
        >
          Copy
        </button>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto p-3 sm:p-4">
        <pre className="text-[11px] sm:text-[12px] leading-[1.7] text-zinc-400 font-mono">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

function P({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-[12px] sm:text-[13px] leading-relaxed text-zinc-500", className)}>{children}</p>;
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md bg-white/[0.06] border border-white/[0.06] px-1.5 py-0.5 text-[11px] font-mono text-zinc-300">
      {children}
    </code>
  );
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[12px] sm:text-[13px] text-zinc-500">
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

function Warning({ title, items }: { title: string; items: React.ReactNode[] }) {
  return (
    <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/[0.05] p-3 sm:p-4">
      <p className="mb-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-amber-400">{title}</p>
      <ul className="list-disc space-y-1 pl-4 text-[12px] sm:text-[13px] text-amber-300/80">
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
}

function OptionRow({ letter, text }: { letter: string; text: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white/[0.06] text-[10px] font-bold text-zinc-400">
        {letter}
      </span>
      <p className="text-[12px] sm:text-[13px] text-zinc-500">{text}</p>
    </div>
  );
}

function EndpointTable({ endpoints, showAuth }: {
  endpoints: { m: string; p: string; d: string; a?: string }[];
  showAuth?: boolean;
}) {
  const methodColor: Record<string, string> = {
    GET: "text-emerald-400 bg-emerald-400/10",
    POST: "text-blue-400 bg-blue-400/10",
    PATCH: "text-amber-400 bg-amber-400/10",
    DELETE: "text-red-400 bg-red-400/10",
  };

  return (
    <div className="mt-4 overflow-x-auto -mx-4 sm:-mx-5 md:-mx-6 px-4 sm:px-5 md:px-6">
      <table className="w-full min-w-[500px] text-left text-[12px] sm:text-[13px]">
        <thead className="border-b border-white/[0.06] text-[10px] sm:text-[11px] uppercase text-zinc-600 tracking-widest">
          <tr>
            <th className="pb-2.5 pr-3 font-medium w-16">Method</th>
            <th className="pb-2.5 pr-3 font-medium">Endpoint</th>
            <th className="pb-2.5 pr-3 font-medium">Description</th>
            {showAuth && <th className="pb-2.5 font-medium">Auth</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.04] text-zinc-500">
          {endpoints.map(({ m, p, d, a }) => (
            <tr key={`${m}-${p}`} className="hover:bg-white/[0.02] transition-colors">
              <td className="py-2 pr-3">
                <span className={`inline-block rounded-md px-1.5 py-0.5 font-mono text-[9px] sm:text-[10px] font-bold ${methodColor[m] || ""}`}>
                  {m}
                </span>
              </td>
              <td className="py-2 pr-3 font-mono text-[10px] sm:text-[11px] text-zinc-300">{p}</td>
              <td className="py-2 pr-3">{d}</td>
              {showAuth && (
                <td className="py-2 text-[11px]">
                  {a === "Public" ? (
                    <span className="rounded-md bg-emerald-400/10 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-medium text-emerald-400">Public</span>
                  ) : (
                    <span className="font-mono text-zinc-600 text-[10px]">{a}</span>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
