import { useState } from "react";
import { ChevronDown, ChevronUp, Download, ExternalLink } from "lucide-react";
import { content, type Certificate } from "@/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { Modal } from "@/components/Modal";

const INITIAL_COUNT = 6;

export function CertificateGallery() {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<Certificate | null>(null);
  const certs = content.certificates;
  const visible = expanded ? certs : certs.slice(0, INITIAL_COUNT);
  const hasMore = certs.length > INITIAL_COUNT;

  return (
    <section id="certificates" className="border-t border-border py-20 sm:py-28">
      <div className="container-edit">
        <SectionHeader
          index="07"
          eyebrow="Certifications"
          title="Courses & Certificates"
          sub="Programs, workshops and hackathons completed along the way."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((c, i) => (
            <Reveal key={c.id} variant="up" delay={(i % 3) * 80}>
              <button
                type="button"
                onClick={() => setActive(c)}
                className="card-surface card-hover group flex h-full w-full flex-col overflow-hidden text-left"
              >
                <div className="relative h-40 overflow-hidden bg-surface">
                  {c.image && (
                    <img
                      src={c.image}
                      alt={c.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/5" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.date}</p>
                  <h3 className="mt-2 text-[0.98rem] leading-snug">{c.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{c.organization}</p>
                  <span className="arrow-link mt-4 text-foreground">
                    View Certificate <ExternalLink size={12} />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button type="button" onClick={() => setExpanded((v) => !v)} className="btn-outline">
              {expanded ? (
                <>
                  Show Less <ChevronUp size={16} />
                </>
              ) : (
                <>
                  View More Certificates <ChevronDown size={16} />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <Modal
        open={Boolean(active)}
        onClose={() => setActive(null)}
        labelledBy="cert-modal-title"
        className="max-w-2xl"
      >
        {active && (
          <div>
            {active.image && (
              <img src={active.image} alt={active.title} className="w-full rounded-t-2xl" />
            )}
            <div className="p-7">
              <h3 id="cert-modal-title" className="text-xl">
                {active.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {active.organization} &middot; {active.date}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {active.description}
              </p>
              {active.link && (
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={active.link} target="_blank" rel="noreferrer" className="btn-primary !py-2.5 !px-5 text-sm">
                    View Certificate <ExternalLink size={14} />
                  </a>
                  <a href={active.link} download className="btn-outline !py-2.5 !px-5 text-sm">
                    Download <Download size={14} />
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
