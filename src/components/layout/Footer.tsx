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
    <footer id="footer" className="fixed bottom-0 left-0 right-0 -z-10 bg-primary">
      <div className="container mx-auto px-6 py-12 md:py-16">
        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-8">
            Pruébalo con tus propios PDFs.
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-0 md:flex md:gap-4 md:items-end">
            <div className="flex-1">
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
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder:text-gray-900/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <div className="flex-1">
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
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder:text-gray-900/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <div className="flex-1">
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
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder:text-gray-900/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-white/90 hover:scale-105 transition-all duration-200"
            >
              Solicitar demo
            </button>
          </form>
        </div>

        {/* Legal Section */}
        <div className="border-t border-primary-foreground/20 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/70 text-sm font-sans">
              &copy; {new Date().getFullYear()} Axiomik Systems SL
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="text-primary-foreground/70 text-sm font-sans hover:text-primary-foreground transition-colors"
              >
                Privacidad
              </Link>
              <Link
                href="#"
                className="text-primary-foreground/70 text-sm font-sans hover:text-primary-foreground transition-colors"
              >
                Términos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
