"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Program() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const title = section.querySelector("[data-program='title']");
      const items = section.querySelectorAll("[data-program='item']");

      if (prefersReducedMotion) {
        gsap.set([title, ...items], { opacity: 1, y: 0 });
        return;
      }

      gsap.set([title, ...items], { opacity: 0, y: 24 });

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .to(title, { opacity: 1, y: 0, duration: 1 })
        .to(items, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, "-=0.4");
    }, section);

    return () => ctx.revert();
  }, []);

  const programItems = [
    { time: "3:00 PM", event: "Guest Arrival" },
    { time: "4:00 PM", event: "Ceremony Begins" },
    { time: "4:30 PM", event: "Exchange of Vows" },
    { time: "5:00 PM", event: "Cocktail Hour" },
    { time: "6:00 PM", event: "Reception Dinner" },
    { time: "7:00 PM", event: "Toast & Speeches" },
    { time: "8:00 PM", event: "First Dance" },
    { time: "9:00 PM", event: "Party Time" },
  ];

  return (
    <section
      ref={sectionRef}
      id="program"
      className="relative z-10 px-4 py-20 sm:px-6"
    >
      <div className="mx-auto max-w-4xl">
        <div className="glass-panel rounded-2xl p-8 sm:p-12">
          <h2
            data-program="title"
            className="font-serif mb-8 text-center text-3xl sm:text-4xl text-[#fdf6ee]"
          >
            Wedding Program
          </h2>
          <div className="gold-divider mb-8" />
          <div className="space-y-4">
            {programItems.map((item, index) => (
              <div
                key={index}
                data-program="item"
                className="flex items-center gap-4 rounded-lg bg-[#fdf6ee]/5 p-4 transition-colors hover:bg-[#fdf6ee]/10"
              >
                <div className="flex-shrink-0">
                  <span className="inline-block rounded-lg bg-[#D49627]/20 px-3 py-1.5 text-sm font-semibold text-[#D49627]">
                    {item.time}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-[#fdf6ee]">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
