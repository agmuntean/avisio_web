export default function About() {
  return (
    <section
      id="sobre-nosotros"
      className="px-6"
      style={{
        paddingTop: "8vw",
        paddingBottom: "8vw",
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-section-title text-foreground text-balance transition-colors">
          Hecho en Valencia.
        </h2>
        <p
          className="font-sans text-subhead text-muted-foreground max-w-2xl mx-auto transition-colors"
          style={{ marginTop: "2vw" }}
        >
          Avisio es un producto de Axiomik Systems, una empresa de IA que entiende la burocracia española. Porque la sufrimos igual que tú.
        </p>
      </div>
    </section>
  );
}
