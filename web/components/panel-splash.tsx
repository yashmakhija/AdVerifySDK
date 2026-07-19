"use client";

import { useEffect, useState } from "react";

/**
 * Branded intro shown once per tab session when entering the panel.
 * The key icon fades in centered, then flies to the top-left and shrinks
 * into the sidebar-logo position as the overlay fades to reveal the app.
 */
export function PanelSplash() {
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false); // fade/scale in
  const [docked, setDocked] = useState(false); // fly to top-left
  const [faded, setFaded] = useState(false); // overlay + icon fade out
  const [dock, setDock] = useState({ x: 34, y: 28 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem("adverify-splash-seen")) return;
      sessionStorage.setItem("adverify-splash-seen", "1");
    } catch {}

    // Target = center of the on-screen brand logo (sidebar on desktop,
    // mobile header on small screens).
    const isMobile = window.innerWidth < 768;
    setDock(isMobile ? { x: 74, y: 28 } : { x: 34, y: 28 });

    setMounted(true);
    const raf = requestAnimationFrame(() => setEntered(true));
    const t1 = setTimeout(() => setDocked(true), 650);
    const t2 = setTimeout(() => setFaded(true), 1200);
    const t3 = setTimeout(() => setMounted(false), 1650);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (!mounted) return null;

  const size = docked ? 28 : 72;
  const ease = "cubic-bezier(0.65, 0, 0.35, 1)";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background"
        style={{
          zIndex: 200,
          opacity: faded ? 0 : 1,
          transition: "opacity 0.45s ease",
          pointerEvents: faded ? "none" : "auto",
        }}
      />

      {/* Flying icon */}
      <div
        className="fixed"
        style={{
          zIndex: 210,
          top: docked ? dock.y : "50%",
          left: docked ? dock.x : "50%",
          width: size,
          height: size,
          transform: "translate(-50%, -50%)",
          opacity: faded ? 0 : entered ? 1 : 0,
          transition: `top 0.75s ${ease}, left 0.75s ${ease}, width 0.75s ${ease}, height 0.75s ${ease}, opacity 0.4s ease`,
          pointerEvents: "none",
        }}
      >
        {/* Soft amber glow (fades as it docks) */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
          style={{
            width: 140,
            height: 140,
            background:
              "radial-gradient(circle, var(--brand-glow) 0%, transparent 70%)",
            opacity: docked ? 0 : entered ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        />
        <img
          src="/adverify-icon.png"
          alt="AdVerify"
          draggable={false}
          className="relative h-full w-full select-none object-contain"
          style={{
            transform: entered && !docked ? "scale(1)" : docked ? "scale(1)" : "scale(0.85)",
            transition: "transform 0.4s ease",
          }}
        />
      </div>
    </>
  );
}
