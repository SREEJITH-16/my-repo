import { useState, type FormEvent } from "react";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { content } from "@/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

const EMAILJS_SERVICE_ID = import.meta.env["VITE_EMAILJS_SERVICE_ID"] || "service_hb4k0ra";
const EMAILJS_TEMPLATE_ID = import.meta.env["VITE_EMAILJS_TEMPLATE_ID"] || "template_i8ksjnf";
const EMAILJS_PUBLIC_KEY = import.meta.env["VITE_EMAILJS_PUBLIC_KEY"] || "s8olnuPcVqQ_HacfZ";

export function Contact() {
  const { profile } = content;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const contactLinks = [
    { icon: Mail, label: profile.email, sub: "Personal email", href: `mailto:${profile.email}` },
    {
      icon: Mail,
      label: profile.collegeEmail,
      sub: "College email",
      href: `mailto:${profile.collegeEmail}`,
    },
    {
      icon: Phone,
      label: profile.phone,
      sub: "Phone",
      href: `tel:${profile.phone.replace(/\s/g, "")}`,
    },
    { icon: MapPin, label: profile.location, sub: "Location", href: undefined },
    { icon: Github, label: "GitHub", sub: "SREEJITH-16", href: profile.github },
    { icon: Linkedin, label: "LinkedIn", sub: "sreejiths16", href: profile.linkedin },
  ];

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || name.length > 100) return setError("Please enter a valid name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255)
      return setError("Please enter a valid email address.");
    if (!message || message.length > 1000)
      return setError("Message must be between 1 and 1000 characters.");

    setError("");
    setStatus("sending");
    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { name, email, message, from_name: name, from_email: email, reply_to: email },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError("Could not send your message. Please email me directly.");
    }
  };

  const field =
    "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground";

  return (
    <section id="contact" className="border-t border-border py-20 sm:py-28">
      <div className="container-edit">
        <SectionHeader
          index="09"
          eyebrow="Contact"
          title="Let's Connect"
          sub="I'm always open to discussing new opportunities, interesting projects or just a friendly chat."
        />

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal variant="left">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {contactLinks.map((c) => {
                const Comp = c.href ? "a" : "div";
                return (
                  <Comp
                    key={c.sub}
                    {...(c.href
                      ? {
                          href: c.href,
                          target: c.href.startsWith("http") ? "_blank" : undefined,
                          rel: "noreferrer",
                        }
                      : {})}
                    className="card-surface card-hover flex items-center gap-4 p-4"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border">
                      <c.icon size={15} strokeWidth={1.6} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                        {c.sub}
                      </span>
                      <span className="block truncate text-sm">{c.label}</span>
                    </span>
                    {c.href && (
                      <ArrowUpRight size={14} className="ml-auto shrink-0 text-muted-foreground" />
                    )}
                  </Comp>
                );
              })}
            </div>
          </Reveal>

          <Reveal variant="right" delay={100}>
            <form onSubmit={onSubmit} noValidate className="card-surface space-y-4 p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input id="name" name="name" required placeholder="Name" className={field} />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                    className={field}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Message"
                  className={`${field} resize-none`}
                />
              </div>
              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}
              {status === "sent" && (
                <p role="status" className="text-sm">
                  Thanks — your message was sent.
                </p>
              )}
              <button type="submit" disabled={status === "sending"} className="btn-primary w-full">
                {status === "sending" ? "Sending…" : "Send Message"}
                {status !== "sending" && <ArrowUpRight size={15} />}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
