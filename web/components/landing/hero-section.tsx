import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-5xl px-5 py-24 md:py-32 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="mb-4 text-[13px] font-medium text-zinc-500 animate-in">
            Android SDK for ad serving + PIN verification
          </p>

          <h1
            className="text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl md:text-6xl leading-[1.08] animate-in"
            style={{ animationDelay: "60ms" }}
          >
            Monetize your app.
            <br />
            Verify your users.
          </h1>

          <p
            className="mt-5 text-base md:text-lg text-zinc-500 leading-relaxed max-w-lg mx-auto animate-in"
            style={{ animationDelay: "120ms" }}
          >
            A drop-in Android SDK with built-in ad serving and 6-digit PIN
            verification. Manage everything from one dashboard.
          </p>

          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-in"
            style={{ animationDelay: "180ms" }}
          >
            <Link href="/login">
              <Button size="lg" className="gap-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#docs">
              <Button variant="outline" size="lg">
                Documentation
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-200">
        <div className="mx-auto max-w-5xl px-5">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5 text-sm">
            {[
              ["50K+", "Devices verified"],
              ["2M+", "Ads served"],
              ["99.9%", "Uptime"],
              ["<30s", "PIN verification"],
            ].map(([value, label]) => (
              <div key={label} className="flex items-center gap-2">
                <span className="font-semibold text-zinc-950">{value}</span>
                <span className="text-zinc-400">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
