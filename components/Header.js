"use client";

import Link from "next/link";
import { PlaneTakeoff, Search, Map, Ticket } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import LanguageToggle from "@/components/LanguageToggle";

export default function Header() {
  const { t } = useLanguage();

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900 shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 text-white">
            <PlaneTakeoff size={18} />
          </span>
          <span className="text-lg tracking-tight">
            Aero<span className="text-sky-600">Find</span>
          </span>
        </Link>
        <nav className="flex items-center gap-3 sm:gap-5 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-slate-900" aria-label={t("nav_search")} title={t("nav_search")}>
            <Search size={20} className="sm:hidden" />
            <span className="hidden sm:inline">{t("nav_search")}</span>
          </Link>
          <Link href="/map" className="hover:text-slate-900" aria-label={t("nav_map")} title={t("nav_map")}>
            <Map size={20} className="sm:hidden" />
            <span className="hidden sm:inline">{t("nav_map")}</span>
          </Link>
          <Link href="/my-bookings" className="hover:text-slate-900" aria-label={t("nav_bookings")} title={t("nav_bookings")}>
            <Ticket size={20} className="sm:hidden" />
            <span className="hidden sm:inline">{t("nav_bookings")}</span>
          </Link>
          <LanguageToggle />
        </nav>
      </div>
    </header>
  );
}
