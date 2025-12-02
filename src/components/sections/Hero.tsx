"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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
  const { theme, toggleTheme } = useTheme();
  const hasScrolledRef = useRef(false);

  // Handle scroll interruption - we'll use CSS to handle the snap
  useEffect(() => {
    const handleScroll = () => {
      hasScrolledRef.current = true;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      id="hero"
      className="relative h-screen hero-gradient"
      style={{
        padding: "4.17vw",
      }}
    >
      {/* Scalable Logo - Top Left */}
      <motion.div
        style={{
          width: "8.33vw",
          minWidth: "80px",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <Image
          src={
            theme === "light"
              ? "/avisio-logo-full-light.svg"
              : "/avisio-logo-full-dark.svg"
          }
          alt="Avisio"
          width={120}
          height={31}
          priority
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </motion.div>

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
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: TIMING.headlineDuration,
                delay: TIMING.headlineDelay[index],
                ease: "easeOut",
              }}
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
          }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
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
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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
      <HeroVisuals />

      {/* Temporary Theme Toggle - Top Right */}
      <motion.button
        type="button"
        onClick={toggleTheme}
        className="absolute top-[4.17vw] right-[4.17vw] z-10 flex items-center justify-center rounded-lg text-foreground bg-transparent hover:bg-foreground/10 transition-colors"
        style={{
          width: "2.78vw",
          height: "2.78vw",
          minWidth: "32px",
          minHeight: "32px",
          border: "1px solid var(--foreground-75)",
        }}
        aria-label={theme === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <svg
          className={`text-foreground transition-transform duration-300 ${theme === "light" ? "rotate-180" : "rotate-0"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          style={{ width: "50%", height: "50%" }}
        >
          {theme === "light" ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          )}
        </svg>
      </motion.button>
    </section>
  );
}
