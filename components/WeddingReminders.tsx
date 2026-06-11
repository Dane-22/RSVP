"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
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
      title: "Adults only Celebration",
      content:
        "We respectfully request an adults-only celebration.",
      image: "/adults_only.png",
    },
    {
      title: "Unplugged Ceremony",
      content:
        "We kindly request that all guests refrain from using phones, cameras, and other devices during the ceremony. Please be present with us in this special moment.",
      image: "/unplugged.png",
    },
    {
      title: "Gift Note",
      content:
        "Your presence is the greatest gift. Should you wish to bless us further, a monetary gift would be sincerely appreciated.",
      image: "/gift_note.png",
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
            className="font-serif mb-8 text-center text-3xl sm:text-4xl text-[#EFCC74]"
          >
            Wedding Reminders
          </h2>
          <div className="gold-divider mb-8" />
          <div className="space-y-6">
            {reminders.map((reminder, index) => (
              <div
                key={index}
                data-reminders="card"
                className="rounded-xl bg-[#ffffff]/5 p-6 backdrop-blur-sm border border-[#D49627]/20"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-14 w-14 rounded-full border-2 border-[#D49627] bg-[#610B0C]/30 flex items-center justify-center overflow-hidden">
                      <Image
                        src={reminder.image}
                        alt={reminder.title}
                        className="h-full w-full object-cover"
                        width={56}
                        height={56}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif font-semibold mb-2 text-xl text-[#D49627]">
                      {reminder.title}
                    </h3>
                    <p className="leading-relaxed text-[#ffffff]/80">
                      {reminder.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center italic text-[#ffffff]/80">
            Thank you for being part of our love story
          </p>
        </div>
      </div>
    </section>
  );
}
