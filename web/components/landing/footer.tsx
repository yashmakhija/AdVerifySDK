export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-5xl px-5 py-5 flex items-center justify-between">
        <span className="text-[13px] text-zinc-400">
          &copy; {new Date().getFullYear()} AdVerify
        </span>
        <div className="flex gap-5">
          {["Privacy", "Terms"].map((link) => (
            <span
              key={link}
              className="text-[13px] text-zinc-400 hover:text-zinc-950 transition-colors cursor-pointer"
            >
              {link}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
