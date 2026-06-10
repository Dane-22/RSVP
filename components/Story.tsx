"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const title = section.querySelector("[data-story='title']");
      const milestones = section.querySelectorAll("[data-story='milestone']");

      if (prefersReducedMotion) {
        gsap.set([title, ...milestones], { opacity: 1, y: 0 });
        return;
      }

      gsap.set([title, ...milestones], { opacity: 0, y: 24 });

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .to(title, { opacity: 1, y: 0, duration: 1 })
        .to(milestones, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 }, "-=0.4");
    }, section);

    return () => ctx.revert();
  }, []);

  const milestones = [
    {
      year: "September 2016",
      title: "",
      description: "Our paths crossed during a leadership training and seminar though VKLV",
    },
    {
      year: "November 2016",
      title: "",
      description: "What started as friendship became something more",
    },
    {
      year: "January 13, 2027",
      title: "",
      description: "We officially became a couple",
    },
    {
      year: "The Years Between",
      title: "",
      description: "From veterinary student to licensed veterinarians, we grew together through life's milestones, challenges, and blessing.",
    },
    {
      year: "She said Yes",
      title: "",
      description: "The beginning of our next chapter",
    },
    {
      year: "December 19, 2026",
      title: "",
      description: "Our forever begins",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative z-10 px-4 py-20 sm:px-6"
    >
      <div className="mx-auto max-w-4xl">
        <div className="glass-panel rounded-2xl p-8 sm:p-12">
          <h2
            data-story="title"
            className="font-serif mb-8 text-center text-3xl sm:text-4xl text-[#EFCC74]"
          >
            Our Love Story
          </h2>
          <div className="gold-divider mb-8" />
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                data-story="milestone"
                className="relative pl-8 sm:pl-12"
              >
                <div className="absolute left-0 top-0 flex h-full w-8 sm:w-12 flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-[#D49627] shadow-lg shadow-[#D49627]/50" />
                  {index !== milestones.length - 1 && (
                    <div className="mt-2 flex-1 w-0.5 bg-gradient-to-b from-[#D49627]/50 to-transparent" />
                  )}
                </div>
                <div className="space-y-2">
                  <span className="inline-block text-sm font-semibold uppercase tracking-wider text-[#FFFFFF]">
                    {milestone.year}
                  </span>
                  {milestone.title && (
                    <h3 className="font-serif text-xl text-[#FFFFFF]">
                      {milestone.title}
                    </h3>
                  )}
                  <p className="text-[#FFFFFF]">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
