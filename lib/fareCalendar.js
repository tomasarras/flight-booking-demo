import { estimateDayFare } from "./flights";

function dateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

// Fare per day for a whole month, bucketed into low/mid/high relative to
// that month's own spread — simulates a typical fare calendar without any
// real pricing data behind it.
export function buildMonthFareLevels({ originCode, destinationCode, year, month }) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prices = {};

  for (let day = 1; day <= daysInMonth; day++) {
    const date = dateKey(year, month, day);
    prices[date] = originCode && destinationCode
      ? estimateDayFare({ originCode, destinationCode, date })
      : null;
  }

  const sorted = Object.values(prices)
    .filter((p) => p != null)
    .sort((a, b) => a - b);
  const q1 = sorted[Math.floor(sorted.length * 0.33)];
  const q2 = sorted[Math.floor(sorted.length * 0.66)];

  const levels = {};
  for (const [date, price] of Object.entries(prices)) {
    if (price == null) {
      levels[date] = { price: null, level: null };
    } else {
      levels[date] = { price, level: price <= q1 ? "low" : price <= q2 ? "mid" : "high" };
    }
  }
  return levels;
}
