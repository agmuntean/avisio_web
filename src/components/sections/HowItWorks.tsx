export default function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="px-6"
      style={{
        paddingTop: "10vw",
        paddingBottom: "10vw",
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-section-title text-foreground text-balance transition-colors">
          Ya en serio. Así funciona.
        </h2>

        <div
          className="flex flex-col"
          style={{
            marginTop: "8vw",
            gap: "6vw",
          }}
        >
          {/* Step 1 */}
          <div>
            <span className="inline-block font-sans text-sm font-semibold text-primary uppercase tracking-widest mb-4">
              Paso 1
            </span>
            <h3 className="font-display text-statement text-foreground transition-colors">
              Sube
            </h3>
            <p className="font-sans text-subhead text-muted-foreground mt-3 transition-colors">
              Arrastra el PDF de Hacienda
            </p>
          </div>

          {/* Step 2 */}
          <div>
            <span className="inline-block font-sans text-sm font-semibold text-primary uppercase tracking-widest mb-4">
              Paso 2
            </span>
            <h3 className="font-display text-statement text-foreground transition-colors">
              Revisa
            </h3>
            <p className="font-sans text-subhead text-muted-foreground mt-3 transition-colors">
              La IA extrae los datos, tú verificas
            </p>
          </div>

          {/* Step 3 */}
          <div>
            <span className="inline-block font-sans text-sm font-semibold text-primary uppercase tracking-widest mb-4">
              Paso 3
            </span>
            <h3 className="font-display text-statement text-foreground transition-colors">
              Aprueba
            </h3>
            <p className="font-sans text-subhead text-muted-foreground mt-3 transition-colors">
              Enviamos el aviso al cliente. Los recordatorios, automáticos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
