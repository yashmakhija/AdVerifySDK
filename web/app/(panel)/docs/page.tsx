"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { cn } from "@/lib/utils";
import {
  Workflow,
  Wrench,
  Smartphone,
  Link2,
  Code2,
  Server,
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

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div className="max-w-4xl">
      <PageHeader
        title="SDK Documentation"
        description="Everything you need to integrate AdVerify into your apps"
      />

      {/* Tab Bar */}
      <div className="mb-6 flex gap-1 overflow-x-auto rounded-2xl border border-zinc-100 bg-white p-1.5 shadow-sm">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-medium transition-all duration-200",
                isActive
                  ? "bg-zinc-900 text-white shadow-sm"
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "admin" && <AdminTab />}
        {activeTab === "mt-manager" && <MtManagerTab />}
        {activeTab === "shortener" && <ShortenerTab />}
        {activeTab === "studio" && <StudioTab />}
        {activeTab === "api" && <ApiTab />}
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━ HOW IT WORKS ━━━━━━━━━━━━━━━ */

function OverviewTab() {
  const steps = [
    {
      n: "1",
      title: "Admin Setup",
      desc: "Create API key, add ads, configure PIN with your link shortener URL.",
      color: "bg-indigo-500",
    },
    {
      n: "2",
      title: "Patch Your APK",
      desc: "Add adverify.dex into your APK via MT Manager and add 3 lines of smali.",
      color: "bg-violet-500",
    },
    {
      n: "3",
      title: "User Opens App",
      desc: "SDK calls init with the device's Android ID. Server checks if this device is verified.",
      color: "bg-sky-500",
    },
    {
      n: "4",
      title: "PIN Dialog Appears",
      desc: "Device not verified → SDK shows a PIN dialog with a \"Get PIN\" button.",
      color: "bg-amber-500",
    },
    {
      n: "5",
      title: "User Gets PIN",
      desc: "Taps Get PIN → browser opens your link shortener → user completes action → gets unique 6-digit PIN.",
      color: "bg-emerald-500",
    },
    {
      n: "6",
      title: "PIN Verified",
      desc: "User enters PIN in app → SDK verifies → device unlocked permanently.",
      color: "bg-rose-500",
    },
    {
      n: "7",
      title: "Ads Start Showing",
      desc: "Ads are fetched and displayed. Impressions and clicks tracked automatically.",
      color: "bg-indigo-500",
    },
  ];

  return (
    <>
      <Card title="What is AdVerify?">
        <P>
          AdVerify is a self-hosted ad serving + PIN verification SDK for
          Android apps. Each user must verify a unique PIN (tied to their
          device) before the app is unlocked. PINs are generated through
          your link shortener — users complete an action to earn a PIN
          that only works on their device.
        </P>
      </Card>

      <Card title="Complete Flow">
        <div className="relative">
          {steps.map((step, i) => (
            <div key={step.n} className="flex gap-4 pb-5 last:pb-0">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white",
                    step.color
                  )}
                >
                  {step.n}
                </div>
                {i < steps.length - 1 && (
                  <div className="mt-1.5 h-full w-px bg-zinc-200" />
                )}
              </div>
              <div className="pt-0.5">
                <p className="text-sm font-semibold text-zinc-900">
                  {step.title}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-zinc-500">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Architecture">
        <CodeBlock>{`┌──────────────────┐        proxy         ┌──────────────────┐
│  Admin Panel      │ ──────────────────▸ │  Backend Server   │
│  (Next.js :3000)  │                     │  (Express :3042)  │
└──────────────────┘                      └──────────────────┘
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

/* ━━━━━━━━━━━━━━━ ADMIN SETUP ━━━━━━━━━━━━━━━ */

function AdminTab() {
  return (
    <>
      <Card title="Step 1 — Create an API Key">
        <P>
          Go to <Chip>API Keys</Chip> → click <strong>New Key</strong>.
        </P>
        <BulletList
          items={[
            <><strong className="text-zinc-800">App Name</strong> — a display name like "My Cool App"</>,
            <><strong className="text-zinc-800">Package Name</strong> — the Android package, e.g. <Chip>com.example.myapp</Chip></>,
          ]}
        />
        <P className="mt-3">
          Copy the generated API key — you&apos;ll need it for the SDK
          and link shortener integration.
        </P>
      </Card>

      <Card title="Step 2 — Create Ads">
        <P>
          Go to <Chip>Ads</Chip> → click <strong>New Ad</strong>.
        </P>
        <BulletList
          items={[
            "Select which app this ad belongs to",
            "Set title, description, image URL, redirect URL",
            "Choose type: interstitial, banner, or native",
            "Set button text and priority (higher = shown first)",
          ]}
        />
      </Card>

      <Card title="Step 3 — Configure PIN Verification">
        <P>
          Go to <Chip>PIN Config</Chip> → select your app.
        </P>
        <BulletList
          items={[
            <><strong className="text-zinc-800">Enable PIN</strong> — toggle on</>,
            <><strong className="text-zinc-800">PIN Message</strong> — text shown in the PIN dialog</>,
            <><strong className="text-zinc-800">Max Attempts</strong> — tries before dialog auto-closes</>,
            <><strong className="text-zinc-800">Get PIN URL</strong> — your link shortener URL with <Chip>{"{device_id}"}</Chip> placeholder</>,
            <><strong className="text-zinc-800">Button Text</strong> — text on the green &quot;Get PIN&quot; button</>,
          ]}
        />
        <CodeBlock>{`Example Get PIN URL:
https://your-shortener.com/get-pin?device={device_id}

The SDK replaces {device_id} with the user's actual
Android ID before opening the URL.`}</CodeBlock>
      </Card>
    </>
  );
}

/* ━━━━━━━━━━━━━━━ MT MANAGER ━━━━━━━━━━━━━━━ */

function MtManagerTab() {
  return (
    <>
      <Card title="What You Need">
        <BulletList
          items={[
            <><strong className="text-zinc-800">adverify.dex</strong> — the SDK as a standalone DEX file (~25KB)</>,
            <><strong className="text-zinc-800">Your API key</strong> — from the admin panel</>,
            <><strong className="text-zinc-800">Your server URL</strong> — where your backend is hosted</>,
            <><strong className="text-zinc-800">MT Manager</strong> — installed on your Android device</>,
          ]}
        />
      </Card>

      <Card title="Step 1 — Open APK in MT Manager">
        <P>
          Open your target APK in MT Manager. Tap on it to see the APK contents.
        </P>
      </Card>

      <Card title="Step 2 — Add adverify.dex">
        <P>
          Navigate to the DEX files section. You&apos;ll see <Chip>classes.dex</Chip>{" "}
          (and maybe classes2.dex, etc.)
        </P>
        <div className="mt-3 space-y-2">
          <div className="flex items-start gap-2">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-indigo-50 text-[10px] font-bold text-indigo-600">
              A
            </span>
            <p className="text-sm text-zinc-500">
              Add <Chip>adverify.dex</Chip> as the next DEX file (e.g. classes2.dex or classes3.dex)
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-indigo-50 text-[10px] font-bold text-indigo-600">
              B
            </span>
            <p className="text-sm text-zinc-500">
              Or use MT Manager&apos;s DEX Editor → &quot;Merge DEX&quot; to merge into existing classes.dex
            </p>
          </div>
        </div>
      </Card>

      <Card title="Step 3 — Find Launcher Activity">
        <P>
          Open <Chip>AndroidManifest.xml</Chip> and find the activity with MAIN + LAUNCHER:
        </P>
        <CodeBlock>{`<activity android:name="com.example.app.MainActivity">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>`}</CodeBlock>
        <P className="mt-3">
          Note the full class name — you&apos;ll edit its smali file next.
        </P>
      </Card>

      <Card title="Step 4 — Add Smali Hook (3 Lines Only)">
        <P>
          Navigate to the launcher Activity&apos;s smali file → find the{" "}
          <Chip>onCreate</Chip> method → add these 3 lines <strong>right after</strong>{" "}
          <Chip>invoke-super</Chip>:
        </P>
        <CodeBlock>{`const-string v0, "YOUR_API_KEY"

const-string v1, "https://your-server.com"

invoke-static {p0, v0, v1}, Lcom/adverify/sdk/AdVerify;->start(Landroid/app/Activity;Ljava/lang/String;Ljava/lang/String;)V`}</CodeBlock>

        <Warning
          title="Important"
          items={[
            <>Change <Chip>.locals 0</Chip> or <Chip>.locals 1</Chip> to <Chip>.locals 2</Chip> (you need v0 and v1)</>,
            <><Chip>p0</Chip> = &quot;this&quot; (the Activity) — always available, no extra register needed</>,
            "Replace YOUR_API_KEY with your actual key from admin panel",
            "Replace the URL with your actual server URL",
          ]}
        />
      </Card>

      <Card title="Step 5 — Full Example">
        <P>
          Here&apos;s what the complete <Chip>onCreate</Chip> looks like after the hook:
        </P>
        <CodeBlock>{`.method protected onCreate(Landroid/os/Bundle;)V
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
        <P>
          Make sure <Chip>AndroidManifest.xml</Chip> has:
        </P>
        <CodeBlock>{`<!-- Required — add if not present -->
<uses-permission android:name="android.permission.INTERNET" />

<!-- Required if server uses HTTP not HTTPS -->
<!-- Add to the <application> tag: -->
android:usesCleartextTraffic="true"`}</CodeBlock>
      </Card>

      <Card title="Step 7 — Rebuild & Sign">
        <P>
          Save all changes → rebuild APK in MT Manager → sign with your
          keystore → install → done!
        </P>
      </Card>

      <Card title="Building adverify.dex From Source">
        <P>Run this on your Mac/PC to build the DEX file:</P>
        <CodeBlock>{`cd android-sdk
./build-dex.sh

# Output: out/adverify.dex (~25KB)
# Transfer this file to your phone via USB/WiFi`}</CodeBlock>
      </Card>
    </>
  );
}

/* ━━━━━━━━━━━━━━━ LINK SHORTENER ━━━━━━━━━━━━━━━ */

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
        <P>
          In <Chip>PIN Config</Chip>, set the Get PIN URL to your shortener
          with <Chip>{"{device_id}"}</Chip> placeholder:
        </P>
        <CodeBlock>{`https://your-shortener.com/get-pin?device={device_id}

The SDK replaces {device_id} with the actual Android ID
before opening the URL in the user's browser.`}</CodeBlock>
      </Card>

      <Card title="Step 2 — Call Generate PIN API">
        <P>
          When the user completes the action on your shortener, call this
          endpoint. It&apos;s <strong>public</strong> — no auth needed:
        </P>
        <CodeBlock>{`POST https://your-server.com/api/sdk/generate-pin
Content-Type: application/json

{
  "apiKey": "your-api-key-from-admin-panel",
  "deviceId": "the-device-id-from-url-param"
}`}</CodeBlock>
      </Card>

      <Card title="Step 3 — Show PIN to User">
        <P>The API returns a unique 6-digit PIN. Display it to the user:</P>
        <CodeBlock>{`Response:
{
  "success": true,
  "pin": "482916",
  "message": "PIN generated successfully"
}

→ Show to user: "Your PIN is 482916 — enter it in the app"`}</CodeBlock>
      </Card>

      <Card title="Node.js Example">
        <CodeBlock>{`const res = await fetch(
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
        <CodeBlock>{`$data = json_encode([
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
        <BulletList
          items={[
            <><strong className="text-zinc-800">Per-device</strong> — each device gets its own unique PIN</>,
            <><strong className="text-zinc-800">One-time use</strong> — once verified, the device is unlocked forever</>,
            <><strong className="text-zinc-800">Cannot be shared</strong> — PIN for Device A won&apos;t work on Device B</>,
            <><strong className="text-zinc-800">Idempotent</strong> — requesting PIN for the same device returns the same unused PIN</>,
            <>You can <strong className="text-zinc-800">revoke</strong> a device from the admin panel → User PINs to force re-verification</>,
          ]}
        />
      </Card>
    </>
  );
}

/* ━━━━━━━━━━━━━━━ ANDROID STUDIO ━━━━━━━━━━━━━━━ */

function StudioTab() {
  return (
    <>
      <Card title="Module Setup">
        <P>Copy the <Chip>adverify</Chip> folder into your project root, then:</P>
        <CodeBlock>{`// settings.gradle
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
        <CodeBlock>{`public class MyApp extends Application {
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
        <CodeBlock>{`// In any Activity's onCreate
AdVerify.start(this, "YOUR_API_KEY",
    "https://your-server.com");`}</CodeBlock>
      </Card>

      <Card title="With Callback">
        <CodeBlock>{`AdVerify.show(activity, new AdVerifyCallback() {
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

/* ━━━━━━━━━━━━━━━ API REFERENCE ━━━━━━━━━━━━━━━ */

function ApiTab() {
  return (
    <>
      <Card title="SDK Endpoints">
        <P>
          Used by the Android SDK. Auth via <Chip>x-api-key</Chip> header
          (except generate-pin which is public).
        </P>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-zinc-100 text-xs uppercase text-zinc-400 tracking-wider">
              <tr>
                <th className="pb-2.5 pr-3">Method</th>
                <th className="pb-2.5 pr-3">Endpoint</th>
                <th className="pb-2.5 pr-3">Description</th>
                <th className="pb-2.5">Auth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50 text-zinc-500">
              {[
                { m: "POST", p: "/api/sdk/init", d: "Initialize for a device", a: "x-api-key" },
                { m: "GET", p: "/api/sdk/ads", d: "Fetch active ads", a: "x-api-key" },
                { m: "POST", p: "/api/sdk/verify-pin", d: "Verify PIN for device", a: "x-api-key" },
                { m: "POST", p: "/api/sdk/generate-pin", d: "Generate PIN (webhook)", a: "None" },
                { m: "POST", p: "/api/sdk/impression", d: "Track impression", a: "x-api-key" },
                { m: "POST", p: "/api/sdk/click", d: "Track click", a: "x-api-key" },
                { m: "GET", p: "/api/sdk/status", d: "Check device status", a: "x-api-key" },
              ].map(({ m, p, d, a }) => (
                <tr key={p}>
                  <td className="py-2.5 pr-3">
                    <MethodBadge method={m} />
                  </td>
                  <td className="py-2.5 pr-3 font-mono text-xs text-zinc-900">{p}</td>
                  <td className="py-2.5 pr-3">{d}</td>
                  <td className="py-2.5 text-xs">
                    {a === "None" ? (
                      <span className="rounded-md bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600">
                        Public
                      </span>
                    ) : (
                      <span className="font-mono text-zinc-400">{a}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Admin Endpoints">
        <P>
          Used by the admin panel. Auth via <Chip>Basic</Chip> header.
        </P>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-zinc-100 text-xs uppercase text-zinc-400 tracking-wider">
              <tr>
                <th className="pb-2.5 pr-3">Method</th>
                <th className="pb-2.5 pr-3">Endpoint</th>
                <th className="pb-2.5">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50 text-zinc-500">
              {[
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
              ].map(({ m, p, d }) => (
                <tr key={`${m}-${p}`}>
                  <td className="py-2.5 pr-3">
                    <MethodBadge method={m} />
                  </td>
                  <td className="py-2.5 pr-3 font-mono text-xs text-zinc-900">{p}</td>
                  <td className="py-2.5">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Generate PIN — Request / Response">
        <CodeBlock>{`POST /api/sdk/generate-pin
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
        <CodeBlock>{`POST /api/sdk/verify-pin
x-api-key: your-api-key
Content-Type: application/json

{
  "pin": "482916",
  "deviceId": "android-device-id"
}

── Success:
{ "verified": true,  "message": "PIN verified. App unlocked!" }

── Wrong PIN:
{ "verified": false, "message": "Invalid PIN" }

── Already verified:
{ "verified": true,  "message": "Already verified" }`}</CodeBlock>
      </Card>
    </>
  );
}

/* ━━━━━━━━━━━━━━━ SHARED COMPONENTS ━━━━━━━━━━━━━━━ */

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-[15px] font-semibold text-zinc-900">{title}</h2>
      {children}
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="mt-3 overflow-x-auto rounded-xl bg-zinc-950 p-4 text-[12px] leading-relaxed text-violet-300 font-mono">
      <code>{children}</code>
    </pre>
  );
}

function P({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-sm leading-relaxed text-zinc-500", className)}>
      {children}
    </p>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md border border-indigo-100 bg-indigo-50 px-1.5 py-0.5 text-xs font-medium text-indigo-700">
      {children}
    </code>
  );
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-zinc-500">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function Warning({
  title,
  items,
}: {
  title: string;
  items: React.ReactNode[];
}) {
  return (
    <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-amber-700">
        {title}
      </p>
      <ul className="list-disc space-y-1 pl-4 text-xs text-amber-700">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function MethodBadge({ method }: { method: string }) {
  const styles: Record<string, string> = {
    GET: "text-emerald-600 bg-emerald-50 border-emerald-100",
    POST: "text-indigo-600 bg-indigo-50 border-indigo-100",
    PATCH: "text-amber-600 bg-amber-50 border-amber-100",
    DELETE: "text-red-600 bg-red-50 border-red-100",
  };
  return (
    <span
      className={cn(
        "inline-block rounded-md border px-2 py-0.5 text-[10px] font-bold",
        styles[method] || "text-zinc-600 bg-zinc-50 border-zinc-100"
      )}
    >
      {method}
    </span>
  );
}
