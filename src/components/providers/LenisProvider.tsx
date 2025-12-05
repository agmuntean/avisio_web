"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";

type LenisContextType = {
  lenis: Lenis | null;
};

const LenisContext = createContext<LenisContextType>({ lenis: null });

export function useLenis() {
  return useContext(LenisContext);
}

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenisInstance;
    setLenis(lenisInstance);

    // Expose on window for components that need it
    window.lenis = lenisInstance;

    function raf(time: number) {
      if (isCancelled) return;
      lenisInstance.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }

    // Delay start to allow React hydration to complete
    const timeoutId = setTimeout(() => {
      if (!isCancelled) {
        rafIdRef.current = requestAnimationFrame(raf);
      }
    }, 100);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      lenisInstance.destroy();
      lenisRef.current = null;
      rafIdRef.current = null;
      setLenis(null);
      delete window.lenis;
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  );
}
