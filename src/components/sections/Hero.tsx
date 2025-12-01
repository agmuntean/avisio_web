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
      className="relative min-h-screen flex items-center justify-center px-6"
    >
      <div className="relative z-10 max-w-5xl">
        <h1 className="font-display text-hero text-foreground text-center text-balance transition-colors">
          Hacienda manda. Tú apruebas. Nosotros curramos.
        </h1>
        <p className="font-sans text-subhead text-muted-foreground text-center mt-8 md:mt-10 max-w-2xl mx-auto transition-colors">
          Extracción con IA. Recordatorios inteligentes. Clientes informados.
        </p>
        <div className="flex justify-center mt-10 md:mt-14">
          <a
            href="#footer"
            onClick={handleCTAClick}
            className="font-sans bg-primary text-primary-foreground px-10 py-5 rounded-xl text-lg font-semibold hover:bg-primary/90 transition-all hover:scale-[1.02]"
          >
            Solicita una demo
          </a>
        </div>
      </div>
    </section>
  );
}
