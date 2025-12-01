export default function Problem() {
  return (
    <section
      id="problema"
      className="py-24 md:py-32 flex items-center justify-center"
    >
      <div className="container max-w-3xl">
        <h2 className="font-display text-3xl md:text-5xl text-foreground text-center transition-colors">
          Cada notificación, el mismo ritual.
        </h2>
        <div className="mt-12 md:mt-16 space-y-6 md:space-y-8">
          <p className="font-sans text-xl md:text-2xl text-muted-foreground text-center transition-colors">
            Abrir el PDF. Buscar los datos.
          </p>
          <p className="font-sans text-xl md:text-2xl text-muted-foreground text-center transition-colors">
            Copiar a mano. Cruzar los dedos.
          </p>
          <p className="font-sans text-xl md:text-2xl text-muted-foreground text-center transition-colors">
            Recordar el vencimiento. Avisar al cliente.
          </p>
        </div>
        <p className="font-sans text-xl md:text-2xl text-foreground text-center mt-12 md:mt-16 font-medium transition-colors">
          Y mañana, otro más.
        </p>
      </div>
    </section>
  );
}
