"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const monogram = section.querySelector("[data-hero='monogram']");
      const scrollCue = section.querySelector("[data-hero='scroll']");

      if (prefersReducedMotion) {
        gsap.set([monogram, scrollCue], { opacity: 1, y: 0 });
        return;
      }

      gsap.set([monogram, scrollCue], { opacity: 0, y: 24 });

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .to(monogram, { opacity: 1, y: 0, duration: 1.4 })
        .to(scrollCue, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4");

      gsap.to(monogram, {
        y: -6,
        duration: 3.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 flex h-[100dvh] flex-col items-center justify-center px-4 py-6 text-center sm:px-6"
    >
      <div
        data-hero="monogram"
        className="relative w-full max-w-[min(92vw,420px)] sm:max-w-[min(88vw,480px)]"
      >
        <div className="absolute -inset-4 rounded-3xl bg-[#D49627]/15 blur-3xl" />
        <div className="relative">
          <Image
            src="/invitation.png"
            alt="Wedding invitation for Mariane Joy Rillera and Dominic Chica — December 19, 2026 at Santol Tree Park, La Union"
            width={1080}
            height={1080}
            priority
            className="h-auto w-full object-contain"
            sizes="(max-width: 640px) 92vw, 480px"
          />
        </div>
      </div>

      <a
        data-hero="scroll"
        href="#rsvp"
        className="mt-8 inline-flex flex-col items-center gap-2 text-xs tracking-[0.35em] text-[#D49627]/90 uppercase transition hover:text-[#fdf6ee] sm:mt-10"
      >
        <span>RSVP</span>
        <span className="text-lg">↓</span>
      </a>
    </section>
  );
}
