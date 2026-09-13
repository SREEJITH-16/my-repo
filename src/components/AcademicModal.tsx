import { useState, type ReactNode } from "react";
import { Modal } from "@/components/Modal";
import { content } from "@/content";

export function AcademicModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<"semesters" | "schooling">("semesters");
  const { academic } = content;

  return (
    <Modal open={open} onClose={onClose} labelledBy="academic-modal-title">
      <div className="p-7 sm:p-9">
        <h3 id="academic-modal-title" className="pr-10 text-2xl">
          Academic Performance
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {academic.degree} &middot; {academic.institution}, {academic.campus}
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <MiniStat value={academic.cgpa.toFixed(2)} label="CGPA (out of 10)" />
          <MiniStat value={String(academic.semestersCompleted)} label="Semesters" />
          <MiniStat value={academic.expectedGraduation} label="Expected Grad." />
        </div>

        <div className="mt-8 flex gap-1 rounded-full border border-border bg-surface p-1 text-sm">
          <TabButton active={tab === "semesters"} onClick={() => setTab("semesters")}>
            Semester Results
          </TabButton>
          <TabButton active={tab === "schooling"} onClick={() => setTab("schooling")}>
            Schooling
          </TabButton>
        </div>

        <div className="mt-6">
          {tab === "semesters" ? (
            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Semester</th>
                    <th className="px-4 py-3 font-medium">Period</th>
                    <th className="px-4 py-3 text-right font-medium">SGPA</th>
                  </tr>
                </thead>
                <tbody>
                  {academic.semesters.map((s, i) => (
                    <tr
                      key={s.semester}
                      className="border-t border-border transition-colors"
                      style={{
                        animation: open
                          ? `row-in 0.5s cubic-bezier(.22,1,.36,1) forwards`
                          : undefined,
                        animationDelay: `${i * 60}ms`,
                        opacity: 0,
                      }}
                    >
                      <td className="px-4 py-3">{s.semester}</td>
                      <td className="px-4 py-3 text-muted-foreground">{s.period}</td>
                      <td className="px-4 py-3 text-right font-medium">{s.sgpa.toFixed(3)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid gap-3">
              {academic.schooling.map((s, i) => (
                <div
                  key={s.level}
                  className="rounded-xl border border-border p-4"
                  style={{
                    animation: open ? `row-in 0.5s cubic-bezier(.22,1,.36,1) forwards` : undefined,
                    animationDelay: `${i * 70}ms`,
                    opacity: 0,
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">{s.level}</p>
                    <p className="font-display text-lg">{s.percentage}%</p>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{s.school}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {s.board} &middot; {s.year}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Registration numbers, signatures and other identifying document details are withheld from
          public display.
        </p>
      </div>
      <style>{`
        @keyframes row-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Modal>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-3 text-center">
      <p className="font-display text-xl">{value}</p>
      <p className="mt-0.5 text-[0.62rem] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        active ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
