"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 text-sm text-slate-500 space-y-2">
        <p className="font-medium text-slate-600">{t("footer_disclaimer_title")}</p>
        <p>{t("footer_disclaimer_body")}</p>
        <p className="text-slate-400">
          {t("footer_made_by")}{" "}
          <a
            href="https://tomasarras.com.ar"
            className="underline hover:text-slate-600"
            target="_blank"
            rel="noreferrer"
          >
            Tomás Arras
          </a>{" "}
          · {t("footer_code_at")}{" "}
          <a
            href="https://github.com/tomasarras/flight-booking-demo"
            className="underline hover:text-slate-600"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
