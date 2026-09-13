import type {
  Activity,
  Academic,
  Certificate,
  Experience,
  Profile,
  Project,
  Skill,
} from "@/content/types";
import { AddButton, Field, ItemCard, NumberInput, TagEditor, TextArea, TextInput, Toggle } from "./FormControls";

function genId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

/* ---------------------------- Profile ---------------------------- */

export function ProfileEditor({ value, onChange }: { value: Profile; onChange: (v: Profile) => void }) {
  const set = <K extends keyof Profile>(key: K, v: Profile[K]) => onChange({ ...value, [key]: v });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name">
          <TextInput value={value.name} onChange={(v) => set("name", v)} />
        </Field>
        <Field label="Headline">
          <TextInput value={value.headline} onChange={(v) => set("headline", v)} />
        </Field>
        <Field label="Hero tagline">
          <TextInput value={value.tagline} onChange={(v) => set("tagline", v)} />
        </Field>
        <Field label="Location">
          <TextInput value={value.location} onChange={(v) => set("location", v)} />
        </Field>
        <Field label="Personal email">
          <TextInput value={value.email} onChange={(v) => set("email", v)} />
        </Field>
        <Field label="College email">
          <TextInput value={value.collegeEmail} onChange={(v) => set("collegeEmail", v)} />
        </Field>
        <Field label="Phone">
          <TextInput value={value.phone} onChange={(v) => set("phone", v)} />
        </Field>
        <Field label="Goal / mission line">
          <TextInput value={value.goal} onChange={(v) => set("goal", v)} />
        </Field>
        <Field label="GitHub URL">
          <TextInput value={value.github} onChange={(v) => set("github", v)} />
        </Field>
        <Field label="LinkedIn URL">
          <TextInput value={value.linkedin} onChange={(v) => set("linkedin", v)} />
        </Field>
        <Field label="Resume URL" hint="Leave blank to hide the download-resume link behind Contact.">
          <TextInput value={value.resumeUrl} onChange={(v) => set("resumeUrl", v)} />
        </Field>
        <Field label="Hero portrait path" hint="File must exist in /public, e.g. /images/sreejith-portrait.jpg">
          <TextInput value={value.portraitUrl} onChange={(v) => set("portraitUrl", v)} />
        </Field>
      </div>

      <Field label="Bio paragraphs" hint="Each paragraph shown separately in About.">
        <div className="space-y-2">
          {value.bio.map((p, i) => (
            <div key={i} className="flex gap-2">
              <TextArea
                value={p}
                rows={2}
                onChange={(v) => {
                  const next = [...value.bio];
                  next[i] = v;
                  set("bio", next);
                }}
              />
              <button
                type="button"
                onClick={() => set("bio", value.bio.filter((_, idx) => idx !== i))}
                className="btn-outline !px-3 text-xs"
              >
                Remove
              </button>
            </div>
          ))}
          <AddButton label="Add paragraph" onClick={() => set("bio", [...value.bio, ""])} />
        </div>
      </Field>

      <Field label="Interests">
        <TagEditor values={value.interests} onChange={(v) => set("interests", v)} />
      </Field>

      <div className="rounded-xl border border-border bg-surface p-4">
        <p className="mb-3 text-sm font-medium">Education</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Degree">
            <TextInput
              value={value.education.degree}
              onChange={(v) => set("education", { ...value.education, degree: v })}
            />
          </Field>
          <Field label="Institution">
            <TextInput
              value={value.education.institution}
              onChange={(v) => set("education", { ...value.education, institution: v })}
            />
          </Field>
          <Field label="Campus">
            <TextInput
              value={value.education.campus}
              onChange={(v) => set("education", { ...value.education, campus: v })}
            />
          </Field>
          <Field label="Duration">
            <TextInput
              value={value.education.duration}
              onChange={(v) => set("education", { ...value.education, duration: v })}
            />
          </Field>
          <Field label="Expected graduation">
            <TextInput
              value={value.education.expectedGraduation}
              onChange={(v) => set("education", { ...value.education, expectedGraduation: v })}
            />
          </Field>
        </div>
      </div>

      <Field label="Hero stat cards">
        <div className="space-y-2">
          {value.stats.map((s, i) => (
            <div key={i} className="flex gap-2">
              <TextInput
                value={s.value}
                placeholder="Value, e.g. 6+"
                onChange={(v) => {
                  const next = value.stats.map((item, idx) => (idx === i ? { ...item, value: v } : item));
                  set("stats", next);
                }}
              />
              <TextInput
                value={s.label}
                placeholder="Label, e.g. Projects"
                onChange={(v) => {
                  const next = value.stats.map((item, idx) => (idx === i ? { ...item, label: v } : item));
                  set("stats", next);
                }}
              />
              <button
                type="button"
                onClick={() => set("stats", value.stats.filter((_, idx) => idx !== i))}
                className="btn-outline !px-3 text-xs"
              >
                Remove
              </button>
            </div>
          ))}
          <AddButton
            label="Add stat"
            onClick={() => set("stats", [...value.stats, { label: "", value: "" }])}
          />
        </div>
      </Field>
    </div>
  );
}

