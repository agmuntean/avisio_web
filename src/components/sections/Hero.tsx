"use client";

import { useCallback } from "react";
import Image from "next/image";
import { useTheme } from "@/components/providers/ThemeProvider";
import HeroVisuals from "./HeroVisuals";

export default function Hero() {
  const { theme, toggleTheme } = useTheme();

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

  return (
    <section
      id="hero"
      className="relative h-screen hero-gradient"
      style={{
        // Proportional padding from edges (based on 1440px viewport)
        // ~60px padding at 1440px = 4.17vw
        padding: "4.17vw",
      }}
    >
      {/* Scalable Logo - Top Left */}
      {/* Reference: 120px at 1440px viewport */}
      {/* Width: 120/1440 = 8.33vw */}
      <div
        style={{
          width: "8.33vw",
          minWidth: "80px", // Minimum for readability
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
      </div>

      {/* Hero Content - Left Side, Vertically Centered */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2"
        style={{
          // Left padding matches section padding
          paddingLeft: "4.17vw",
          // Wider container to fit 3 lines
          width: "55vw",
        }}
      >
        {/* Headline - 3 lines, each in a span for animation */}
        {/* At 1440px, 80px = 5.56vw */}
        <h1
          className="font-display text-foreground transition-colors"
          style={{
            fontSize: "5.56vw",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          <span className="block">Hacienda manda.</span>
          <span className="block">Tú apruebas.</span>
          <span className="block">Nosotros curramos.</span>
        </h1>

        {/* Subhead - 3 lines */}
        {/* At 1440px, roughly 24-28px = ~1.67-1.94vw */}
        <div
          className="font-sans text-muted-foreground transition-colors"
          style={{
            fontSize: "1.67vw",
            lineHeight: 1.6,
            marginTop: "2.78vw",
          }}
        >
          <p>Extracción con IA.</p>
          <p>Recordatorios inteligentes.</p>
          <p>Clientes informados.</p>
        </div>

        {/* CTA Button */}
        <div
          style={{
            marginTop: "3.47vw", // ~50px at 1440px
          }}
        >
          <a
            href="#footer"
            onClick={handleCTAClick}
            className="font-sans bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all hover:scale-[1.02] inline-block"
            style={{
              fontSize: "1.04vw", // ~15px at 1440px
              padding: "0.83vw 1.67vw", // ~12px 24px at 1440px
            }}
          >
            Solicita una demo
          </a>
        </div>
      </div>

      {/* Hero Visuals - Blob + Sphere on right side */}
      <HeroVisuals />

      {/* Temporary Theme Toggle - Top Right */}
      <button
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
      </button>
    </section>
  );
}
