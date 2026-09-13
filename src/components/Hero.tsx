import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { content } from "@/content";
import { Reveal, Parallax } from "@/components/Reveal";

const socials = [
  { icon: Github, label: "GitHub", href: content.profile.github },
  { icon: Linkedin, label: "LinkedIn", href: content.profile.linkedin },
  { icon: Mail, label: "Email", href: `mailto:${content.profile.email}` },
];

export function Hero() {
  const { profile } = content;

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36">
      <div className="container-edit grid items-start gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <div>
          <div className="hero-in" style={{ animationDelay: "0ms" }}>
            <div className="flex items-center gap-3">
              <span className="section-index">02</span>
              <span className="hairline max-w-8" />
              <span className="eyebrow">Software Engineer</span>
            </div>
          </div>

          <div className="hero-in" style={{ animationDelay: "120ms" }}>
            <h1 className="mt-6 text-[13vw] leading-[0.98] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.1rem]">
              {profile.tagline}
            </h1>
          </div>

          <div className="hero-in" style={{ animationDelay: "280ms" }}>
            <p className="mt-7 max-w-md text-[0.98rem] leading-relaxed text-muted-foreground">
              I&apos;m {profile.name}, a Full-Stack Developer passionate about creating meaningful
              digital experiences, solving real-world problems and continuously learning new
              technologies.
            </p>
          </div>

          <div className="hero-in" style={{ animationDelay: "400ms" }}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#projects" className="btn-primary">
                View My Work <ArrowUpRight size={16} />
              </a>
              {profile.resumeUrl ? (
                <a href={profile.resumeUrl} className="btn-outline" download>
                  Download Resume
                </a>
              ) : (
                <a href="#contact" className="btn-outline">
                  Download Resume
                </a>
              )}
            </div>
          </div>

          <div className="hero-in" style={{ animationDelay: "520ms" }}>
            <div className="mt-9 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  <s.icon size={16} strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>

          <div className="hero-in hidden sm:block" style={{ animationDelay: "600ms" }}>
            <div className="mt-16 flex items-center gap-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <span>Code</span>
              <span>Learn</span>
              <span>Build</span>
              <span>Grow</span>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:mx-0">
          <div className="hero-mask-in relative" style={{ animationDelay: "220ms" }}>
            <div className="hero-scale-in" style={{ animationDelay: "220ms" }}>
              <Parallax strength={10}>
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-surface">
                  <img
                    src={profile.portraitUrl}
                    alt={`Portrait of ${profile.name}`}
                    loading="eager"
                    width={900}
                    height={1125}
                    className="absolute inset-0 h-full w-full object-cover object-top grayscale"
                  />
                  <div
                    className="mask-fade-b pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/90 to-transparent"
                    aria-hidden="true"
                  />
                </div>
              </Parallax>
            </div>
          </div>

          <div className="hero-in" style={{ animationDelay: "640ms" }}>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {profile.stats.map((s) => (
                <div key={s.label} className="card-surface p-3.5 text-center">
                  <p className="font-display text-lg leading-none">{s.value}</p>
                  <p className="mt-1.5 text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-in" style={{ animationDelay: "720ms" }}>
            <p className="mt-5 text-right text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Based in <span className="text-foreground">{profile.location}</span>
            </p>
          </div>
        </div>
      </div>

      <Reveal delay={820} className="mt-20 hidden justify-center sm:flex">
        <a
          href="#about"
          aria-label="Scroll to About section"
          className="flex flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground"
        >
          Scroll
          <span className="h-8 w-px animate-pulse bg-border" />
        </a>
      </Reveal>
    </section>
  );
}
