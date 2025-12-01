import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import HowItWorks from "@/components/sections/HowItWorks";
import Trust from "@/components/sections/Trust";
import About from "@/components/sections/About";

export default function Home() {
  return (
    <main className="relative z-10 bg-background-base pb-24 footer-reveal-spacer transition-colors duration-300">
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Trust />
      <About />
    </main>
  );
}
