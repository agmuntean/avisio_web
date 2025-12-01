export default function Problem() {
  return (
    <section
      id="problema"
      className="min-h-screen flex items-center justify-center py-section px-6"
    >
      <div className="max-w-4xl">
        <h2 className="font-display text-section-title text-foreground text-center text-balance transition-colors">
          Cada notificación, el mismo ritual.
        </h2>
        <div className="mt-16 md:mt-20 space-y-5 md:space-y-7">
          <p className="font-sans text-body-large text-muted-foreground text-center transition-colors">
            Abrir el PDF.
          </p>
          <p className="font-sans text-body-large text-muted-foreground text-center transition-colors">
            Buscar los datos.
          </p>
          <p className="font-sans text-body-large text-muted-foreground text-center transition-colors">
            Copiar a mano.
          </p>
          <p className="font-sans text-body-large text-muted-foreground text-center transition-colors">
            Cruzar los dedos.
          </p>
          <p className="font-sans text-body-large text-muted-foreground text-center transition-colors">
            Recordar el vencimiento.
          </p>
          <p className="font-sans text-body-large text-muted-foreground text-center transition-colors">
            Avisar al cliente.
          </p>
        </div>
        <p className="font-sans text-statement text-foreground text-center mt-16 md:mt-20 font-medium transition-colors">
          Y mañana, otro más.
        </p>
      </div>
    </section>
  );
}
