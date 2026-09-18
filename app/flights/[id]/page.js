import { notFound } from "next/navigation";
import Link from "next/link";
import { BadgeCheck, Info, Luggage, PlaneTakeoff } from "lucide-react";
import { getFlightById } from "@/lib/flights";
import { findAirline } from "@/lib/airlines";
import { airportLabel } from "@/lib/airports";
import { formatDateLong, formatDuration, formatPrice } from "@/lib/format";
import BackButton from "@/components/BackButton";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const flight = getFlightById(id);
  if (!flight) return { title: "Vuelo no encontrado — AeroFind" };
  return {
    title: `${flight.originCode} → ${flight.destinationCode} · ${flight.flightNumber} — AeroFind`,
  };
}

export default async function FlightDetailPage({ params }) {
  const { id } = await params;
  const flight = getFlightById(id);
  if (!flight) notFound();

  const airline = findAirline(flight.airlineId);
  const searchQuery = new URLSearchParams({
    tripType: "oneway",
    origin: flight.originCode,
    destination: flight.destinationCode,
    departDate: flight.date,
    passengers: "1",
    cabin: "economy",
  }).toString();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
      <BackButton />

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
        <div className="flex items-center gap-3">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: airline.color }}
          >
            <PlaneTakeoff size={18} />
          </span>
          <div>
            <p className="font-semibold text-slate-900">{airline.name}</p>
            <p className="text-xs text-slate-400">
              Vuelo {flight.flightNumber} · {flight.aircraft}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-slate-900">{flight.departTime}</p>
            <p className="text-sm text-slate-500">{airportLabel(flight.originCode)}</p>
          </div>
          <div className="flex flex-1 flex-col items-center px-4 text-slate-300">
            <span className="text-xs text-slate-400">{formatDuration(flight.durationMinutes)}</span>
            <div className="my-1 h-px w-full bg-slate-200" />
            <span className="text-xs text-slate-400">
              {flight.stops === 0 ? "Directo" : `${flight.stops} escala${flight.stops > 1 ? "s" : ""}`}
            </span>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-slate-900">{flight.arriveTime}</p>
            <p className="text-sm text-slate-500">{airportLabel(flight.destinationCode)}</p>
          </div>
        </div>

        <p className="mt-3 text-center text-sm text-slate-400">{formatDateLong(flight.date)}</p>

        <div className="mt-6 grid grid-cols-1 gap-3 border-t border-slate-100 pt-6 sm:grid-cols-2">
          <Detail icon={<Luggage size={16} />} label="Equipaje" value="1 de mano incluido · bodega opcional" />
          <Detail icon={<BadgeCheck size={16} />} label="Asientos disponibles" value={`${flight.seatsAvailable} restantes`} />
          <Detail icon={<Info size={16} />} label="Cambios" value="Permitidos con cargo, hasta 24h antes (simulado)" />
          <Detail icon={<Info size={16} />} label="Cancelación" value="Reembolsable parcialmente (simulado)" />
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row">
          <div>
            <p className="text-xs text-slate-400">Precio por pasajero</p>
            <p className="text-2xl font-bold text-slate-900">{formatPrice(flight.price)}</p>
          </div>
          <Link
            href={`/search?${searchQuery}`}
            className="w-full rounded-lg bg-sky-600 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-sky-700 sm:w-auto"
          >
            Buscar este vuelo
          </Link>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-slate-400">
        Los datos de este vuelo son generados automáticamente para esta demo.
      </p>
    </div>
  );
}

function Detail({ icon, label, value }) {
  return (
    <div className="flex items-start gap-2.5 rounded-lg bg-slate-50 p-3">
      <span className="mt-0.5 text-sky-600">{icon}</span>
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-sm font-medium text-slate-700">{value}</p>
      </div>
    </div>
  );
}
