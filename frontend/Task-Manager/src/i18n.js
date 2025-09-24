import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import file JSON ngôn ngữ
import en from "./locales/en.json";
import vi from "./locales/vi.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },
  lng: "vi", // ngôn ngữ mặc định
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