/* ---------------------------- Academic ---------------------------- */

export function AcademicEditor({ value, onChange }: { value: Academic; onChange: (v: Academic) => void }) {
  const set = <K extends keyof Academic>(key: K, v: Academic[K]) => onChange({ ...value, [key]: v });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="CGPA">
          <NumberInput value={value.cgpa} step={0.01} onChange={(v) => set("cgpa", v)} />
        </Field>
        <Field label="Semesters completed">
          <NumberInput value={value.semestersCompleted} onChange={(v) => set("semestersCompleted", v)} />
        </Field>
        <Field label="Expected graduation">
          <TextInput value={value.expectedGraduation} onChange={(v) => set("expectedGraduation", v)} />
        </Field>
        <Field label="Degree">
          <TextInput value={value.degree} onChange={(v) => set("degree", v)} />
        </Field>
        <Field label="Institution">
          <TextInput value={value.institution} onChange={(v) => set("institution", v)} />
        </Field>
        <Field label="Campus">
          <TextInput value={value.campus} onChange={(v) => set("campus", v)} />
        </Field>
        <Field label="Duration">
          <TextInput value={value.duration} onChange={(v) => set("duration", v)} />
        </Field>
      </div>

      <Field label="Semester results">
        <div className="space-y-2">
          {value.semesters.map((s, i) => (
            <div key={i} className="flex gap-2">
              <TextInput
                value={s.semester}
                placeholder="Semester 1"
                onChange={(v) => {
                  const next = value.semesters.map((item, idx) => (idx === i ? { ...item, semester: v } : item));
                  set("semesters", next);
                }}
              />
              <TextInput
                value={s.period}
                placeholder="Dec 2024"
                onChange={(v) => {
                  const next = value.semesters.map((item, idx) => (idx === i ? { ...item, period: v } : item));
                  set("semesters", next);
                }}
              />
              <NumberInput
                value={s.sgpa}
                step={0.001}
                onChange={(v) => {
                  const next = value.semesters.map((item, idx) => (idx === i ? { ...item, sgpa: v } : item));
                  set("semesters", next);
                }}
              />
              <button
                type="button"
                onClick={() => set("semesters", value.semesters.filter((_, idx) => idx !== i))}
                className="btn-outline !px-3 text-xs"
              >
                Remove
              </button>
            </div>
          ))}
          <AddButton
            label="Add semester"
            onClick={() =>
              set("semesters", [...value.semesters, { semester: "", period: "", sgpa: 0 }])
            }
          />
        </div>
      </Field>

      <Field label="Schooling (10th / 11th / 12th)">
        <div className="space-y-3">
          {value.schooling.map((s, i) => (
            <ItemCard
              key={i}
              title={s.level}
              onRemove={() => set("schooling", value.schooling.filter((_, idx) => idx !== i))}
            >
              <Field label="Level">
                <TextInput
                  value={s.level}
                  onChange={(v) => {
                    const next = value.schooling.map((item, idx) => (idx === i ? { ...item, level: v } : item));
                    set("schooling", next);
                  }}
                />
              </Field>
              <Field label="Percentage">
                <NumberInput
                  value={s.percentage}
                  step={0.1}
                  onChange={(v) => {
                    const next = value.schooling.map((item, idx) => (idx === i ? { ...item, percentage: v } : item));
                    set("schooling", next);
                  }}
                />
              </Field>
              <Field label="School">
                <TextInput
                  value={s.school}
                  onChange={(v) => {
                    const next = value.schooling.map((item, idx) => (idx === i ? { ...item, school: v } : item));
                    set("schooling", next);
                  }}
                />
              </Field>
              <Field label="Board">
                <TextInput
                  value={s.board}
                  onChange={(v) => {
                    const next = value.schooling.map((item, idx) => (idx === i ? { ...item, board: v } : item));
                    set("schooling", next);
                  }}
                />
              </Field>
              <Field label="Year">
                <TextInput
                  value={s.year}
                  onChange={(v) => {
                    const next = value.schooling.map((item, idx) => (idx === i ? { ...item, year: v } : item));
                    set("schooling", next);
                  }}
                />
              </Field>
            </ItemCard>
          ))}
          <AddButton
            label="Add school record"
            onClick={() =>
              set("schooling", [
                ...value.schooling,
                { level: "", board: "", school: "", year: "", percentage: 0 },
              ])
            }
          />
        </div>
      </Field>
    </div>
  );
}

