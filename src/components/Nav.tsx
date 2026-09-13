import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#top", label: "Home", id: "top" },
  { href: "#about", label: "About", id: "about" },
  { href: "#academics", label: "Education", id: "academics" },
  { href: "#skills", label: "What I Do", id: "skills" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#certificates", label: "Certificates", id: "certificates" },
  { href: "#activities", label: "Activities", id: "activities" },
  { href: "#contact", label: "Contact", id: "contact" },
];

const navLinks = links.slice(1, -1);

export function Nav() {
  const [scrollY, setScrollY] = useState(0);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");
  const [glass, setGlass] = useState<{ left: number; width: number; visible: boolean }>({
    left: 0,
    width: 0,
    visible: false,
  });
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollProgress = Math.min(scrollY / 120, 1);
  const scrolled = scrollProgress > 0.1;

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Measure the active nav item and move the liquid-glass pill to sit under it.
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const el = itemRefs.current[active];
      if (!track || !el) {
        setGlass((g) => ({ ...g, visible: false }));
        return;
      }
      const trackRect = track.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setGlass({ left: elRect.left - trackRect.left, width: elRect.width, visible: true });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-border" : "bg-transparent"
      }`}
      style={{
        backgroundColor: scrolled
          ? `color-mix(in oklab, var(--background) ${70 + scrollProgress * 15}%, transparent)`
          : undefined,
        backdropFilter: `blur(${scrollProgress * 20}px) saturate(1.4)`,
        WebkitBackdropFilter: `blur(${scrollProgress * 20}px) saturate(1.4)`,
      }}
    >
      <nav className="container-edit flex h-16 items-center justify-between sm:h-20">
        <a href="#top" className="font-display text-lg tracking-tight">
          SREEJITH S
        </a>

        <div ref={trackRef} className="relative hidden items-center gap-1 lg:flex">
          {/* Liquid glass indicator — physically slides + resizes to the active item */}
          <span
            aria-hidden="true"
            className="liquid-glass pointer-events-none absolute top-1/2 h-9 -translate-y-1/2 rounded-full"
            style={{
              left: glass.left,
              width: glass.width,
              opacity: glass.visible ? 1 : 0,
            }}
          />
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              ref={(el) => {
                itemRefs.current[l.id] = el;
              }}
              className={`relative z-10 rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                active === l.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="#contact" className="btn-primary">
            Let&apos;s Talk
            <span aria-hidden="true">↗</span>
          </a>
        </div>
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground lg:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
      <div
        className="overflow-hidden border-t border-border bg-background/97 backdrop-blur-xl lg:hidden"
        style={{
          maxHeight: open ? "26rem" : "0px",
          transition: "max-height 0.4s cubic-bezier(.22,1,.36,1)",
        }}
      >
        <div className="container-edit flex flex-col py-2">
          {links.slice(1).map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-3.5 text-sm text-muted-foreground transition-colors last:border-none hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .liquid-glass {
          background: linear-gradient(
            180deg,
            color-mix(in oklab, var(--foreground) 7%, transparent) 0%,
            color-mix(in oklab, var(--foreground) 3%, transparent) 100%
          );
          border: 1px solid color-mix(in oklab, var(--foreground) 12%, transparent);
          backdrop-filter: blur(10px) saturate(1.4);
          -webkit-backdrop-filter: blur(10px) saturate(1.4);
          box-shadow:
            inset 0 1px 0 color-mix(in oklab, var(--background) 70%, transparent),
            inset 0 -1px 6px color-mix(in oklab, var(--foreground) 4%, transparent),
            0 6px 16px -8px color-mix(in oklab, var(--foreground) 18%, transparent);
          transition:
            left 0.5s cubic-bezier(0.22, 1, 0.36, 1),
            width 0.5s cubic-bezier(0.22, 1, 0.36, 1),
            opacity 0.3s ease;
        }
        @media (prefers-reduced-motion: reduce) {
          .liquid-glass { transition: opacity 0.2s ease; }
        }
      `}</style>
    </header>
  );
}
