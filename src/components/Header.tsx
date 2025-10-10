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
      <div className="text-center pt-16 sm:pt-6"> {/* Further adjusted padding to move title down */}
        <h1 className="text-2xl sm:text-3xl font-montserrat font-bold text-[var(--llyc-red)]">
          {t('header.title')}
        </h1>
        <p className="text-[var(--llyc-gray-2)] font-open-sans mt-2 text-lg">
          {t('header.subtitle')}
        </p>
      </div>
    </header>
  );
};