/* ---------------------------- Skills ---------------------------- */

export function SkillsEditor({ value, onChange }: { value: Skill[]; onChange: (v: Skill[]) => void }) {
  const update = (i: number, patch: Partial<Skill>) => {
    const next = value.map((item, idx) => (idx === i ? { ...item, ...patch } : item));
    onChange(next);
  };
  return (
    <div className="space-y-3">
      {value.map((s, i) => (
        <ItemCard key={s.id} title={s.title} onRemove={() => onChange(value.filter((_, idx) => idx !== i))}>
          <Field label="Index (e.g. 01)">
            <TextInput value={s.index} onChange={(v) => update(i, { index: v })} />
          </Field>
          <Field label="Title">
            <TextInput value={s.title} onChange={(v) => update(i, { title: v })} />
          </Field>
          <Field label="Description" hint="">
            <TextArea value={s.description} onChange={(v) => update(i, { description: v })} />
          </Field>
          <Field label="Tags">
            <TagEditor values={s.tags} onChange={(v) => update(i, { tags: v })} />
          </Field>
        </ItemCard>
      ))}
      <AddButton
        label="Add skill card"
        onClick={() =>
          onChange([
            ...value,
            { id: genId("skill"), index: String(value.length + 1).padStart(2, "0"), title: "", description: "", tags: [] },
          ])
        }
      />
    </div>
  );
}

/* ---------------------------- Projects ---------------------------- */

export function ProjectsEditor({ value, onChange }: { value: Project[]; onChange: (v: Project[]) => void }) {
  const update = (i: number, patch: Partial<Project>) => {
    const next = value.map((item, idx) => (idx === i ? { ...item, ...patch } : item));
    onChange(next);
  };
  return (
    <div className="space-y-3">
      {value.map((p, i) => (
        <ItemCard key={p.id} title={p.name} onRemove={() => onChange(value.filter((_, idx) => idx !== i))}>
          <Field label="Index (e.g. 01)">
            <TextInput value={p.index} onChange={(v) => update(i, { index: v })} />
          </Field>
          <Field label="Name">
            <TextInput value={p.name} onChange={(v) => update(i, { name: v })} />
          </Field>
          <Field label="Description" hint="Keep it factual — only what the repo/README actually supports.">
            <TextArea value={p.description} onChange={(v) => update(i, { description: v })} />
          </Field>
          <Field label="Tech stack">
            <TagEditor values={p.tech} onChange={(v) => update(i, { tech: v })} />
          </Field>
          <Field label="GitHub URL">
            <TextInput value={p.github ?? ""} onChange={(v) => update(i, { github: v || undefined })} />
          </Field>
          <Field label="Live demo URL" hint="Leave blank if none exists — never fake one.">
            <TextInput value={p.liveDemo ?? ""} onChange={(v) => update(i, { liveDemo: v || undefined })} />
          </Field>
          <Toggle label="Featured (shown in first 6)" checked={p.featured} onChange={(v) => update(i, { featured: v })} />
          <Toggle
            label="Needs content (flag incomplete info)"
            checked={Boolean(p.needsContent)}
            onChange={(v) => update(i, { needsContent: v })}
          />
        </ItemCard>
      ))}
      <AddButton
        label="Add project"
        onClick={() =>
          onChange([
            ...value,
            {
              id: genId("proj"),
              index: String(value.length + 1).padStart(2, "0"),
              name: "",
              description: "",
              tech: [],
              featured: true,
            },
          ])
        }
      />
    </div>
  );
}

/* ---------------------------- Experience ---------------------------- */

