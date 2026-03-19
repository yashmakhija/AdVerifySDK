"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { AppSelector } from "@/components/ui/app-selector";
import { Download, Copy, Check } from "lucide-react";
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
    ? `<meta-data\n  android:name="adverify.api_key"\n  android:value="${selectedKey.key}"/>\n<meta-data\n  android:name="adverify.base_url"\n  android:value="https://ads.paidappstore.com"/>`
    : "";

  const fullExample = selectedKey
    ? `.method protected onCreate(Landroid/os/Bundle;)V\n    .locals X\n\n    invoke-super {p0, p1}, Landroid/app/Activity;->onCreate(Landroid/os/Bundle;)V\n\n    # AdVerify hook\n    invoke-static {p0}, Lcom/adverify/sdk/AdVerify;->start(Landroid/app/Activity;)V\n\n    # ... rest of original onCreate ...\n    return-void\n.end method`
    : "";

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-lg font-semibold tracking-tight text-white">
          MT Manager Guide
        </h1>
        <p className="mt-0.5 text-[13px] text-zinc-500">
          Patch any APK with AdVerify SDK
        </p>
      </div>

      <div className="max-w-2xl space-y-4">
        {/* Step 1 */}
        <Step n={1} title="Download adverify.dex">
          <Desc>
            Download the DEX file and transfer it to your device.
          </Desc>
          <a
            href="/adverify.dex"
            download="adverify.dex"
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-[13px] font-medium text-black hover:bg-zinc-200"
          >
            <Download className="h-4 w-4" />
            Download DEX
            <span className="text-zinc-500 text-[11px]">(~50KB)</span>
          </a>
        </Step>

        {/* Step 2 */}
        <Step n={2} title="Select your app">
          <Desc>Choose the app you&apos;re patching to auto-fill the API key.</Desc>
          <div className="mt-3 max-w-sm">
            <AppSelector
              keys={keys}
              selectedId={selectedKey?.id ?? null}
              onSelect={(id) => setSelectedKey(keys.find((k) => k.id === id) ?? null)}
              placeholder="Search and select an app..."
            />
          </div>
        </Step>

        {/* Step 3 */}
        <Step n={3} title="Open APK in MT Manager">
          <Desc>
            Open the APK and navigate to the DEX files section.
          </Desc>
        </Step>

        {/* Step 4 */}
        <Step n={4} title="Add adverify.dex">
          <Desc>
            Add <Mono>adverify.dex</Mono> as the next DEX file (e.g.{" "}
            <Mono>classes2.dex</Mono>) or merge it into existing{" "}
            <Mono>classes.dex</Mono>.
          </Desc>
        </Step>

        {/* Step 5 */}
        <Step n={5} title="Add API Key to Manifest" highlight>
          {!selectedKey ? (
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-2.5">
              <p className="text-[13px] text-amber-400">
                Select an app in Step 2 to generate the code.
              </p>
            </div>
          ) : (
            <>
              <Desc>
                In <Mono>AndroidManifest.xml</Mono>, add inside the{" "}
                <Mono>&lt;application&gt;</Mono> tag:
              </Desc>
              <CodeBlock
                code={manifestCode}
                id="manifest"
                copied={copied}
                onCopy={copyText}
              />
              <Desc className="mt-3">
                Also ensure this permission exists:
              </Desc>
              <CodeBlock
                code={`<uses-permission\n  android:name="android.permission.INTERNET" />`}
                id="perm"
                copied={copied}
                onCopy={copyText}
              />
            </>
          )}
        </Step>

        {/* Step 6 */}
        <Step n={6} title="Find Launcher Activity">
          <Desc>
            In <Mono>AndroidManifest.xml</Mono>, find the MAIN/LAUNCHER
            activity:
          </Desc>
          <CodeBlock
            code={`<activity android:name=".MainActivity">\n  <intent-filter>\n    <action android:name=\n      "android.intent.action.MAIN" />\n    <category android:name=\n      "android.intent.category.LAUNCHER" />\n  </intent-filter>\n</activity>`}
            id="launcher"
            copied={copied}
            onCopy={copyText}
          />
          <Desc className="mt-3">
            Note the full class name — you&apos;ll edit its smali next.
          </Desc>
        </Step>

        {/* Step 7 */}
        <Step n={7} title="Add 1 Line of Smali" highlight>
          <Desc>
            In the launcher Activity&apos;s smali → <Mono>onCreate</Mono> →
            add after <Mono>invoke-super</Mono>:
          </Desc>
          <CodeBlock
            code={smaliCode}
            id="smali"
            copied={copied}
            onCopy={copyText}
          />
          <div className="mt-3 space-y-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
              Why this works
            </p>
            <ul className="list-disc space-y-0.5 pl-4 text-[12px] leading-relaxed text-emerald-400">
              <li>
                Only uses <Mono>p0</Mono> — no extra registers
              </li>
              <li>
                No <Mono>.locals</Mono> change needed
              </li>
              <li>API key is read from manifest meta-data</li>
            </ul>
          </div>
        </Step>

        {/* Step 8 */}
        {selectedKey && (
          <Step n={8} title="Full onCreate Example">
            <Desc>
              Complete <Mono>onCreate</Mono> after patching:
            </Desc>
            <CodeBlock
              code={fullExample}
              id="full"
              copied={copied}
              onCopy={copyText}
            />
          </Step>
        )}

        {/* Step 9 */}
        <Step n={selectedKey ? 9 : 8} title="Rebuild & Sign" last>
          <Desc>
            Save → rebuild APK → sign with keystore → install. The app will
            show PIN verification on first launch.
          </Desc>
        </Step>
      </div>
    </div>
  );
}

