"use client";

import { useCallback } from "react";

export default function Hero() {
  const handleCTAClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
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
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center"
    >
      <div className="container max-w-4xl">
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground text-center transition-colors">
          Hacienda manda. Tú apruebas. Nosotros curramos.
        </h1>
        <p className="font-sans text-lg md:text-xl text-muted-foreground text-center mt-6 md:mt-8 transition-colors">
          Extracción con IA. Recordatorios inteligentes. Clientes informados.
        </p>
        <div className="flex justify-center mt-8 md:mt-12">
          <a
            href="#footer"
            onClick={handleCTAClick}
            className="font-sans bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Solicita una demo
          </a>
        </div>
      </div>
    </section>
  );
}
