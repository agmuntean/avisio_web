"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-foreground-light/10 transition-colors"
      aria-label={theme === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
    >
      {/* Sun icon */}
      <svg
        className={`absolute w-5 h-5 transition-all duration-300 ${
          theme === "light" ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      {/* Moon icon */}
      <svg
        className={`absolute w-5 h-5 transition-all duration-300 ${
          theme === "dark" ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      setIsMenuOpen(false);

      // For footer, scroll to bottom of page since it's fixed
      if (id === "footer") {
        const lenis = window.lenis;
        if (lenis) {
          lenis.scrollTo("bottom", { duration: 1.2 });
        } else {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }
        return;
      }

      const element = document.getElementById(id);
      if (element) {
        const lenis = window.lenis;
        if (lenis) {
          lenis.scrollTo(element, {
            offset: -80,
            duration: 1.2,
          });
        } else {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    []
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/avisio-logo-full.svg"
              alt="Avisio"
              width={120}
              height={32}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <a
                href="#como-funciona"
                onClick={(e) => handleScroll(e, "como-funciona")}
                className="font-sans text-foreground-light hover:text-primary transition-colors"
              >
                Cómo funciona
              </a>
            </li>
            <li>
              <a
                href="#sobre-nosotros"
                onClick={(e) => handleScroll(e, "sobre-nosotros")}
                className="font-sans text-foreground-light hover:text-primary transition-colors"
              >
                Sobre nosotros
              </a>
            </li>
            <li>
              <a
                href="#footer"
                onClick={(e) => handleScroll(e, "footer")}
                className="font-sans bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Solicita una demo
              </a>
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-foreground-light transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-foreground-light transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-foreground-light transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-4 pt-6 pb-2">
            <li>
              <a
                href="#como-funciona"
                onClick={(e) => handleScroll(e, "como-funciona")}
                className="block font-sans text-foreground-light hover:text-primary transition-colors py-2"
              >
                Cómo funciona
              </a>
            </li>
            <li>
              <a
                href="#sobre-nosotros"
                onClick={(e) => handleScroll(e, "sobre-nosotros")}
                className="block font-sans text-foreground-light hover:text-primary transition-colors py-2"
              >
                Sobre nosotros
              </a>
            </li>
            <li>
              <a
                href="#footer"
                onClick={(e) => handleScroll(e, "footer")}
                className="inline-block font-sans bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Solicita una demo
              </a>
            </li>
            <li className="pt-2">
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
