"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Download, Copy, Check, ChevronRight } from "lucide-react";
import type { ApiKey } from "@/lib/types";

export default function MtManagerPage() {
  const token = useAuthStore((s) => s.token)!;
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [selectedKey, setSelectedKey] = useState<ApiKey | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    api<ApiKey[]>("/admin/keys", { token }).then((k) =>
      setKeys(Array.isArray(k) ? k : [])
    );
  }, [token]);

  function copyText(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  const smaliCode = `invoke-static {p0}, Lcom/adverify/sdk/AdVerify;->start(Landroid/app/Activity;)V`;

  const manifestCode = selectedKey
    ? `<meta-data android:name="adverify.api_key" android:value="${selectedKey.key}"/>
<meta-data android:name="adverify.base_url" android:value="https://ads.paidappstore.com"/>`
    : "";

  const fullExample = selectedKey
    ? `.method protected onCreate(Landroid/os/Bundle;)V
    .locals X   # <-- keep whatever the original .locals is, no change needed

    invoke-super {p0, p1}, Landroid/app/Activity;->onCreate(Landroid/os/Bundle;)V

    # ── AdVerify hook (just 1 line!) ──
    invoke-static {p0}, Lcom/adverify/sdk/AdVerify;->start(Landroid/app/Activity;)V

    # ... rest of original onCreate code ...
    return-void
.end method`
    : "";

  return (
    <div>
      <PageHeader
        title="MT Manager Guide"
        description="Step-by-step guide to patch any APK with AdVerify SDK"
      />

      {/* Step 0: Download DEX */}
      <Step number={1} title="Download adverify.dex">
        <P>
          Download the SDK DEX file and transfer it to your Android device.
          This is the same universal file for every app.
        </P>
        <a
          href="/adverify.dex"
          download="adverify.dex"
          className="mt-3 inline-flex items-center gap-2 rounded-lg bg-zinc-950 px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-zinc-800"
        >
          <Download className="h-4 w-4" />
          Download adverify.dex
          <span className="text-zinc-400 text-[11px]">(~25KB)</span>
        </a>
      </Step>

      {/* Step 1: Select App */}
      <Step number={2} title="Select your app">
        <P>
          Choose which app you&apos;re patching. The smali code below will
          auto-fill with the correct API key.
        </P>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {keys.length === 0 && (
            <p className="text-[13px] text-zinc-400 col-span-full">
              No API keys yet. Create one in API Keys first.
            </p>
          )}
          {keys.map((k) => (
            <button
              key={k.id}
              onClick={() => setSelectedKey(k)}
              className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${
                selectedKey?.id === k.id
                  ? "border-zinc-950 bg-zinc-950 text-white"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50"
              }`}
            >
              <div className="flex-1 min-w-0">
                <p className={`text-[13px] font-medium truncate ${selectedKey?.id === k.id ? "text-white" : "text-zinc-950"}`}>
                  {k.appName}
                </p>
                <p className={`text-[11px] truncate font-mono ${selectedKey?.id === k.id ? "text-zinc-400" : "text-zinc-400"}`}>
                  {k.packageName || "No package"}
                </p>
              </div>
              {selectedKey?.id === k.id && (
                <Check className="h-4 w-4 shrink-0" />
              )}
            </button>
          ))}
        </div>
      </Step>

      {/* Step 2: Open APK */}
      <Step number={3} title="Open APK in MT Manager">
        <P>Open your target APK in MT Manager. Tap on it to see the APK contents.</P>
      </Step>

      {/* Step 3: Add DEX */}
      <Step number={4} title="Add adverify.dex">
        <P>
          Go to the DEX section. You&apos;ll see <Code>classes.dex</Code> (and
          maybe classes2.dex, etc.)
        </P>
        <div className="mt-3 space-y-2">
          <div className="flex items-start gap-2">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-[10px] font-bold text-zinc-600">A</span>
            <P>Add <Code>adverify.dex</Code> as the next DEX file (e.g. classes2.dex or classes3.dex)</P>
          </div>
          <div className="flex items-start gap-2">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-[10px] font-bold text-zinc-600">B</span>
            <P>Or use MT Manager&apos;s DEX Editor → &quot;Merge DEX&quot; to merge into existing classes.dex</P>
          </div>
        </div>
      </Step>

      {/* Step 4: Add API Key to Manifest */}
      <Step number={5} title="Add API Key to AndroidManifest.xml" highlight>
        {!selectedKey ? (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="text-[13px] text-amber-700">
              Select an app in Step 2 above to generate the manifest code with your API key.
            </p>
          </div>
        ) : (
          <>
            <P>
              Open <Code>AndroidManifest.xml</Code> → find the <Code>&lt;application&gt;</Code> tag → add these 2 lines <strong className="text-zinc-950">inside</strong> it:
            </P>
            <div className="relative mt-3">
              <CodeBlock>{manifestCode}</CodeBlock>
              <button
                onClick={() => copyText(manifestCode, "manifest")}
                className="absolute right-3 top-3 flex items-center gap-1.5 rounded-md bg-zinc-800 px-2.5 py-1.5 text-[11px] font-medium text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
              >
                {copied === "manifest" ? (
                  <><Check className="h-3 w-3" /> Copied</>
                ) : (
                  <><Copy className="h-3 w-3" /> Copy</>
                )}
              </button>
            </div>
            <P className="mt-3">Also make sure the <Code>INTERNET</Code> permission exists:</P>
            <CodeBlock>{`<uses-permission android:name="android.permission.INTERNET" />`}</CodeBlock>
          </>
        )}
      </Step>

      {/* Step 5: Find Launcher Activity */}
      <Step number={6} title="Find Launcher Activity">
        <P>In the same <Code>AndroidManifest.xml</Code>, find the activity with MAIN + LAUNCHER:</P>
        <CodeBlock>{`<activity android:name="com.example.app.MainActivity">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>`}</CodeBlock>
        <P className="mt-3">Note the full class name — you&apos;ll edit its smali file next.</P>
      </Step>

      {/* Step 6: Add Smali Hook */}
      <Step number={7} title="Add 1 Line of Smali" highlight>
        <P>
          Navigate to the launcher Activity&apos;s smali file → find <Code>onCreate</Code> → add <strong className="text-zinc-950">just 1 line</strong> right after <Code>invoke-super</Code>:
        </P>
        <div className="relative mt-3">
          <CodeBlock>{smaliCode}</CodeBlock>
          <button
            onClick={() => copyText(smaliCode, "smali")}
            className="absolute right-3 top-3 flex items-center gap-1.5 rounded-md bg-zinc-800 px-2.5 py-1.5 text-[11px] font-medium text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
          >
            {copied === "smali" ? (
              <><Check className="h-3 w-3" /> Copied</>
            ) : (
              <><Copy className="h-3 w-3" /> Copy</>
            )}
          </button>
        </div>

        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-emerald-700">Why this works</p>
          <ul className="list-disc space-y-1 pl-4 text-[13px] text-emerald-700">
            <li>Only uses <Code>p0</Code> (the Activity) — <strong>no extra registers needed</strong></li>
            <li>No need to change <Code>.locals</Code> — works with any app</li>
            <li>API key is read from the manifest meta-data you added in Step 5</li>
          </ul>
        </div>
      </Step>

      {/* Step 7: Full Example */}
      {selectedKey && (
        <Step number={8} title="Full onCreate Example">
          <P>Complete <Code>onCreate</Code> after adding the hook:</P>
          <div className="relative mt-3">
            <CodeBlock>{fullExample}</CodeBlock>
            <button
              onClick={() => copyText(fullExample, "full")}
              className="absolute right-3 top-3 flex items-center gap-1.5 rounded-md bg-zinc-800 px-2.5 py-1.5 text-[11px] font-medium text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
            >
              {copied === "full" ? (
                <><Check className="h-3 w-3" /> Copied</>
              ) : (
                <><Copy className="h-3 w-3" /> Copy</>
              )}
            </button>
          </div>
        </Step>
      )}

      {/* Step 8: Rebuild */}
      <Step number={selectedKey ? 9 : 8} title="Rebuild & Sign" last>
        <P>Save all changes → rebuild APK in MT Manager → sign with your keystore → install → done!</P>
        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-[13px] text-emerald-700">
            The patched app will now show the PIN verification dialog on first launch. Users tap &quot;Get PIN&quot; to verify through the ad pages, enter the PIN, and the app unlocks.
          </p>
        </div>
      </Step>
    </div>
  );
}

function Step({
  number,
  title,
  children,
  highlight,
  last,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
  highlight?: boolean;
  last?: boolean;
}) {
  return (
    <div className={`relative pb-8 ${last ? "pb-0" : ""}`}>
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${
            highlight
              ? "bg-zinc-950 text-white ring-4 ring-zinc-950/10"
              : "bg-zinc-100 text-zinc-600"
          }`}>
            {number}
          </div>
          {!last && <div className="mt-2 h-full w-px bg-zinc-200" />}
        </div>
        <div className="flex-1 pb-2">
          <h3 className="text-[14px] font-semibold text-zinc-950 mb-2">{title}</h3>
          {children}
        </div>
      </div>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-zinc-950 p-4 text-[12px] leading-relaxed text-zinc-400 font-mono">
      <code>{children}</code>
    </pre>
  );
}

function P({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-[13px] leading-relaxed text-zinc-500 ${className || ""}`}>
      {children}
    </p>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[12px] font-mono text-zinc-700">
      {children}
    </code>
  );
}
