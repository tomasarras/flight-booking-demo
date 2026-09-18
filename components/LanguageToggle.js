"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex overflow-hidden rounded-full text-xs font-semibold ring-1 ring-slate-200">
      {["es", "en"].map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`px-2 py-1 transition ${
            lang === code ? "bg-sky-600 text-white" : "text-slate-500 hover:bg-slate-50"
          }`}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
