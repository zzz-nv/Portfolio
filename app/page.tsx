import { ThemeToggle } from "@/components/ThemeToggle";




const projects = [
  { name: "Project S", 
    description: "A minimalist social platform built with Next.js and Supabase.", 
    live: "https://project-s-nine-kappa.vercel.app/",
    repo: "https://github.com/zzz-nv/project-s", },
  
  
  
  { name: "Project Two", description: "Short one-liner about what it does.",  live: "https://example.com",
    repo: "https://example.com", },
  

];

export default function Home() {
  return (
      <main className="mx-auto max-w-[1500px] px-6">
        <ThemeToggle />
      <section className="min-h-[100svh] flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight">
              {"Shahin".split("").map((char, i) => (
                <span
                  key={i}
                  className="animate-letter"
                  style={{ animationDelay: `${150 + i * 120}ms`,  animationDuration: "1.8s" }}
                >
                  {char}
                </span>
              ))}
      </h1>
          <p className="mt-6 text-2xl text-muted max-w-xl">
          {"I Build web apps.".split(" ").map((word, i) => (
            <span
              key={i}
              className="animate-letter"
              style={{ animationDelay: `${1000 + i * 80}ms`, animationDuration: "1.8s" }}
            >
              {word}
              {i < 3 ? "\u00A0" : ""}
            </span>
          ))}
        </p>
        <div className="mt-10 flex gap-3">
          <a
            href="#projects"
            className="px-6 py-3.5  rounded-none bg-[var(--btn)] text-[var(--btn-fg)] font-medium hover:opacity-90 transition-opacity"
          >
            Projects
          </a>
          <a
            href="https://github.com/zzz-nv"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-none border border-border font-medium hover:border-[var(--border-hover)] transition-colors"
          >
            GitHub
          </a>
        </div>
      </section>

        <section id="projects" className="scroll-mt-8 pb-32">
        <h2 className="text-sm uppercase tracking-widest text-muted">Work</h2>
          <ul className="mt-8 flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 scroll-px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden xl:grid xl:grid-cols-2 xl:gap-8 xl:overflow-visible xl:pb-0 xl:scroll-px-0">
          {projects.map((p) => (
                        <li
              key={p.name}
            className="w-[80%] max-w-sm shrink-0 snap-start border border-border rounded-none overflow-hidden xl:w-auto xl:shrink"
            >
              <div className="aspect-video bg-white/5" />
                <div className="p-5 xl:p-6">
                <div className="text-xl font-medium">{p.name}</div>
                <div className="mt-3 text-muted leading-relaxed line-clamp-2 min-h-[3rem]">
                  {p.description}
                </div>
                <div className="mt-6 flex gap-3">
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm rounded-none bg-[var(--btn)] text-[var(--btn-fg)] font-medium hover:border-[var(--border-hover)] transition-opacity"
                  >
                    Live
                  </a>
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm rounded-none border border-border font-medium hover:border-[var(--border-hover)] transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <footer className="pb-16 pt-8 border-t border-border">
          <p className="text-sm text-muted">
          Contact me at: {" "}
          <a href="mailto:shahin.m.builds@gmail.com" className="text-foreground hover:underline">
            shahin.m.builds@gmail.com
          </a>
        </p>
      </footer>

    </main>
  );
}