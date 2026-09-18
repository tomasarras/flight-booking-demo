"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CircleMarker, MapContainer, Popup, TileLayer, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { formatPrice } from "@/lib/format";

const LEVEL_COLORS = {
  low: "#10b981",
  mid: "#f59e0b",
  high: "#f43f5e",
};

function FitBounds({ points }) {
  const map = useMap();

  useEffect(() => {
    if (!points.length) return;
    map.fitBounds(
      points.map((p) => [p.lat, p.lon]),
      { padding: [40, 40], maxZoom: 5 }
    );
  }, [map, points]);

  return null;
}

export default function PriceMap({ origin, destinations, originCode, date }) {
  const points = [origin, ...destinations.map((d) => d.airport)];

  return (
    <MapContainer
      center={[origin.lat, origin.lon]}
      zoom={3}
      scrollWheelZoom
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds points={points} />

      <CircleMarker
        center={[origin.lat, origin.lon]}
        radius={9}
        pathOptions={{ color: "#0f172a", fillColor: "#0f172a", fillOpacity: 1, weight: 2 }}
      >
        <Tooltip permanent direction="top" offset={[0, -10]} opacity={1} className="price-tooltip">
          <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[11px] font-semibold text-white shadow">
            {origin.code}
          </span>
        </Tooltip>
        <Popup>
          <p className="font-semibold text-slate-900">{origin.city}</p>
          <p className="text-xs text-slate-500">Origen seleccionado</p>
        </Popup>
      </CircleMarker>

      {destinations.map(({ airport, price, level }) => (
        <CircleMarker
          key={airport.code}
          center={[airport.lat, airport.lon]}
          radius={8}
          pathOptions={{
            color: level ? LEVEL_COLORS[level] : "#94a3b8",
            fillColor: level ? LEVEL_COLORS[level] : "#94a3b8",
            fillOpacity: 0.85,
            weight: 1,
          }}
        >
          <Tooltip permanent direction="top" offset={[0, -9]} opacity={1} className="price-tooltip">
            <span
              className="rounded-full px-2 py-0.5 text-[11px] font-semibold text-white shadow"
              style={{ backgroundColor: level ? LEVEL_COLORS[level] : "#94a3b8" }}
            >
              {price != null ? `$${price}` : "—"}
            </span>
          </Tooltip>
          <Popup>
            <div className="min-w-[160px]">
              <p className="font-semibold text-slate-900">{airport.city}</p>
              <p className="text-xs text-slate-500">{airport.code}</p>
              {price != null ? (
                <p className="mt-1 text-lg font-bold text-slate-900">{formatPrice(price)}</p>
              ) : (
                <p className="mt-1 text-sm text-slate-400">Sin datos</p>
              )}
              <Link
                href={`/search?tripType=oneway&origin=${originCode}&destination=${airport.code}&departDate=${date}&passengers=1&cabin=economy`}
                className="mt-2 inline-block text-xs font-semibold text-sky-600 underline"
              >
                Buscar este vuelo
              </Link>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
