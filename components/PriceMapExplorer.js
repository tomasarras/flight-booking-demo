"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { AIRPORTS, findAirport } from "@/lib/airports";
import { buildDestinationFares } from "@/lib/priceMap";
import { useLanguage } from "@/components/LanguageProvider";

const PriceMap = dynamic(() => import("@/components/PriceMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-slate-400">
      <Loader2 className="animate-spin" size={18} />
    </div>
  ),
});

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export default function PriceMapExplorer({ heightClass = "h-[520px]", defaultOrigin = "EZE" }) {
  const { t } = useLanguage();
  const [originCode, setOriginCode] = useState(defaultOrigin);
  const [date, setDate] = useState(todayISO());

  const origin = findAirport(originCode);
  const destinations = useMemo(
    () => buildDestinationFares({ originCode, date }),
    [originCode, date]
  );

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="sm:w-64">
          <label className="block text-xs font-medium text-slate-500 mb-1">{t("map_origin")}</label>
          <select
            value={originCode}
            onChange={(e) => setOriginCode(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            {AIRPORTS.map((a) => (
              <option key={a.code} value={a.code}>
                {a.city} ({a.code})
              </option>
            ))}
          </select>
        </div>
        <div className="sm:w-52">
          <label className="block text-xs font-medium text-slate-500 mb-1">{t("map_date")}</label>
          <input
            type="date"
            min={todayISO()}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>
      </div>

      <div className={`mt-6 overflow-hidden rounded-2xl border border-slate-200 ${heightClass}`}>
        <PriceMap origin={origin} destinations={destinations} originCode={originCode} date={date} />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
        <Legend color="bg-emerald-500" label={t("map_price_level_cheap")} />
        <Legend color="bg-amber-500" label={t("map_price_level_mid")} />
        <Legend color="bg-rose-500" label={t("map_price_level_high")} />
        <Legend color="bg-slate-900" label={t("map_your_origin")} />
      </div>
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
      {label}
    </span>
  );
}
