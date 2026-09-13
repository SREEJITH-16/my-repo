import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { content } from "@/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { AcademicModal } from "@/components/AcademicModal";

export function AcademicPerformance() {
  const [open, setOpen] = useState(false);
  const { academic } = content;

  return (
    <section id="academics" className="border-t border-border py-20 sm:py-28">
      <div className="container-edit">
        <SectionHeader index="03" eyebrow="Academic Performance" title="Education Highlights" />

        <Reveal variant="scale">
          <div className="grid gap-0 overflow-hidden rounded-2xl border border-border md:grid-cols-[1.1fr_1fr]">
            <div className="flex flex-col justify-between p-8 sm:p-10">
              <div>
                <h3 className="text-xl sm:text-2xl">{academic.degree}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {academic.institution}, {academic.campus}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{academic.duration}</p>
              </div>
              <button type="button" onClick={() => setOpen(true)} className="arrow-link mt-8 w-fit">
                View Full Academic Performance <ArrowUpRight size={15} />
              </button>
            </div>
            <div className="grid grid-cols-3 divide-x divide-border border-t border-border glass-surface md:border-t-0 md:border-l">
              <Stat value={academic.cgpa.toFixed(2)} label="CGPA" />
              <Stat value={String(academic.semestersCompleted)} label="Semesters" />
              <Stat value={academic.expectedGraduation} label="Graduation" />
            </div>
          </div>
        </Reveal>
      </div>

      <AcademicModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 px-2 py-8 text-center sm:py-0">
      <span className="font-display text-3xl sm:text-4xl">{value}</span>
      <span className="text-[0.68rem] uppercase tracking-wider text-muted-foreground">{label}</span>
    </div>
  );
}
