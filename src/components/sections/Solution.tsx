"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Solution() {
  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll progress for headline reveal
  const { scrollYProgress: headlineProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "start 0.15"],
  });

  // Headline reveals - same as Problem section
  const line1Progress = useTransform(headlineProgress, [0, 0.5], [100, 0]);
  const line2Progress = useTransform(headlineProgress, [0.5, 1], [100, 0]);
  const line1Position = useTransform(headlineProgress, [0, 0.5], [0, 100]);
  const line2Position = useTransform(headlineProgress, [0.5, 1], [0, 100]);
  const line1Opacity = useTransform(
    headlineProgress,
    [0, 0.02, 0.48, 0.5],
    [0, 1, 1, 0]
  );
  const line2Opacity = useTransform(
    headlineProgress,
    [0.5, 0.52, 0.98, 1],
    [0, 1, 1, 0]
  );

  return (
    <section
      ref={sectionRef}
      id="solucion"
      className="px-6"
      style={{
        paddingTop: "12vw",
        paddingBottom: "12vw",
      }}
    >
      {/* Headline with Scroll-Driven Line Sweep Reveal - same as Problem */}
      <div className="flex flex-col items-center">
        {/* Line 1: "CON AVISIO," */}
        <div className="relative overflow-hidden inline-block">
          <motion.div
            className="font-display text-foreground uppercase transition-colors"
            style={{
              fontSize: "clamp(2.5rem, 10vw, 12rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              clipPath: useTransform(line1Progress, (v) => `inset(0 ${v}% 0 0)`),
            }}
          >
            CON AVISIO,
          </motion.div>

          {/* Sweeping vertical line for Line 1 */}
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

        {/* Line 2: "OTRO RITUAL." */}
        <div className="relative overflow-hidden inline-block">
          <motion.div
            className="font-display text-foreground uppercase transition-colors"
            style={{
              fontSize: "clamp(2.5rem, 10vw, 12rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              clipPath: useTransform(line2Progress, (v) => `inset(0 ${v}% 0 0)`),
            }}
          >
            OTRO RITUAL.
          </motion.div>

          {/* Sweeping vertical line for Line 2 */}
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
      </div>

      <div className="max-w-5xl mx-auto text-center">
        {/* Subhead - statement level, impactful */}
        <p
          className="font-sans text-muted-foreground transition-colors"
          style={{
            marginTop: "3vw",
            fontSize: "clamp(1.5rem, 4vw, 3rem)",
            lineHeight: 1.2,
          }}
        >
          Mismo PDF. Distinto final.
        </p>

        {/* 4 phrases - same treatment as Problem */}
        <div
          className="flex flex-col"
          style={{
            marginTop: "8vw",
            gap: "3vw",
          }}
        >
          <p
            className="font-sans text-foreground transition-colors"
            style={{ fontSize: "clamp(1.25rem, 3vw, 2.5rem)", lineHeight: 1.3 }}
          >
            Lo subes.
          </p>
          <p
            className="font-sans text-foreground transition-colors"
            style={{ fontSize: "clamp(1.25rem, 3vw, 2.5rem)", lineHeight: 1.3 }}
          >
            Lo leemos.
          </p>
          <p
            className="font-sans text-foreground transition-colors"
            style={{ fontSize: "clamp(1.25rem, 3vw, 2.5rem)", lineHeight: 1.3 }}
          >
            Lo apruebas.
          </p>
          <p
            className="font-sans text-foreground transition-colors"
            style={{ fontSize: "clamp(1.25rem, 3vw, 2.5rem)", lineHeight: 1.3 }}
          >
            Lo enviamos.
          </p>
        </div>

        {/* Closer - emotional payoff */}
        <div
          className="flex flex-col"
          style={{
            marginTop: "8vw",
            gap: "1.5vw",
          }}
        >
          <p
            className="font-sans text-muted-foreground transition-colors"
            style={{ fontSize: "clamp(1.25rem, 3vw, 2.5rem)", lineHeight: 1.3 }}
          >
            Tu cliente recibe el aviso.
          </p>
          {/* "Tú, el café." - THE emotional payoff, display font for emphasis */}
          <p
            className="font-display text-foreground transition-colors italic"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              lineHeight: 1.15,
            }}
          >
            Tú, el café.
          </p>
        </div>
      </div>
    </section>
  );
}