export function ExperienceEditor({ value, onChange }: { value: Experience[]; onChange: (v: Experience[]) => void }) {
  const update = (i: number, patch: Partial<Experience>) => {
    const next = value.map((item, idx) => (idx === i ? { ...item, ...patch } : item));
    onChange(next);
  };
  return (
    <div className="space-y-3">
      {value.map((e, i) => (
        <ItemCard key={e.id} title={`${e.role} — ${e.company}`} onRemove={() => onChange(value.filter((_, idx) => idx !== i))}>
          <Field label="Company">
            <TextInput value={e.company} onChange={(v) => update(i, { company: v })} />
          </Field>
          <Field label="Role">
            <TextInput value={e.role} onChange={(v) => update(i, { role: v })} />
          </Field>
          <Field label="Duration">
            <TextInput value={e.duration} onChange={(v) => update(i, { duration: v })} />
          </Field>
          <Field label="Location">
            <TextInput value={e.location} onChange={(v) => update(i, { location: v })} />
          </Field>
          <Field label="Description" hint="Only responsibilities actually confirmed — don't invent achievements.">
            <TextArea value={e.description} onChange={(v) => update(i, { description: v })} />
          </Field>
          <Field label="Tags">
            <TagEditor values={e.tags} onChange={(v) => update(i, { tags: v })} />
          </Field>
          <Toggle label="Current role" checked={e.current} onChange={(v) => update(i, { current: v })} />
        </ItemCard>
      ))}
      <AddButton
        label="Add experience"
        onClick={() =>
          onChange([
            ...value,
            { id: genId("exp"), company: "", role: "", duration: "", current: false, location: "", description: "", tags: [] },
          ])
        }
      />
    </div>
  );
}

/* ---------------------------- Certificates ---------------------------- */

export function CertificatesEditor({ value, onChange }: { value: Certificate[]; onChange: (v: Certificate[]) => void }) {
  const update = (i: number, patch: Partial<Certificate>) => {
    const next = value.map((item, idx) => (idx === i ? { ...item, ...patch } : item));
    onChange(next);
  };
  return (
    <div className="space-y-3">
      {value.map((c, i) => (
        <ItemCard key={c.id} title={c.title} onRemove={() => onChange(value.filter((_, idx) => idx !== i))}>
          <Field label="Title">
            <TextInput value={c.title} onChange={(v) => update(i, { title: v })} />
          </Field>
          <Field label="Organization">
            <TextInput value={c.organization} onChange={(v) => update(i, { organization: v })} />
          </Field>
          <Field label="Date">
            <TextInput value={c.date} onChange={(v) => update(i, { date: v })} />
          </Field>
          <Field label="Description">
            <TextArea value={c.description} onChange={(v) => update(i, { description: v })} />
          </Field>
          <Field label="Preview image path" hint="e.g. /certificates/my-cert.jpg — upload the file to that path in /public.">
            <TextInput value={c.image ?? ""} onChange={(v) => update(i, { image: v || undefined })} />
          </Field>
          <Field label="Document (PDF) path" hint="e.g. /certificates/pdfs/my-cert.pdf">
            <TextInput value={c.link ?? ""} onChange={(v) => update(i, { link: v || undefined })} />
          </Field>
        </ItemCard>
      ))}
      <AddButton
        label="Add certificate"
        onClick={() =>
          onChange([
            ...value,
            { id: genId("cert"), title: "", organization: "", date: "", description: "" },
          ])
        }
      />
    </div>
  );
}

/* ---------------------------- Activities ---------------------------- */

export function ActivitiesEditor({ value, onChange }: { value: Activity[]; onChange: (v: Activity[]) => void }) {
  const update = (i: number, patch: Partial<Activity>) => {
    const next = value.map((item, idx) => (idx === i ? { ...item, ...patch } : item));
    onChange(next);
  };
  return (
    <div className="space-y-3">
      {value.map((a, i) => (
        <ItemCard key={a.id} title={a.title} onRemove={() => onChange(value.filter((_, idx) => idx !== i))}>
          <Field label="Title">
            <TextInput value={a.title} onChange={(v) => update(i, { title: v })} />
          </Field>
          <Field label="Organization">
            <TextInput value={a.organization} onChange={(v) => update(i, { organization: v })} />
          </Field>
          <Field label="Role">
            <TextInput value={a.role} onChange={(v) => update(i, { role: v })} />
          </Field>
          <Field label="Date">
            <TextInput value={a.date} onChange={(v) => update(i, { date: v })} />
          </Field>
          <Field label="Description">
            <TextArea value={a.description} onChange={(v) => update(i, { description: v })} />
          </Field>
          <Field label="Certificate path" hint="e.g. /certificates/activities/my-cert.pdf — leave blank if none.">
            <TextInput value={a.link ?? ""} onChange={(v) => update(i, { link: v || undefined })} />
          </Field>
        </ItemCard>
      ))}
      <AddButton
        label="Add activity"
        onClick={() =>
          onChange([...value, { id: genId("act"), title: "", organization: "", role: "", date: "", description: "" }])
        }
      />
    </div>
  );
}
