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
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-950">
            <span className="text-[11px] font-bold text-white leading-none">A</span>
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-zinc-950">
            AdVerify
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[13px] text-zinc-500 transition-colors hover:text-zinc-950"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button size="sm" className="h-8 px-4 text-[13px]">
              Dashboard
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-600 hover:bg-zinc-100 md:hidden"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-zinc-100 bg-white px-5 pb-4 pt-2 md:hidden">
          {LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-sm text-zinc-600 transition-colors hover:text-zinc-950"
            >
              {label}
            </Link>
          ))}
          <Link href="/login" onClick={() => setMobileOpen(false)} className="mt-2 block">
            <Button size="sm" className="w-full text-[13px]">
              Dashboard
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
