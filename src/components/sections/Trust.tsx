"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

// Words for the rhythm animation
const trustWords = ["Potenciado", "por", "Mistral,", "la", "IA", "francesa.", "Servidores", "en", "la", "UE.", "Datos", "protegidos", "bajo", "RGPD."];

// Rhythm word component with punch + glow effect (same as Solution)
function RhythmWord({
  word,
  scrollProgress,
  start,
  peak,
  settle,
  glowFade,
}: {
  word: string;
  scrollProgress: MotionValue<number>;
  start: number;
  peak: number;
  settle: number;
  glowFade: number;
}) {
  // Scale: 0.6 -> 1.2 (overshoot) -> 1.0 (settle)
  const scale = useTransform(scrollProgress, [start, peak, settle], [0.6, 1.2, 1.0]);
  // Opacity: 0 -> 1 (quick fade in)
  const opacity = useTransform(scrollProgress, [start, start + 0.03], [0, 1]);
  // Glow: none -> bright purple -> fade out
  const textShadow = useTransform(scrollProgress, [start, peak, glowFade], [
    "0 0 0px rgba(139, 92, 246, 0)",
    "0 0 30px rgba(139, 92, 246, 1), 0 0 60px rgba(139, 92, 246, 0.7), 0 0 90px rgba(139, 92, 246, 0.4)",
    "0 0 0px rgba(139, 92, 246, 0)",
  ]);

  return (
    <motion.span
      className="font-sans text-muted-foreground inline-block transition-colors"
      style={{
        fontSize: "clamp(1.5rem, 4vw, 3rem)",
        scale,
        opacity,
        textShadow,
      }}
    >
      {word}
    </motion.span>
  );
}

// Rhythm phrase animation for trust message
function TrustPhrase({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
      {trustWords.map((word, index) => {
        const segmentSize = 1 / trustWords.length;
        const start = index * segmentSize;
        const peak = start + segmentSize * 0.4;
        const settle = start + segmentSize * 0.7;
        const glowFade = start + segmentSize * 0.9;

        return (
          <RhythmWord
            key={index}
            word={word}
            scrollProgress={scrollProgress}
            start={start}
            peak={peak}
            settle={settle}
            glowFade={glowFade}
          />
        );
      })}
    </div>
  );
}

export default function Trust() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const phraseRef = useRef<HTMLDivElement>(null);

  // Track scroll progress for headline reveal
  const { scrollYProgress: headlineProgress } = useScroll({
    target: headlineRef,
    offset: ["start 0.6", "start 0.2"],
  });

  // Track scroll progress for rhythm phrase - starts earlier so it begins animating sooner after headline
  const { scrollYProgress: rawPhraseProgress } = useScroll({
    target: phraseRef,
    offset: ["start 0.75", "start 0.2"],
  });

  // Add spring smoothing so text remains readable during fast scroll
  const phraseProgress = useSpring(rawPhraseProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Line 1: "TUS DATOS NO" - first half of scroll
  const line1Progress = useTransform(headlineProgress, [0, 0.5], [100, 0]);
  const line1Position = useTransform(headlineProgress, [0, 0.5], [0, 100]);
  const line1Opacity = useTransform(
    headlineProgress,
    [0, 0.02, 0.48, 0.5],
    [0, 1, 1, 0]
  );

  // Line 2: "SALEN DE EUROPA." - second half of scroll
  const line2Progress = useTransform(headlineProgress, [0.5, 1], [100, 0]);
  const line2Position = useTransform(headlineProgress, [0.5, 1], [0, 100]);
  const line2Opacity = useTransform(
    headlineProgress,
    [0.5, 0.52, 0.98, 1],
    [0, 1, 1, 0]
  );

  return (
    <section
      ref={sectionRef}
      id="confianza"
      className="px-6"
      style={{
        paddingTop: "12vw",
        paddingBottom: "12vw",
      }}
    >
      <div className="mx-auto text-center">
        {/* Headline with Scroll-Driven Line Sweep Reveal - 2 lines */}
        <div ref={headlineRef} className="flex flex-col items-center">
          {/* Line 1: "TUS DATOS NO" */}
          <div className="relative overflow-hidden inline-block">
            <motion.h2
              className="font-display text-foreground uppercase transition-colors"
              style={{
                fontSize: "clamp(2rem, 8vw, 10rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                clipPath: useTransform(line1Progress, (v) => `inset(0 ${v}% 0 0)`),
              }}
            >
              Tus datos no
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

          {/* Line 2: "SALEN DE EUROPA." */}
          <div className="relative overflow-hidden inline-block">
            <motion.h2
              className="font-display text-foreground uppercase transition-colors"
              style={{
                fontSize: "clamp(2rem, 8vw, 10rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                clipPath: useTransform(line2Progress, (v) => `inset(0 ${v}% 0 0)`),
              }}
            >
              salen de Europa.
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
        </div>

        {/* Body text with rhythm animation */}
        <div
          ref={phraseRef}
          className="max-w-3xl mx-auto"
          style={{ marginTop: "14vw", paddingTop: "4vh", paddingBottom: "4vh" }}
        >
          <TrustPhrase scrollProgress={phraseProgress} />
        </div>
      </div>
    </section>
  );
}
