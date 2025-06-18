import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslations from '../locales/en/common.json';
import ruTranslations from '../locales/ru/common.json';
import kkTranslations from '../locales/kk/common.json';

const resources = {
  en: {
    common: enTranslations,
  },
  ru: {
    common: ruTranslations,
  },
  kk: {
    common: kkTranslations,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    debug: false,
    
    // Namespace configuration
    defaultNS: 'common',
    ns: ['common'],
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    // Language detection
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

export default i18n;
