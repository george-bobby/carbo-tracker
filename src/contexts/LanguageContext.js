'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../lib/i18n';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Get saved language from localStorage or use default
    const savedLanguage = localStorage.getItem('i18nextLng') || 'en';
    setCurrentLanguage(savedLanguage);
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
    i18n.changeLanguage(language);
    localStorage.setItem('i18nextLng', language);
  };

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский' },
    { code: 'kk', name: 'Kazakh', nativeName: 'Қазақша' },
  ];

  const value = {
    currentLanguage,
    changeLanguage,
    languages,
    isRTL: false, // None of our languages are RTL
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
