"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function PassengerForm({ index, value, onChange }) {
  const { t } = useLanguage();

  function set(field, val) {
    onChange({ ...value, [field]: val });
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
      <p className="mb-3 text-sm font-semibold text-slate-900">{t("booking_passenger_n", index + 1)}</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">{t("booking_first_name")}</label>
          <input
            type="text"
            required
            value={value.firstName}
            onChange={(e) => set("firstName", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">{t("booking_last_name")}</label>
          <input
            type="text"
            required
            value={value.lastName}
            onChange={(e) => set("lastName", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">{t("booking_document")}</label>
          <input
            type="text"
            required
            value={value.document}
            onChange={(e) => set("document", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            {t("booking_birth_date")}
          </label>
          <input
            type="date"
            required
            value={value.birthDate}
            onChange={(e) => set("birthDate", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>
        {index === 0 && (
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-slate-500 mb-1">
              {t("booking_contact_email")}
            </label>
            <input
              type="email"
              required
              value={value.email}
              onChange={(e) => set("email", e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>
        )}
      </div>
    </div>
  );
}
