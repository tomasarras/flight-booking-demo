import { createRng, pick, randInt } from "./prng";
import { AIRLINES } from "./airlines";
import { AIRPORTS } from "./airports";
import { addMinutesToTime } from "./format";

const AIRCRAFT = [
  "Airbus A320",
  "Airbus A321neo",
  "Boeing 737-800",
  "Embraer E190",
];

export function buildFlightId(originCode, destinationCode, date, idx) {
  return `${originCode}_${destinationCode}_${date}_${idx}`;
}

export function parseFlightId(id) {
  const [originCode, destinationCode, date, idxStr] = id.split("_");
  return { originCode, destinationCode, date, idx: Number(idxStr) };
}

// Pure function: the same (origin, destination, date) triple always yields
// the same list of flights, so results survive navigation/refresh without
// needing a server or a database.
export function generateFlights({ originCode, destinationCode, date }) {
  if (!originCode || !destinationCode || !date) return [];
  const seed = `${originCode}-${destinationCode}-${date}`;
  const rng = createRng(seed);
  const count = randInt(rng, 5, 9);
  const isLongHaul =
    !AIRPORTS.find((a) => a.code === originCode && a.country === "Argentina") ||
    !AIRPORTS.find((a) => a.code === destinationCode && a.country === "Argentina");

  const flights = [];
  for (let i = 0; i < count; i++) {
    const airline = pick(rng, AIRLINES);
    const departHour = randInt(rng, 5, 22);
    const departMin = pick(rng, [0, 15, 30, 45]);
    const departTime = `${departHour.toString().padStart(2, "0")}:${departMin
      .toString()
      .padStart(2, "0")}`;

    const baseDuration = isLongHaul ? randInt(rng, 360, 780) : randInt(rng, 70, 240);
    const stops = rng() < (isLongHaul ? 0.55 : 0.3) ? (rng() < 0.85 ? 1 : 2) : 0;
    const durationMinutes = baseDuration + stops * randInt(rng, 40, 90);
    const arriveTime = addMinutesToTime(departTime, durationMinutes);

    const basePrice = isLongHaul ? randInt(rng, 420, 1450) : randInt(rng, 45, 260);
    const price = basePrice - stops * randInt(rng, 5, 25);

    flights.push({
      id: buildFlightId(originCode, destinationCode, date, i),
      airlineId: airline.id,
      flightNumber: `${airline.code}${randInt(rng, 100, 989)}`,
      originCode,
      destinationCode,
      date,
      departTime,
      arriveTime,
      durationMinutes,
      stops,
      price: Math.max(price, 25),
      seatsAvailable: randInt(rng, 1, 9),
      aircraft: pick(rng, AIRCRAFT),
    });
  }

  return flights.sort((a, b) => a.departTime.localeCompare(b.departTime));
}

// Cheapest fare for a given day, used to color-code the date picker —
// reuses the same deterministic generator as the results page so the
// calendar's colors always match what search actually returns.
export function estimateDayFare({ originCode, destinationCode, date }) {
  const flights = generateFlights({ originCode, destinationCode, date });
  if (!flights.length) return null;
  return Math.min(...flights.map((f) => f.price));
}

export function getFlightById(id) {
  const { originCode, destinationCode, date } = parseFlightId(id);
  const flights = generateFlights({ originCode, destinationCode, date });
  return flights.find((f) => f.id === id) || null;
}

// Deterministic seat map per flight: ~25% of seats pre-occupied.
export function generateSeatMap(flightId) {
  const rng = createRng(`seats-${flightId}`);
  const rows = 18;
  const cols = ["A", "B", "C", "D", "E", "F"];
  const seats = [];
  for (let row = 1; row <= rows; row++) {
    for (const col of cols) {
      seats.push({
        code: `${row}${col}`,
        occupied: rng() < 0.25,
        isExit: row === 12,
      });
    }
  }
  return seats;
}
