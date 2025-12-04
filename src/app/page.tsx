import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import Trust from "@/components/sections/Trust";

export default function Home() {
  return (
    <main className="relative z-10 bg-background pb-24 footer-reveal-spacer transition-colors duration-300">
      <Hero />
      <Problem />
      <Solution />
      <Trust />
    </main>
  );
}
