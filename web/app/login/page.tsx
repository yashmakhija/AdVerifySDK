"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/store";
import { api } from "@/lib/api";
import { Shield, Loader2, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const token = useAuthStore((s) => s.token);
  const verify = useAuthStore((s) => s.verify);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!token) {
      setChecking(false);
      return;
    }
    verify().then((valid) => {
      if (valid) {
        router.replace("/dashboard");
      } else {
        setChecking(false);
      }
    });
  }, [token, verify, router]);

  if (checking) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = btoa(`${username}:${password}`);
      await api("/admin/me", { token });
      login(username, password);
      router.push("/dashboard");
    } catch {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black px-5">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-dot-dark opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_50%)]" />
      </div>

      {/* Back link */}
      <Link
        href="/"
        className="absolute top-5 left-5 sm:top-8 sm:left-8 flex items-center gap-1.5 text-[13px] font-medium text-zinc-600 transition-colors hover:text-zinc-300"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Home
      </Link>

      {/* Card */}
      <div className="relative w-full max-w-[380px] animate-in">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-6 sm:p-8">
          {/* Logo */}
          <div className="mb-7 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
              <Shield className="h-4 w-4 text-black" />
            </div>
            <span className="text-[15px] font-bold tracking-tight text-white">
              AdVerify
            </span>
          </div>

          <h1 className="text-xl font-bold text-white">Sign in</h1>
          <p className="mt-1.5 text-[13px] text-zinc-500">
            Enter your credentials to access the admin panel.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-zinc-400">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-white/[0.15] focus:bg-white/[0.06] focus:ring-1 focus:ring-white/[0.08]"
                placeholder="admin"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-zinc-400">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-white/[0.15] focus:bg-white/[0.06] focus:ring-1 focus:ring-white/[0.08]"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/[0.06] px-3 py-2.5 text-[13px] text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-[14px] font-semibold text-black transition-all hover:bg-zinc-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        {/* Footer text */}
        <p className="mt-5 text-center text-[12px] text-zinc-700">
          Admin access only. Contact your administrator for credentials.
        </p>
      </div>
    </div>
  );
}
