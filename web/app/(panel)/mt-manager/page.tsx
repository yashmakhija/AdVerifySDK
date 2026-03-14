"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
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
        <h1 className="text-lg font-semibold tracking-tight text-zinc-950">
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
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-zinc-950 px-4 py-2.5 text-[13px] font-medium text-white hover:bg-zinc-800"
          >
            <Download className="h-4 w-4" />
            Download DEX
            <span className="text-zinc-500 text-[11px]">(~50KB)</span>
          </a>
        </Step>

        {/* Step 2 */}
        <Step n={2} title="Select your app">
          <Desc>Choose the app you&apos;re patching to auto-fill the API key.</Desc>
          <div className="mt-3 flex flex-wrap gap-2">
            {keys.length === 0 && (
              <p className="text-[13px] text-zinc-400">
                No API keys yet. Create one first.
              </p>
            )}
            {keys.map((k) => {
              const active = selectedKey?.id === k.id;
              return (
                <button
                  key={k.id}
                  onClick={() => setSelectedKey(k)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-[13px] transition-all ${
                    active
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
                  }`}
                >
                  {k.appName}
                  {active && <Check className="h-3 w-3" />}
                </button>
              );
            })}
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
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5">
              <p className="text-[13px] text-amber-700">
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
          <div className="mt-3 space-y-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
              Why this works
            </p>
            <ul className="list-disc space-y-0.5 pl-4 text-[12px] leading-relaxed text-emerald-700">
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
                ? "bg-zinc-950 text-white ring-[3px] ring-zinc-950/10"
                : "bg-zinc-100 text-zinc-500"
            }`}
          >
            {n}
          </div>
          {!last && <div className="mt-1.5 h-full w-px bg-zinc-150" />}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1 pb-4">
          <h3 className="mb-1.5 text-[13px] font-semibold text-zinc-950 leading-7">
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
    <div className="group relative mt-2">
      <pre className="overflow-x-auto rounded-lg bg-zinc-950 px-3 py-3 sm:px-4 sm:py-3.5">
        <code className="block whitespace-pre-wrap break-all text-[11px] leading-relaxed text-zinc-400 font-mono sm:text-[12px] sm:break-normal sm:whitespace-pre">
          {code}
        </code>
      </pre>
      <button
        onClick={() => onCopy(code, id)}
        className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-zinc-800 px-2 py-1 text-[10px] font-medium text-zinc-400 opacity-100 transition-all hover:bg-zinc-700 hover:text-white sm:opacity-0 sm:group-hover:opacity-100"
      >
        {copied === id ? (
          <>
            <Check className="h-3 w-3" /> Copied
          </>
        ) : (
          <>
            <Copy className="h-3 w-3" /> Copy
          </>
        )}
      </button>
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
    <code className="rounded bg-zinc-100 px-1 py-px text-[11px] font-mono text-zinc-700">
      {children}
    </code>
  );
}
