"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Lock, ShieldAlert } from "lucide-react";
import { getFlightById, generateSeatMap } from "@/lib/flights";
import { findAirline } from "@/lib/airlines";
import { airportLabel } from "@/lib/airports";
import { formatDuration, formatPrice } from "@/lib/format";
import { generateBookingRef, saveBooking } from "@/lib/booking";
import { randomDelay } from "@/lib/delay";
import StepIndicator from "@/components/StepIndicator";
import PassengerForm from "@/components/PassengerForm";
import SeatMap from "@/components/SeatMap";

const STEPS = ["Pasajeros", "Asientos", "Pago"];

function emptyPassenger() {
  return { firstName: "", lastName: "", document: "", birthDate: "", email: "" };
}

export default function BookingFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const outId = searchParams.get("out");
  const inId = searchParams.get("in");
  const passengerCount = Number(searchParams.get("passengers")) || 1;
  const cabin = searchParams.get("cabin") || "economy";

  const outFlight = useMemo(() => (outId ? getFlightById(outId) : null), [outId]);
  const inFlight = useMemo(() => (inId ? getFlightById(inId) : null), [inId]);

  const [step, setStep] = useState(1);
  const [passengers, setPassengers] = useState(
    Array.from({ length: passengerCount }, emptyPassenger)
  );
  const [seatsOut, setSeatsOut] = useState([]);
  const [seatsIn, setSeatsIn] = useState([]);
  const [payment, setPayment] = useState({ name: "", number: "", expiry: "", cvv: "" });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const seatMapOut = useMemo(() => (outFlight ? generateSeatMap(outFlight.id) : []), [outFlight]);
  const seatMapIn = useMemo(() => (inFlight ? generateSeatMap(inFlight.id) : []), [inFlight]);

  if (!outFlight) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 text-center text-slate-500">
        No encontramos ese vuelo.{" "}
        <Link href="/" className="text-sky-600 underline">
          Volver a buscar
        </Link>
      </div>
    );
  }

  const totalPrice = (outFlight.price + (inFlight?.price || 0)) * passengerCount;

  function updatePassenger(idx, value) {
    setPassengers((prev) => prev.map((p, i) => (i === idx ? value : p)));
  }

  function toggleSeat(list, setList, code, max) {
    setList((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : prev.length < max ? [...prev, code] : prev
    );
  }

  async function goToStep2() {
    const incomplete = passengers.some(
      (p) => !p.firstName || !p.lastName || !p.document || !p.birthDate
    );
    if (incomplete || !passengers[0].email) {
      setError("Completá todos los campos de cada pasajero.");
      return;
    }
    setError("");
    setSubmitting(true);
    await randomDelay();
    setSubmitting(false);
    setStep(2);
  }

  async function goToStep3() {
    if (seatsOut.length < passengerCount || (inFlight && seatsIn.length < passengerCount)) {
      setError("Seleccioná un asiento por pasajero en cada tramo.");
      return;
    }
    setError("");
    setSubmitting(true);
    await randomDelay();
    setSubmitting(false);
    setStep(3);
  }

  async function confirmBooking(e) {
    e.preventDefault();
    if (!payment.name || !payment.number || !payment.expiry || !payment.cvv) {
      setError("Completá los datos de pago simulados.");
      return;
    }
    if (!acceptedTerms) {
      setError("Tenés que aceptar que esta es una reserva simulada.");
      return;
    }
    setError("");
    setSubmitting(true);
    await randomDelay();

    const booking = {
      id: generateBookingRef(),
      createdAt: new Date().toISOString(),
      cabin,
      passengers,
      flights: [
        { ...outFlight, seats: seatsOut },
        ...(inFlight ? [{ ...inFlight, seats: seatsIn }] : []),
      ],
      totalPrice,
    };
    saveBooking(booking);
    router.push(`/confirmation/${booking.id}`);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
      <StepIndicator steps={STEPS} current={step} />

      <div className="mt-6 flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              {passengers.map((p, idx) => (
                <PassengerForm
                  key={idx}
                  index={idx}
                  value={p}
                  onChange={(value) => updatePassenger(idx, value)}
                />
              ))}
              {error && <p className="text-sm text-rose-600">{error}</p>}
              <button
                type="button"
                onClick={goToStep2}
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-sky-600 py-3 text-sm font-semibold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:px-8"
              >
                {submitting && <Loader2 size={14} className="animate-spin" />}
                Continuar a selección de asientos
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-sm font-semibold text-slate-900">
                  Ida · {airportLabel(outFlight.originCode)} → {airportLabel(outFlight.destinationCode)}
                </h3>
                <SeatMap
                  seats={seatMapOut}
                  selected={seatsOut}
                  onToggle={(code) => toggleSeat(seatsOut, setSeatsOut, code, passengerCount)}
                  maxSelectable={passengerCount}
                />
              </div>

              {inFlight && (
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-slate-900">
                    Vuelta · {airportLabel(inFlight.originCode)} → {airportLabel(inFlight.destinationCode)}
                  </h3>
                  <SeatMap
                    seats={seatMapIn}
                    selected={seatsIn}
                    onToggle={(code) => toggleSeat(seatsIn, setSeatsIn, code, passengerCount)}
                    maxSelectable={passengerCount}
                  />
                </div>
              )}

              {error && <p className="text-sm text-rose-600">{error}</p>}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={submitting}
                  className="rounded-lg border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={goToStep3}
                  disabled={submitting}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-sky-600 py-3 text-sm font-semibold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70 sm:flex-none sm:px-8"
                >
                  {submitting && <Loader2 size={14} className="animate-spin" />}
                  Continuar al pago
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={confirmBooking} className="space-y-4">
              <div className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-700">
                <ShieldAlert size={16} className="mt-0.5 shrink-0" />
                Este es un pago simulado para una demo de portfolio. No ingreses datos reales
                de tu tarjeta.
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Nombre en la tarjeta
                    </label>
                    <input
                      type="text"
                      value={payment.name}
                      onChange={(e) => setPayment({ ...payment, name: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Número (simulado)
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      value={payment.number}
                      onChange={(e) => setPayment({ ...payment, number: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Vencimiento</label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      maxLength={5}
                      value={payment.expiry}
                      onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">CVV</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={4}
                      value={payment.cvv}
                      onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              <label className="flex items-start gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-0.5 accent-sky-600"
                />
                Entiendo que esta es una reserva y un pago simulados, sin validez real, creados
                solo para una demo de portfolio.
              </label>

              {error && <p className="text-sm text-rose-600">{error}</p>}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={submitting}
                  className="rounded-lg border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Atrás
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-sky-600 py-3 text-sm font-semibold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70 sm:flex-none sm:px-8"
                >
                  {submitting ? <Loader2 size={14} className="animate-spin" /> : <Lock size={14} />}
                  {submitting ? "Confirmando…" : "Confirmar reserva simulada"}
                </button>
              </div>
            </form>
          )}
        </div>

        <aside className="w-full shrink-0 space-y-4 lg:w-80">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Resumen</p>
            <SummaryFlight flight={outFlight} label="Ida" />
            {inFlight && <SummaryFlight flight={inFlight} label="Vuelta" />}
            <div className="mt-3 border-t border-slate-100 pt-3 text-sm text-slate-500">
              {passengerCount} pasajero{passengerCount > 1 ? "s" : ""} · Clase{" "}
              {cabin === "business" ? "Business" : "Económica"}
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-sm font-medium text-slate-600">Total</span>
              <span className="text-xl font-bold text-slate-900">{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SummaryFlight({ flight, label }) {
  const airline = findAirline(flight.airlineId);
  return (
    <div className="mt-3 border-t border-slate-100 pt-3 first:mt-2 first:border-0 first:pt-0">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-sm font-medium text-slate-800">
        {airportLabel(flight.originCode)} → {airportLabel(flight.destinationCode)}
      </p>
      <p className="text-xs text-slate-400">
        {flight.departTime} – {flight.arriveTime} · {formatDuration(flight.durationMinutes)} ·{" "}
        {airline.name}
      </p>
    </div>
  );
}
