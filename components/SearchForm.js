"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftRight, Loader2, Minus, Plus, Search } from "lucide-react";
import { AIRPORTS } from "@/lib/airports";
import { randomDelay } from "@/lib/delay";
import FareDatePicker from "@/components/FareDatePicker";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function SearchForm({ initial = {} }) {
  const router = useRouter();
  const [tripType, setTripType] = useState(initial.tripType || "oneway");
  const [origin, setOrigin] = useState(initial.origin || "EZE");
  const [destination, setDestination] = useState(initial.destination || "MDZ");
  const [departDate, setDepartDate] = useState(initial.departDate || todayISO());
  const [returnDate, setReturnDate] = useState(initial.returnDate || "");
  const [passengers, setPassengers] = useState(Number(initial.passengers) || 1);
  const [cabin, setCabin] = useState(initial.cabin || "economy");
  const [error, setError] = useState("");
  const [searching, setSearching] = useState(false);

  function swapAirports() {
    setOrigin(destination);
    setDestination(origin);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (origin === destination) {
      setError("El origen y el destino no pueden ser el mismo aeropuerto.");
      return;
    }
    if (!departDate) {
      setError("Elegí la fecha de ida.");
      return;
    }
    if (tripType === "roundtrip" && !returnDate) {
      setError("Elegí la fecha de vuelta.");
      return;
    }
    if (tripType === "roundtrip" && returnDate < departDate) {
      setError("La fecha de vuelta no puede ser anterior a la de ida.");
      return;
    }
    setError("");

    setSearching(true);
    await randomDelay();

    const params = new URLSearchParams({
      tripType,
      origin,
      destination,
      departDate,
      passengers: String(passengers),
      cabin,
    });
    if (tripType === "roundtrip" && returnDate) {
      params.set("returnDate", returnDate);
    }
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-2xl bg-white p-4 sm:p-6 shadow-lg shadow-slate-900/5 ring-1 ring-slate-200"
    >
      <div className="flex gap-4 mb-4 text-sm font-medium">
        {[
          { value: "oneway", label: "Solo ida" },
          { value: "roundtrip", label: "Ida y vuelta" },
        ].map((opt) => (
          <label
            key={opt.value}
            className={`flex items-center gap-2 cursor-pointer rounded-full px-3 py-1.5 ring-1 transition ${
              tripType === opt.value
                ? "bg-sky-600 text-white ring-sky-600"
                : "text-slate-600 ring-slate-200 hover:ring-slate-300"
            }`}
          >
            <input
              type="radio"
              name="tripType"
              value={opt.value}
              checked={tripType === opt.value}
              onChange={() => setTripType(opt.value)}
              className="sr-only"
            />
            {opt.label}
          </label>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-4">
          <label className="block text-xs font-medium text-slate-500 mb-1">Origen</label>
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            {AIRPORTS.map((a) => (
              <option key={a.code} value={a.code}>
                {a.city} ({a.code})
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-1 flex md:justify-center items-end pb-1">
          <button
            type="button"
            onClick={swapAirports}
            aria-label="Intercambiar origen y destino"
            className="rounded-full border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 hover:text-sky-600"
          >
            <ArrowLeftRight size={16} />
          </button>
        </div>

        <div className="md:col-span-4">
          <label className="block text-xs font-medium text-slate-500 mb-1">Destino</label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            {AIRPORTS.map((a) => (
              <option key={a.code} value={a.code}>
                {a.city} ({a.code})
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-3">
          <label className="block text-xs font-medium text-slate-500 mb-1">Pasajeros</label>
          <div className="flex items-center justify-between rounded-lg border border-slate-200 px-2 py-1.5">
            <button
              type="button"
              onClick={() => setPassengers((p) => Math.max(1, p - 1))}
              className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
              disabled={passengers <= 1}
              aria-label="Menos pasajeros"
            >
              <Minus size={14} />
            </button>
            <span className="text-sm font-medium">
              {passengers} {passengers === 1 ? "pasajero" : "pasajeros"}
            </span>
            <button
              type="button"
              onClick={() => setPassengers((p) => Math.min(6, p + 1))}
              className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
              disabled={passengers >= 6}
              aria-label="Más pasajeros"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        <div className="md:col-span-8">
          <label className="block text-xs font-medium text-slate-500 mb-1">
            {tripType === "roundtrip" ? "Fechas de ida y vuelta" : "Fecha de ida"}
          </label>
          <FareDatePicker
            mode={tripType === "roundtrip" ? "range" : "single"}
            originCode={origin}
            destinationCode={destination}
            startDate={departDate}
            endDate={returnDate}
            onChange={({ startDate, endDate }) => {
              setDepartDate(startDate);
              if (tripType === "roundtrip") setReturnDate(endDate || "");
            }}
          />
        </div>

        <div className="md:col-span-4">
          <label className="block text-xs font-medium text-slate-500 mb-1">Clase</label>
          <select
            value={cabin}
            onChange={(e) => setCabin(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="economy">Económica</option>
            <option value="business">Business</option>
          </select>
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}

      <button
        type="submit"
        disabled={searching}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-sky-600 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto md:px-8"
      >
        {searching ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Buscando…
          </>
        ) : (
          <>
            <Search size={16} />
            Buscar vuelos
          </>
        )}
      </button>
    </form>
  );
}
