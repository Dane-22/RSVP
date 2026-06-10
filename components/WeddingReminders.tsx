"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function WeddingReminders() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const title = section.querySelector("[data-reminders='title']");
      const cards = section.querySelectorAll("[data-reminders='card']");

      if (prefersReducedMotion) {
        gsap.set([title, ...cards], { opacity: 1, y: 0 });
        return;
      }

      gsap.set([title, ...cards], { opacity: 0, y: 24 });

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .to(title, { opacity: 1, y: 0, duration: 1 })
        .to(cards, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 }, "-=0.3");
    }, section);

    return () => ctx.revert();
  }, []);

  const reminders = [
    {
      title: "Children Policy",
      icon: "👶",
      content:
        "While we adore your little ones, we respectfully request an adults-only celebration. We hope this advance notice allows you to make arrangements and join us on our special day.",
    },
    {
      title: "Unplugged Ceremony",
      icon: "📵",
      content:
        "We kindly request that all guests refrain from using phones, cameras, and other devices during the ceremony. Our professional photographers will capture these precious moments, allowing everyone to be fully present with us.",
    },
    {
      title: "Gift Note",
      icon: "🎁",
      content:
        "Your love, laughter, and presence on our wedding day are the greatest gifts we could ask for. However, should you wish to honor us with a gift, a monetary contribution towards our future together would be sincerely appreciated.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="reminders"
      className="relative z-10 px-4 py-20 sm:px-6"
    >
      <div className="mx-auto max-w-4xl">
        <div className="glass-panel rounded-2xl p-8 sm:p-12">
          <h2
            data-reminders="title"
            className="font-serif mb-8 text-center text-3xl sm:text-4xl text-[#fdf6ee]"
          >
            Wedding Reminders
          </h2>
          <div className="gold-divider mb-8" />
          <div className="space-y-6">
            {reminders.map((reminder, index) => (
              <div
                key={index}
                data-reminders="card"
                className="rounded-xl bg-[#fdf6ee]/5 p-6 backdrop-blur-sm border border-[#D49627]/20"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{reminder.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-serif mb-2 text-xl text-[#D49627]">
                      {reminder.title}
                    </h3>
                    <p className="leading-relaxed text-[#fdf6ee]/80">
                      {reminder.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
