"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Check, X } from "lucide-react";
import type { ApiKey } from "@/lib/types";

interface AppSelectorProps {
  keys: ApiKey[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  placeholder?: string;
}

export function AppSelector({
  keys,
  selectedId,
  onSelect,
  placeholder = "Search and select an app...",
}: AppSelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = keys.find((k) => k.id === selectedId);

  const filtered = keys.filter(
    (k) =>
      k.appName.toLowerCase().includes(search.toLowerCase()) ||
      k.packageName?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => { setOpen(!open); setSearch(""); }}
        className="flex w-full items-center justify-between gap-2 rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-left transition-all hover:bg-surface-2 focus:outline-none focus:border-border-strong"
      >
        {selected ? (
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-[10px] font-bold text-muted-foreground">
              {selected.appName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{selected.appName}</p>
              {selected.packageName && (
                <p className="text-[11px] text-faint truncate">{selected.packageName}</p>
              )}
            </div>
          </div>
        ) : (
          <span className="text-sm text-faint">{placeholder}</span>
        )}
        <ChevronDown className={`h-4 w-4 shrink-0 text-faint transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1.5 w-full rounded-xl border border-border bg-popover shadow-2xl shadow-black/40 overflow-hidden animate-in">
          {/* Search input */}
          <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            <Search className="h-3.5 w-3.5 shrink-0 text-faint" />
            <input
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search apps..."
              className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-faint"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-faint hover:text-muted-foreground">
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-[240px] overflow-y-auto dark-scroll py-1">
            {filtered.length === 0 ? (
              <p className="px-3 py-6 text-center text-[13px] text-faint">
                {keys.length === 0 ? "No apps yet. Create an API key first." : "No apps match your search."}
              </p>
            ) : (
              filtered.map((k) => {
                const isSelected = selectedId === k.id;
                return (
                  <button
                    key={k.id}
                    type="button"
                    onClick={() => {
                      onSelect(k.id);
                      setOpen(false);
                      setSearch("");
                    }}
                    className={`flex w-full items-center gap-2.5 px-3 py-2 text-left transition-colors ${
                      isSelected
                        ? "bg-surface-2"
                        : "hover:bg-surface-2"
                    }`}
                  >
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${
                      isSelected
                        ? "bg-[var(--brand)] text-black"
                        : "bg-surface-2 text-muted-foreground"
                    }`}>
                      {k.appName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-[13px] font-medium truncate ${isSelected ? "text-foreground" : "text-foreground"}`}>
                        {k.appName}
                      </p>
                      {k.packageName && (
                        <p className="text-[11px] text-faint truncate">{k.packageName}</p>
                      )}
                    </div>
                    {isSelected && (
                      <Check className="h-3.5 w-3.5 shrink-0 text-foreground" />
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Count footer */}
          {keys.length > 5 && (
            <div className="border-t border-border px-3 py-1.5">
              <p className="text-[11px] text-faint">
                {filtered.length} of {keys.length} apps
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
