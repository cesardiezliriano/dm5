import React from 'react';
import { useTranslation } from 'react-i18next';
import { AdFormatSpec, PlatformTranslationKeys } from '../types';

interface SpecsDisplayProps {
  spec: AdFormatSpec;
}

const DetailItem: React.FC<{ label: string; value?: string | string[] | number | {value: number | string, unit: string} }> = ({ label, value }) => {
  if (!value && typeof value !== 'number') return null;

  let displayValue: string;
  if (typeof value === 'object' && !Array.isArray(value) && 'value' in value && 'unit' in value) {
    displayValue = `${value.value} ${value.unit}`;
  } else if (Array.isArray(value)) {
    displayValue = value.join(', ');
  } else {
    displayValue = String(value);
  }
  
  return (
    <li className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-[var(--llyc-input-bg)] last:border-b-0">
      <span className="font-semibold text-[var(--llyc-gray-2)] font-open-sans">{label}:</span>
      <span className="text-[var(--llyc-white)] text-left sm:text-right font-open-sans">{displayValue}</span>
    </li>
  );
};


export const SpecsDisplay: React.FC<SpecsDisplayProps> = ({ spec }) => {
  const { t } = useTranslation();

  const translatedPlatform = t(PlatformTranslationKeys[spec.platform]);
  const translatedFormatName = t(spec.formatNameKey);
  const translatedGenerationType = t(`generationTypes.${spec.generationType.toLowerCase().replace(/ /g, '_')}`, spec.generationType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));


  return (
    <section className="bg-[var(--llyc-card-bg)] p-6 rounded-xl shadow-xl my-8 transition-all duration-300 hover:shadow-[var(--llyc-turquoise)]/30 border border-[var(--llyc-gray-3)]/20">
      <h2 className="text-2xl font-montserrat font-semibold mb-4 text-[var(--llyc-turquoise)] border-b-2 border-[var(--llyc-turquoise)] pb-2">
        {t('specsDisplay.titlePrefix')} <span className="text-[var(--llyc-white)] font-normal">{translatedFormatName} {t('specsDisplay.forPlatform')} {translatedPlatform}</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <h3 className="text-lg font-montserrat font-semibold text-[var(--llyc-turquoise)] mb-2">{t('specsDisplay.techSpecsTitle')}</h3>
          <ul className="text-sm font-open-sans">
            <DetailItem label={t('specsDisplay.generationTypeLabel')} value={translatedGenerationType} />
            {spec.dimensions && <DetailItem label={t('specsDisplay.dimensionsLabel')} value={`${spec.dimensions.width}x${spec.dimensions.height} ${spec.dimensions.unit}`} />}
            <DetailItem label={t('specsDisplay.aspectRatioLabel')} value={spec.aspectRatio} />
            <DetailItem label={t('specsDisplay.maxLengthSizeLabel')} value={spec.maxLength} />
            <DetailItem label={t('specsDisplay.fileTypesLabel')} value={spec.fileTypes} />
            <DetailItem label={t('specsDisplay.maxFileSizeLabel')} value={spec.maxFileSize} />
            <DetailItem label={t('specsDisplay.resolutionLabel')} value={spec.resolution} />
            <DetailItem label={t('specsDisplay.safeZoneLabel')} value={spec.safeZone} />
            <DetailItem label={t('specsDisplay.iabEquivalentLabel')} value={spec.iabEquivalent} />
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-montserrat font-semibold text-[var(--llyc-turquoise)] mb-2">{t('specsDisplay.bestPracticesTitle')}</h3>
          {spec.bestPracticesKeys.length > 0 ? (
            <ul className="list-disc list-inside text-sm text-[var(--llyc-white)] space-y-1 font-open-sans">
              {spec.bestPracticesKeys.map((key, index) => (
                <li key={index}>{t(key, key.substring(key.lastIndexOf('.') + 1).replace(/_/g, ' '))}</li> // Fallback to a formatted key if translation missing
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[var(--llyc-gray-2)] font-open-sans">{t('specsDisplay.noBestPractices')}</p>
          )}
        </div>
      </div>
       {spec.promptGuidanceKey && (
          <div className="mt-4 pt-3 border-t border-[var(--llyc-input-bg)]">
            <h3 className="text-md font-montserrat font-semibold text-[var(--llyc-turquoise)] mb-1">{t('specsDisplay.promptGuidanceTitle')}</h3>
            <p className="text-xs text-[var(--llyc-gray-2)] italic font-open-sans">{t(spec.promptGuidanceKey)}</p>
          </div>
        )}
      {spec.notesKey && (
          <div className="mt-4 pt-3 border-t border-[var(--llyc-input-bg)]">
            <h3 className="text-md font-montserrat font-semibold text-[var(--llyc-turquoise)] mb-1">{t('specsDisplay.notesTitle')}</h3>
            {spec.sourceUrl ? (
              <a
                href={spec.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--llyc-turquoise)] hover:text-[var(--llyc-red)] underline font-open-sans transition-colors duration-150"
              >
                {t(spec.notesKey)}
              </a>
            ) : (
              <p className="text-xs text-[var(--llyc-gray-2)] font-open-sans">{t(spec.notesKey)}</p>
            )}
          </div>
        )}
    </section>
  );
};