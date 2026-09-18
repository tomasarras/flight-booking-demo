import { notFound } from "next/navigation";
import { getFlightById } from "@/lib/flights";
import FlightDetailClient from "./FlightDetailClient";

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

  return <FlightDetailClient flight={flight} />;
}
