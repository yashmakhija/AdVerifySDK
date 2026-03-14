"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "API", href: "#docs" },
  { label: "Guide", href: "/guide" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200/50 bg-white/85 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-[56px] max-w-6xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-950 shadow-sm shadow-zinc-950/20">
            <span className="text-[11px] font-bold text-white leading-none">A</span>
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-zinc-950">
            AdVerify
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[13px] font-medium text-zinc-400 transition-colors hover:text-zinc-950"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button size="sm" className="h-8 px-4 text-[13px] shadow-sm shadow-zinc-950/10">
              Dashboard
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 md:hidden"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-zinc-100 bg-white/95 backdrop-blur-xl px-5 pb-5 pt-3 md:hidden animate-in">
          <div className="space-y-1">
            {LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-[14px] font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-950"
              >
                {label}
              </Link>
            ))}
          </div>
          <Link href="/login" onClick={() => setMobileOpen(false)} className="mt-3 block">
            <Button size="sm" className="w-full text-[13px]">
              Dashboard
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
