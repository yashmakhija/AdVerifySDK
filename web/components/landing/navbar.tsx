"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Shield } from "lucide-react";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "API", href: "#docs" },
  { label: "Guide", href: "/guide" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full px-3 sm:px-5 pt-3">
      <nav className="mx-auto max-w-5xl rounded-2xl border border-white/[0.08] bg-white/[0.05] backdrop-blur-2xl backdrop-saturate-150 shadow-lg shadow-black/20">
        <div className="flex h-[52px] items-center justify-between px-4 sm:px-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white transition-transform duration-200 group-hover:scale-105">
              <Shield className="h-3.5 w-3.5 text-black" />
            </div>
            <span className="text-[14px] font-bold tracking-tight text-white">
              AdVerify
            </span>
          </Link>

          {/* Desktop links — centered */}
          <div className="hidden items-center gap-0.5 md:flex absolute left-1/2 -translate-x-1/2">
            {LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-zinc-400 transition-all duration-200 hover:text-white hover:bg-white/[0.06]"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/login"
              className="group flex items-center gap-1.5 rounded-full bg-white px-4 py-[6px] text-[13px] font-semibold text-black transition-all duration-200 hover:bg-zinc-200 active:scale-[0.97]"
            >
              Dashboard
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-colors hover:text-white hover:bg-white/[0.08] md:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-white/[0.06] px-4 pb-4 pt-2 md:hidden animate-in">
            <div className="space-y-0.5">
              {LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center rounded-xl px-3 py-2.5 text-[14px] font-medium text-zinc-400 transition-colors hover:bg-white/[0.04] hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-white/[0.06]">
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <button className="group flex w-full items-center justify-center gap-2 rounded-full bg-white py-2.5 text-[13px] font-semibold text-black transition-all hover:bg-zinc-200 active:scale-[0.98]">
                  Dashboard
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
