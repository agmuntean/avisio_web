export default function Solution() {
  return (
    <section
      id="solucion"
      className="min-h-screen flex items-center justify-center py-section px-6"
    >
      <div className="max-w-4xl">
        <h2 className="font-display text-section-title text-foreground text-center text-balance transition-colors">
          Con Avisio, otro ritual.
        </h2>
        <p className="font-sans text-subhead text-muted-foreground text-center mt-4 transition-colors">
          Mismo PDF. Distinto final.
        </p>
        <div className="mt-16 md:mt-20 space-y-5 md:space-y-7">
          <p className="font-sans text-body-large text-foreground text-center transition-colors">
            Lo subes.
          </p>
          <p className="font-sans text-body-large text-foreground text-center transition-colors">
            Lo leemos.
          </p>
          <p className="font-sans text-body-large text-foreground text-center transition-colors">
            Lo apruebas.
          </p>
          <p className="font-sans text-body-large text-foreground text-center transition-colors">
            Lo enviamos.
          </p>
        </div>
        <div className="mt-16 md:mt-20 space-y-3">
          <p className="font-sans text-body-large text-muted-foreground text-center transition-colors">
            Tu cliente recibe el aviso.
          </p>
          <p className="font-display text-statement text-foreground text-center transition-colors">
            Tú, el café.
          </p>
        </div>
      </div>
    </section>
  );
}
