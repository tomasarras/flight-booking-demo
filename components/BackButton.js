"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function BackButton({ label }) {
  const router = useRouter();
  const { t } = useLanguage();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-sky-600"
    >
      <ArrowLeft size={16} />
      {label || t("common_back")}
    </button>
  );
}
