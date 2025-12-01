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
      const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;
      setScrollProgress(progress);
    };

    // Use native scroll - works alongside Lenis without interference
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
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
            radial-gradient(ellipse 80% 50% at 20% 40%, var(--gradient-warm-1) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 60%, var(--gradient-warm-2) 0%, transparent 50%),
            radial-gradient(ellipse 100% 60% at 50% 50%, var(--gradient-warm-3) 0%, transparent 60%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
