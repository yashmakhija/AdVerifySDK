"use client";

import { useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "@/lib/store";
import { cn } from "@/lib/utils";

/** Light/Dark segmented switch. Reads the class set by the no-flash inline script. */
export function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);
  const hydrate = useThemeStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const options = [
    { value: "light" as const, label: "Light", icon: Sun },
    { value: "dark" as const, label: "Dark", icon: Moon },
  ];

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-surface p-1">
      {options.map(({ value, label, icon: Icon }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-[12px] font-medium transition-all duration-150",
              active
                ? "bg-[var(--brand)]/15 text-foreground"
                : "text-faint hover:text-muted-foreground"
            )}
            aria-pressed={active}
          >
            <Icon
              className={cn("h-3.5 w-3.5", active && "text-[var(--brand)]")}
            />
            {label}
          </button>
        );
      })}
    </div>
  );
}
