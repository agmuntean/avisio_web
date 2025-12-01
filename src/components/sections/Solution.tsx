export default function Solution() {
  return (
    <section
      id="solucion"
      className="py-24 md:py-32 flex items-center justify-center"
    >
      <div className="container max-w-3xl">
        <h2 className="font-display text-3xl md:text-5xl text-foreground text-center transition-colors">
          Con Avisio, otro ritual.
        </h2>
        <p className="font-sans text-xl md:text-2xl text-muted-foreground text-center mt-4 transition-colors">
          Mismo PDF. Distinto final.
        </p>
        <div className="mt-12 md:mt-16 space-y-4 md:space-y-6">
          <p className="font-sans text-xl md:text-2xl text-foreground text-center transition-colors">
            Lo subes.
          </p>
          <p className="font-sans text-xl md:text-2xl text-foreground text-center transition-colors">
            Lo leemos.
          </p>
          <p className="font-sans text-xl md:text-2xl text-foreground text-center transition-colors">
            Lo apruebas.
          </p>
          <p className="font-sans text-xl md:text-2xl text-foreground text-center transition-colors">
            Lo enviamos.
          </p>
        </div>
        <div className="mt-12 md:mt-16 space-y-2">
          <p className="font-sans text-xl md:text-2xl text-muted-foreground text-center transition-colors">
            Tu cliente recibe el aviso.
          </p>
          <p className="font-display text-2xl md:text-3xl text-foreground text-center transition-colors">
            Tú, el café.
          </p>
        </div>
      </div>
    </section>
  );
}
