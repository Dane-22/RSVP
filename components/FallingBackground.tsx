"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const EMOJIS = ["🌻", "🌹"] as const;
const ELEMENT_COUNT = 18;

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export default function FallingBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const elements: HTMLSpanElement[] = [];
    const tweens: gsap.core.Tween[] = [];

    const spawn = (index: number) => {
      const el = document.createElement("span");
      el.textContent = EMOJIS[index % EMOJIS.length];
      el.setAttribute("aria-hidden", "true");
      el.className =
        "pointer-events-none absolute select-none will-change-transform";
      el.style.left = `${randomBetween(0, 100)}%`;
      el.style.top = `${randomBetween(-15, -5)}%`;
      el.style.fontSize = `${randomBetween(1.1, 2.4)}rem`;
      el.style.opacity = `${randomBetween(0.35, 0.75)}`;
      el.style.filter = `blur(${randomBetween(0, 0.4)}px)`;
      container.appendChild(el);
      elements.push(el);

      const duration = randomBetween(12, 22);
      const drift = randomBetween(-40, 40);

      const fallTween = gsap.to(el, {
        y: "115vh",
        x: drift,
        rotation: randomBetween(-25, 25),
        duration,
        ease: "none",
        repeat: -1,
        delay: randomBetween(0, duration),
        onRepeat: () => {
          gsap.set(el, {
            left: `${randomBetween(0, 100)}%`,
            top: `${randomBetween(-15, -5)}%`,
            rotation: randomBetween(-15, 15),
          });
        },
      });

      const swayTween = gsap.to(el, {
        rotation: `+=${randomBetween(8, 18)}`,
        duration: randomBetween(2.5, 4.5),
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      tweens.push(fallTween, swayTween);
    };

    const count =
      window.innerWidth < 768 ? Math.floor(ELEMENT_COUNT * 0.6) : ELEMENT_COUNT;

    for (let i = 0; i < count; i += 1) {
      spawn(i);
    }

    return () => {
      tweens.forEach((tween) => tween.kill());
      elements.forEach((el) => el.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
