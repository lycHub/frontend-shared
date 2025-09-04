import {
  LANGS,
  StorageKeyPrefix,
  Translation_en,
  Translation_zh,
} from "@frontend-shared/libs";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import MyEnJson from "./i18n/en.json";
import MyZhJson from "./i18n/zh.json";

const i18nInitPromise = i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    // nonExplicitSupportedLngs: true,
    debug: import.meta.env.DEV,
    detection: {
      order: ["localStorage", "htmlTag"],
      lookupLocalStorage: StorageKeyPrefix + "i18nextLng",
    },
    supportedLngs: [LANGS.en, LANGS.zh],
    resources: {
      [LANGS.en]: {
        translation: { ...Translation_en, ...MyEnJson },
      },
      [LANGS.zh]: {
        translation: { ...Translation_zh, ...MyZhJson },
      },
    },
    // lng: LANGS.zh, // if you're using a language detector, do not define the lng option
    fallbackLng: LANGS.zh,

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

// https://www.locize.com/blog/how-to-use-i18next-t-outside-react-components
export async function translate(key: string) {
  await i18nInitPromise;
  return i18next.t(key);
}

export default i18next;