/* ── Step wrapper ── */

function Step({
  n,
  title,
  children,
  highlight,
  last,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
  highlight?: boolean;
  last?: boolean;
}) {
  return (
    <div className={`relative ${last ? "" : "pb-2"}`}>
      <div className="flex gap-3 sm:gap-4">
        {/* Timeline */}
        <div className="flex flex-col items-center">
          <div
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
              highlight
                ? "bg-white text-black ring-[3px] ring-white/20"
                : "bg-white/[0.08] text-zinc-400"
            }`}
          >
            {n}
          </div>
          {!last && <div className="mt-1.5 h-full w-px bg-white/[0.08]" />}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1 pb-4">
          <h3 className="mb-1.5 text-[13px] font-semibold text-white leading-7">
            {title}
          </h3>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── Code block with copy ── */

function CodeBlock({
  code,
  id,
  copied,
  onCopy,
}: {
  code: string;
  id: string;
  copied: string | null;
  onCopy: (text: string, id: string) => void;
}) {
  return (
    <div className="mt-2 rounded-xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
      {/* Header with copy */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/[0.04] sm:px-4">
        <div className="flex gap-1">
          <div className="h-2 w-2 rounded-full bg-white/[0.06]" />
          <div className="h-2 w-2 rounded-full bg-white/[0.06]" />
          <div className="h-2 w-2 rounded-full bg-white/[0.06]" />
        </div>
        <button
          onClick={() => onCopy(code, id)}
          className="flex items-center gap-1 rounded-md bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-zinc-500 transition-all hover:bg-white/[0.08] hover:text-zinc-300 active:scale-95"
        >
          {copied === id ? (
            <><Check className="h-2.5 w-2.5" /> Copied</>
          ) : (
            <><Copy className="h-2.5 w-2.5" /> Copy</>
          )}
        </button>
      </div>
      {/* Code */}
      <div className="overflow-x-auto px-3 py-3 sm:px-4 sm:py-3.5">
        <pre>
          <code className="block whitespace-pre-wrap break-all text-[11px] leading-relaxed text-zinc-400 font-mono sm:text-[12px] sm:break-normal sm:whitespace-pre">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}

/* ── Typography helpers ── */

function Desc({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-[13px] leading-relaxed text-zinc-500 ${className || ""}`}
    >
      {children}
    </p>
  );
}

function Mono({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-white/[0.06] px-1 py-px text-[11px] font-mono text-zinc-400">
      {children}
    </code>
  );
}
