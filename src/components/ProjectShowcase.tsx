import { useState } from "react";
import { ArrowUpRight, ChevronDown, ChevronUp, Github } from "lucide-react";
import { content, type Project } from "@/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

const INITIAL_COUNT = 6;

export function ProjectShowcase() {
  const [expanded, setExpanded] = useState(false);
  const projects = content.projects;
  const visible = expanded ? projects : projects.slice(0, INITIAL_COUNT);
  const hasMore = projects.length > INITIAL_COUNT;

  return (
    <section id="projects" className="border-t border-border py-20 sm:py-28">
      <div className="container-edit">
        <SectionHeader
          index="05"
          eyebrow="Featured Projects"
          title="Things I've Built"
          sub="Selected repositories from my GitHub — spanning full-stack apps, an IoT research project and internship work."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <Reveal key={p.id} variant="up" delay={(i % 3) * 90}>
              <ProjectCard project={p} />
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
                  View More Projects <ChevronDown size={16} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="card-surface card-hover group flex h-full flex-col overflow-hidden">
      <div className="relative flex h-32 items-end justify-between bg-surface p-5">
        <span className="font-display text-3xl text-muted-foreground/50 transition-transform duration-500 group-hover:-translate-y-1">
          {project.index}
        </span>
        <ArrowUpRight
          size={18}
          className="text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg">{project.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-4 text-xs">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="arrow-link text-foreground"
            >
              <Github size={13} /> GitHub
            </a>
          )}
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noreferrer"
              className="arrow-link text-foreground"
            >
              Live Demo <ArrowUpRight size={13} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
