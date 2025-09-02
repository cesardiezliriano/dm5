import React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, PlatformTranslationKeys } from '../types';

interface PlatformSelectorProps {
  platforms: Platform[];
  selectedPlatform: Platform | null;
  onChange: (platform: Platform | null) => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({ platforms, selectedPlatform, onChange }) => {
  const { t } = useTranslation();

  return (
    <div>
      <label htmlFor="platform-select" className="block text-sm font-open-sans font-semibold text-[var(--llyc-turquoise)] mb-1">
        {t('platformSelector.label')}
      </label>
      <select
        id="platform-select"
        value={selectedPlatform || ''}
        onChange={(e) => onChange(e.target.value as Platform || null)}
        className="w-full p-3 font-open-sans bg-[var(--llyc-input-bg)] border border-[var(--llyc-gray-3)] rounded-md shadow-sm focus:ring-2 focus:ring-[var(--llyc-red)] focus:border-[var(--llyc-red)] text-[var(--llyc-white)] placeholder-[var(--llyc-gray-2)]"
      >
        <option value="" className="text-[var(--llyc-gray-2)]">{t('platformSelector.selectPlaceholder')}</option>
        {platforms.map((platform) => (
          <option key={platform} value={platform}>
            {t(PlatformTranslationKeys[platform])}
          </option>
        ))}
      </select>
    </div>
  );
};