"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, SlidersHorizontal } from "lucide-react";
import SearchForm from "@/components/SearchForm";
import FlightCard from "@/components/FlightCard";
import FiltersPanel from "@/components/FiltersPanel";
import { generateFlights } from "@/lib/flights";
import { airportLabel } from "@/lib/airports";
import { formatDateLong, formatPrice } from "@/lib/format";
import { randomDelay } from "@/lib/delay";
import { useLanguage } from "@/components/LanguageProvider";

function applyFilters(flights, filters) {
  let list = flights.filter((f) => {
    if (filters.stops === "direct" && f.stops > 0) return false;
    if (filters.maxPrice && f.price > filters.maxPrice) return false;
    if (filters.airlines.size > 0 && !filters.airlines.has(f.airlineId)) return false;
    return true;
  });

  list = [...list].sort((a, b) => {
    if (filters.sort === "duration") return a.durationMinutes - b.durationMinutes;
    if (filters.sort === "departTime") return a.departTime.localeCompare(b.departTime);
    return a.price - b.price;
  });

  return list;
}

function defaultFilters() {
  return { stops: "any", maxPrice: null, airlines: new Set(), sort: "price" };
}

export default function SearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, lang } = useLanguage();

  const tripType = searchParams.get("tripType") || "oneway";
  const origin = searchParams.get("origin") || "";
  const destination = searchParams.get("destination") || "";
  const departDate = searchParams.get("departDate") || "";
  const returnDate = searchParams.get("returnDate") || "";
  const passengers = Number(searchParams.get("passengers")) || 1;
  const cabin = searchParams.get("cabin") || "economy";

  const outboundFlights = useMemo(
    () => generateFlights({ originCode: origin, destinationCode: destination, date: departDate }),
    [origin, destination, departDate]
  );
  const returnFlights = useMemo(
    () =>
      tripType === "roundtrip" && returnDate
        ? generateFlights({ originCode: destination, destinationCode: origin, date: returnDate })
        : [],
    [tripType, origin, destination, returnDate]
  );

  const [showModify, setShowModify] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  const [selectedOut, setSelectedOut] = useState(null);
  const [selectedIn, setSelectedIn] = useState(null);
  const [continuing, setContinuing] = useState(false);

  const maxPrice = useMemo(() => {
    const all = [...outboundFlights, ...returnFlights];
    return all.length ? Math.max(...all.map((f) => f.price)) : 100;
  }, [outboundFlights, returnFlights]);

  const filteredOutbound = useMemo(
    () => applyFilters(outboundFlights, filters),
    [outboundFlights, filters]
  );
  const filteredReturn = useMemo(
    () => applyFilters(returnFlights, filters),
    [returnFlights, filters]
  );

  const outFlight = outboundFlights.find((f) => f.id === selectedOut);
  const inFlight = returnFlights.find((f) => f.id === selectedIn);
  const readyToContinue = Boolean(outFlight) && (tripType !== "roundtrip" || Boolean(inFlight));
  const totalPrice = ((outFlight?.price || 0) + (inFlight?.price || 0)) * passengers;

  async function continueToBooking() {
    setContinuing(true);
    await randomDelay();
    const params = new URLSearchParams({
      tripType,
      out: selectedOut,
      passengers: String(passengers),
      cabin,
    });
    if (inFlight) params.set("in", selectedIn);
    router.push(`/booking?${params.toString()}`);
  }

  if (!origin || !destination || !departDate) {
    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 text-center text-slate-500">
        {t("results_missing_search")}{" "}
        <Link href="/" className="text-sky-600 underline">
          {t("common_back_to_home")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 pb-28">
      <div className="rounded-xl border border-slate-200 bg-white p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-slate-600">
          <span className="font-semibold text-slate-900">
            {airportLabel(origin)} → {airportLabel(destination)}
          </span>
          <span className="mx-2 text-slate-300">·</span>
          {formatDateLong(departDate, lang)}
          {returnDate && <> — {formatDateLong(returnDate, lang)}</>}
          <span className="mx-2 text-slate-300">·</span>
          {t("form_passenger_count", passengers)}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 sm:hidden"
          >
            <SlidersHorizontal size={14} />
            {t("results_mobile_filters")}
          </button>
          <button
            type="button"
            onClick={() => setShowModify((v) => !v)}
            className="text-sm font-medium text-sky-600 hover:underline"
          >
            {showModify ? t("results_hide") : t("results_modify_search")}
          </button>
        </div>
      </div>

      {showModify && (
        <div className="mt-4">
          <SearchForm
            initial={{ tripType, origin, destination, departDate, returnDate, passengers, cabin }}
          />
        </div>
      )}

      <div className="mt-6 flex flex-col gap-6 sm:flex-row">
        <div className={`${showFilters ? "block" : "hidden"} sm:block`}>
          <FiltersPanel filters={filters} onChange={setFilters} maxPrice={maxPrice} />
        </div>

        <div className="flex-1 space-y-8">
          <FlightSection
            title={`${t("results_outbound")} · ${airportLabel(origin)} → ${airportLabel(destination)}`}
            flights={filteredOutbound}
            selectedId={selectedOut}
            onSelect={setSelectedOut}
            noMatchLabel={t("results_no_match")}
          />

          {tripType === "roundtrip" && (
            <FlightSection
              title={`${t("results_return")} · ${airportLabel(destination)} → ${airportLabel(origin)}`}
              flights={filteredReturn}
              selectedId={selectedIn}
              onSelect={setSelectedIn}
              noMatchLabel={t("results_no_match")}
            />
          )}
        </div>
      </div>

      {readyToContinue && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3">
            <div className="text-sm text-slate-600">
              {t("results_estimated_total")}{" "}
              <span className="text-lg font-bold text-slate-900">{formatPrice(totalPrice, lang)}</span>{" "}
              <span className="text-slate-400">({t("summary_passenger_count", passengers)})</span>
            </div>
            <button
              type="button"
              onClick={continueToBooking}
              disabled={continuing}
              className="flex items-center gap-1.5 rounded-lg bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {continuing && <Loader2 size={14} className="animate-spin" />}
              {continuing ? t("results_confirming") : t("results_continue")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FlightSection({ title, flights, selectedId, onSelect, noMatchLabel }) {
  return (
    <div>
      <h2 className="mb-3 text-sm font-semibold text-slate-900">{title}</h2>
      {flights.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-400">
          {noMatchLabel}
        </p>
      ) : (
        <div className="space-y-3">
          {flights.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              selected={selectedId === flight.id}
              onSelect={() => onSelect(flight.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
