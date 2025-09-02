import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-[var(--llyc-gray-2)] font-open-sans">{t('header.langSwitcherLabel')}</span>
      <button
        onClick={() => changeLanguage('en')}
        disabled={i18n.language === 'en'}
        className={`px-3 py-1 text-sm rounded-md font-montserrat transition-colors duration-150 ease-in-out
                    ${i18n.language === 'en' ? 'bg-[var(--llyc-red)] text-[var(--llyc-white)] cursor-default' : 'bg-[var(--llyc-input-bg)] text-[var(--llyc-turquoise)] hover:bg-[var(--llyc-red)] hover:text-[var(--llyc-white)]'}`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('es')}
        disabled={i18n.language === 'es'}
        className={`px-3 py-1 text-sm rounded-md font-montserrat transition-colors duration-150 ease-in-out
                    ${i18n.language === 'es' ? 'bg-[var(--llyc-red)] text-[var(--llyc-white)] cursor-default' : 'bg-[var(--llyc-input-bg)] text-[var(--llyc-turquoise)] hover:bg-[var(--llyc-red)] hover:text-[var(--llyc-white)]'}`}
      >
        ES
      </button>
    </div>
  );
};