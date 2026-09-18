import { MapPin } from "lucide-react";
import PriceMapExplorer from "@/components/PriceMapExplorer";

export const metadata = {
  title: "Mapa de precios — AeroFind",
};

export default function MapPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
      <div className="flex items-center gap-2 text-slate-900">
        <MapPin size={22} className="text-sky-600" />
        <h1 className="text-2xl font-bold">Mapa de precios</h1>
      </div>
      <p className="mt-1 text-sm text-slate-500">
        Precio estimado más barato desde tu origen a cada destino, para la fecha elegida. Mapa
        con datos de{" "}
        <a
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-slate-700"
        >
          OpenStreetMap
        </a>
        .
      </p>

      <div className="mt-6">
        <PriceMapExplorer heightClass="h-[520px]" />
      </div>
    </div>
  );
}
