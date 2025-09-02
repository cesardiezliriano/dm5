import React, { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

// Components
import { PlatformSelector } from '../../components/PlatformSelector';
import { FormatSelector } from '../../components/FormatSelector';
import { ObjectiveInput } from '../../components/ObjectiveInput';
import { CreativeInput } from '../../components/CreativeInput';
import { AssetGenerator } from '../../components/AssetGenerator';
import { AssetDisplay } from '../../components/AssetDisplay';
import { SpecsDisplay } from '../../components/SpecsDisplay';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';

// Types
import { Platform, CreativeAsset } from '../../types';

// Constants
import { PLATFORMS, AD_SPECS_DATA } from '../../constants';

// Services
import { generateCreativeAsset } from '../../services/geminiService';

export const GeneratorView: React.FC = () => {
    const { t } = useTranslation();

    const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
    const [selectedFormatId, setSelectedFormatId] = useState<string | null>(null);
    const [campaignObjective, setCampaignObjective] = useState<string>('');
    const [creativeIdea, setCreativeIdea] = useState<string>('');
    const [generatedAsset, setGeneratedAsset] = useState<CreativeAsset | null>(null);
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
        setGeneratedAsset(null);
        setError(null);
        setCampaignObjective('');
        setCreativeIdea('');
    }, []);

    const handleFormatChange = useCallback((formatId: string | null) => {
        setSelectedFormatId(formatId);
        setGeneratedAsset(null);
        setError(null);
        // Also reset objective and creative idea if format changes for a cleaner flow
        setCampaignObjective('');
        setCreativeIdea('');
    }, []);

    const handleGenerateAsset = useCallback(async () => {
        if (!selectedFormatSpec || !creativeIdea.trim()) {
            setError(t("errorMessage.userErrorPrefix"));
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedAsset(null);
        try {
            const asset = await generateCreativeAsset(selectedFormatSpec, creativeIdea, campaignObjective);
            setGeneratedAsset(asset);
        } catch (e: any) {
            setError(e.message || t("fallbackError"));
            console.error("Generation failed:", e);
        } finally {
            setIsLoading(false);
        }
    }, [selectedFormatSpec, creativeIdea, campaignObjective, t]);

    const isGenerationDisabled = !selectedPlatform || !selectedFormatId || !creativeIdea.trim() || isLoading;
    const showFormatSelector = selectedPlatform !== null;
    const showCreativeInputs = selectedPlatform !== null && selectedFormatId !== null;

    return (
        <div id="generator-panel" role="tabpanel" aria-labelledby="generator-tab">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PlatformSelector
                    platforms={PLATFORMS}
                    selectedPlatform={selectedPlatform}
                    onChange={handlePlatformChange}
                />
                <div className={`disclosure-section ${showFormatSelector ? 'expanded' : 'collapsed'}`}>
                    {showFormatSelector && (
                        <FormatSelector
                            formats={availableFormats}
                            selectedFormatId={selectedFormatId}
                            onChange={handleFormatChange}
                            disabled={availableFormats.length === 0}
                        />
                    )}
                </div>
            </div>

            <div className={`disclosure-section ${showCreativeInputs ? 'expanded' : 'collapsed'} space-y-6 mt-6`}>
                {showCreativeInputs && (
                    <>
                        <ObjectiveInput value={campaignObjective} onChange={setCampaignObjective} />
                        <CreativeInput value={creativeIdea} onChange={setCreativeIdea} />
                        <AssetGenerator onGenerate={handleGenerateAsset} disabled={isGenerationDisabled} />
                    </>
                )}
            </div>

            {isLoading && <LoadingSpinner message={t('loadingSpinner.message')} />}
            {error && <ErrorMessage message={error} />}

            {generatedAsset && selectedFormatSpec && (
                <AssetDisplay
                    asset={generatedAsset}
                    platform={selectedFormatSpec.platform}
                    formatNameKey={selectedFormatSpec.formatNameKey}
                />
            )}

            {selectedFormatSpec && (
                <SpecsDisplay spec={selectedFormatSpec} />
            )}
        </div>
    );
};