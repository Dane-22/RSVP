"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Venue() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const title = section.querySelector("[data-venue='title']");
      const details = section.querySelector("[data-venue='details']");

      if (prefersReducedMotion) {
        gsap.set([title, details], { opacity: 1, y: 0 });
        return;
      }

      gsap.set([title, details], { opacity: 0, y: 24 });

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .to(title, { opacity: 1, y: 0, duration: 1 })
        .to(details, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4");
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="venue"
      className="relative z-10 px-4 py-20 sm:px-6"
    >
      <div className="mx-auto max-w-4xl">
        <div className="glass-panel rounded-2xl p-8 sm:p-12">
          <h2
            data-venue="title"
            className="font-serif mb-8 text-center text-3xl sm:text-4xl text-[#fdf6ee]"
          >
            Venue
          </h2>
          <div className="gold-divider mb-8" />
          <div
            data-venue="details"
            className="space-y-6 text-center text-[#fdf6ee]/80"
          >
            <div className="space-y-2">
              <h3 className="font-serif text-2xl text-[#D49627]">
                Santol Tree Park
              </h3>
              <p className="text-lg">Santol, La Union, Philippines, 2516</p>
            </div>
            <div className="gold-divider my-6" />
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-wider text-[#D49627]">
                  Date
                </p>
                <p className="text-lg font-semibold">December 19, 2026</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-wider text-[#D49627]">
                  Time
                </p>
                <p className="text-lg font-semibold">3:30 PM</p>
              </div>
            </div>
            <p className="pt-4 leading-relaxed">
              Join us at the beautiful Santol Tree Park in La Union for our
              special celebration. Surrounded by nature&apos;s beauty, we&apos;ll exchange
              vows and begin our new chapter together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
