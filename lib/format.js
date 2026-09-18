const LOCALES = { es: "es-AR", en: "en-US" };

export function formatPrice(usd, lang = "es") {
  return `USD ${usd.toLocaleString(LOCALES[lang] || LOCALES.es)}`;
}

export function formatDuration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m.toString().padStart(2, "0")}m`;
}

export function formatDateLong(dateStr, lang = "es") {
  if (!dateStr) return "";
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString(LOCALES[lang] || LOCALES.es, {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateShort(dateStr, lang = "es") {
  if (!dateStr) return "";
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString(LOCALES[lang] || LOCALES.es, { day: "2-digit", month: "short" });
}

export function addMinutesToTime(time, minutesToAdd) {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + minutesToAdd;
  const wrapped = ((total % 1440) + 1440) % 1440;
  const hh = Math.floor(wrapped / 60)
    .toString()
    .padStart(2, "0");
  const mm = (wrapped % 60).toString().padStart(2, "0");
  return `${hh}:${mm}`;
}
