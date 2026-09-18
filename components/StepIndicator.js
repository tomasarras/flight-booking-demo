import { Check } from "lucide-react";

export default function StepIndicator({ steps, current }) {
  return (
    <ol className="flex items-center gap-2 sm:gap-4">
      {steps.map((label, idx) => {
        const stepNum = idx + 1;
        const done = stepNum < current;
        const active = stepNum === current;
        return (
          <li key={label} className="flex items-center gap-2">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                done
                  ? "bg-sky-600 text-white"
                  : active
                    ? "bg-slate-900 text-white"
                    : "bg-slate-200 text-slate-500"
              }`}
            >
              {done ? <Check size={14} /> : stepNum}
            </span>
            <span
              className={`hidden text-sm sm:block ${
                active ? "font-semibold text-slate-900" : "text-slate-500"
              }`}
            >
              {label}
            </span>
            {stepNum < steps.length && <span className="h-px w-4 bg-slate-200 sm:w-8" />}
          </li>
        );
      })}
    </ol>
  );
}
