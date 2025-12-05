"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// Phrase data with alignment, bar colors, and cursor glow colors
const phrases = [
  { text: "Abrir el PDF.", align: "left", barColor: "var(--phrase-bar-1)", cursorColor: "var(--phrase-cursor-1)" },
  { text: "Buscar los datos.", align: "right", barColor: "var(--phrase-bar-2)", cursorColor: "var(--phrase-cursor-2)" },
  { text: "Copiar a mano.", align: "left", barColor: "var(--phrase-bar-1)", cursorColor: "var(--phrase-cursor-1)" },
  { text: "Cruzar los dedos.", align: "right", barColor: "var(--phrase-bar-2)", cursorColor: "var(--phrase-cursor-2)" },
  { text: "Recordar el vencimiento.", align: "left", barColor: "var(--phrase-bar-1)", cursorColor: "var(--phrase-cursor-1)" },
  { text: "Avisar al cliente.", align: "right", barColor: "var(--phrase-bar-2)", cursorColor: "var(--phrase-cursor-2)" },
] as const;

// Individual phrase component with scroll-driven bar animation
// Bar extends from viewport edge to edge, text is knocked out showing page background
function BarPhrase({
  text,
  align,
  barColor,
  cursorColor,
  scrollProgress,
  revealStart,
  revealEnd,
}: {
  text: string;
  align: "left" | "right";
  barColor: string;
  cursorColor: string;
  scrollProgress: MotionValue<number>;
  revealStart: number;
  revealEnd: number;
}) {
  // Bar width as percentage (0 to 100)
  const barWidthNum = useTransform(
    scrollProgress,
    [revealStart, revealEnd],
    [0, 100]
  );

  // Clip path to reveal bar from left or right
  // Left: inset(0 100% 0 0) -> inset(0 0% 0 0)  (reveals left to right)
  // Right: inset(0 0 0 100%) -> inset(0 0 0 0%) (reveals right to left)
  const clipPath = useTransform(barWidthNum, (w) => {
    if (align === "left") {
      return `inset(0 ${100 - w}% 0 0)`;
    } else {
      return `inset(0 0 0 ${100 - w}%)`;
    }
  });

  // Cursor position - at the leading edge of the bar
  // Left-aligned: cursor at right edge (w%)
  // Right-aligned: cursor at left edge (100-w%)
  const cursorPosition = useTransform(barWidthNum, (w) => {
    if (align === "left") {
      return `${w}%`;
    } else {
      return `${100 - w}%`;
    }
  });

  // Cursor opacity - visible while animating, fade out at start and end
  const cursorOpacity = useTransform(barWidthNum, (w) => {
    if (w <= 2) return 0;
    if (w >= 98) return 0;
    return 1;
  });

  return (
    <div
      className="relative"
      style={{
        // Break out of container to span full viewport width
        marginLeft: "calc(-50vw + 50%)",
        marginRight: "calc(-50vw + 50%)",
        width: "100vw",
      }}
    >
      {/* The bar layer - clipped to reveal progressively */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: barColor,
          clipPath,
        }}
      />

      {/* Glowing cursor at leading edge - full height, solid color */}
      <motion.div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{
          width: "2px",
          backgroundColor: cursorColor,
          boxShadow: `0 0 12px ${cursorColor}, 0 0 24px ${cursorColor}`,
          left: cursorPosition,
          opacity: cursorOpacity,
        }}
      />

      {/* Text container */}
      <div
        className="relative max-w-5xl mx-auto"
        style={{
          paddingLeft: "4.17vw",
          paddingRight: "4.17vw",
          paddingTop: "0.8vw",
          paddingBottom: "0.8vw",
          isolation: "isolate",
        }}
      >
        <p
          className="font-sans font-normal text-background transition-colors"
          style={{
            fontSize: "clamp(1.25rem, 3vw, 2.5rem)",
            lineHeight: 1.3,
            textAlign: align,
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}


export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const phrasesRef = useRef<HTMLDivElement>(null);
  const closerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress for headline reveal
  const { scrollYProgress: headlineProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "start 0.15"],
  });

  // Track scroll progress for phrases section
  // Starts lower (0.85 = near bottom quarter) and ends higher (0.15 = near top quarter)
  // This gives users more time to read each phrase before it scrolls away
  const { scrollYProgress: phrasesProgress } = useScroll({
    target: phrasesRef,
    offset: ["start 0.85", "end 0.15"],
  });

  // Track scroll progress for closer "rushing at you" animation
  // Needs more scroll distance for the dramatic scale effect
  const { scrollYProgress: closerProgress } = useScroll({
    target: closerRef,
    offset: ["start 0.95", "end 0.1"],
  });

  // Closer transforms - starts tiny (far away), rushes toward you, grows massive
  // Scale: 0.3 (tiny/distant) -> 1 (normal) -> 2.5 (huge/in your face)
  const closerScale = useTransform(closerProgress, [0, 0.4, 0.85], [0.3, 1, 2.5]);
  // Opacity: fade in from distance, solid in middle, fade out as it passes
  const closerOpacity = useTransform(closerProgress, [0, 0.15, 0.7, 0.95], [0, 1, 1, 0]);
  // Slight rotation for 3D momentum feel - tilts as it rushes past
  const closerRotate = useTransform(closerProgress, [0, 0.5, 1], [-2, 0, 3]);
  // Y position - starts slightly below, rises up, then continues past
  const closerY = useTransform(closerProgress, [0, 0.5, 1], [30, 0, -50]);

  // Headline reveals
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

  // Each phrase gets 1/6 of the scroll range
  const phraseSegment = 1 / 6;

  return (
    <section
      ref={sectionRef}
      id="problema"
      className="px-6"
      style={{
        paddingTop: "2vw",
        paddingBottom: "6vw",
      }}
    >
      {/* Headline with Scroll-Driven Line Sweep Reveal */}
      <div className="flex flex-col items-center">
        {/* Line 1: "CADA NOTIFICACIÓN," */}
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
            CADA NOTIFICACIÓN,
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

        {/* Line 2: "EL MISMO RITUAL." */}
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
            EL MISMO RITUAL.
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

      {/* 6 phrases - alternating layout with colored bars */}
      <div
        ref={phrasesRef}
        className="max-w-5xl mx-auto"
        style={{
          marginTop: "16vw",
        }}
      >
        <div
          className="flex flex-col"
          style={{
            gap: "1vw",
          }}
        >
          {phrases.map((phrase, index) => {
            const revealStart = index * phraseSegment;
            const revealEnd = revealStart + phraseSegment * 0.9;

            return (
              <BarPhrase
                key={index}
                text={phrase.text}
                align={phrase.align}
                barColor={phrase.barColor}
                cursorColor={phrase.cursorColor}
                scrollProgress={phrasesProgress}
                revealStart={revealStart}
                revealEnd={revealEnd}
              />
            );
          })}
        </div>
      </div>

      {/* Closer - "Y mañana, otro más." rushes from the distance and hits you */}
      <div
        ref={closerRef}
        className="relative overflow-hidden"
        style={{
          // Tall container for the dramatic scroll animation
          height: "80vh",
          marginTop: "4vw",
        }}
      >
        {/* Sticky container to keep text centered while scrolling through */}
        <div
          className="sticky top-0 h-screen flex items-center justify-center"
          style={{
            perspective: "1000px",
          }}
        >
          <motion.p
            className="font-display text-muted-foreground transition-colors text-center"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              scale: closerScale,
              opacity: closerOpacity,
              rotate: closerRotate,
              y: closerY,
              transformOrigin: "center center",
            }}
          >
            Y mañana, otro más.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
