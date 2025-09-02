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
import { Platform, ValidationResult } from '../../types';

// Constants
import { PLATFORMS, AD_SPECS_DATA } from '../../constants';

// Services
import { validateAsset } from '../../services/validationService';

export const ValidatorView: React.FC = () => {
    const { t } = useTranslation();

    const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
    const [selectedFormatId, setSelectedFormatId] = useState<string | null>(null);
    const [assetToValidate, setAssetToValidate] = useState<File | string | null>(null);
    const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    const availableFormats = useMemo(() => {
        if (!selectedPlatform) return [];
        return AD_SPECS_DATA.filter(spec => spec.platform === selectedPlatform);
    }, [selectedPlatform]);

    const selectedFormatSpec = useMemo(() => {
        if (!selectedFormatId) return null;
        return AD_SPECS_DATA.find(spec => spec.id === selectedFormatId) || null;
    }, [selectedFormatId]);

    const handlePlatformChange = useCallback((platform: Platform | null) => {
        setSelectedPlatform(platform);
        setSelectedFormatId(null);
        setAssetToValidate(null);
        setValidationResult(null);
        setError(null);
    }, []);

    const handleFormatChange = useCallback((formatId: string | null) => {
        setSelectedFormatId(formatId);
        setAssetToValidate(null);
        setValidationResult(null);
        setError(null);
    }, []);
    
    const handleValidateAsset = useCallback(async () => {
        if (!selectedFormatSpec || !assetToValidate) {
            setError(t('validator.errors.noAssetOrFormat'));
            return;
        }
        setIsLoading(true);
        setError(null);
        setValidationResult(null);

        try {
            const result = await validateAsset(selectedFormatSpec, assetToValidate, t);
            setValidationResult(result);
        } catch(e: any) {
            setError(e.message || t('fallbackError'));
            console.error("Validation failed:", e);
        } finally {
            setIsLoading(false);
        }
    }, [selectedFormatSpec, assetToValidate, t]);

    const isValidationDisabled = !selectedPlatform || !selectedFormatId || !assetToValidate || isLoading;
    
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
                />
            </div>

            <div className={`disclosure-section ${selectedFormatSpec ? 'expanded' : 'collapsed'} mt-6 space-y-6`}>
                {selectedFormatSpec && (
                    <ValidatorInput spec={selectedFormatSpec} onAssetChange={setAssetToValidate} key={selectedFormatId} />
                )}

                {selectedFormatSpec && (
                    <div className="my-8 text-center">
                        <button
                            onClick={handleValidateAsset}
                            disabled={isValidationDisabled}
                            className="px-8 py-4 bg-[var(--llyc-turquoise)] hover:bg-teal-600 text-[var(--llyc-white)] font-montserrat font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--llyc-dark-blue)] focus:ring-[var(--llyc-turquoise)] transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none"
                        >
                            {t('validator.validateButton')}
                        </button>
                    </div>
                )}
            </div>

            {isLoading && <LoadingSpinner message={t('validator.loading')} />}
            {error && <ErrorMessage message={error} />}
            {validationResult && <ValidationResults result={validationResult} />}
            
            {selectedFormatSpec && !validationResult && (
                <SpecsDisplay spec={selectedFormatSpec} />
            )}
        </div>
    );
};