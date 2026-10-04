const projects = [
  { name: "Project S", description: "A minimalist social platform built with Next.js and Supabase.", href: "https://example.com" },
  { name: "Project Two", description: "Short one-liner about what it does.", href: "https://example.com" },
  { name: "Project Three", description: "Short one-liner about what it does.", href: "https://example.com" },
  { name: "Project Four", description: "Short one-liner about what it does.", href: "https://example.com" },

];

export default function Home() {
  return (
      <main className="mx-auto max-w-5xl px-6">
      <section className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl md:text-7xl font-medium tracking-tight">Shahin</h1>
        <p className="mt-6 text-xl md:text-2xl text-muted max-w-xl">
          Developer. Building web apps.
        </p>
        <div className="mt-10 flex gap-3">
          <a
            href="#projects"
            className="px-6 py-3 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
          >
            Projects
          </a>
          <a
            href="https://github.com/zzz-nv"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full border border-border font-medium hover:border-white/50 transition-colors"
          >
            GitHub
          </a>
        </div>
      </section>

        <section id="projects" className="scroll-mt-8 pb-32">
        <h2 className="text-sm uppercase tracking-widest text-muted">Work</h2>
         <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <li key={p.name}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-border rounded-2xl overflow-hidden hover:border-white/50 transition-colors"
              >
                <div className="aspect-video bg-white/5" />
                <div className="p-6">
                  <div className="text-xl font-medium">{p.name}</div>
                  <div className="mt-3 text-muted leading-relaxed line-clamp-2 min-h-[3rem]">
                    {p.description}
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}