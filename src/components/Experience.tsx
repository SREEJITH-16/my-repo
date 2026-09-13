import { MapPin } from "lucide-react";
import { content } from "@/content";
import { Reveal, useInView } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

export function Experience() {
  return (
    <section id="experience" className="border-t border-border py-20 sm:py-28">
      <div className="container-edit">
        <SectionHeader index="06" eyebrow="Work Experience" title="Professional Journey" />

        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px overflow-hidden sm:left-[9px]">
            <TimelineLine />
          </div>
          <div className="space-y-10">
            {content.experience.map((e, i) => (
              <Reveal key={e.id} variant="left" delay={i * 120}>
                <div className="relative pl-9 sm:pl-12">
                  <span className="absolute left-0 top-1.5 grid h-4 w-4 place-items-center rounded-full border-2 border-foreground bg-background sm:h-5 sm:w-5">
                    {e.current && <span className="h-1.5 w-1.5 rounded-full bg-foreground" />}
                  </span>
                  <div className="card-surface p-6 sm:p-7">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs uppercase tracking-wider text-muted-foreground">
                        {e.duration}
                      </span>
                      {e.current && (
                        <span className="chip !border-foreground !text-foreground">Current</span>
                      )}
                    </div>
                    <h3 className="mt-3 text-xl">{e.role}</h3>
                    <p className="mt-1 text-sm">{e.company}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin size={12} /> {e.location}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {e.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {e.tags.map((t) => (
                        <span key={t} className="chip">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineLine() {
  const { ref, visible } = useInView<HTMLDivElement>(0.05);
  return (
    <div
      ref={ref}
      className="h-full w-full bg-border"
      style={{
        transform: visible ? "scaleY(1)" : "scaleY(0)",
        transformOrigin: "top",
        transition: "transform 1.4s cubic-bezier(.22,1,.36,1)",
      }}
    />
  );
}
