
import React, { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

// Components
import { PlatformSelector } from '../../components/PlatformSelector';
import { FormatSelector } from '../../components/FormatSelector';
import { ObjectiveInput } from '../../components/ObjectiveInput';
import { CreativeInput } from '../../components/CreativeInput';
import { DetailedCreativeInput } from '../../components/DetailedCreativeInput';
import { AssetGenerator } from '../../components/AssetGenerator';
import { AssetDisplay } from '../../components/AssetDisplay';
import { SpecsDisplay } from '../../components/SpecsDisplay';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';
import { HistoryList } from './HistoryList';

// Types
import { Platform, AdFormatSpec, CreativeAsset, HistoryItem } from '../../types';

// Constants
import { PLATFORMS, AD_SPECS_DATA } from '../../constants';

// Services
import { generateCreativeAsset, refineImage, removeTextFromImage } from '../../services/geminiService';

// Hooks
import { useHistoryStorage } from '../../hooks/useHistoryStorage';


export const GeneratorView: React.FC = () => {
  const { t } = useTranslation();
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [selectedFormatId, setSelectedFormatId] = useState<string | null>(null);
  const [campaignObjective, setCampaignObjective] = useState<string>('');
  const [creativeIdea, setCreativeIdea] = useState<string>('');
  const [inclusions, setInclusions] = useState<string>('');
  const [exclusions, setExclusions] = useState<string>('');

  const [generatedAsset, setGeneratedAsset] = useState<CreativeAsset | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefining, setIsRefining] = useState<boolean>(false);
  const [isRemovingText, setIsRemovingText] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [history, addHistoryItem, clearHistory] = useHistoryStorage();

  const availableFormats = useMemo(() => {
    if (!selectedPlatform) return [];
    return AD_SPECS_DATA.filter(spec => spec.platform === selectedPlatform);
  }, [selectedPlatform]);

  const selectedFormatSpec = useMemo((): AdFormatSpec | null => {
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
    setInclusions('');
    setExclusions('');
  }, []);

  const handleFormatChange = useCallback((formatId: string | null) => {
    setSelectedFormatId(formatId);
    setGeneratedAsset(null);
    setError(null);
  }, []);

  const handleGenerateAsset = useCallback(async () => {
    if (!selectedFormatSpec || !creativeIdea.trim() || !selectedPlatform || !selectedFormatId) {
      setError(t("errorMessage.userErrorPrefix"));
      return;
    }

    addHistoryItem({
      platform: selectedPlatform,
      formatId: selectedFormatId,
      campaignObjective,
      creativeIdea,
      inclusions,
      exclusions,
    });

    setIsLoading(true);
    setError(null);
    setGeneratedAsset(null);

    try {
      const asset = await generateCreativeAsset(
          selectedFormatSpec, 
          creativeIdea, 
          campaignObjective,
          inclusions,
          exclusions
      );
      setGeneratedAsset(asset);
    } catch (e: any) {
      setError(e.message || t("fallbackError"));
      console.error("Generation failed:", e);
    } finally {
      setIsLoading(false);
    }
  }, [selectedPlatform, selectedFormatId, selectedFormatSpec, creativeIdea, campaignObjective, inclusions, exclusions, t, addHistoryItem]);
  
  const handleRefineImage = useCallback(async (refinementPrompt: string) => {
    if (!generatedAsset || generatedAsset.type !== 'image') return;
    setIsRefining(true);
    setError(null);
    try {
        const refinedAsset = await refineImage({
            base64ImageData: generatedAsset.data,
            refinementPrompt,
        }, generatedAsset);
        setGeneratedAsset(refinedAsset);
    } catch (e: any) {
        setError(e.message || t("fallbackError"));
    } finally {
        setIsRefining(false);
    }
}, [generatedAsset, t]);

  const handleRemoveText = useCallback(async () => {
    if (!generatedAsset || generatedAsset.type !== 'image') return;
    setIsRemovingText(true);
    setError(null);
    try {
      const textlessAsset = await removeTextFromImage(generatedAsset.data, generatedAsset);
      setGeneratedAsset(textlessAsset);
    } catch (e: any) {
      setError(e.message || t("fallbackError"));
    } finally {
      setIsRemovingText(false);
    }
  }, [generatedAsset, t]);


  const handleUseHistoryItem = useCallback((item: HistoryItem) => {
    // This needs to be slightly modified. Set platform, then in a timeout set the rest.
    // This allows React to re-render the format selector with the correct formats before we set the value.
    setSelectedPlatform(item.platform);
    setTimeout(() => {
        setSelectedFormatId(item.formatId);
        setCampaignObjective(item.campaignObjective);
        setCreativeIdea(item.creativeIdea);
        setInclusions(item.inclusions || '');
        setExclusions(item.exclusions || '');
        setGeneratedAsset(null);
        setError(null);
        // Scroll to the top of the main content area to make sure the user sees the populated fields
        const mainElement = document.querySelector('main');
        if (mainElement) {
            mainElement.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, 0); // A timeout of 0ms is enough to defer execution until after the next render cycle
  }, []);

  const isGenerationDisabled = !selectedPlatform || !selectedFormatId || !creativeIdea.trim() || isLoading;

  return (
    <div id="generator-panel" role="tabpanel" aria-labelledby="generator-tab">
      <div className="space-y-6">
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
        
        {/* Progressive Disclosure Section */}
        <div className={`disclosure-section ${selectedPlatform && selectedFormatId ? 'expanded' : 'collapsed'}`}>
            <div className="space-y-6 pt-4"> {/* Added padding top for better spacing after animation */}
                <HistoryList 
                    history={history}
                    onUseHistoryItem={handleUseHistoryItem}
                    onClearHistory={clearHistory}
                />
                
                <ObjectiveInput value={campaignObjective} onChange={setCampaignObjective} />
                
                <CreativeInput value={creativeIdea} onChange={setCreativeIdea} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <DetailedCreativeInput 
                        id="inclusions"
                        labelKey='creativeInput.inclusionsLabel'
                        placeholderKey='creativeInput.inclusionsPlaceholder'
                        subtextKey='creativeInput.inclusionsSubtext'
                        value={inclusions}
                        onChange={setInclusions}
                     />
                     <DetailedCreativeInput 
                        id="exclusions"
                        labelKey='creativeInput.exclusionsLabel'
                        placeholderKey='creativeInput.exclusionsPlaceholder'
                        subtextKey='creativeInput.exclusionsSubtext'
                        value={exclusions}
                        onChange={setExclusions}
                     />
                </div>
                
                <AssetGenerator onGenerate={handleGenerateAsset} disabled={isGenerationDisabled} />
            </div>
        </div>

        {isLoading && <LoadingSpinner message={t('loadingSpinner.message')} />}
        {error && <ErrorMessage message={error} />}
        
        {generatedAsset && selectedFormatSpec && (
          <AssetDisplay 
            asset={generatedAsset} 
            platform={selectedFormatSpec.platform} 
            formatNameKey={selectedFormatSpec.formatNameKey}
            onRefine={handleRefineImage}
            isRefining={isRefining}
            onRemoveText={handleRemoveText}
            isRemovingText={isRemovingText}
          />
        )}
        
        {selectedFormatSpec && !generatedAsset && !isLoading && (
            <SpecsDisplay spec={selectedFormatSpec} />
        )}
      </div>
    </div>
  );
};
