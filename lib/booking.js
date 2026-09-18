// All "persistence" for this demo lives in the browser's localStorage —
// there is no backend or database, by design (see README).
const STORAGE_KEY = "aerofind_bookings_v1";

function isBrowser() {
  return typeof window !== "undefined";
}

export function generateBookingRef() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = "";
  for (let i = 0; i < 6; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)];
  }
  return ref;
}

export function getAllBookings() {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getBooking(id) {
  return getAllBookings().find((b) => b.id === id) || null;
}

export function saveBooking(booking) {
  if (!isBrowser()) return;
  const all = getAllBookings();
  all.unshift(booking);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}
