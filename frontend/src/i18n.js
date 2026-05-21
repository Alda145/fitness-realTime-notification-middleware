import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationEN from '../public/locales/en/translation.json';
import translationIT from '../public/locales/it/translation.json';
import translationES from '../public/locales/es/translation.json';

// the translations
const resources = {
    en: {
        translation: translationEN
    },
    it: {
        translation: translationIT
    },
    es: {
        translation: translationES,
    },
};
console.log("i18n para :", i18n);
i18n
    .use(detector)
    .use(initReactI18next) //lidh react me i18n 
    .init({
        resources,
        fallbackLng: "it", // use it if detected lng is not available
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });


export default i18n;