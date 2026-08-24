"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const node = ref.current; if (!node) return; const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches; if (reduce) { node.classList.add("is-visible"); return; } const context = gsap.context(() => { gsap.fromTo(node, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: .72, ease: "power3.out", scrollTrigger: { trigger: node, start: "top 88%", once: true } }); }, node); return () => context.revert(); }, []);
  return <div ref={ref} className={`mic-reveal ${className}`}>{children}</div>;
}
