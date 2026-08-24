"use client";

import { useEffect } from "react";

export function ReadingProgress() {
  useEffect(() => { const node = document.querySelector<HTMLElement>(".article-reading-progress"); if (!node) return; const update = () => { const max = document.documentElement.scrollHeight - window.innerHeight; node.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0})`; }; update(); window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update); }, []);
  return <div className="article-reading-progress" aria-hidden="true" />;
}
