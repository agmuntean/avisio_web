"use client";

import { useEffect, useRef } from "react";

export default function GradientBlob() {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;

    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Subtle movement response to mouse (max 20px offset)
      mouseX = (e.clientX / window.innerWidth - 0.5) * 40;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 40;
    };

    const animate = () => {
      // Smooth interpolation toward mouse position
      currentX += (mouseX - currentX) * 0.02;
      currentY += (mouseY - currentY) * 0.02;

      blob.style.transform = `translate(${currentX}px, ${currentY}px)`;
      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={blobRef}
      className="fixed top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[800px] h-[800px] pointer-events-none z-0"
      aria-hidden="true"
    >
      {/* Outer glow layer */}
      <div
        className="absolute inset-0 gradient-blob opacity-30 blur-3xl"
        style={{
          background: `radial-gradient(ellipse at 30% 40%, var(--blob-rose) 0%, transparent 50%),
                       radial-gradient(ellipse at 70% 60%, var(--blob-amber) 0%, transparent 50%),
                       radial-gradient(ellipse at 50% 50%, var(--blob-purple-electric) 0%, transparent 60%)`,
        }}
      />

      {/* Main blob */}
      <div
        className="absolute inset-[15%] gradient-blob"
        style={{
          background: `radial-gradient(ellipse at 40% 30%, var(--blob-purple-electric) 0%, transparent 50%),
                       radial-gradient(ellipse at 60% 70%, var(--blob-rose) 0%, transparent 40%),
                       radial-gradient(ellipse at 30% 60%, var(--blob-amber) 0%, transparent 45%),
                       radial-gradient(ellipse at 50% 50%, var(--blob-purple-core) 0%, var(--blob-purple-core) 30%, transparent 60%)`,
          filter: "blur(40px)",
        }}
      />

      {/* Inner core */}
      <div
        className="absolute inset-[30%] gradient-blob-inner"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, var(--blob-purple-core) 0%, var(--blob-purple-electric) 50%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />
    </div>
  );
}
