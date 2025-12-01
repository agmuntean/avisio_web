export default function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="py-24 md:py-32 flex items-center justify-center"
    >
      <div className="container max-w-4xl">
        <h2 className="font-display text-3xl md:text-5xl text-foreground text-center transition-colors">
          Ya en serio. Así funciona.
        </h2>
        <div className="mt-16 md:mt-20 space-y-12 md:space-y-16">
          {/* Step 1 */}
          <div className="text-center">
            <span className="inline-block font-sans text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Paso 1
            </span>
            <h3 className="font-display text-2xl md:text-3xl text-foreground transition-colors">
              Sube
            </h3>
            <p className="font-sans text-lg md:text-xl text-muted-foreground mt-2 transition-colors">
              Arrastra el PDF de Hacienda
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <span className="inline-block font-sans text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Paso 2
            </span>
            <h3 className="font-display text-2xl md:text-3xl text-foreground transition-colors">
              Revisa
            </h3>
            <p className="font-sans text-lg md:text-xl text-muted-foreground mt-2 transition-colors">
              La IA extrae los datos, tú verificas
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <span className="inline-block font-sans text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Paso 3
            </span>
            <h3 className="font-display text-2xl md:text-3xl text-foreground transition-colors">
              Aprueba
            </h3>
            <p className="font-sans text-lg md:text-xl text-muted-foreground mt-2 transition-colors">
              Enviamos el aviso al cliente. Los recordatorios, automáticos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
