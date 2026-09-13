import { Reveal } from "@/components/Reveal";

export function SectionHeader({
  index,
  eyebrow,
  title,
  sub,
  align = "left",
}: {
  index: string;
  eyebrow: string;
  title: string;
  sub?: string;
  align?: "left" | "between";
}) {
  return (
    <div
      className={`mb-12 flex flex-col gap-6 sm:mb-16 ${
        align === "between" ? "sm:flex-row sm:items-end sm:justify-between" : ""
      }`}
    >
      <div className="max-w-2xl">
        <Reveal variant="up" duration={700}>
          <div className="flex items-center gap-3">
            <span className="section-index">{index}</span>
            <span className="hairline max-w-8" />
            <span className="eyebrow">{eyebrow}</span>
          </div>
        </Reveal>
        <Reveal variant="blur" duration={900} delay={80}>
          <h2 className="mt-4 text-3xl leading-[1.08] sm:text-4xl md:text-[2.75rem]">{title}</h2>
        </Reveal>
        {sub && (
          <Reveal variant="up" duration={800} delay={160}>
            <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
              {sub}
            </p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
