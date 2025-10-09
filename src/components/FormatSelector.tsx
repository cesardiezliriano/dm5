import React from 'react';
import { useTranslation } from 'react-i18next';
import { AdFormatSpec } from '../types';

interface FormatSelectorProps {
  formats: AdFormatSpec[];
  selectedFormatId: string | null;
  onChange: (formatId: string | null) => void;
  disabled: boolean;
}

export const FormatSelector: React.FC<FormatSelectorProps> = ({ formats, selectedFormatId, onChange, disabled }) => {
  const { t } = useTranslation();

  return (
    <div>
      <label htmlFor="format-select" className="block text-sm font-open-sans font-semibold text-[var(--llyc-turquoise)] mb-1">
        {t('formatSelector.label')}
      </label>
      <select
        id="format-select"
        value={selectedFormatId || ''}
        onChange={(e) => onChange(e.target.value || null)}
        disabled={disabled || formats.length === 0}
        className="w-full p-3 font-open-sans bg-[var(--llyc-input-bg)] border border-[var(--llyc-gray-3)] rounded-md shadow-sm focus:ring-2 focus:ring-[var(--llyc-red)] focus:border-[var(--llyc-red)] text-[var(--llyc-dark-blue)] placeholder-[var(--llyc-gray-2)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value="" className="text-[var(--llyc-gray-2)]">
          {disabled ? t('formatSelector.disabledPlaceholder') : t('formatSelector.selectPlaceholder')}
        </option>
        {formats.map((format) => (
          <option key={format.id} value={format.id}>
            {t(format.formatNameKey)}
          </option>
        ))}
      </select>
    </div>
  );
};