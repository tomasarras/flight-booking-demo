"use client";

import Link from "next/link";
import SearchForm from "@/components/SearchForm";
import PriceMapExplorer from "@/components/PriceMapExplorer";
import { MapPin, ShieldCheck, Sparkles, Tag } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div>
      <section className="bg-gradient-to-b from-sky-600 to-sky-700">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-14 pb-24 text-center text-white">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
            <Sparkles size={12} />
            {t("home_badge")}
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">{t("home_title")}</h1>
          <p className="mt-2 text-sky-100 max-w-xl mx-auto">{t("home_subtitle")}</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 -mt-16 pb-16">
        <SearchForm />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <InfoCard icon={<Tag size={18} />} title={t("home_card1_title")} text={t("home_card1_text")} />
          <InfoCard
            icon={<ShieldCheck size={18} />}
            title={t("home_card2_title")}
            text={t("home_card2_text")}
          />
          <InfoCard
            icon={<Sparkles size={18} />}
            title={t("home_card3_title")}
            text={t("home_card3_text")}
          />
        </div>

        <div className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-1.5 text-lg font-semibold text-slate-900">
              <MapPin size={18} className="text-sky-600" />
              {t("home_map_title")}
            </h2>
            <Link href="/map" className="text-sm font-medium text-sky-600 hover:underline">
              {t("home_map_fullscreen")}
            </Link>
          </div>
          <p className="mt-1 text-sm text-slate-500">{t("home_map_subtitle")}</p>
          <div className="mt-4">
            <PriceMapExplorer heightClass="h-[420px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, text }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
        {icon}
      </span>
      <p className="mt-3 text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{text}</p>
    </div>
  );
}
