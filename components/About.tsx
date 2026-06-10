"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const title = section.querySelector("[data-about='title']");
      const content = section.querySelector("[data-about='content']");

      if (prefersReducedMotion) {
        gsap.set([title, content], { opacity: 1, y: 0 });
        return;
      }

      gsap.set([title, content], { opacity: 0, y: 24 });

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .to(title, { opacity: 1, y: 0, duration: 1 })
        .to(content, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4");
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-10 px-4 py-20 sm:px-6"
    >
      <div className="mx-auto max-w-4xl">
        <div className="glass-panel rounded-2xl p-8 sm:p-12">
          <h2
            data-about="title"
            className="font-serif mb-8 text-center text-3xl sm:text-4xl text-[#fdf6ee]"
          >
            About Us
          </h2>
          <div className="gold-divider mb-8" />
          <div
            data-about="content"
            className="space-y-6 text-center text-[#fdf6ee]/80"
          >
            <p className="text-lg leading-relaxed">
              Two hearts, one story, and a lifetime of adventures ahead. We are
              thrilled to celebrate our love with you.
            </p>
            <p className="leading-relaxed">
              Mariane Joy Rillera & Dominic Chica invite you to share in their
              joy as they begin this beautiful journey together.
            </p>
            <p className="leading-relaxed">
              Your presence at our wedding would mean the world to us as we
              exchange vows and create memories that will last forever.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
