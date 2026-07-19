import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <BrandLogo className="h-5 w-5" />
            <span className="text-[13px] text-zinc-600">
              &copy; {new Date().getFullYear()} AdVerify. Ad serving & PIN
              verification SDK.
            </span>
          </div>

          <div className="flex items-center gap-6">
            {[
              { label: "Guide", href: "/guide" },
              { label: "Dashboard", href: "/login" },
              { label: "Contact", href: "https://t.me/TakezoTheunrival" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-[13px] text-zinc-600 transition-colors hover:text-zinc-300"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
