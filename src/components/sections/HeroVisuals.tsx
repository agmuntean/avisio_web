"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function HeroVisuals() {
  const { theme, mounted } = useTheme();

  // Blob native: 1067×1091, Sphere native: 391×395
  // Sphere is ~37% the size of blob (391/1067 ≈ 0.37)
  // Container sized to blob, sphere scaled down inside

  return (
    <div
      className="absolute top-1/2 -translate-y-1/2"
      style={{
        right: "2vw",
        width: "51.4vw",
        height: "52.6vw",
      }}
    >
      <motion.div
        className="w-full h-full"
        style={{ transformOrigin: "center center" }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0.8 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        {/* Blob - fills container */}
        <div className="absolute inset-0">
          {mounted && (
            <Image
              src={
                theme === "light"
                  ? "/hero-blob-light.svg"
                  : "/hero-blob-dark.svg"
              }
              alt=""
              fill
              style={{
                objectFit: "contain",
              }}
              priority
            />
          )}
        </div>

        {/* Sphere - centered, ~37% of blob size */}
        <div
          className="absolute"
          style={{
            zIndex: 1,
            top: "50%",
            left: "calc(50% + 1.39vw)",
            transform: "translate(-50%, -50%)",
            width: "37%",
            height: "37%",
          }}
        >
          {mounted && (
            <Image
              src="/hero-sphere.svg"
              alt=""
              fill
              style={{
                objectFit: "contain",
              }}
              priority
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}
