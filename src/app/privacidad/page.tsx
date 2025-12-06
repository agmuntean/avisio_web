import Link from "next/link";

export const metadata = {
  title: "Política de Privacidad - Avisio",
  description: "Política de privacidad de Avisio. Cómo recopilamos, usamos y protegemos tus datos personales.",
};

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl text-foreground mb-8">
          Política de Privacidad
        </h1>

        <p className="text-muted-foreground mb-8">
          Última actualización: diciembre 2024
        </p>

        <div className="prose prose-lg max-w-none space-y-8 text-foreground">
          <section>
            <h2 className="font-display text-2xl mb-4">1. Responsable del tratamiento</h2>
            <p className="text-foreground/80 leading-relaxed">
              <strong>Axiomik Systems SL</strong><br />
              CIF: B44797122<br />
              Domicilio: Calle Actor Enrique Rambal 7, Pta 17, 46120 Alboraya, Valencia<br />
              Email: <a href="mailto:info@axiomik.ai" className="text-primary hover:underline">info@axiomik.ai</a>
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">2. Datos que recopilamos</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Al solicitar una demo, recopilamos:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Nombre</li>
              <li>Dirección de email</li>
              <li>Nombre de la empresa</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">3. Finalidad del tratamiento</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Utilizamos tus datos para:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Gestionar tu solicitud de demo</li>
              <li>Contactarte para programar la demostración</li>
              <li>Enviarte información sobre Avisio (solo si consientes)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">4. Base legal</h2>
            <p className="text-foreground/80 leading-relaxed">
              El tratamiento se basa en tu consentimiento al enviar el formulario de solicitud de demo (Art. 6.1.a RGPD) y en el interés legítimo de responder a tu petición (Art. 6.1.f RGPD).
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">5. Destinatarios</h2>
            <p className="text-foreground/80 leading-relaxed">
              Tus datos se almacenan en <strong>Brevo</strong> (Sendinblue), nuestro proveedor de email marketing, que cumple con el RGPD y tiene sus servidores en la UE.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">6. Conservación</h2>
            <p className="text-foreground/80 leading-relaxed">
              Conservaremos tus datos mientras exista una relación comercial o interés legítimo. Puedes solicitar su eliminación en cualquier momento.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">7. Tus derechos</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Tienes derecho a:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Acceder a tus datos personales</li>
              <li>Rectificar datos inexactos</li>
              <li>Solicitar la supresión de tus datos</li>
              <li>Oponerte al tratamiento</li>
              <li>Solicitar la portabilidad de tus datos</li>
              <li>Retirar tu consentimiento en cualquier momento</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed mt-4">
              Para ejercer estos derechos, escríbenos a{" "}
              <a href="mailto:info@axiomik.ai" className="text-primary hover:underline">info@axiomik.ai</a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">8. Reclamaciones</h2>
            <p className="text-foreground/80 leading-relaxed">
              Si consideras que tus derechos no han sido atendidos correctamente, puedes presentar una reclamación ante la{" "}
              <a
                href="https://www.aepd.es"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Agencia Española de Protección de Datos (AEPD)
              </a>.
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
