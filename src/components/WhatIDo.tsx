import { ArrowUpRight } from "lucide-react";
import { content } from "@/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

export function WhatIDo() {
  return (
    <section id="skills" className="border-t border-border py-20 sm:py-28">
      <div className="container-edit">
        <SectionHeader index="04" eyebrow="What I Do" title="Skills & Expertise" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.skills.map((s, i) => (
            <Reveal key={s.id} variant="up" delay={i * 90}>
              <div className="card-surface card-hover group h-full p-6">
                <div className="flex items-start justify-between">
                  <span className="section-index">{s.index}</span>
                  <ArrowUpRight
                    size={16}
                    className="text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                </div>
                <h3 className="mt-5 text-lg">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
