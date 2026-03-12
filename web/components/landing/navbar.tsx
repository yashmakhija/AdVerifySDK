"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <span className="text-[15px] font-semibold tracking-tight text-zinc-950">
            AdVerify
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {[
            { label: "Features", href: "#features" },
            { label: "How It Works", href: "#how-it-works" },
            { label: "Docs", href: "/guide" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[13px] text-zinc-500 transition-colors hover:text-zinc-950"
            >
              {label}
            </Link>
          ))}
        </div>

        <Link
          href="/login"
          className="text-[13px] font-medium text-zinc-950 hover:text-zinc-600 transition-colors"
        >
          Log in &rarr;
        </Link>
      </div>
    </nav>
  );
}
