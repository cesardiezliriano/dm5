import React from 'react';
import { useTranslation } from 'react-i18next';

interface TabsProps {
  activeTab: 'generator' | 'validator';
  onTabChange: (tab: 'generator' | 'validator') => void;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  const { t } = useTranslation();

  const getTabClass = (tabName: 'generator' | 'validator') => {
    const isActive = activeTab === tabName;
    return `w-1/2 py-3 px-1 text-center font-montserrat font-semibold text-sm sm:text-base border-b-4 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--llyc-white)] rounded-t-md
            ${
              isActive
                ? 'border-[var(--llyc-red)] text-[var(--llyc-dark-blue)]'
                : 'border-transparent text-[var(--llyc-gray-2)] hover:text-[var(--llyc-dark-blue)] hover:border-[var(--llyc-gray-3)]'
            }`;
  };

  return (
    <div className="border-b border-[var(--llyc-gray-4)] flex" role="tablist" aria-label="Main functionality">
      <button
        onClick={() => onTabChange('generator')}
        className={getTabClass('generator')}
        role="tab"
        aria-selected={activeTab === 'generator'}
        aria-controls="generator-panel"
        id="generator-tab"
      >
        {t('tabs.generator')}
      </button>
      <button
        onClick={() => onTabChange('validator')}
        className={getTabClass('validator')}
        role="tab"
        aria-selected={activeTab === 'validator'}
        aria-controls="validator-panel"
        id="validator-tab"
      >
        {t('tabs.validator')}
      </button>
    </div>
  );
};
