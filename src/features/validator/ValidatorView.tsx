import React, { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

// Components
import { PlatformSelector } from '../../components/PlatformSelector';
import { FormatSelector } from '../../components/FormatSelector';
import { SpecsDisplay } from '../../components/SpecsDisplay';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';
import { ValidatorInput } from '../../components/ValidatorInput';
import { ValidationResults } from '../../components/ValidationResults';

// Types
import { Platform, FormattedValidationResult, AdFormatSpec } from '../../types';

// Constants
import { PLATFORMS, AD_SPECS_DATA } from '../../constants';

// Services
import { validateAsset } from '../../services/validationService';

export const ValidatorView: React.FC = () => {
    const { t } = useTranslation();

    const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
    const [selectedFormatId, setSelectedFormatId] = useState<string | null>(null);
    const [assetToValidate, setAssetToValidate] = useState<File | string | null>(null);
    const [validationResults, setValidationResults] = useState<FormattedValidationResult[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    const availableFormats = useMemo(() => {
        if (!selectedPlatform) return [];
        return AD_SPECS_DATA.filter(spec => spec.platform === selectedPlatform);
    }, [selectedPlatform]);

    const selectedFormatSpec = useMemo(() => {
        if (!selectedFormatId || selectedFormatId === 'ALL') return null;
        return AD_SPECS_DATA.find(spec => spec.id === selectedFormatId) || null;
    }, [selectedFormatId]);

    const handlePlatformChange = useCallback((platform: Platform | null) => {
        setSelectedPlatform(platform);
        setSelectedFormatId(null);
        setAssetToValidate(null);
        setValidationResults(null);
        setError(null);
    }, []);

    const handleFormatChange = useCallback((formatId: string | null) => {
        setSelectedFormatId(formatId);
        setAssetToValidate(null);
        setValidationResults(null);
        setError(null);
    }, []);
    
    const handleValidateAsset = useCallback(async () => {
        if ((!selectedFormatSpec && selectedFormatId !== 'ALL') || !assetToValidate) {
            setError(t('validator.errors.noAssetOrFormat'));
            return;
        }
        setIsLoading(true);
        setError(null);
        setValidationResults(null);

        try {
            let results: FormattedValidationResult[] = [];
             if (selectedFormatId === 'ALL') {
                // Validate against all available formats for the platform
                 results = await Promise.all(
                    availableFormats.map(async (spec) => {
                        const result = await validateAsset(spec, assetToValidate, t);
                        return { formatNameKey: spec.formatNameKey, result };
                    })
                );
            } else if (selectedFormatSpec) {
                // Validate against the single selected format
                const result = await validateAsset(selectedFormatSpec, assetToValidate, t);
                results.push({ formatNameKey: selectedFormatSpec.formatNameKey, result });
            }
            setValidationResults(results);
        } catch(e: any) {
            setError(e.message || t('fallbackError'));
            console.error("Validation failed:", e);
        } finally {
            setIsLoading(false);
        }
    }, [selectedFormatId, selectedFormatSpec, assetToValidate, t, availableFormats]);

    const isValidationDisabled = !selectedPlatform || !selectedFormatId || !assetToValidate || isLoading;

    // Create a composite spec for the 'ALL' option to pass to the ValidatorInput.
    // This tells the input to accept a wide range of file types, covering the most common validation use case.
    const compositeSpecForAll = useMemo((): AdFormatSpec | null => {
        if (!selectedPlatform) return null;
        const allFileTypes = availableFormats.flatMap(f => f.fileTypes || []);
        return {
          id: 'all-formats-composite',
          platform: selectedPlatform,
          formatNameKey: 'formatSelector.allFormats',
          generationType: 'asset_ideas', // A non-text type to force file input
          fileTypes: [...new Set(allFileTypes)],
          bestPracticesKeys: [],
        } as AdFormatSpec;
    }, [selectedPlatform, availableFormats]);
    
    return (
        <div id="validator-panel" role="tabpanel" aria-labelledby="validator-tab">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PlatformSelector
                    platforms={PLATFORMS}
                    selectedPlatform={selectedPlatform}
                    onChange={handlePlatformChange}
                />
                <FormatSelector
                    formats={availableFormats}
                    selectedFormatId={selectedFormatId}
                    onChange={handleFormatChange}
                    disabled={!selectedPlatform}
                    allowAllOption={true}
                />
            </div>

            <div className={`disclosure-section ${selectedFormatId ? 'expanded' : 'collapsed'} mt-6 space-y-6`}>
                {selectedFormatId && (
                    <ValidatorInput 
                        spec={(selectedFormatId === 'ALL' ? compositeSpecForAll : selectedFormatSpec)!}
                        onAssetChange={setAssetToValidate} 
                        key={selectedFormatId} 
                    />
                )}

                {selectedFormatId && (
                    <div className="my-8 text-center">
                        <button
                            onClick={handleValidateAsset}
                            disabled={isValidationDisabled}
                            className="px-8 py-4 bg-[var(--llyc-turquoise)] hover:bg-teal-600 text-[var(--llyc-white)] font-montserrat font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--llyc-white)] focus:ring-[var(--llyc-turquoise)] transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none"
                        >
                            {t('validator.validateButton')}
                        </button>
                    </div>
                )}
            </div>

            {isLoading && <LoadingSpinner message={t('validator.loading')} />}
            {error && <ErrorMessage message={error} />}
            {validationResults && <ValidationResults results={validationResults} />}
            
            {selectedFormatSpec && !validationResults && (
                <SpecsDisplay spec={selectedFormatSpec} />
            )}
        </div>
    );
};