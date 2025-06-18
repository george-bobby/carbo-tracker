'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';

const LanguageSwitcher = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const { t } = useTranslation('common');
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (languageCode) => {
    changeLanguage(languageCode);
    setIsOpen(false);
  };

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-md transition-colors duration-200 border border-slate-600 hover:border-emerald-500/50"
        aria-label={t('common.language')}
      >
        <FaGlobe className="w-4 h-4 text-emerald-400" />
        <span className="text-sm font-medium">
          {currentLang?.nativeName || 'English'}
        </span>
        <FaChevronDown 
          className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-slate-800 border border-slate-600 rounded-md shadow-lg z-50 overflow-hidden">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full px-4 py-3 text-left hover:bg-slate-700 transition-colors duration-200 flex items-center justify-between ${
                currentLanguage === language.code 
                  ? 'bg-emerald-600/20 text-emerald-400' 
                  : 'text-white'
              }`}
            >
              <div className="flex flex-col">
                <span className="font-medium">{language.nativeName}</span>
                <span className="text-xs text-gray-400">{language.name}</span>
              </div>
              {currentLanguage === language.code && (
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
