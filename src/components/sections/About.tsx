export default function About() {
  return (
    <section
      id="sobre-nosotros"
      className="py-24 md:py-32 flex items-center justify-center"
    >
      <div className="container max-w-3xl">
        <h2 className="font-display text-3xl md:text-5xl text-foreground text-center transition-colors">
          Hecho en Valencia.
        </h2>
        <p className="font-sans text-lg md:text-xl text-muted-foreground text-center mt-6 md:mt-8 transition-colors">
          Avisio es un producto de Axiomik Systems, una empresa de IA que entiende la burocracia española. Porque la sufrimos igual que tú.
        </p>
      </div>
    </section>
  );
}
