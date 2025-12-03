import type { Metadata } from "next";
import { DM_Serif_Display, IBM_Plex_Sans } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import BackgroundLayer from "@/components/background/BackgroundLayer";

const dmSerif = DM_Serif_Display({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
});

const ibmPlex = IBM_Plex_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex",
});

export const metadata: Metadata = {
  title: "Avisio - Automatiza las notificaciones de la AEAT",
  description:
    "Avisio automatiza el procesamiento de notificaciones de la AEAT para gestorías. Reduce el tiempo de gestión de documentos de 30-40 minutos a menos de 5.",
};

// Blocking script to prevent theme flash - runs before React hydration
const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('avisio-theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${dmSerif.variable} ${ibmPlex.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans">
        <ThemeProvider>
          <LenisProvider>
            <BackgroundLayer>
              <Header />
              {children}
              <Footer />
            </BackgroundLayer>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
