# AdVerify — Design System & Style Guide

This is the source-of-truth for how the AdVerify web app looks and how to build new UI
consistently. When adding a screen or component, follow these rules so it themes correctly
(light/dark) and stays on-brand.

> TL;DR: **Never hardcode `bg-black` / `text-white` / `bg-white/[0.06]` in the panel.** Use the
> semantic tokens below (`bg-background`, `text-foreground`, `border-border`, …). Use the amber
> `--brand` for primary actions and active states.

---

## 1. Brand

- **Product:** AdVerify — Android ad-serving + 6-digit PIN device verification SDK, with an admin dashboard.
- **Logo:** the amber **key** icon (`/public/adverify-icon.png`), rendered via `<BrandLogo />` (`components/brand-logo.tsx`). Also the favicon (`app/icon.png`).
- **Voice:** concise, technical, confident. "Monetize your app. Verify your users."

### Brand accent — Amber → Gold
Defined once in `app/globals.css`; change these three vars to re-theme the whole brand.

| Token | Value | Use |
|---|---|---|
| `--brand` | `#f59e0b` | primary accent (buttons, active states, key icon) |
| `--brand-2` | `#fbbf24` | gradient end / lighter gold |
| `--brand-glow` | `rgba(245,158,11,0.16)` | ambient glows behind hero/CTAs/loader |

Utilities: `bg-[var(--brand)]`, `text-[var(--brand)]`, `.text-brand-gradient` (amber→gold clipped text), Tailwind `bg-brand` / `bg-brand-2`.

---

## 2. Theming (light / dark)

The **panel/dashboard supports Light & Dark** (default **Dark**). The **landing page is always dark** by design (its components are intentionally hardcoded, not tokenized).

**Mechanism**
- A `.dark` class on `<html>` flips all tokens. Set pre-paint by a no-flash inline script in `app/layout.tsx` reading `localStorage['adverify-theme']`.
- State: `useThemeStore` in `lib/store.ts` (`theme`, `setTheme`, `toggleTheme`, `hydrate`).
- UI: `<ThemeToggle />` (`components/ui/theme-toggle.tsx`) in the sidebar footer.

**To restyle a theme:** edit the token values in `:root` (light) or `.dark` (dark) in `globals.css`. Nothing else.

---

## 3. Semantic color tokens

Defined in `app/globals.css` (`:root` = light, `.dark` = dark), exposed to Tailwind via `@theme inline`.
**Always build the panel with these — not raw colors.**

| Tailwind class | Token | Light | Dark | Use |
|---|---|---|---|---|
| `bg-background` | `--background` | `#fafafa` | `#09090b` | page background |
| `text-foreground` | `--foreground` | `#0a0a0a` | `#ffffff` | primary text |
| `text-muted-foreground` | `--muted-foreground` | `#71717a` | `#a1a1aa` | secondary text |
| `text-faint` | `--faint` | `#a1a1aa` | `#52525b` | tertiary / captions |
| `bg-surface` | `--surface` | `#ffffff` | `rgba(255,255,255,.02)` | subtle card surface |
| `bg-surface-2` | `--surface-2` | `#f1f1f4` | `rgba(255,255,255,.06)` | hover / active / stronger surface |
| `bg-card` | `--card` | `#ffffff` | `rgba(255,255,255,.02)` | elevated card |
| `border-border` | `--border` | `#e4e4e7` | `rgba(255,255,255,.06)` | subtle border / `divide-border` |
| `border-border-strong` | `--border-strong` | `#d4d4d8` | `rgba(255,255,255,.12)` | prominent border |
| `bg-popover` | `--popover` | `#ffffff` | `#18181b` | menus, dropdowns, modals, toasts |

**Status colors** (keep across themes): `emerald` = success/active PIN, `red`/`destructive` = danger/expired, `amber` = warning/expiring, `blue`/`violet`/etc. = categorical accents. For colored **text on a light-tinted box**, use the light-legible pattern: `text-red-700 dark:text-red-300` (sub-text `text-red-600/70 dark:text-red-400/60`).

### Conversion cheatsheet (old hardcoded → token)
```
bg-black / bg-[#09090b]      → bg-background
text-white                    → text-foreground
text-zinc-400/500             → text-muted-foreground
text-zinc-600/700             → text-faint
bg-white/[0.02|0.03]          → bg-surface
bg-white/[0.04|0.06|0.08]     → bg-surface-2   (also hover:)
border-white/[0.04|0.06|0.08] → border-border
border-white/[0.1|0.12|0.15]  → border-border-strong
divide-white/[...]            → divide-border
ring-white/20                 → ring-foreground/20
```

---

## 4. Typography

- **Font:** Plus Jakarta Sans (`--font-jakarta`, `font-sans`), loaded in `app/layout.tsx`.
- **Weights:** 500 body, 600 emphasis, 700/800 headings.
- **Scale** (this app uses explicit pixel sizes, not `text-sm/base`):
  - Captions/labels: `text-[10px]` – `text-[12px]` (often `uppercase tracking-[0.15em]`, `text-faint`)
  - Body / UI: `text-[13px]` – `text-[15px]`
  - Page title (`PageHeader`): `text-lg font-bold`
  - Section headings: `text-[clamp(1.5rem,3.5vw,2.75rem)] font-extrabold` (landing)
  - Hero H1: up to `text-[4.25rem] font-extrabold`
