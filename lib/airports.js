// Real-world airport codes/cities used purely as flavor text for a fictional
// demo search engine — no airline branding or proprietary data involved.
export const AIRPORTS = [
  { code: "EZE", city: "Buenos Aires", country: "Argentina" },
  { code: "AEP", city: "Buenos Aires (Aeroparque)", country: "Argentina" },
  { code: "COR", city: "Córdoba", country: "Argentina" },
  { code: "MDZ", city: "Mendoza", country: "Argentina" },
  { code: "BRC", city: "Bariloche", country: "Argentina" },
  { code: "IGR", city: "Iguazú", country: "Argentina" },
  { code: "USH", city: "Ushuaia", country: "Argentina" },
  { code: "SLA", city: "Salta", country: "Argentina" },
  { code: "ROS", city: "Rosario", country: "Argentina" },
  { code: "SCL", city: "Santiago", country: "Chile" },
  { code: "MVD", city: "Montevideo", country: "Uruguay" },
  { code: "GRU", city: "São Paulo", country: "Brasil" },
  { code: "GIG", city: "Río de Janeiro", country: "Brasil" },
  { code: "LIM", city: "Lima", country: "Perú" },
  { code: "BOG", city: "Bogotá", country: "Colombia" },
  { code: "MEX", city: "Ciudad de México", country: "México" },
  { code: "MIA", city: "Miami", country: "Estados Unidos" },
  { code: "JFK", city: "Nueva York", country: "Estados Unidos" },
  { code: "MAD", city: "Madrid", country: "España" },
  { code: "BCN", city: "Barcelona", country: "España" },
  { code: "PUJ", city: "Punta Cana", country: "República Dominicana" },
];

export function findAirport(code) {
  return AIRPORTS.find((a) => a.code === code) || null;
}

export function airportLabel(code) {
  const a = findAirport(code);
  return a ? `${a.city} (${a.code})` : code;
}
