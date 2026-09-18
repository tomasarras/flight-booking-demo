"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { buildMonthFareLevels } from "@/lib/fareCalendar";
import { formatDateShort } from "@/lib/format";
import { useLanguage } from "@/components/LanguageProvider";

const WEEKDAYS = { es: ["L", "M", "X", "J", "V", "S", "D"], en: ["M", "T", "W", "T", "F", "S", "S"] };
const LOCALES = { es: "es-AR", en: "en-US" };

const LEVEL_STYLES = {
  low: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
  mid: "bg-amber-50 text-amber-700 hover:bg-amber-100",
  high: "bg-rose-50 text-rose-700 hover:bg-rose-100",
};

function todayStr() {
  const d = new Date();
  return dateKey(d.getFullYear(), d.getMonth(), d.getDate());
}

function dateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function FareDatePicker({
  mode = "single",
  originCode,
  destinationCode,
  startDate,
  endDate,
  onChange,
}) {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => {
    const base = startDate ? new Date(`${startDate}T00:00:00`) : new Date();
    return { year: base.getFullYear(), month: base.getMonth() };
  });
  const wrapperRef = useRef(null);
  const min = todayStr();

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const levels = useMemo(
    () =>
      buildMonthFareLevels({
        originCode,
        destinationCode,
        year: viewDate.year,
        month: viewDate.month,
      }),
    [originCode, destinationCode, viewDate.year, viewDate.month]
  );

  const firstWeekday = (new Date(viewDate.year, viewDate.month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(viewDate.year, viewDate.month + 1, 0).getDate();
  const cells = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const now = new Date();
  const canGoPrev =
    viewDate.year > now.getFullYear() ||
    (viewDate.year === now.getFullYear() && viewDate.month > now.getMonth());

  function goMonth(delta) {
    setViewDate((prev) => {
      let month = prev.month + delta;
      let year = prev.year;
      if (month < 0) {
        month = 11;
        year -= 1;
      } else if (month > 11) {
        month = 0;
        year += 1;
      }
      return { year, month };
    });
  }

  function handlePick(day) {
    const picked = dateKey(viewDate.year, viewDate.month, day);
    if (picked < min) return;

    if (mode === "single") {
      onChange({ startDate: picked, endDate: undefined });
      setOpen(false);
      return;
    }

    if (!startDate || endDate || picked < startDate) {
      onChange({ startDate: picked, endDate: "" });
    } else {
      onChange({ startDate, endDate: picked });
      setOpen(false);
    }
  }

  const label =
    mode === "single"
      ? startDate
        ? formatDateShort(startDate, lang)
        : t("picker_choose_date")
      : startDate && endDate
        ? `${formatDateShort(startDate, lang)} — ${formatDateShort(endDate, lang)}`
        : startDate
          ? `${formatDateShort(startDate, lang)} — ${t("picker_choose_return")}`
          : t("picker_choose_dates");

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-left text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
      >
        <CalendarDays size={16} className="shrink-0 text-slate-400" />
        <span className={startDate ? "text-slate-900" : "text-slate-400"}>{label}</span>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-80 max-w-[90vw] rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => goMonth(-1)}
              disabled={!canGoPrev}
              className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
              aria-label={t("picker_prev_month")}
            >
              <ChevronLeft size={16} />
            </button>
            <p className="text-sm font-semibold capitalize text-slate-900">
              {new Date(viewDate.year, viewDate.month).toLocaleDateString(LOCALES[lang], {
                month: "long",
                year: "numeric",
              })}
            </p>
            <button
              type="button"
              onClick={() => goMonth(1)}
              className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100"
              aria-label={t("picker_next_month")}
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[11px] text-slate-400">
            {WEEKDAYS[lang].map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>

          <div className="mt-1 grid grid-cols-7 gap-1">
            {cells.map((day, idx) => {
              if (!day) return <span key={`pad-${idx}`} />;
              const picked = dateKey(viewDate.year, viewDate.month, day);
              const disabled = picked < min;
              const info = levels[picked];
              const inRange =
                mode === "range" &&
                startDate &&
                endDate &&
                picked > startDate &&
                picked < endDate;
              const isEdge = picked === startDate || picked === endDate;

              return (
                <button
                  key={picked}
                  type="button"
                  disabled={disabled}
                  onClick={() => handlePick(day)}
                  className={`flex flex-col items-center rounded-md py-1 text-[11px] font-medium transition ${
                    disabled
                      ? "cursor-not-allowed text-slate-300"
                      : isEdge
                        ? "bg-sky-600 text-white"
                        : inRange
                          ? "bg-sky-50 text-sky-700"
                          : info?.level
                            ? LEVEL_STYLES[info.level]
                            : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span>{day}</span>
                  {!disabled && info?.price != null && (
                    <span className="text-[9px] opacity-80">${info.price}</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-center gap-3 border-t border-slate-100 pt-3 text-[11px] text-slate-500">
            <Legend color="bg-emerald-100" label={t("level_low")} />
            <Legend color="bg-amber-100" label={t("level_mid")} />
            <Legend color="bg-rose-100" label={t("level_high")} />
          </div>
        </div>
      )}
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <span className="flex items-center gap-1">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
      {label}
    </span>
  );
}
