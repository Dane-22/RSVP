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
            className="font-serif mb-8 text-center text-3xl sm:text-4xl text-[#EFCC74]"
          >
            About Us
          </h2>
          <div className="gold-divider mb-8" />
          <div
            data-about="content"
            className="space-y-6 text-center text-[#ffffff]/80"
          >
            <p className="leading-relaxed text-[#ffffff]">
             Welcome to our wedding website!
             </p>
             <p className="leading-relaxed text-[#ffffff]">
            We believe that every beautiful love story unfolds according to God&apos;s perfect plan. Through years of love, faith, and shared memories, He has guided us every step of the way.
            </p>
            <p className="leading-relaxed text-[#ffffff]">
              As we prepare to begin this new chapter together, we are grateful to celebrate with the people who have supported and loved us throughout our journey.
            </p>
            <p className="leading-relaxed text-[#ffffff]">
              Thank you for being part of our story.

              <br />
              <br />
              <span className="italic text-[#EFCC74]">With Love,</span>
              <br />
              <span className="text-[#EFCC74]">Mariane & Dominic</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
