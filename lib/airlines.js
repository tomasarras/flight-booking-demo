// Entirely fictional airlines invented for this demo — names, codes and
// colors do not correspond to any real airline.
export const AIRLINES = [
  { id: "aurora", name: "Aurora Airways", code: "V8", color: "#0284c7" },
  { id: "southern", name: "Southern Cross Air", code: "K4", color: "#d97706" },
  { id: "vela", name: "Vela Líneas Aéreas", code: "N7", color: "#059669" },
  { id: "condor", name: "Cóndor Azul", code: "R2", color: "#4f46e5" },
  { id: "pacifico", name: "Pacífico Airlink", code: "P9", color: "#e11d48" },
];

export function findAirline(id) {
  return AIRLINES.find((a) => a.id === id) || AIRLINES[0];
}
