"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Shield, Loader2 } from "lucide-react";

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
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-5">
      <div className="w-full max-w-sm animate-in">
        <div className="mb-8 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <span className="text-[15px] font-bold tracking-tight text-zinc-900">
            AdVerify
          </span>
        </div>

        <h1 className="text-lg font-semibold text-zinc-900">Sign in</h1>
        <p className="mt-1 text-[13px] text-zinc-400">
          Enter your credentials to access the admin panel.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-zinc-600">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-300 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-zinc-600">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-300 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
              placeholder="********"
              required
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 px-3 py-2 text-[13px] text-red-600">
              {error}
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full h-10">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
