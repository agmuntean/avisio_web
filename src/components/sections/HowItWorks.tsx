export default function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="min-h-screen flex items-center justify-center py-section px-6"
    >
      <div className="max-w-4xl">
        <h2 className="font-display text-section-title text-foreground text-center text-balance transition-colors">
          Ya en serio. Así funciona.
        </h2>
        <div className="mt-20 md:mt-28 space-y-16 md:space-y-24">
          {/* Step 1 */}
          <div className="text-center">
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
          <div className="text-center">
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
          <div className="text-center">
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
