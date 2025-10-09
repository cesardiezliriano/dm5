import React from 'react';
import { useTranslation } from 'react-i18next';

interface ObjectiveInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const ObjectiveInput: React.FC<ObjectiveInputProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  return (
    <div className="mb-6">
      <label htmlFor="campaign-objective" className="block text-sm font-open-sans font-semibold text-[var(--llyc-turquoise)] mb-1">
        {t('objectiveInput.label')}
      </label>
      <input
        id="campaign-objective"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('objectiveInput.placeholder')}
        className="w-full p-3 font-open-sans bg-[var(--llyc-input-bg)] border border-[var(--llyc-gray-3)] rounded-md shadow-sm focus:ring-2 focus:ring-[var(--llyc-red)] focus:border-[var(--llyc-red)] text-[var(--llyc-dark-blue)] placeholder-[var(--llyc-gray-2)]"
      />
    </div>
  );
};