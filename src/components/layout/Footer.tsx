"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function Footer() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    empresa: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Error al enviar");
      }

      setStatus("success");
      setFormData({ nombre: "", email: "", empresa: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Algo salió mal. Inténtalo de nuevo."
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <footer id="footer" className="fixed bottom-0 left-0 right-0 -z-10 bg-primary h-screen flex flex-col">
      <div className="container mx-auto px-6 flex-1 flex flex-col justify-center">
        {/* Centered Title */}
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white text-center mb-16">
          Hecho en Valencia.
        </h2>

        {/* Two Column Layout */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Left Column - About */}
          <div className="flex flex-col justify-start">
            <p className="font-sans text-white text-lg md:text-xl leading-relaxed mb-4">
              Avisio es un producto de <span className="font-semibold">Axiomik Systems SL</span>, una empresa de IA valenciana. Entendemos la burocracia española porque la sufrimos igual que tú. Y decidimos que ya era hora de hacer algo al respecto.
            </p>
            <p className="font-sans text-white/90 text-base md:text-lg leading-relaxed mb-4">
              Hoy procesamos aplazamientos, requerimientos y liquidaciones de la AEAT. Mañana, todo lo que Hacienda te envíe.
            </p>
            <p className="font-sans text-white font-semibold text-lg md:text-xl">
              Pruébalo con tus propios PDFs.
            </p>
          </div>

          {/* Right Column - Form */}
          <div>
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-center justify-center py-8"
              >
                {/* Pulsing glow ring */}
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: 120,
                    height: 120,
                    background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
                  }}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.6, 0, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Checkmark circle */}
                <motion.div
                  className="relative w-20 h-20 rounded-full flex items-center justify-center mb-6"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)",
                    backdropFilter: "blur(10px)",
                    border: "2px solid rgba(255,255,255,0.3)",
                  }}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                >
                  {/* Animated checkmark SVG */}
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-white"
                  >
                    <motion.path
                      d="M4 12.5L9.5 18L20 6"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.4,
                        ease: "easeOut"
                      }}
                    />
                  </svg>
                </motion.div>

                {/* Text content with stagger */}
                <motion.h3
                  className="font-display text-2xl md:text-3xl text-white text-center mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  ¡Perfecto!
                </motion.h3>

                <motion.p
                  className="font-sans text-white/90 text-center text-lg max-w-xs"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.65 }}
                >
                  Te escribiremos muy pronto.
                </motion.p>

                {/* Subtle decorative line */}
                <motion.div
                  className="mt-6 h-px w-16 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                />
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="nombre" className="sr-only">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    disabled={status === "loading"}
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={status === "loading"}
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="empresa" className="sr-only">
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="empresa"
                    name="empresa"
                    placeholder="Empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    required
                    disabled={status === "loading"}
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                {status === "error" && (
                  <p className="text-white/90 text-sm bg-red-500/30 rounded-lg px-4 py-2">
                    {errorMessage}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="relative w-full px-8 py-3.5 rounded-lg text-lg font-semibold text-white transition-all duration-300 mt-2 hover:scale-[1.03] overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{
                    background: "var(--gradient-cta)",
                  }}
                >
                  <span className="relative z-10">
                    {status === "loading" ? "Enviando..." : "Solicitar demo"}
                  </span>
                  <div
                    className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "var(--gradient-cta-hover)",
                    }}
                  />
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* Legal Section - pinned to bottom */}
      <div className="border-t border-white/20 px-6 py-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/70 text-sm font-sans">
            &copy; {new Date().getFullYear()} Axiomik Systems SL
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-white/70 text-sm font-sans hover:text-white transition-colors"
            >
              Privacidad
            </Link>
            <Link
              href="#"
              className="text-white/70 text-sm font-sans hover:text-white transition-colors"
            >
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
