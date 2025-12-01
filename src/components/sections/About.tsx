export default function About() {
  return (
    <section
      id="sobre-nosotros"
      className="min-h-[70vh] flex items-center justify-center py-section-sm px-6"
    >
      <div className="max-w-4xl">
        <h2 className="font-display text-section-title text-foreground text-center text-balance transition-colors">
          Hecho en Valencia.
        </h2>
        <p className="font-sans text-subhead text-muted-foreground text-center mt-8 md:mt-10 max-w-2xl mx-auto transition-colors">
          Avisio es un producto de Axiomik Systems, una empresa de IA que entiende la burocracia española. Porque la sufrimos igual que tú.
        </p>
      </div>
    </section>
  );
}
