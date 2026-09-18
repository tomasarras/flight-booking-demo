export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 text-sm text-slate-500 space-y-2">
        <p className="font-medium text-slate-600">
          AeroFind es un proyecto de portfolio, no un sitio de venta de pasajes real.
        </p>
        <p>
          Todas las aerolíneas, vuelos, precios y disponibilidad son ficticios y se
          generan en el navegador. No se procesan pagos ni reservas reales — no
          ingreses datos reales de tarjetas ni documentos.
        </p>
        <p className="text-slate-400">
          Hecho por{" "}
          <a
            href="https://tomasarras.com.ar"
            className="underline hover:text-slate-600"
            target="_blank"
            rel="noreferrer"
          >
            Tomás Arras
          </a>{" "}
          · código en{" "}
          <a
            href="https://github.com/tomasarras/flight-booking-demo"
            className="underline hover:text-slate-600"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
