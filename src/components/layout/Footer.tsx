"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    empresa: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log("Form submitted:", formData);
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
              Avisio es un producto de <span className="font-semibold">Axiomik Systems SL</span>, una empresa tecnológica española especializada en soluciones de automatización inteligente para el sector asegurador.
            </p>
            <p className="font-sans text-white/90 text-base md:text-lg leading-relaxed mb-6">
              Nuestra misión es eliminar el trabajo manual repetitivo, permitiendo que los profesionales se concentren en lo que realmente importa: sus clientes.
            </p>
            <p className="font-sans text-white/70 text-base md:text-lg">
              Pruébalo con tus propios PDFs.
            </p>
          </div>

          {/* Right Column - Form */}
          <div>
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
                  className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
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
                  className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
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
                  className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                />
              </div>
              <button
                type="submit"
                className="relative w-full px-8 py-3.5 rounded-lg text-lg font-semibold text-white transition-all duration-300 mt-2 hover:scale-[1.03] overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #F5A030 0%, #EB7040 35%, #E05050 70%, #D64060 100%)",
                }}
              >
                <span className="relative z-10">Solicitar demo</span>
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(135deg, #FFB040 0%, #F58050 35%, #EA6060 70%, #E05070 100%)",
                  }}
                />
              </button>
            </form>
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
