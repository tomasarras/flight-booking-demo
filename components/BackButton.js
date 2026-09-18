"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ label = "Volver" }) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-sky-600"
    >
      <ArrowLeft size={16} />
      {label}
    </button>
  );
}
