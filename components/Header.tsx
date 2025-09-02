import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="py-6 mb-4 relative">
      <div className="absolute top-4 left-4">
        <span className="font-montserrat font-bold text-3xl text-[var(--llyc-red)]">{t('header.llycLogo')}</span>
      </div>
      <div className="absolute top-5 right-4">
        <LanguageSwitcher />
      </div>
      <div className="text-center pt-8 sm:pt-0"> {/* Added padding top for small screens to avoid overlap with switcher */}
        <h1 className="text-4xl sm:text-5xl font-montserrat font-bold text-[var(--llyc-white)]">
          {t('header.title')}
        </h1>
        <p className="text-[var(--llyc-gray-2)] font-open-sans mt-3 text-lg">
          {t('header.subtitle')}
        </p>
      </div>
    </header>
  );
};