"use client";

import Image from "next/image";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function HeroVisuals() {
  const { theme } = useTheme();

  // Blob native: 1067×1091, Sphere native: 391×395
  // Sphere is ~37% the size of blob (391/1067 ≈ 0.37)
  // Container sized to blob, sphere scaled down inside

  return (
    <div
      className="absolute top-1/2 -translate-y-1/2"
      style={{
        // Position on right side - closer to edge
        right: "2vw",
        // Size based on blob: ~740px at 1440px = 51.4vw
        width: "51.4vw",
        height: "52.6vw", // slightly taller (1091/1067 ratio)
      }}
    >
      {/* Blob - fills container */}
      <div className="absolute inset-0">
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
      </div>

      {/* Sphere - centered, ~37% of blob size */}
      <div
        className="absolute"
        style={{
          zIndex: 1,
          // Center the sphere within the blob, offset ~20px to the right
          top: "50%",
          left: "calc(50% + 1.39vw)",
          transform: "translate(-50%, -50%)",
          // Sphere is 37% of blob width
          width: "37%",
          height: "37%",
        }}
      >
        <Image
          src="/hero-sphere.svg"
          alt=""
          fill
          style={{
            objectFit: "contain",
          }}
          priority
        />
      </div>
    </div>
  );
}
