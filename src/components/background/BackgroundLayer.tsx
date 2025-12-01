"use client";

import { useEffect, useRef, useState } from "react";

type BackgroundLayerProps = {
  children: React.ReactNode;
};

export default function BackgroundLayer({ children }: BackgroundLayerProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / docHeight, 1);
      setScrollProgress(progress);
    };

    // Use Lenis scroll event if available, otherwise native
    const lenis = window.lenis;
    if (lenis) {
      lenis.on("scroll", handleScroll);
    } else {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      if (lenis) {
        lenis.off("scroll", handleScroll);
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // Calculate warm gradient opacity based on scroll (peaks around solution section ~30-50%)
  const warmOpacity = Math.sin(scrollProgress * Math.PI * 2) * 0.3;
  const clampedWarmOpacity = Math.max(0, warmOpacity);

  return (
    <div ref={containerRef} className="relative">
      {/* Base background layer */}
      <div className="bg-layer bg-layer-base" />

      {/* Warm mesh gradient overlay (terracotta zone) */}
      <div
        className="bg-layer mesh-gradient-warm"
        style={{
          opacity: clampedWarmOpacity,
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, rgba(224, 122, 95, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 60%, rgba(255, 162, 22, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 100% 60% at 50% 50%, rgba(224, 122, 95, 0.08) 0%, transparent 60%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
