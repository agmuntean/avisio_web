import Link from "next/link";

export const metadata = {
  title: "Términos de Uso - Avisio",
  description: "Términos y condiciones de uso del sitio web de Avisio.",
};

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl text-foreground mb-8">
          Términos de Uso
        </h1>

        <p className="text-muted-foreground mb-8">
          Última actualización: diciembre 2024
        </p>

        <div className="prose prose-lg max-w-none space-y-8 text-foreground">
          <section>
            <h2 className="font-display text-2xl mb-4">1. Identificación</h2>
            <p className="text-foreground/80 leading-relaxed">
              Este sitio web es propiedad de <strong>Axiomik Systems SL</strong>, con CIF B44797122 y domicilio en Calle Actor Enrique Rambal 7, Pta 17, 46120 Alboraya, Valencia.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">2. Objeto</h2>
            <p className="text-foreground/80 leading-relaxed">
              Este sitio web tiene como finalidad presentar el producto Avisio y permitir a los usuarios solicitar una demostración del servicio.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">3. Uso del sitio</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              El usuario se compromete a:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Utilizar el sitio de forma lícita y conforme a estos términos</li>
              <li>No introducir datos falsos en los formularios</li>
              <li>No intentar acceder a áreas restringidas del sitio</li>
              <li>No realizar acciones que puedan dañar, inutilizar o sobrecargar el sitio</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">4. Propiedad intelectual</h2>
            <p className="text-foreground/80 leading-relaxed">
              Todos los contenidos del sitio (textos, imágenes, logos, diseño, código) son propiedad de Axiomik Systems SL o se utilizan con autorización. Queda prohibida su reproducción, distribución o modificación sin autorización expresa.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">5. Limitación de responsabilidad</h2>
            <p className="text-foreground/80 leading-relaxed">
              Axiomik Systems SL no garantiza la disponibilidad continua del sitio web y no será responsable de:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80 mt-4">
              <li>Interrupciones temporales del servicio</li>
              <li>Errores técnicos o de contenido</li>
              <li>Daños derivados del uso del sitio por parte del usuario</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">6. Enlaces externos</h2>
            <p className="text-foreground/80 leading-relaxed">
              Este sitio puede contener enlaces a sitios de terceros. Axiomik Systems SL no se hace responsable del contenido ni de las políticas de privacidad de dichos sitios.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">7. Modificaciones</h2>
            <p className="text-foreground/80 leading-relaxed">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos desde su publicación en esta página.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">8. Legislación aplicable</h2>
            <p className="text-foreground/80 leading-relaxed">
              Estos términos se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales de Valencia.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">9. Contacto</h2>
            <p className="text-foreground/80 leading-relaxed">
              Para cualquier consulta sobre estos términos, puedes escribirnos a{" "}
              <a href="mailto:info@axiomik.ai" className="text-primary hover:underline">info@axiomik.ai</a>.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <Link
            href="/"
            className="text-primary hover:underline font-medium"
          >
            ← Volver a la página principal
          </Link>
        </div>
      </div>
    </main>
  );
}
