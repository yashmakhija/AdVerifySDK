import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-100">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-950">
              <span className="text-[9px] font-bold text-white leading-none">A</span>
            </div>
            <span className="text-[13px] text-zinc-400">
              &copy; {new Date().getFullYear()} AdVerify. Open-source ad serving SDK.
            </span>
          </div>

          <div className="flex items-center gap-6">
            {[
              { label: "Guide", href: "/guide" },
              { label: "Dashboard", href: "/login" },
              { label: "GitHub", href: "#" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-[13px] text-zinc-400 transition-colors hover:text-zinc-600"
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