- **Numbers:** `tabular-nums` for stats/metrics.

---

## 5. Layout

**Panel shell** (`app/(panel)/layout.tsx`)
- Fixed left **sidebar** `w-[240px]` (`components/sidebar.tsx`), `border-r border-border bg-background`; off-canvas drawer on mobile with a top mobile header (`h-14`).
- Content: `<main>` → `mx-auto max-w-5xl px-4 py-5 sm:px-6 md:py-8`.
- Sidebar sections: primary `NAV`, admin-only `Management` group, footer = ThemeToggle + profile link + Sign Out.

**Active nav item** = amber pill: `bg-[var(--brand)]/10 text-foreground`, icon `text-[var(--brand)]`, trailing `bg-[var(--brand)]` dot.

**Landing** (`app/page.tsx`) — stacked full-width sections, each `border-t border-white/[0.06]`, `max-w-6xl` inner, generous `py-24 md:py-32`. Order: Navbar → Hero → Features → HowItWorks → Docs → Pricing → CTA → Footer.

**Spacing/radius**
- Radius base `--radius: 0.625rem` (10px). Cards `rounded-xl`/`rounded-2xl`, controls `rounded-lg`.
- Common padding: cards `p-4`–`p-6`, inputs `px-3.5 py-2.5`. Gaps `gap-2`–`gap-4`.

---

## 6. Core components

| Component | Path | Notes |
|---|---|---|
| `BrandLogo` | `components/brand-logo.tsx` | amber key icon; size via `className` (default `h-7 w-7`) |
| `Loader` | `components/ui/loader.tsx` | branded loading state — pulsing key + glow. **Use for all page/section loading**, e.g. `if (!data) return <Loader />` |
| `PanelSplash` | `components/panel-splash.tsx` | once-per-session intro; key flies center → sidebar-logo spot |
| `ThemeToggle` | `components/ui/theme-toggle.tsx` | Light/Dark segmented switch |
| `StatCard` | `components/ui/stat-card.tsx` | metric tile; `accent` prop tints the icon |
| `PageHeader` | `components/ui/page-header.tsx` | page title + optional primary action |
| `Button` | `components/ui/button.tsx` | variants below |
| `Modal` / form fields | `components/ui/modal.tsx` | `bg-popover`, `FormInput/Select/Textarea`, `ModalActions` |
| `DataTable` | `components/ui/data-table.tsx` | responsive table |
| `Badge` | `components/ui/badge.tsx` | `default` / `success` / `destructive` |
| `AppSelector`, `AdPreview`, `PlanGate`, `UserAvatar` | `components/ui/*` | domain UI |

### Button variants (`Button`)
- `default` — **amber primary**: `bg-[var(--brand)] text-black hover:brightness-110`
- `outline` — `border-border-strong bg-surface text-muted-foreground hover:bg-surface-2`
- `secondary` — `bg-surface-2 text-foreground`
- `ghost` — `text-muted-foreground hover:bg-surface-2 hover:text-foreground`
- `destructive` — red tint
- Sizes: `sm` / `default` / `lg` / `icon`. Interactions: `active:scale-[0.98]`, focus ring `ring-foreground/20`.

**Primary buttons** (raw, outside `Button`) should be amber: `bg-[var(--brand)] text-black hover:brightness-110`, not `bg-white`.

---

## 7. Motion & effects

Keyframes/utilities in `globals.css`:
- Entrances: `.animate-in` (fade), `.animate-in-scale`, `.animate-slide-up` (`cubic-bezier(0.16,1,0.3,1)`).
- Floats: `.animate-float`, `-slow`, `-alt`; hero `.phone-float-1..4`.
- `.animate-loader` (`loaderPulse`) — the key loader breathing.
- `.text-shine`, `.text-brand-gradient`.
- Backgrounds: `.bg-grid` / `.bg-dot` (+ `-dark`), `.mask-fade-b` / `-edges`, `.dark-scroll`, `.scrollbar-hide`.
- **Glassmorphism** (landing/overlays): `backdrop-blur-xl` + translucent surface + hairline border.
- Amber glow: radial `var(--brand-glow)` behind hero, CTA, loader, splash.

**Feel:** crisp (`transition-all duration-150/200`), subtle press (`active:scale-[0.97-0.98]`), tinted-overlay accents rather than heavy fills. Minimal shadows (strategic `shadow-2xl`).

---

## 8. Icons

**lucide-react**. Sizes: `h-3 w-3` (tiny) · `h-4 w-4` (standard) · `h-5 w-5` (medium). Match icon color to context token (`text-faint` idle, `text-[var(--brand)]` active, status colors for status).

---

## 9. Rules for new UI (checklist)

1. Panel UI uses **tokens only** — no `bg-black`, `text-white`, `bg-white/[…]`, `border-white/[…]`, or raw `text-zinc-*` for chrome. (Status colors + intentional device mockups are the exceptions.)
2. Primary action / active state → **amber `--brand`**.
3. Loading state → `<Loader />`. Empty state → bordered `bg-surface` card with `text-muted-foreground`.
4. New color? Add a token in `:root` **and** `.dark`, map it in `@theme inline`, then use the utility.
5. Test both themes with the sidebar toggle before shipping.
6. Landing page stays dark — don't tokenize it unless we decide to add a light landing.
