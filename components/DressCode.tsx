"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function DressCode() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const title = section.querySelector("[data-dresscode='title']");
      const colors = section.querySelectorAll("[data-dresscode='color']");

      if (prefersReducedMotion) {
        gsap.set([title, ...colors], { opacity: 1, y: 0 });
        return;
      }

      gsap.set([title, ...colors], { opacity: 0, y: 24 });

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .to(title, { opacity: 1, y: 0, duration: 1 })
        .to(colors, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, "-=0.3");
    }, section);

    return () => ctx.revert();
  }, []);

  const colors = [
    { hex: "#C15E63", name: "Burgundy Light" },
    { hex: "#610B0C", name: "Burgundy Deep" },
    { hex: "#D49627", name: "Sunflower" },
    { hex: "#193804", name: "Forest" },
    { hex: "#636B2F", name: "Olive" },
    { hex: "#87AE73", name: "Sage" },
  ];

  return (
    <section
      ref={sectionRef}
      id="dresscode"
      className="relative z-10 px-4 py-20 sm:px-6"
    >
      <div className="mx-auto max-w-4xl">
        <div className="glass-panel rounded-2xl p-8 sm:p-12">
          <h2
            data-dresscode="title"
            className="font-serif mb-8 text-center text-3xl sm:text-4xl text-[#fdf6ee]"
          >
            Dress Code
          </h2>
          <div className="gold-divider mb-8" />
          <p className="mb-8 text-center text-[#fdf6ee]/80">
            We invite our guests to wear colors from our wedding palette
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {colors.map((color) => (
              <div
                key={color.hex}
                data-dresscode="color"
                className="group flex flex-col items-center"
              >
                <div
                  className="mb-3 h-24 w-full rounded-xl shadow-lg transition-transform group-hover:scale-105"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-xs uppercase tracking-wider text-[#fdf6ee]/70">
                  {color.name}
                </span>
                <span className="text-xs font-mono text-[#fdf6ee]/50">
                  {color.hex}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
