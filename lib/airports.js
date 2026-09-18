// Real-world airport codes/cities/coordinates used purely as flavor text for
// a fictional demo search engine — no airline branding or proprietary data
// involved.
export const AIRPORTS = [
  { code: "EZE", city: "Buenos Aires", country: "Argentina", lat: -34.8222, lon: -58.5358 },
  { code: "AEP", city: "Buenos Aires (Aeroparque)", country: "Argentina", lat: -34.5592, lon: -58.4156 },
  { code: "COR", city: "Córdoba", country: "Argentina", lat: -31.3236, lon: -64.208 },
  { code: "MDZ", city: "Mendoza", country: "Argentina", lat: -32.8328, lon: -68.7929 },
  { code: "BRC", city: "Bariloche", country: "Argentina", lat: -41.1512, lon: -71.1575 },
  { code: "IGR", city: "Iguazú", country: "Argentina", lat: -25.7373, lon: -54.4734 },
  { code: "USH", city: "Ushuaia", country: "Argentina", lat: -54.8433, lon: -68.2958 },
  { code: "SLA", city: "Salta", country: "Argentina", lat: -24.8425, lon: -65.4861 },
  { code: "ROS", city: "Rosario", country: "Argentina", lat: -32.9036, lon: -60.785 },
  { code: "SCL", city: "Santiago", country: "Chile", lat: -33.393, lon: -70.7858 },
  { code: "MVD", city: "Montevideo", country: "Uruguay", lat: -34.8384, lon: -56.0308 },
  { code: "GRU", city: "São Paulo", country: "Brasil", lat: -23.4356, lon: -46.4731 },
  { code: "GIG", city: "Río de Janeiro", country: "Brasil", lat: -22.81, lon: -43.2506 },
  { code: "LIM", city: "Lima", country: "Perú", lat: -12.0219, lon: -77.1143 },
  { code: "BOG", city: "Bogotá", country: "Colombia", lat: 4.7016, lon: -74.1469 },
  { code: "MEX", city: "Ciudad de México", country: "México", lat: 19.4363, lon: -99.0721 },
  { code: "MIA", city: "Miami", country: "Estados Unidos", lat: 25.7959, lon: -80.287 },
  { code: "JFK", city: "Nueva York", country: "Estados Unidos", lat: 40.6413, lon: -73.7781 },
  { code: "MAD", city: "Madrid", country: "España", lat: 40.4983, lon: -3.5676 },
  { code: "BCN", city: "Barcelona", country: "España", lat: 41.2971, lon: 2.0785 },
  { code: "PUJ", city: "Punta Cana", country: "República Dominicana", lat: 18.5674, lon: -68.3634 },
];

export function findAirport(code) {
  return AIRPORTS.find((a) => a.code === code) || null;
}

export function airportLabel(code) {
  const a = findAirport(code);
  return a ? `${a.city} (${a.code})` : code;
}
