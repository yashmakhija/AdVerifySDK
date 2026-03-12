import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CtaSection() {
  return (
    <section className="w-full relative bg-white border-t border-zinc-100">
      <div className="wrapper py-20 md:py-28">
        <div className="relative rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-10 md:p-16 text-center overflow-hidden shadow-2xl shadow-indigo-600/20">
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 blur-3xl -translate-x-20 -translate-y-20" />
          <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-white/5 blur-3xl translate-x-10 translate-y-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/3 blur-3xl" />

          <div className="relative max-w-xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-base text-indigo-100 leading-relaxed mb-8">
              Set up your admin panel, create API keys, configure ads, and start
              serving to your Android users in minutes.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/login">
                <Button
                  size="lg"
                  className="gap-2 bg-white text-indigo-700 hover:bg-indigo-50 shadow-lg"
                >
                  Open Admin Panel
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#docs">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white bg-white/10 hover:bg-white/20 hover:text-white backdrop-blur-sm"
                >
                  Read the Docs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
