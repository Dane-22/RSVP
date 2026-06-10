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
            <p className="leading-relaxed">
             Welcome to our wedding website!
            We believe that every beautiful lovve story unfolds according to God's perfect plan, 
            and ours is a testament to His faithfulness and grace.
            </p>
            <p className="leading-relaxed">
              What began as a chance encounter eventually became a journey filled with long drives,
              video calls, countless prayers, unwavering support, and dreams shared across the miles.
              Through every season, God has guided us, strengthened our relationship, and reminded us that true
              love is built on faith, trust, and commitment
            </p>
            <p className="leading-relaxed">
              Today, we are grateful to celebrate not only our love, but also the goodness of Godthat has brought us to this moment. 
              Thank you for being part of our lives and for joining us as we begin this new chapter together

              <br />
              <br />
              With love,
              <br />
              Mariane & Dominic
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
