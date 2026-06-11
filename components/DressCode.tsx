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

    { hex: "#193804", name: "Forest", image: "/forest.png" },

    { hex: "#636B2F", name: "Olive", image: "/olive.png" },

    { hex: "#87AE73", name: "Sage", image: "/sage.png" },

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

          

          <div className="space-y-8 mb-8">

            <div className="space-y-6">

              <div className="flex items-start gap-6">

                <div className="flex-shrink-0">

                  <div className="h-24 w-24 rounded-full border-2 border-[#D49627] bg-[#610B0C]/30 flex items-center justify-center overflow-hidden">

                    {/* Replace with actual image: */}
                     <img src="/1.png" alt="Ladies dress" className="h-full w-full object-cover" />

                    {/* <span className="text-xs text-[#D49627]/60">Image</span> */}

                  </div>

                </div>

                <div className="flex-1">

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#EFCC74] mb-2">

                    Ladies

                  </h3>

                  <p className="text-[#ffffff]/90 leading-relaxed">

                    Elegant dresses or Gowns

                  </p>

                </div>

              </div>

              

              <div className="flex items-start gap-6">

                <div className="flex-shrink-0">

                  <div className="h-24 w-24 rounded-full border-2 border-[#D49627] bg-[#610B0C]/30 flex items-center justify-center overflow-hidden">

                    {/* Replace with actual image: */}
                     <img src="/2.png" alt="Gentlemen barong" className="h-full w-full object-cover" />

                    {/* <span className="text-xs text-[#D49627]/60">Image</span> */}

                  </div>

                </div>

                <div className="flex-1">

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#EFCC74] mb-2">

                    Gentlemen

                  </h3>

                  <p className="text-[#ffffff]/90 leading-relaxed">

                    Barongs, suits, blazers or formal long-sleeved attire

                  </p>

                </div>

              </div>

              

              <div className="flex items-start gap-6">

                <div className="flex-shrink-0">

                  <div className="h-24 w-24 rounded-full border-2 border-[#C15E63] bg-[#610B0C]/30 flex items-center justify-center overflow-hidden">

                    {/* Replace with actual image:  */}
                    <img src="/3.png" alt="Items to avoid" className="h-full w-full object-cover" />

                    {/* <span className="text-xs text-[#C15E63]/60">Image</span> */}

                  </div>

                </div>

                <div className="flex-1">

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#EFCC74] mb-2">

                    Please Avoid

                  </h3>

                  <p className="text-[#ffffff]/90 leading-relaxed">

                    White, ivory, cream, champagne, denim, shorts, and slippers

                  </p>

                </div>

              </div>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">

            {colors.map((color) => (

              <div

                key={color.hex}

                data-dresscode="color"

                className="group flex flex-col items-center"

              >

                <div className="mb-3 relative h-28 w-full flex items-center justify-center transition-transform group-hover:scale-105">

                  {color.image ? (
                    <img
                      src={color.image}
                      alt={color.name}
                      className="h-full w-full object-cover rounded-lg"
                    />
                  ) : (
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
                  )}

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

