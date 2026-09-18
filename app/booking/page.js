import { Suspense } from "react";
import BookingFlow from "./BookingFlow";

export const metadata = {
  title: "Reservar — AeroFind",
};

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 text-slate-400">Cargando…</div>}>
      <BookingFlow />
    </Suspense>
  );
}
