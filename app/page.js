import SearchForm from "@/components/SearchForm";
import { AIRPORTS } from "@/lib/airports";
import { ShieldCheck, Sparkles, Tag } from "lucide-react";

const FEATURED = ["MDZ", "BRC", "SCL", "GRU", "MIA", "MAD"];

export default function HomePage() {
  const destinations = FEATURED.map((code) => AIRPORTS.find((a) => a.code === code)).filter(
    Boolean
  );

  return (
    <div>
      <section className="bg-gradient-to-b from-sky-600 to-sky-700">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-14 pb-24 text-center text-white">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
            <Sparkles size={12} />
            Proyecto demo de portfolio · datos ficticios
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
            Buscá y &quot;reservá&quot; vuelos en segundos
          </h1>
          <p className="mt-2 text-sky-100 max-w-xl mx-auto">
            AeroFind es un buscador de vuelos ficticio construido como pieza de portfolio:
            aerolíneas, precios y disponibilidad se generan en el momento, no hay backend
            ni pagos reales.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 -mt-16 pb-16">
        <SearchForm />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <InfoCard
            icon={<Tag size={18} />}
            title="Precios simulados"
            text="Cada búsqueda genera tarifas y horarios de forma determinística a partir del origen, destino y fecha."
          />
          <InfoCard
            icon={<ShieldCheck size={18} />}
            title="Sin datos reales"
            text="No se guarda información en ningún servidor: las reservas quedan solo en tu navegador (localStorage)."
          />
          <InfoCard
            icon={<Sparkles size={18} />}
            title="Aerolíneas ficticias"
            text="Aurora Airways, Cóndor Azul y otras marcas inventadas para este demo — ninguna existe en la realidad."
          />
        </div>

        <div className="mt-12">
          <h2 className="text-lg font-semibold text-slate-900">Destinos populares</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {destinations.map((d) => (
              <div
                key={d.code}
                className="rounded-xl border border-slate-200 bg-white p-4 text-center"
              >
                <p className="text-sm font-semibold text-slate-900">{d.city}</p>
                <p className="text-xs text-slate-400">{d.code}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, text }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
        {icon}
      </span>
      <p className="mt-3 text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{text}</p>
    </div>
  );
}
