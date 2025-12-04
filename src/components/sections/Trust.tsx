"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Trust() {
  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll progress for headline reveal - 3 lines need more scroll range
  // Start later (0.5) so Solution closers have time to finish
  const { scrollYProgress: headlineProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.5", "start 0.05"],
  });

  // Line 1: "Europeo." - first third of scroll
  const line1Progress = useTransform(headlineProgress, [0, 0.33], [100, 0]);
  const line1Position = useTransform(headlineProgress, [0, 0.33], [0, 100]);
  const line1Opacity = useTransform(
    headlineProgress,
    [0, 0.02, 0.31, 0.33],
    [0, 1, 1, 0]
  );

  // Line 2: "Seguro." - second third of scroll
  const line2Progress = useTransform(headlineProgress, [0.33, 0.66], [100, 0]);
  const line2Position = useTransform(headlineProgress, [0.33, 0.66], [0, 100]);
  const line2Opacity = useTransform(
    headlineProgress,
    [0.33, 0.35, 0.64, 0.66],
    [0, 1, 1, 0]
  );

  // Line 3: "Cumplimos." - final third of scroll
  const line3Progress = useTransform(headlineProgress, [0.66, 1], [100, 0]);
  const line3Position = useTransform(headlineProgress, [0.66, 1], [0, 100]);
  const line3Opacity = useTransform(
    headlineProgress,
    [0.66, 0.68, 0.98, 1],
    [0, 1, 1, 0]
  );

  return (
    <section
      ref={sectionRef}
      id="confianza"
      className="px-6"
      style={{
        paddingTop: "15vw",
        paddingBottom: "8vw",
      }}
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Headline with Scroll-Driven Line Sweep Reveal - 3 sequential lines */}
        <div className="flex flex-col items-center">
          {/* Line 1: "Europeo." */}
          <div className="relative overflow-hidden inline-block">
            <motion.h2
              className="font-display text-foreground uppercase transition-colors"
              style={{
                fontSize: "clamp(2.5rem, 10vw, 12rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                clipPath: useTransform(line1Progress, (v) => `inset(0 ${v}% 0 0)`),
              }}
            >
              Europeo.
            </motion.h2>

            {/* Sweeping vertical line */}
            <motion.div
              className="absolute top-0 bottom-0 pointer-events-none"
              style={{
                width: "2px",
                background:
                  "linear-gradient(180deg, transparent 0%, var(--primary) 15%, var(--primary) 85%, transparent 100%)",
                boxShadow: "0 0 20px var(--primary), 0 0 40px var(--primary)",
                left: useTransform(line1Position, (v) => `${v}%`),
                opacity: line1Opacity,
              }}
            />
          </div>

          {/* Line 2: "Seguro." */}
          <div className="relative overflow-hidden inline-block">
            <motion.h2
              className="font-display text-foreground uppercase transition-colors"
              style={{
                fontSize: "clamp(2.5rem, 10vw, 12rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                clipPath: useTransform(line2Progress, (v) => `inset(0 ${v}% 0 0)`),
              }}
            >
              Seguro.
            </motion.h2>

            {/* Sweeping vertical line */}
            <motion.div
              className="absolute top-0 bottom-0 pointer-events-none"
              style={{
                width: "2px",
                background:
                  "linear-gradient(180deg, transparent 0%, var(--primary) 15%, var(--primary) 85%, transparent 100%)",
                boxShadow: "0 0 20px var(--primary), 0 0 40px var(--primary)",
                left: useTransform(line2Position, (v) => `${v}%`),
                opacity: line2Opacity,
              }}
            />
          </div>

          {/* Line 3: "Cumplimos." */}
          <div className="relative overflow-hidden inline-block">
            <motion.h2
              className="font-display text-foreground uppercase transition-colors"
              style={{
                fontSize: "clamp(2.5rem, 10vw, 12rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                clipPath: useTransform(line3Progress, (v) => `inset(0 ${v}% 0 0)`),
              }}
            >
              Cumplimos.
            </motion.h2>

            {/* Sweeping vertical line */}
            <motion.div
              className="absolute top-0 bottom-0 pointer-events-none"
              style={{
                width: "2px",
                background:
                  "linear-gradient(180deg, transparent 0%, var(--primary) 15%, var(--primary) 85%, transparent 100%)",
                boxShadow: "0 0 20px var(--primary), 0 0 40px var(--primary)",
                left: useTransform(line3Position, (v) => `${v}%`),
                opacity: line3Opacity,
              }}
            />
          </div>
        </div>

        {/* Body text */}
        <p
          className="font-sans text-subhead text-muted-foreground max-w-2xl mx-auto transition-colors"
          style={{ marginTop: "4vw" }}
        >
          Potenciado por Mistral, la IA francesa. Servidores en la UE. Datos protegidos bajo RGPD.
        </p>
      </div>
    </section>
  );
}
