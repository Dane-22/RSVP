"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { submitRSVP } from "@/app/actions/rsvp";
import type { AttendanceOption, RSVPFormData, RSVPSubmitState } from "@/types/rsvp";

const initialForm: RSVPFormData = {
  name: "",
  // email: "",
  contact: "",
  attendance: "yes",
  message: "",
};

export default function RSVPForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<RSVPFormData>(initialForm);
  const [status, setStatus] = useState<RSVPSubmitState>("idle");
  const [feedback, setFeedback] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-rsvp='reveal']", {
        opacity: 0,
        y: 36,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = statusRef.current;
    if (!el || status === "idle") return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 12, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power2.out" },
    );
  }, [status, feedback]);

  const updateField = <K extends keyof RSVPFormData>(
    key: K,
    value: RSVPFormData[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (status === "error") {
      setStatus("idle");
      setFeedback("");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("pending");
    setFeedback("");

    startTransition(async () => {
      const result = await submitRSVP(form);

      if (result.success) {
        setStatus("success");
        setFeedback(result.message);
        setForm(initialForm);
        return;
      }

      setStatus("error");
      setFeedback(result.message);
    });
  };

  const isSubmitting = isPending || status === "pending";

  return (
    <section
      ref={sectionRef}
      id="rsvp"
      className="relative z-10 px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-2xl">
        <div data-rsvp="reveal" className="mb-10 text-center">
          <h2 className="font-serif text-4xl font-light sm:text-5xl text-[#EFCC74] mb-4">
            RSVP
          </h2>
          <div className="gold-divider mx-auto mb- max-w-xs" />
          <p className="mt-4 text-sm leading-relaxed text-[#fdf6ee]/90 sm:text-base mb-2">
            We would be honored to celebrate with you!
          </p>
          <p className="text-sm leading-relaxed text-[#fdf6ee]/80 sm:text-base mb-1">
            Please respond on or before
          </p>
          <p className="font-serif font-bold text-lg sm:text-xl text-[#EFCC74] mb-4">
            OCTOBER 31, 2026
          </p>
          <p className="text-xs tracking-[0.3em] text-[#EFCC74] uppercase mb-6">
            WE HAVE RESERVED 1 SEAT IN YOUR HONOR
          </p>
          <div className="gold-divider mx-auto mb-4 max-w-xs" />
          <p className="text-sm leading-relaxed text-[#fdf6ee]/80 sm:text-base">
            Your presence would mean so much to us.
          </p>
        </div>

        <form
          data-rsvp="reveal"
          onSubmit={handleSubmit}
          className="glass-panel rounded-3xl p-6 sm:p-10"
        >
          <div className="space-y-6">
            <FormField label="Full Name" htmlFor="name">
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className={inputClass}
                placeholder="Your full name"
              />
            </FormField>

            {/* <FormField label="Email Address" htmlFor="email">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className={inputClass}
                placeholder="you@email.com"
              />
            </FormField> */}

            <FormField label="Contact Number" htmlFor="contact">
              <input
                id="contact"
                name="contact"
                type="tel"
                required
                inputMode="numeric"
                pattern="09[0-9]{9}"
                value={form.contact}
                onChange={(e) => updateField("contact", e.target.value)}
                className={inputClass}
                placeholder="09xxxxxxxxx"
              />
              <p className="mt-1 text-xs text-[#fdf6ee]/55">
                Philippine mobile format: 09xxxxxxxxx
              </p>
            </FormField>

            <FormField label="Will you be joining us?" htmlFor="attendance">
              <select
                id="attendance"
                name="attendance"
                value={form.attendance}
                onChange={(e) =>
                  updateField("attendance", e.target.value as AttendanceOption)
                }
                className={inputClass}
              >
                <option value="yes">Yes, I&apos;ll be there</option>
                <option value="no">No, I&apos;m sorry</option>
              </select>
            </FormField>

            <FormField label="Leave us a Message" htmlFor="message">
              <textarea
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                className={`${inputClass} resize-y min-h-28`}
                placeholder="Share your well wishes..."
              />
            </FormField>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 w-full rounded-full bg-[#D49627] bg-gradient-to-r from-[#D49627] via-[#e8b04a] to-[#D49627] px-8 py-4 text-sm font-medium tracking-[0.25em] text-[#610B0C] uppercase transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Sending..." : "Send RSVP"}
          </button>

          {status !== "idle" && (
            <div
              ref={statusRef}
              role="status"
              aria-live="polite"
              className={`mt-6 rounded-2xl px-5 py-4 text-sm leading-relaxed ${
                status === "success"
                  ? "border border-[#D49627]/40 bg-[#193804]/50 text-[#fdf6ee]"
                  : status === "error"
                    ? "border border-[#C15E63]/60 bg-[#610B0C]/45 text-[#ffe8e8]"
                    : "border border-[#D49627]/25 bg-[#610B0C]/30 text-[#fdf6ee]/85"
              }`}
            >
              {status === "pending"
                ? "Saving your response..."
                : feedback}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

const inputClass =
  "w-full rounded-xl border border-[#D49627]/25 bg-[#610B0C]/25 px-4 py-3 text-[#fdf6ee] placeholder:text-[#fdf6ee]/35 outline-none transition focus:border-[#D49627]/70 focus:ring-2 focus:ring-[#D49627]/20";

function FormField({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-2 block text-xs tracking-[0.25em] text-[#D49627]/90 uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}
