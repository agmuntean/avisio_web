"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import HeroVisuals from "./HeroVisuals";

// Animation timing constants (in seconds)
const TIMING = {
  headlineDelay: [0.5, 0.7, 0.9],
  headlineDuration: 0.4,
  subheadDelay: 1.3,
  subheadDuration: 0.4,
  buttonDelay: 1.6,
  buttonDuration: 0.3,
};

export default function Hero() {
  const { mounted } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [entranceComplete, setEntranceComplete] = useState(false);

  // Track when entrance animation is complete
  useEffect(() => {
    const timer = setTimeout(() => {
      setEntranceComplete(true);
    }, (TIMING.buttonDelay + TIMING.buttonDuration) * 1000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll progress for exit animation
  // Starts at 0 when hero is fully visible, reaches 1 when scrolled past
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Exit transforms - only apply after entrance is complete
  // Staggered sequence: Headlines → Blob → Subhead → CTA
  // Elements move UP (negative Y) on scroll - no opacity fade

  // 1. Headlines: start first (0 → 0.35)
  const headlineY = useTransform(scrollYProgress, [0, 0.35], [0, -40]);

  // 2. Blob/sphere timing is in HeroVisuals - starts at 0.12 (after headlines begin)

  // 3. Subhead: starts after blob begins (0.15 → 0.5)
  const subheadY = useTransform(scrollYProgress, [0.15, 0.5], [0, -40]);

  // 4. CTA button: starts last (0.25 → 0.55)
  const ctaY = useTransform(scrollYProgress, [0.25, 0.55], [0, -40]);

  const handleCTAClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const lenis = window.lenis;
      if (lenis) {
        lenis.scrollTo("bottom", { duration: 1.2 });
      } else {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }
    },
    []
  );

  // Headline lines for animation
  const headlineLines = [
    "Hacienda manda.",
    "Tú apruebas.",
    "Nosotros curramos.",
  ];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen hero-gradient"
      style={{
        padding: "4.17vw",
      }}
    >
      {/* Hero Content - Left Side, Vertically Centered */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2"
        style={{
          paddingLeft: "4.17vw",
          width: "55vw",
        }}
      >
        {/* Headline - 3 lines, each animates separately */}
        <h1
          className="font-display text-foreground transition-colors"
          style={{
            fontSize: "5.56vw",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          {headlineLines.map((line, index) => (
            <motion.span
              key={line}
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={entranceComplete ? false : { opacity: 1, y: 0 }}
              transition={{
                duration: TIMING.headlineDuration,
                delay: TIMING.headlineDelay[index],
                ease: "easeOut",
              }}
              style={
                entranceComplete
                  ? {
                      y: headlineY,
                    }
                  : undefined
              }
            >
              {line}
            </motion.span>
          ))}
        </h1>

        {/* Subhead - slides in from left as one unit */}
        <motion.div
          className="font-sans text-muted-foreground transition-colors"
          style={{
            fontSize: "1.67vw",
            lineHeight: 1.6,
            marginTop: "2.78vw",
            ...(entranceComplete
              ? {
                  y: subheadY,
                }
              : {}),
          }}
          initial={{ opacity: 0, x: -30 }}
          animate={entranceComplete ? false : { opacity: 1, x: 0 }}
          transition={{
            duration: TIMING.subheadDuration,
            delay: TIMING.subheadDelay,
            ease: "easeOut",
          }}
        >
          <p>Extracción con IA.</p>
          <p>Recordatorios inteligentes.</p>
          <p>Clientes informados.</p>
        </motion.div>

        {/* CTA Button - fades in last */}
        <motion.div
          style={{
            marginTop: "3.47vw",
            ...(entranceComplete
              ? {
                  y: ctaY,
                }
              : {}),
          }}
          initial={{ opacity: 0 }}
          animate={entranceComplete ? false : { opacity: 1 }}
          transition={{
            duration: TIMING.buttonDuration,
            delay: TIMING.buttonDelay,
            ease: "easeOut",
          }}
        >
          <a
            href="#footer"
            onClick={handleCTAClick}
            className="font-sans bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all hover:scale-[1.02] inline-block"
            style={{
              fontSize: "1.04vw",
              padding: "0.83vw 1.67vw",
            }}
          >
            Solicita una demo
          </a>
        </motion.div>
      </div>

      {/* Hero Visuals - Blob + Sphere on right side */}
      <HeroVisuals scrollProgress={scrollYProgress} entranceComplete={entranceComplete} />
    </section>
  );
}
