export default function Solution() {
  return (
    <section
      id="solucion"
      className="px-6"
      style={{
        paddingTop: "12vw",
        paddingBottom: "12vw",
      }}
    >
      {/* Headline - EDGE TO EDGE, mirror bookend to Problem */}
      <h2
        className="font-display text-foreground uppercase transition-colors text-center"
        style={{
          fontSize: "clamp(2.5rem, 10vw, 12rem)",
          lineHeight: 0.95,
          letterSpacing: "-0.03em",
        }}
      >
        CON AVISIO,
        <br />
        OTRO RITUAL.
      </h2>

      <div className="max-w-5xl mx-auto text-center">
        {/* Subhead - statement level, impactful */}
        <p
          className="font-sans text-muted-foreground transition-colors"
          style={{
            marginTop: "3vw",
            fontSize: "clamp(1.5rem, 4vw, 3rem)",
            lineHeight: 1.2,
          }}
        >
          Mismo PDF. Distinto final.
        </p>

        {/* 4 phrases - same treatment as Problem */}
        <div
          className="flex flex-col"
          style={{
            marginTop: "8vw",
            gap: "3vw",
          }}
        >
          <p
            className="font-sans text-foreground transition-colors"
            style={{ fontSize: "clamp(1.25rem, 3vw, 2.5rem)", lineHeight: 1.3 }}
          >
            Lo subes.
          </p>
          <p
            className="font-sans text-foreground transition-colors"
            style={{ fontSize: "clamp(1.25rem, 3vw, 2.5rem)", lineHeight: 1.3 }}
          >
            Lo leemos.
          </p>
          <p
            className="font-sans text-foreground transition-colors"
            style={{ fontSize: "clamp(1.25rem, 3vw, 2.5rem)", lineHeight: 1.3 }}
          >
            Lo apruebas.
          </p>
          <p
            className="font-sans text-foreground transition-colors"
            style={{ fontSize: "clamp(1.25rem, 3vw, 2.5rem)", lineHeight: 1.3 }}
          >
            Lo enviamos.
          </p>
        </div>

        {/* Closer - emotional payoff */}
        <div
          className="flex flex-col"
          style={{
            marginTop: "8vw",
            gap: "1.5vw",
          }}
        >
          <p
            className="font-sans text-muted-foreground transition-colors"
            style={{ fontSize: "clamp(1.25rem, 3vw, 2.5rem)", lineHeight: 1.3 }}
          >
            Tu cliente recibe el aviso.
          </p>
          {/* "Tú, el café." - THE emotional payoff, display font for emphasis */}
          <p
            className="font-display text-foreground transition-colors italic"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              lineHeight: 1.15,
            }}
          >
            Tú, el café.
          </p>
        </div>
      </div>
    </section>
  );
}
