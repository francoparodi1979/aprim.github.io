"use client";

import { useEffect, useRef } from "react";

interface CountUpProps {
  to: number;
  isPct?: boolean;
  suffix?: string;
  duration?: number;
  delay?: number;
  className?: string;
}

export function CountUp({
  to,
  isPct = false,
  suffix = "",
  duration = 1800,
  delay = 400,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const format = (n: number) =>
      isPct ? `${Math.round(n)}%` : `${Math.round(n).toLocaleString("en-US")}${suffix}`;

    let raf = 0;
    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) start = now;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = format(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else el.textContent = format(to);
    };

    const timer = window.setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [to, isPct, suffix, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {isPct ? "0%" : "0"}
    </span>
  );
}
