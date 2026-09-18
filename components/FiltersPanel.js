"use client";

import { AIRLINES } from "@/lib/airlines";
import { useLanguage } from "@/components/LanguageProvider";

export default function FiltersPanel({ filters, onChange, maxPrice }) {
  const { t } = useLanguage();

  function toggleAirline(id) {
    const next = new Set(filters.airlines);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onChange({ ...filters, airlines: next });
  }

  return (
    <aside className="w-full shrink-0 rounded-xl border border-slate-200 bg-white p-4 sm:w-56">
      <h3 className="text-sm font-semibold text-slate-900">{t("filters_title")}</h3>

      <div className="mt-4">
        <p className="text-xs font-medium text-slate-500 mb-2">{t("filters_stops")}</p>
        <div className="space-y-1.5">
          {[
            { value: "any", label: t("filters_stops_any") },
            { value: "direct", label: t("filters_stops_direct") },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="radio"
                name="stops"
                checked={filters.stops === opt.value}
                onChange={() => onChange({ ...filters, stops: opt.value })}
                className="accent-sky-600"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium text-slate-500 mb-2">
          {t("filters_max_price")}: {filters.maxPrice ? `USD ${filters.maxPrice}` : t("filters_no_limit")}
        </p>
        <input
          type="range"
          min={25}
          max={maxPrice}
          step={5}
          value={filters.maxPrice || maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-sky-600"
        />
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium text-slate-500 mb-2">{t("filters_airline")}</p>
        <div className="space-y-1.5">
          {AIRLINES.map((airline) => (
            <label key={airline.id} className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={filters.airlines.has(airline.id)}
                onChange={() => toggleAirline(airline.id)}
                className="accent-sky-600"
              />
              {airline.name}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium text-slate-500 mb-2">{t("filters_sort_by")}</p>
        <select
          value={filters.sort}
          onChange={(e) => onChange({ ...filters, sort: e.target.value })}
          className="w-full rounded-lg border border-slate-200 px-2 py-2 text-sm"
        >
          <option value="price">{t("filters_sort_price")}</option>
          <option value="duration">{t("filters_sort_duration")}</option>
          <option value="departTime">{t("filters_sort_departure")}</option>
        </select>
      </div>
    </aside>
  );
}
