"use client";

const COLS = ["A", "B", "C", "D", "E", "F"];

export default function SeatMap({ seats, selected, onToggle, maxSelectable }) {
  const rows = [...new Set(seats.map((s) => s.code.match(/\d+/)[0]))].sort(
    (a, b) => Number(a) - Number(b)
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
        <LegendDot className="bg-white ring-1 ring-slate-300" label="Disponible" />
        <LegendDot className="bg-sky-600" label="Seleccionado" />
        <LegendDot className="bg-slate-300" label="Ocupado" />
      </div>

      <div className="mx-auto max-w-xs space-y-1.5">
        {rows.map((row) => (
          <div key={row} className="flex items-center justify-center gap-1.5">
            <span className="w-5 text-right text-[11px] text-slate-400">{row}</span>
            {COLS.map((col, idx) => {
              const code = `${row}${col}`;
              const seat = seats.find((s) => s.code === code);
              const isSelected = selected.includes(code);
              return (
                <div key={code} className="flex items-center">
                  {idx === 3 && <span className="w-3" />}
                  <button
                    type="button"
                    disabled={seat.occupied || (!isSelected && selected.length >= maxSelectable)}
                    onClick={() => onToggle(code)}
                    title={code}
                    className={`h-6 w-6 rounded-md text-[10px] font-medium transition ${
                      seat.occupied
                        ? "cursor-not-allowed bg-slate-300 text-slate-400"
                        : isSelected
                          ? "bg-sky-600 text-white"
                          : "bg-white text-slate-500 ring-1 ring-slate-300 hover:ring-sky-400 disabled:opacity-40"
                    }`}
                  >
                    {col}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function LegendDot({ className, label }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`inline-block h-3 w-3 rounded ${className}`} />
      {label}
    </span>
  );
}
