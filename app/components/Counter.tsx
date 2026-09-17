"use client";

import { useEffect, useRef, useState } from "react";

export function Counter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const step = Math.ceil(target / 50);
          const id = setInterval(() => {
            setCount((prev) => {
              if (prev + step >= target) {
                clearInterval(id);
                return target;
              }
              return prev + step;
            });
          }, 30);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="stat">
      <div className="stat__number">{count.toLocaleString("ru-RU")}</div>
      <p className="stat__label">{label}</p>
    </div>
  );
}