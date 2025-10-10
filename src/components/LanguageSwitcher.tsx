import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: 'es' | 'en') => {
    i18n.changeLanguage(lng);
  };

  const isSpanish = i18n.language === 'es' || i18n.language.startsWith('es');

  return (
    <div className="relative flex items-center bg-slate-200 rounded-full p-1 space-x-1">
      {/* Sliding background element */}
      <div
        className={`absolute bg-[var(--llyc-dark-blue)] h-7 w-9 rounded-full transition-transform duration-300 ease-in-out
          ${isSpanish ? 'transform translate-x-0' : 'transform translate-x-10'}`} // translate-x-10 is 2.5rem (40px)
      />
      
      {/* Language Buttons */}
      <button
        onClick={() => changeLanguage('es')}
        className={`relative z-10 w-9 h-7 flex items-center justify-center pr-px text-sm font-montserrat font-semibold rounded-full transition-colors duration-300
          ${isSpanish ? 'text-[var(--llyc-white)]' : 'text-[var(--llyc-gray-2)]'}`}
        aria-pressed={isSpanish}
        aria-label="Cambiar a español"
      >
        ES
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`relative z-10 w-9 h-7 flex items-center justify-center pl-px text-sm font-montserrat font-semibold rounded-full transition-colors duration-300
          ${!isSpanish ? 'text-[var(--llyc-white)]' : 'text-[var(--llyc-gray-2)]'}`}
        aria-pressed={!isSpanish}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
};
