import { ArrowUp } from "lucide-react";
import { content } from "@/content";

const navLinks = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  const { profile } = content;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12">
      <div className="container-edit flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-xl">{profile.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{profile.headline}</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-underline transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#top"
          aria-label="Back to top"
          className="grid h-11 w-11 shrink-0 place-items-center self-start rounded-full border border-border text-foreground transition-transform hover:-translate-y-0.5 sm:self-auto"
        >
          <ArrowUp size={16} />
        </a>
      </div>
      <div className="container-edit mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {year} {profile.name}. All rights reserved.
        </p>
        <p>Built with TanStack Start.</p>
      </div>
    </footer>
  );
}
