"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, PlaneTakeoff } from "lucide-react";
import { getBooking } from "@/lib/booking";
import { findAirline } from "@/lib/airlines";
import { airportLabel } from "@/lib/airports";
import { formatDateLong, formatDuration, formatPrice } from "@/lib/format";

export default function ConfirmationClient({ bookingId }) {
  const [booking, setBooking] = useState(undefined);

  useEffect(() => {
    // Bookings only exist in this browser's localStorage, so they can only
    // be read after mount (hydration-safe: SSR has no access to it).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBooking(getBooking(bookingId));
  }, [bookingId]);

  if (booking === undefined) {
    return <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 text-center text-slate-400">Cargando…</div>;
  }

  if (!booking) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 text-center text-slate-500">
        <p>No encontramos esta reserva en este navegador.</p>
        <p className="mt-1 text-sm text-slate-400">
          Las reservas de esta demo se guardan solo localmente y no son visibles desde otro
          dispositivo o navegador.
        </p>
        <Link href="/" className="mt-4 inline-block text-sky-600 underline">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <div className="text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 size={28} />
        </span>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Reserva simulada confirmada</h1>
        <p className="mt-1 text-slate-500">
          Código de reserva <span className="font-mono font-semibold text-slate-900">{booking.id}</span>
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {booking.flights.map((flight, idx) => {
          const airline = findAirline(flight.airlineId);
          return (
            <div key={idx} className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: airline.color }}
                  >
                    <PlaneTakeoff size={16} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{airline.name}</p>
                    <p className="text-xs text-slate-400">Vuelo {flight.flightNumber}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400">{formatDateLong(flight.date)}</p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-slate-900">{flight.departTime}</p>
                  <p className="text-xs text-slate-400">{airportLabel(flight.originCode)}</p>
                </div>
                <p className="text-xs text-slate-400">{formatDuration(flight.durationMinutes)}</p>
                <div className="text-right">
                  <p className="text-lg font-semibold text-slate-900">{flight.arriveTime}</p>
                  <p className="text-xs text-slate-400">{airportLabel(flight.destinationCode)}</p>
                </div>
              </div>

              <p className="mt-3 border-t border-slate-100 pt-3 text-xs text-slate-500">
                Asientos: <span className="font-medium text-slate-700">{flight.seats.join(", ")}</span>
              </p>
            </div>
          );
        })}

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Pasajeros</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {booking.passengers.map((p, idx) => (
              <li key={idx}>
                {p.firstName} {p.lastName} · Doc. {p.document}
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
            <span className="text-sm font-medium text-slate-600">Total pagado (simulado)</span>
            <span className="text-xl font-bold text-slate-900">{formatPrice(booking.totalPrice)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/my-bookings"
          className="flex-1 rounded-lg bg-slate-900 py-3 text-center text-sm font-semibold text-white hover:bg-slate-800"
        >
          Ver mis reservas
        </Link>
        <Link
          href="/"
          className="flex-1 rounded-lg border border-slate-200 py-3 text-center text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          Buscar otro vuelo
        </Link>
      </div>
    </div>
  );
}
