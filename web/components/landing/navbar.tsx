"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 shadow-md shadow-indigo-600/20">
            <span className="text-sm font-bold text-white leading-none">A</span>
          </div>
          <span className="text-lg font-semibold tracking-tight text-zinc-900">
            Ad<span className="text-indigo-600">Verify</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {[
            { href: "#features", label: "Features" },
            { href: "#how-it-works", label: "How It Works" },
            { href: "#docs", label: "Docs" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[13px] font-medium text-zinc-500 transition-colors hover:text-zinc-900"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden md:block">
            <Button variant="gradient" size="sm">
              Admin Panel
            </Button>
          </Link>
          <button className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 md:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
