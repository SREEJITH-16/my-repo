import { useState } from "react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, ExternalLink, Loader2 } from "lucide-react";
import { checkAuth, logout } from "@/lib/admin-auth";
import { getContent, saveContent, contentStoreStatus } from "@/lib/content-store";
import type { PortfolioContent } from "@/content/types";
import {
  ProfileEditor,
  AcademicEditor,
  SkillsEditor,
  ProjectsEditor,
  ExperienceEditor,
  CertificatesEditor,
  ActivitiesEditor,
} from "@/components/admin/SectionEditors";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Sreejith S" }] }),
  beforeLoad: async () => {
    const { authenticated } = await checkAuth();
    if (!authenticated) {
      throw redirect({ to: "/admin" });
    }
  },
  loader: async () => {
    const [content, store] = await Promise.all([getContent(), contentStoreStatus()]);
    return { content, storeConfigured: store.configured };
  },
  component: AdminDashboard,
});

const SECTIONS: { key: keyof PortfolioContent; label: string; hint: string }[] = [
  { key: "profile", label: "Profile", hint: "Name, bio, contact info, hero stats" },
  { key: "academic", label: "Academic", hint: "CGPA, semesters, schooling" },
  { key: "skills", label: "Skills", hint: "What I Do cards" },
  { key: "projects", label: "Projects", hint: "Featured project cards" },
  { key: "experience", label: "Experience", hint: "Work history timeline" },
  { key: "certificates", label: "Certificates", hint: "Certification gallery" },
  { key: "activities", label: "Activities", hint: "Extracurricular section" },
];

function AdminDashboard() {
  const { content, storeConfigured } = Route.useLoaderData();
  const navigate = useNavigate();
  const [active, setActive] = useState<keyof PortfolioContent>("profile");
  const [draft, setDraft] = useState<PortfolioContent>(content);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");

  const dirty = JSON.stringify(draft) !== JSON.stringify(content);

  const onSave = async () => {
    setStatus("saving");
    setMessage("");
    try {
      const res = await saveContent({ data: { content: draft } });
      if (res.ok) {
        setStatus("saved");
        setMessage(res.message ?? "Saved.");
      } else {
        setStatus("error");
        setMessage(res.error ?? "Save failed.");
      }
    } catch {
      setStatus("error");
      setMessage("Save failed. Please try again.");
    }
  };

  const onLogout = async () => {
    await logout();
    navigate({ to: "/admin" });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-xl">
        <div className="container-edit flex h-16 items-center justify-between">
          <p className="font-display text-lg">Content Admin</p>
          <div className="flex items-center gap-3">
            {dirty && <span className="chip !border-foreground !text-foreground">Unsaved changes</span>}
            <button
              type="button"
              onClick={onSave}
              disabled={!dirty || status === "saving"}
              className="btn-primary !py-2 !px-4 text-xs disabled:opacity-40"
            >
              {status === "saving" ? (
                <>
                  <Loader2 size={13} className="animate-spin" /> Publishing…
                </>
              ) : (
                "Publish Changes"
              )}
            </button>
            <a href="/" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-foreground">
              View site <ExternalLink size={12} className="inline" />
            </a>
            <button type="button" onClick={onLogout} className="btn-outline !py-2 !px-4 text-xs">
              Sign out
            </button>
          </div>
        </div>
      </header>

      {!storeConfigured && (
        <div className="border-b border-border bg-surface">
          <div className="container-edit py-3 text-sm text-muted-foreground">
            <strong className="text-foreground">Publishing isn&apos;t connected yet.</strong> You can edit
            everything below, but the Publish button needs <code>GITHUB_TOKEN</code> and{" "}
            <code>GITHUB_REPO</code> set as environment variables to actually save your changes. See the
            setup guide sent alongside this update.
          </div>
        </div>
      )}

      {status === "saved" && (
        <div className="border-b border-border bg-surface">
          <div className="container-edit flex items-center gap-2 py-3 text-sm">
            <CheckCircle2 size={15} /> {message}
          </div>
        </div>
      )}
      {status === "error" && (
        <div className="border-b border-border bg-surface">
          <div className="container-edit py-3 text-sm text-destructive">{message}</div>
        </div>
      )}

      <div className="container-edit grid gap-6 py-8 lg:grid-cols-[220px_1fr]">
        <nav className="flex gap-2 overflow-x-auto lg:sticky lg:top-24 lg:h-fit lg:flex-col lg:overflow-visible">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setActive(s.key)}
              className={`shrink-0 whitespace-nowrap rounded-lg px-4 py-2.5 text-left text-sm transition-colors lg:whitespace-normal ${
                active === s.key
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-surface"
              }`}
            >
              <span className="block">{s.label}</span>
              <span
                className={`block text-xs ${active === s.key ? "text-background/70" : "text-muted-foreground/70"}`}
              >
                {s.hint}
              </span>
            </button>
          ))}
        </nav>

        <div className="min-w-0">
          <h2 className="mb-4 text-lg">{SECTIONS.find((s) => s.key === active)?.label}</h2>

          {active === "profile" && (
            <ProfileEditor value={draft.profile} onChange={(v) => setDraft({ ...draft, profile: v })} />
          )}
          {active === "academic" && (
            <AcademicEditor value={draft.academic} onChange={(v) => setDraft({ ...draft, academic: v })} />
          )}
          {active === "skills" && (
            <SkillsEditor value={draft.skills} onChange={(v) => setDraft({ ...draft, skills: v })} />
          )}
          {active === "projects" && (
            <ProjectsEditor value={draft.projects} onChange={(v) => setDraft({ ...draft, projects: v })} />
          )}
          {active === "experience" && (
            <ExperienceEditor value={draft.experience} onChange={(v) => setDraft({ ...draft, experience: v })} />
          )}
          {active === "certificates" && (
            <CertificatesEditor
              value={draft.certificates}
              onChange={(v) => setDraft({ ...draft, certificates: v })}
            />
          )}
          {active === "activities" && (
            <ActivitiesEditor value={draft.activities} onChange={(v) => setDraft({ ...draft, activities: v })} />
          )}

          <div className="mt-8 flex items-center gap-3 border-t border-border pt-6">
            <button
              type="button"
              onClick={onSave}
              disabled={!dirty || status === "saving"}
              className="btn-primary disabled:opacity-40"
            >
              {status === "saving" ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Publishing…
                </>
              ) : (
                "Publish Changes"
              )}
            </button>
            <p className="text-xs text-muted-foreground">
              Publishing commits every section&apos;s current changes at once, not just this tab.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
