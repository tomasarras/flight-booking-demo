import { Suspense } from "react";
import SearchResults from "./SearchResults";

export const metadata = {
  title: "Resultados de búsqueda — AeroFind",
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 text-slate-400">Cargando resultados…</div>}>
      <SearchResults />
    </Suspense>
  );
}
