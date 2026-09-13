import { ExternalLink, Users } from "lucide-react";
import { content } from "@/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

export function ActivitySection() {
  return (
    <section id="activities" className="border-t border-border py-20 sm:py-28">
      <div className="container-edit">
        <SectionHeader index="08" eyebrow="Extracurricular Activities" title="Beyond Academics" />

        <div className="grid gap-5 sm:grid-cols-2">
          {content.activities.map((a, i) => (
            <Reveal key={a.id} variant={i % 2 === 0 ? "left" : "right"} delay={(i % 2) * 100}>
              <div className="card-surface card-hover flex h-full flex-col p-6">
                <div className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border">
                    <Users size={16} strokeWidth={1.6} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {a.date}
                    </p>
                    <h3 className="mt-1.5 text-base leading-snug">{a.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {a.role} &middot; {a.organization}
                    </p>
                  </div>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {a.description}
                </p>
                {a.link && (
                  <a
                    href={a.link}
                    target="_blank"
                    rel="noreferrer"
                    className="arrow-link mt-4 w-fit text-foreground"
                  >
                    View Certificate <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
