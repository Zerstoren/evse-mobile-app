import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en/messages.json";
import ua from "./ua/messages.json";
import { getItem, StorageKeys } from "../api/storage";

const resources = {
  en: {
    messages: en,
  },
  ua: {
    messages: ua,
  },
  test: {
    messages: {},
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    fallbackLng: process.env.NODE_ENV === "test" ? false : "en",
    compatibilityJSON: "v3",
    returnEmptyString: false,
    ns: ["messages"],
    defaultNS: "messages",
    fallbackNS: "messages",
    nsSeparator: "~",
    pluralSeparator: "^",
    interpolation: { prefix: "{{", suffix: "}}", escapeValue: false },
    returnNull: false,
  });

getItem(StorageKeys.LANGUAGE).then((language) => {
  if (language) {
    i18n.changeLanguage(language);
  }
});

export default i18n;
