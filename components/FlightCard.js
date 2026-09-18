"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Luggage, PlaneTakeoff } from "lucide-react";
import { findAirline } from "@/lib/airlines";
import { formatDuration, formatPrice } from "@/lib/format";
import { randomDelay } from "@/lib/delay";

export default function FlightCard({ flight, selected, onSelect }) {
  const [selecting, setSelecting] = useState(false);
  const airline = findAirline(flight.airlineId);
  const stopsLabel =
    flight.stops === 0 ? "Directo" : `${flight.stops} escala${flight.stops > 1 ? "s" : ""}`;

  async function handleSelect() {
    setSelecting(true);
    await randomDelay();
    onSelect();
    setSelecting(false);
  }

  return (
    <div
      className={`rounded-xl border bg-white p-4 sm:p-5 transition ${
        selected ? "border-sky-500 ring-2 ring-sky-100" : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: airline.color }}
          >
            <PlaneTakeoff size={16} />
          </span>
          <div>
            <p className="text-sm font-medium text-slate-900">{airline.name}</p>
            <p className="text-xs text-slate-400">
              Vuelo {flight.flightNumber} · {flight.aircraft}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-8">
          <div className="text-center">
            <p className="text-lg font-semibold text-slate-900">{flight.departTime}</p>
            <p className="text-xs text-slate-400">{flight.originCode}</p>
          </div>
          <div className="flex flex-col items-center text-slate-300">
            <span className="text-[11px] text-slate-400">{formatDuration(flight.durationMinutes)}</span>
            <div className="my-1 h-px w-16 bg-slate-200 sm:w-24" />
            <span className="text-[11px] text-slate-400">{stopsLabel}</span>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-slate-900">{flight.arriveTime}</p>
            <p className="text-xs text-slate-400">{flight.destinationCode}</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center">
          <div className="text-right">
            <p className="text-xl font-bold text-slate-900">{formatPrice(flight.price)}</p>
            <p className="text-xs text-slate-400">por pasajero</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Luggage size={14} />
            1 equipaje de mano incluido
          </span>
          <span>{flight.seatsAvailable} asientos disponibles</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/flights/${flight.id}`}
            className="text-xs font-medium text-slate-500 underline-offset-2 hover:text-sky-600 hover:underline"
          >
            Ver detalle
          </Link>
          <button
            type="button"
            onClick={handleSelect}
            disabled={selecting}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70 ${
              selected
                ? "bg-sky-600 text-white"
                : "bg-slate-900 text-white hover:bg-sky-600"
            }`}
          >
            {selecting && <Loader2 size={14} className="animate-spin" />}
            {selecting ? "Seleccionando…" : selected ? "Seleccionado" : "Seleccionar"}
          </button>
        </div>
      </div>
    </div>
  );
}
