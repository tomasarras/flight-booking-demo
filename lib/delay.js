// Fakes network latency for demo interactions (search, selecting a flight,
// advancing the booking steps) so the app doesn't feel instantaneous/static.
export function randomDelay(maxMs = 1500, minMs = 150) {
  const ms = minMs + Math.random() * (maxMs - minMs);
  return new Promise((resolve) => setTimeout(resolve, ms));
}
