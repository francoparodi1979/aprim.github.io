"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#d07a45", "#7fa093", "#e89a6d", "#144653"];
const COUNT = 42;

export function HeroParticles() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    root.innerHTML = "";
    for (let i = 0; i < COUNT; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      const size = 3 + Math.random() * 6;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${Math.random() * 100}%`;
      p.style.background = COLORS[i % COLORS.length];
      p.style.opacity = String(0.35 + Math.random() * 0.4);
      p.style.animationDuration = `${8 + Math.random() * 10}s`;
      p.style.animationDelay = `${Math.random() * 10}s`;
      p.style.setProperty("--drift", `${Math.random() * 120 - 60}px`);
      root.appendChild(p);
    }
  }, []);

  return <div className="particles" ref={ref} aria-hidden />;
}
