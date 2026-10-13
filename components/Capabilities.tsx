"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, Database, Palette, Sparkles } from "lucide-react";

const capabilities = [
  { icon: Globe, claim: "Web apps", tools: "Next.js · React · Supabase" },
  { icon: Database, claim: "Full-stack", tools: "auth · RLS · realtime · Postgres" },
  { icon: Palette, claim: "Interfaces", tools: "hand-written CSS · theme systems" },
];

export function Capabilities() {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

    useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout>;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Dwell time: only fire if the section stays in view.
          // Cancels if the user is just scrolling past it.
          timer = setTimeout(() => {
            setRevealed(true);
            obs.disconnect();
          }, 400);
        } else {
          clearTimeout(timer);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.3 }
    );

    obs.observe(el);
    return () => {
      obs.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={ref}
      className={`reveal-init ${revealed ? "revealed" : ""} pt-16 pb-40`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="reveal-line-item border-t border-foreground/20" />

        <div
          className="reveal-item mt-40 flex items-center justify-center gap-4"
          style={{ animationDelay: "0.05s" }}
        >
          <Sparkles className="w-8 h-8 text-[var(--accent)]" strokeWidth={1.5} />
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
            What I can build
          </h2>
        </div>

        <ul className="mt-24 grid gap-16 md:grid-cols-3 md:gap-12 text-center">
          {capabilities.map(({ icon: Icon, claim, tools }, i) => (
            <li key={claim}>
              <div
                className="reveal-item"
                style={{ animationDelay: `${0.15 + i * 0.08}s` }}
              >
                <Icon
                  className="w-10 h-10 mx-auto text-[var(--accent)]"
                  strokeWidth={1.5}
                />
              </div>
              <div
                className="reveal-item mt-6 text-2xl md:text-3xl font-medium tracking-tight"
                style={{ animationDelay: `${0.21 + i * 0.08}s` }}
              >
                {claim}
              </div>
              <div
                className="reveal-item mt-3 text-muted text-base md:text-lg leading-relaxed"
                style={{ animationDelay: `${0.27 + i * 0.08}s` }}
              >
                {tools}
              </div>
            </li>
          ))}
        </ul>

        <div
          className="reveal-line-item mt-40 border-t border-foreground/20"
          style={{ animationDelay: "0.45s" }}
        />
      </div>
    </section>
  );
}