"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlaneTakeoff, Ticket } from "lucide-react";
import { getAllBookings } from "@/lib/booking";
import { findAirline } from "@/lib/airlines";
import { airportLabel } from "@/lib/airports";
import { formatDateLong, formatPrice } from "@/lib/format";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    // Bookings only exist in this browser's localStorage, so they can only
    // be read after mount (hydration-safe: SSR has no access to it).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBookings(getAllBookings());
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-bold text-slate-900">Mis reservas</h1>
      <p className="mt-1 text-sm text-slate-500">
        Guardadas solo en este navegador — es una demo sin backend ni base de datos.
      </p>

      {bookings === null ? null : bookings.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-slate-200 bg-white p-10 text-center">
          <Ticket className="mx-auto text-slate-300" size={32} />
          <p className="mt-3 text-slate-500">Todavía no hiciste ninguna reserva.</p>
          <Link href="/" className="mt-4 inline-block text-sm font-semibold text-sky-600 underline">
            Buscar vuelos
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {bookings.map((booking) => {
            const first = booking.flights[0];
            const isRoundTrip = booking.flights.length > 1;
            const airline = findAirline(first.airlineId);
            return (
              <Link
                key={booking.id}
                href={`/confirmation/${booking.id}`}
                className="block rounded-xl border border-slate-200 bg-white p-4 hover:border-sky-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full text-white"
                      style={{ backgroundColor: airline.color }}
                    >
                      <PlaneTakeoff size={16} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {airportLabel(first.originCode)} → {airportLabel(first.destinationCode)}
                        {isRoundTrip && <span className="text-slate-400"> · ida y vuelta</span>}
                      </p>
                      <p className="text-xs text-slate-400">
                        Código {booking.id} · {formatDateLong(first.date)}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    {formatPrice(booking.totalPrice)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
