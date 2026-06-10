"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-contact='reveal']", {
        opacity: 0,
        y: 28,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-10 px-5 pb-28 sm:px-8"
    >
      <div className="mx-auto max-w-3xl text-center">
        <div data-contact="reveal">
          <p className="mb-3 text-xs tracking-[0.4em] text-[#D49627] uppercase">
            Reach Out
          </p>
          <h2 className="font-serif text-4xl font-light sm:text-5xl">
            Contact
          </h2>
        </div>

        <div
          data-contact="reveal"
          className="glass-panel mt-10 rounded-3xl px-6 py-10 sm:px-12"
        >
          <p className="text-sm leading-relaxed text-[#fdf6ee]/80 sm:text-base">
            For any questions about the celebration, please feel free to
            connect with us directly.
          </p>

          <div className="gold-divider mx-auto my-8 w-48" />

          <div className="space-y-4">
            <a
              href="mailto:mjrillera.hva@gmail.com"
              className="font-serif block text-xl text-[#D49627] transition hover:text-[#fdf6ee] sm:text-2xl"
            >
              mjrillera.hva@gmail.com
            </a>
            <a
              href="tel:+639177162227"
              className="block text-lg tracking-[0.15em] text-[#fdf6ee]/90 transition hover:text-[#D49627] sm:text-xl"
            >
              09177162227
            </a>
          </div>
        </div>

        <p
          data-contact="reveal"
          className="mt-12 text-xs tracking-[0.35em] text-[#fdf6ee]/50 uppercase"
        >
          With love, Mariane Joy & Dominic
        </p>
      </div>
    </section>
  );
}
