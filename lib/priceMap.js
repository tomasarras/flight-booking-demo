import { AIRPORTS } from "./airports";
import { estimateDayFare } from "./flights";

// Cheapest fare from `originCode` to every other airport on `date`, bucketed
// into low/mid/high relative to each other — same idea as the fare
// calendar, just one destination per airport instead of one day per month.
export function buildDestinationFares({ originCode, date }) {
  const destinations = AIRPORTS.filter((a) => a.code !== originCode);

  const priced = destinations.map((airport) => ({
    airport,
    price:
      originCode && date
        ? estimateDayFare({ originCode, destinationCode: airport.code, date })
        : null,
  }));

  const sorted = priced
    .map((p) => p.price)
    .filter((p) => p != null)
    .sort((a, b) => a - b);
  const q1 = sorted[Math.floor(sorted.length * 0.33)];
  const q2 = sorted[Math.floor(sorted.length * 0.66)];

  return priced.map(({ airport, price }) => ({
    airport,
    price,
    level: price == null ? null : price <= q1 ? "low" : price <= q2 ? "mid" : "high",
  }));
}
