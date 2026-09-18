"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { dict } from "@/lib/i18n";

const STORAGE_KEY = "aerofind_lang";

const LanguageContext = createContext({
  lang: "es",
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("es");

  useEffect(() => {
    // Only localStorage (client-only) knows the saved preference, so this
    // can't be read during SSR — hydration-safe by design.
    const saved = window.localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved === "es" || saved === "en") setLangState(saved);
  }, []);

  function setLang(next) {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  function t(key, ...args) {
    const entry = dict[key];
    if (!entry) return key;
    const value = entry[lang];
    return typeof value === "function" ? value(...args) : value;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
