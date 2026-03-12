import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CtaSection() {
  return (
    <section className="w-full border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-5xl px-5 py-20 md:py-28 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-950 md:text-3xl">
          Ready to get started?
        </h2>
        <p className="mt-3 text-[15px] text-zinc-500 max-w-md mx-auto leading-relaxed">
          Create your admin account, generate an API key, and start serving ads
          with PIN verification today.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/login">
            <Button size="lg" className="gap-2">
              Open Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="#docs">
            <Button variant="outline" size="lg">
              Read the Docs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
