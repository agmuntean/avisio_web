import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="font-display text-6xl md:text-8xl text-foreground mb-4">404</h1>
      <p className="font-sans text-xl text-muted-foreground mb-8">
        Página no encontrada
      </p>
      <Link
        href="/"
        className="font-sans text-primary hover:underline"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
