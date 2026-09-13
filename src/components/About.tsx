import { GraduationCap, Sparkles, Target } from "lucide-react";
import { content } from "@/content";
import { Reveal, MaskReveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

export function About() {
  const { profile } = content;

  return (
    <section id="about" className="border-t border-border py-20 sm:py-28">
      <div className="container-edit">
        <SectionHeader index="02" eyebrow="About Me" title="More Than Just a Developer." />

        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <MaskReveal className="order-2 lg:order-1">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-surface">
              <img
                src="/images/sreejith-portrait-color.jpg"
                alt={`${profile.name} speaking at an event`}
                loading="lazy"
                width={1000}
                height={1250}
                className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter] duration-700 hover:grayscale-0"
              />
            </div>
          </MaskReveal>

          <div className="order-1 lg:order-2">
            <Reveal variant="up">
              <div className="space-y-5 text-[0.98rem] leading-relaxed text-muted-foreground">
                {profile.bio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal variant="up" delay={120}>
              <blockquote className="mt-8 border-l-2 border-foreground pl-5 font-display text-xl italic leading-snug sm:text-2xl">
                &ldquo;Discipline today, a better tomorrow.&rdquo;
                <footer className="mt-2 font-sans text-xs not-italic uppercase tracking-widest text-muted-foreground">
                  {profile.name}
                </footer>
              </blockquote>
            </Reveal>

            <Reveal variant="up" delay={220}>
              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                <InfoRow
                  icon={GraduationCap}
                  label="Education"
                  value={`${profile.education.degree.replace("B.Tech, ", "B.Tech ")}`}
                />
                <InfoRow icon={Sparkles} label="Interests" value={profile.interests.join(", ")} />
                <InfoRow icon={Target} label="Currently" value="Software Engineer Intern @ Zoho" />
                <InfoRow icon={Target} label="Goal" value={profile.goal} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof GraduationCap;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border">
        <Icon size={15} strokeWidth={1.6} />
      </span>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="mt-0.5 truncate text-sm text-foreground">{value}</p>
      </div>
    </div>
  );
}
