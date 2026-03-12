import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-100 bg-white">
      <div className="wrapper py-8 flex flex-col md:flex-row gap-6 justify-between items-center">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-indigo-600 to-violet-600">
              <span className="text-[10px] font-bold text-white leading-none">
                A
              </span>
            </div>
            <span className="text-sm font-semibold tracking-tight text-zinc-900">
              Ad<span className="text-indigo-600">Verify</span>
            </span>
          </Link>
          <span className="text-xs text-zinc-400">
            &copy; {new Date().getFullYear()} AdVerify SDK
          </span>
        </div>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Contact"].map((link) => (
            <Link
              key={link}
              href={`/${link.toLowerCase()}`}
              className="text-xs text-zinc-400 hover:text-zinc-900 transition-colors"
            >
              {link}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
