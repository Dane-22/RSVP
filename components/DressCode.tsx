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
    // { hex: "#C15E63", name: "Burgundy Light" },
    // { hex: "#610B0C", name: "Burgundy Deep" },
    // { hex: "#D49627", name: "Sunflower" },
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
            className="font-serif mb-8 text-center text-3xl sm:text-4xl text-[#EFCC74]"
          >
            Dress Code
          </h2>
          <div className="gold-divider mb-8" />
          
          <div className="space-y-6 mb-8">
            <p className="text-center text-[#ffffff]/90 leading-relaxed">
              As we celebrate amidst nature and beneath the evening sky, we invite our guests to wear <span className="text-[#ffffff] font-semibold">garden formal attire</span> in shades from our wedding palette.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
              <div className="bg-[#ffffff]/5 rounded-lg p-4">
                <p className="text-[#ffffff]/90 leading-relaxed">
                  <span className="text">Ladies</span> are encouraged to wear elegant dresses or gowns
                </p>
              </div>
              <div className="bg-[#ffffff]/5 rounded-lg p-4">
                <p className="text-[#ffffff]/90 leading-relaxed">
                  <span className="text">Gentlemen</span> may opt for barongs, suits, blazers, or formal long-sleeved attire
                </p>
              </div>
            </div>
            
            <div className="bg-[#ffffff]/5 rounded-lg p-4 border-l-4 border-[#C15E63]">
              <p className="text-[#ffffff]/90 leading-relaxed text-sm">
                To help keep the spotlight on the bride and preserve the beauty of our wedding vision, we kindly request that guests avoid wearing <span className="text">white, ivory, cream, champagne, and other near-white shades</span>.
              </p>
            </div>
            
            <div className="bg-[#ffffff]/5 rounded-lg p-4 border-l-4 border-[#636B2F]">
              <p className="text-[#ffffff]/90 leading-relaxed text-sm">
                Kindly avoid <span className="text">denim or jeans, shorts, t-shirts or casual tops, slippers, and overly casual footwear</span>.
              </p>
            </div>
            
            <p className="text-center text-[#ffffff]/80 text-sm">
              We kindly encourage guests to choose solid colors or subtle prints within the suggested palette to complement the overall aesthetic of our celebration.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {colors.map((color) => (
              <div
                key={color.hex}
                data-dresscode="color"
                className="group flex flex-col items-center"
              >
                <div className="mb-3 relative h-28 w-full flex items-center justify-center transition-transform group-hover:scale-105">
                  <svg
                    viewBox="0 0 100 120"
                    className="h-full w-full drop-shadow-lg"
                  >
                    <path
                      d="M50 5 C30 25 20 50 25 75 C30 95 40 110 50 115 C60 110 70 95 75 75 C80 50 70 25 50 5 Z"
                      fill={color.hex}
                      className="transition-opacity group-hover:opacity-90"
                    />
                  </svg>
                </div>
                <span className="text-xs uppercase tracking-wider text-[#ffffff]/70">
                  {color.name}
                </span>
                <span className="text-xs font-mono text-[#ffffff]/50">
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
