"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import Image from "next/image";

// Words for the rhythm animation
const rhythmWords = ["Mismo", "PDF.", "Distinto", "final."];

// Flow steps data with icons
const flowSteps = [
  { text: "Lo subes.", icon: "upload" },
  { text: "Lo leemos.", icon: "eye" },
  { text: "Lo apruebas.", icon: "check" },
  { text: "Lo enviamos.", icon: "send" },
] as const;

// SVG Icons for flow steps
function FlowIcon({ type, className }: { type: string; className?: string }) {
  const iconProps = {
    width: "100%",
    height: "100%",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };

  switch (type) {
    case "upload":
      return (
        <svg {...iconProps}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      );
    case "eye":
      return (
        <svg {...iconProps}>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "check":
      return (
        <svg {...iconProps}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
    case "send":
      return (
        <svg {...iconProps}>
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      );
    case "bell":
      return (
        <svg {...iconProps}>
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      );
    case "coffee":
      return (
        <svg {...iconProps}>
          <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
          <line x1="6" y1="2" x2="6" y2="4" />
          <line x1="10" y1="2" x2="10" y2="4" />
          <line x1="14" y1="2" x2="14" y2="4" />
        </svg>
      );
    default:
      return null;
  }
}

// Individual flow step with petal and icon - each has its own scroll tracking
function FlowStep({
  text,
  icon,
  index,
}: {
  text: string;
  icon: string;
  index: number;
}) {
  const stepRef = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;

  // Each step tracks its own scroll - reveals when it reaches viewport center
  const { scrollYProgress } = useScroll({
    target: stepRef,
    offset: ["start 0.7", "start 0.4"],
  });

  // Petal rotation - starts rotated out, rotates into place
  // Left petals rotate from -90deg, right petals from 90deg
  const petalRotate = useTransform(
    scrollYProgress,
    [0, 0.8],
    [isLeft ? -90 : 90, 0]
  );
  // Petal opacity
  const petalOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Text slides in from the petal direction
  // Left petal = text slides from left (negative X) to center
  // Right petal = text slides from right (positive X) to center
  const textX = useTransform(
    scrollYProgress,
    [0.3, 0.7],
    [isLeft ? -40 : 40, 0]
  );
  const textOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.7],
    [0, 1]
  );

  // Icon scale - pops in after petal settles
  const iconScale = useTransform(
    scrollYProgress,
    [0.4, 0.7],
    [0, 1]
  );

  return (
    <div
      ref={stepRef}
      className={`flex items-center gap-6 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
      style={{ justifyContent: "center" }}
    >
      {/* Petal with icon */}
      <motion.div
        className="relative flex-shrink-0"
        style={{
          width: "clamp(56px, 10vw, 100px)",
          height: "clamp(66px, 11.7vw, 117px)",
          opacity: petalOpacity,
          rotate: petalRotate,
          transformOrigin: isLeft ? "right center" : "left center",
        }}
      >
        {/* Petal shape */}
        <Image
          src="/shape-from-symbol-logo-white.svg"
          alt=""
          fill
          style={{
            objectFit: "contain",
            filter: "brightness(0) saturate(100%) invert(23%) sepia(96%) saturate(4200%) hue-rotate(258deg) brightness(85%) contrast(115%)",
          }}
        />
        {/* Icon centered on petal */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-white"
          style={{
            scale: iconScale,
            paddingBottom: "8%",
          }}
        >
          <div style={{ width: "40%", height: "40%" }}>
            <FlowIcon type={icon} />
          </div>
        </motion.div>
      </motion.div>

      {/* Text - slides in from petal direction */}
      <motion.p
        className="font-sans text-foreground transition-colors"
        style={{
          fontSize: "clamp(1.5rem, 4vw, 3rem)",
          lineHeight: 1.3,
          opacity: textOpacity,
          x: textX,
          minWidth: "clamp(120px, 20vw, 250px)",
          textAlign: isLeft ? "left" : "right",
        }}
      >
        {text}
      </motion.p>
    </div>
  );
}

// Bell icon with ringing animation
function RingingBell() {
  return (
    <motion.div
      className="text-white"
      style={{ width: "40%", height: "40%" }}
      animate={{
        rotate: [0, 15, -15, 10, -10, 5, -5, 0],
      }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 0.8,
        ease: "easeInOut",
      }}
    >
      <FlowIcon type="bell" />
    </motion.div>
  );
}

// Coffee cup icon with CSS-animated steam
function CoffeeIcon() {
  return (
    <div className="text-white relative overflow-visible" style={{ width: "50%", height: "50%" }}>
      {/* Steam lines - positioned above the cup */}
      <div
        className="absolute flex justify-center"
        style={{
          bottom: "85%",
          left: "15%",
          right: "35%",
          gap: "4px",
        }}
      >
        <motion.div
          style={{
            width: "4px",
            height: "12px",
            backgroundColor: "white",
            borderRadius: "2px"
          }}
          animate={{
            y: [0, -6, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0,
          }}
        />
        <motion.div
          style={{
            width: "4px",
            height: "12px",
            backgroundColor: "white",
            borderRadius: "2px"
          }}
          animate={{
            y: [0, -6, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
        />
        <motion.div
          style={{
            width: "4px",
            height: "12px",
            backgroundColor: "white",
            borderRadius: "2px"
          }}
          animate={{
            y: [0, -6, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          }}
        />
      </div>

      {/* Cup SVG without steam */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Cup handle */}
        <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
        {/* Cup body */}
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      </svg>
    </div>
  );
}

// Wave letter component for closer text animation
function WaveLetter({
  char,
  index,
  totalChars,
  scrollProgress,
  textStart,
}: {
  char: string;
  index: number;
  totalChars: number;
  scrollProgress: MotionValue<number>;
  textStart: number;
}) {
  // Each letter gets staggered timing
  // Slower reveal (quarter note rhythm) - each letter takes 0.1 of scroll progress
  // Total stagger spread: 0.2 for a relaxed wave
  const staggerDelay = (index / totalChars) * 0.2;
  const letterStart = textStart + staggerDelay;
  const letterEnd = letterStart + 0.1;

  // Letter rises from below and fades in
  const y = useTransform(scrollProgress, [letterStart, letterEnd], [25, 0]);
  const opacity = useTransform(scrollProgress, [letterStart, letterEnd], [0, 1]);

  return (
    <motion.span
      style={{
        display: "inline-block",
        y,
        opacity,
        // Preserve whitespace
        whiteSpace: char === " " ? "pre" : "normal",
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

// Closer with blob and animated icon - each has its own scroll tracking
function CloserBlob({
  text,
  color,
  icon,
}: {
  text: string;
  color: "success" | "warning";
  icon: "bell" | "coffee";
}) {
  const blobRef = useRef<HTMLDivElement>(null);

  // Each closer tracks its own scroll progress
  const { scrollYProgress } = useScroll({
    target: blobRef,
    offset: ["start 0.8", "start 0.3"],
  });

  // Blob scales in (first 40% of progress)
  const blobScale = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const blobOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  // Text wave starts after blob/icon is fully revealed (blob completes at 0.4)
  const textStart = 0.5;

  const colorClass = color === "success" ? "bg-[var(--success)]" : "bg-[var(--warning)]";
  const shadowColor = color === "success"
    ? "rgba(var(--success-rgb), 0.4)"
    : "rgba(var(--warning-rgb), 0.4)";

  const chars = text.split("");

  return (
    <div ref={blobRef} className="flex flex-col items-center gap-4">
      {/* Blob with icon */}
      <motion.div
        className={`relative ${colorClass} rounded-full flex items-center justify-center overflow-visible`}
        style={{
          width: "clamp(80px, 12vw, 140px)",
          height: "clamp(80px, 12vw, 140px)",
          scale: blobScale,
          opacity: blobOpacity,
          boxShadow: `0 0 40px ${shadowColor}, 0 0 80px ${shadowColor}`,
        }}
      >
        {icon === "bell" ? <RingingBell /> : <CoffeeIcon />}
      </motion.div>

      {/* Text with wave animation */}
      <p
        className="font-display text-muted-foreground transition-colors text-center"
        style={{
          fontSize: "clamp(1.5rem, 4vw, 3rem)",
          lineHeight: 1.15,
        }}
      >
        {chars.map((char, index) => (
          <WaveLetter
            key={index}
            char={char}
            index={index}
            totalChars={chars.length}
            scrollProgress={scrollYProgress}
            textStart={textStart}
          />
        ))}
      </p>
    </div>
  );
}

// Rhythm word component with punch + glow effect
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
  // Using a vibrant purple that works in both light and dark modes
  const textShadow = useTransform(scrollProgress, [start, peak, glowFade], [
    "0 0 0px rgba(139, 92, 246, 0)",
    "0 0 30px rgba(139, 92, 246, 1), 0 0 60px rgba(139, 92, 246, 0.7), 0 0 90px rgba(139, 92, 246, 0.4)",
    "0 0 0px rgba(139, 92, 246, 0)",
  ]);

  return (
    <motion.span
      className="font-display text-muted-foreground inline-block"
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

// Rhythm phrase animation - "Mismo PDF. Distinto final."
function RhythmPhrase({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
      {rhythmWords.map((word, index) => {
        const segmentSize = 1 / rhythmWords.length;
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

export default function Solution() {
  const sectionRef = useRef<HTMLElement>(null);
  const rhythmRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);

  // Track scroll progress for headline reveal
  // Starts later than Problem (0.7 vs 0.85) so there's a clear pause between sections
  const { scrollYProgress: headlineProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.7", "start 0.1"],
  });

  // Scroll progress for rhythm phrase
  // Starts earlier (0.75) so it begins animating sooner after headline
  const { scrollYProgress: rawRhythmProgress } = useScroll({
    target: rhythmRef,
    offset: ["start 0.75", "start 0.2"],
  });

  // Add spring smoothing so text remains readable during fast scroll
  const rhythmProgress = useSpring(rawRhythmProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
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
        paddingTop: "8vw",
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

      {/* Rhythm phrase - "Mismo PDF. Distinto final." */}
      <div className="max-w-5xl mx-auto" style={{ marginTop: "12vw" }}>
        <div
          ref={rhythmRef}
          className="text-center"
          style={{ paddingTop: "5vh", paddingBottom: "5vh" }}
        >
          <RhythmPhrase scrollProgress={rhythmProgress} />
        </div>
      </div>

      {/* Flow steps with zipper animation */}
      <div
        ref={flowRef}
        className="mx-auto"
        style={{ marginTop: "15vw" }}
      >
        <div
          className="flex flex-col items-center"
          style={{ gap: "8vw" }}
        >
          {flowSteps.map((step, index) => (
            <FlowStep
              key={index}
              text={step.text}
              icon={step.icon}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Closer - emotional payoff with blobs and icons */}
      <div
        className="flex flex-col items-center"
        style={{
          marginTop: "18vw",
          gap: "12vw",
        }}
      >
        {/* Tu cliente recibe el aviso - Green blob with bell */}
        <CloserBlob
          text="Tu cliente recibe el aviso."
          color="success"
          icon="bell"
        />

        {/* Tú, el café - Amber blob with coffee */}
        <CloserBlob
          text="Tú, el café."
          color="warning"
          icon="coffee"
        />
      </div>
    </section>
  );
}
