
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AdFormatSpec, CreativeAsset, Platform, PlatformTranslationKeys } from '../types';
import i18n from '../i18n'; // Import i18n instance for translations

const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI;

if (!API_KEY || API_KEY === "MISSING_API_KEY_DO_NOT_USE_PLACEHOLDER") {
  console.warn("API_KEY environment variable is not set or is a placeholder. Gemini API calls will fail if not configured in the execution environment.");
  ai = new GoogleGenAI({ apiKey: "MISSING_API_KEY_DO_NOT_USE_PLACEHOLDER" });
} else {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

const TEXT_MODEL = 'gemini-2.5-flash';
const IMAGE_MODEL = 'imagen-4.0-generate-001';

function constructTextPrompt(
  spec: AdFormatSpec,
  creativeIdea: string,
  campaignObjective?: string
): string {
  const t = (key: string, options?: any) => i18n.t(key, { lng: 'en', ...options });
  
  const originalFormatName = t(spec.formatNameKey, { defaultValue: spec.formatNameKey });
  const originalPlatformName = t(PlatformTranslationKeys[spec.platform], { defaultValue: spec.platform });
  const originalPromptGuidance = spec.promptGuidanceKey ? t(spec.promptGuidanceKey) : "";
  const originalBestPractices = spec.bestPracticesKeys.map(key => t(key, { defaultValue: key.substring(key.lastIndexOf('.') + 1).replace(/_/g, ' ') })).join(', ');
  const targetAudienceCountry = "Spain";

  let prompt = `You are an expert creative assistant for digital advertising. Your task is to generate ad content for a campaign targeting an audience in ${targetAudienceCountry}.
---
**Platform:** ${originalPlatformName}
**Format:** ${originalFormatName}
`;

  if (campaignObjective) {
    prompt += `**Campaign Objective:** ${campaignObjective}\n`;
  }

  prompt += `**Core Creative Idea:** "${creativeIdea}"\n`;

  if (originalPromptGuidance) {
    prompt += `**Specific Guidance:** ${originalPromptGuidance}\n`;
  }
  
  prompt += `**Key Best Practices to Incorporate:** ${originalBestPractices}\n`;
  prompt += `---
**Output Instruction:** Generate ONLY the required creative content for the specified format. Do not include any conversational preamble, introductions, or explanations like 'Here is your script...'. The output must be the creative asset itself, ready to be copied and pasted.`;

  switch (spec.generationType) {
    case 'image_concept':
      prompt += ` Your output should be ONLY the detailed visual description, starting directly with the scene. The concept must be culturally relevant for ${targetAudienceCountry}. Describe the scene, subjects, style, lighting, and composition.`;
      if (spec.dimensions) prompt += ` The concept should align with dimensions around ${spec.dimensions.width}x${spec.dimensions.height}px.`;
      if (spec.aspectRatio) prompt += ` It must fit the aspect ratio: ${spec.aspectRatio}.`;
      break;
    case 'video_script':
      prompt += ` Your output should be ONLY a complete, professional video script, structured for production. Do not add any conversational text. Start directly with Scene 1.
For each scene, provide:
- **Visuals:** A detailed, cinematic description of the action, setting, and key elements. Specify camera shots (e.g., 'Wide shot', 'Close-up on product', 'Drone shot of landscape'), camera movement (e.g., 'slow pan left', 'dolly in'), lighting (e.g., 'golden hour', 'soft natural light', 'dramatic studio lighting'), and overall mood.
- **Audio:** The full voice-over or dialogue script (in Spanish, as it is relevant for ${targetAudienceCountry}), plus suggestions for music style or key sound effects (SFX).
- **On-Screen Text:** Any text overlays required, including the final Call to Action (CTA).`;
      if(spec.maxLength) prompt += `\nThe video's total duration should be approximately ${spec.maxLength.value} ${spec.maxLength.unit}.`;
      break;
    case 'ad_copy':
      prompt += ` Your output should be ONLY the ad copy. Provide variations for headlines, primary text, and descriptions as applicable. Write in Spanish, targeting the audience in ${targetAudienceCountry}. Do not add labels unless they are part of the required output (e.g., 'Headline 1: ...').`;
      if(spec.maxLength) prompt += ` Adhere to the character limit of ${spec.maxLength.value} ${spec.maxLength.unit} for the primary text components.`;
      break;
    case 'audio_script':
      prompt += ` Your output should be ONLY the complete audio ad script. Start directly with the first sound cue or line. Include the full voice-over text (in Spanish), sound effect cues (SFX), and music suggestions. The script should be culturally relevant for ${targetAudienceCountry}.`;
      if(spec.maxLength) prompt += ` The ad should be approximately ${spec.maxLength.value} ${spec.maxLength.unit} long.`;
      break;
    case 'asset_ideas':
       prompt += ` Your output should be ONLY a list of distinct, complementary ideas for the assets in this format (e.g., for a carousel, describe 3-5 unique card concepts, each with its own image idea and text). Start directly with the first idea.`;
       break;
    default:
      prompt += ` Generate the creative content tailored for ${targetAudienceCountry} according to the format's specifications, without any extra text.`;
  }
  
  return prompt;
}

export const generateCreativeAsset = async (
  spec: AdFormatSpec,
  creativeIdea: string,
  campaignObjective?: string
): Promise<CreativeAsset> => {
  if (!API_KEY || API_KEY === "MISSING_API_KEY_DO_NOT_USE_PLACEHOLDER") {
    throw new Error(i18n.t('geminiService.errors.apiKeyMissing'));
  }

  const translatedPlatformName = i18n.t(PlatformTranslationKeys[spec.platform], {defaultValue: spec.platform});
  const translatedFormatName = i18n.t(spec.formatNameKey, {defaultValue: spec.formatNameKey});
  const assetFormatDescription = `${translatedPlatformName} - ${translatedFormatName}`;

  try {
    if (spec.generationType === 'image') {
      const t = (key: string, options?: any) => i18n.t(key, { lng: 'en', ...options });
      const guidance = spec.promptGuidanceKey ? t(spec.promptGuidanceKey) : '';
      const bestPractices = spec.bestPracticesKeys.map(key => t(key)).join(', ');

      let imageGenPrompt = `Generate a high-quality, photorealistic advertisement image suitable for an audience in Spain.
Creative Idea: "${creativeIdea}".
Ad Format Guidance: ${guidance}.
Key Best Practices: ${bestPractices}.`;
      
      const imageGenConfig: any = {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
      };

      if (spec.aspectRatio) {
          const supportedRatios = ["1:1", "3:4", "4:3", "9:16", "16:9"];
          const availableRatios = spec.aspectRatio.split(/[,;]|\sor\s/).map(r => r.trim());
          const chosenRatio = availableRatios.find(r => supportedRatios.includes(r));
          if (chosenRatio) {
              imageGenConfig.aspectRatio = chosenRatio;
          } else {
              // Add a note to the prompt if no directly supported ratio is found.
              imageGenPrompt += `\nTry to visually match this aspect ratio as closely as possible: ${spec.aspectRatio}.`;
          }
      }

      console.log("Prompt for Image Generation Model:", imageGenPrompt);
      
      const response = await ai.models.generateImages({
        model: IMAGE_MODEL,
        prompt: imageGenPrompt,
        config: imageGenConfig,
      });

      if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image.imageBytes) {
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        return {
          type: 'image',
          data: `data:image/jpeg;base64,${base64ImageBytes}`,
          assetFormatDescription: assetFormatDescription
        };
      } else {
        console.error("Image generation response was empty or invalid:", response);
        throw new Error(i18n.t('geminiService.errors.imageGenFailed'));
      }
    } else { 
      const prompt = constructTextPrompt(spec, creativeIdea, campaignObjective);
      console.log("Constructed Prompt for Gemini (Text Model):", prompt);

      const response: GenerateContentResponse = await ai.models.generateContent({
        model: TEXT_MODEL,
        contents: prompt,
      });
      
      const text = response.text;
      if (!text) {
        console.error("Text generation response was null or undefined:", response);
        throw new Error(i18n.t('geminiService.errors.textGenFailed'));
      }
      
      const assetType = (spec.generationType === 'audio_script') ? 'audio' : 'text';

      return {
        type: assetType,
        data: text.trim(),
        assetFormatDescription: assetFormatDescription
      };
    }
  } catch (error: unknown) {
    console.error("Gemini API Error:", error);
    const originalErrorMessage = (error instanceof Error ? error.message : String(error));
    let errorMessageKey = 'geminiService.errors.unknown';
    
    if (error instanceof Error) {
        if (originalErrorMessage.toLowerCase().includes("api key not valid") || 
            originalErrorMessage.toLowerCase().includes("permission denied") ||
            originalErrorMessage.toLowerCase().includes("api_key_invalid") ||
            originalErrorMessage.toLowerCase().includes("provide an api key") || 
            API_KEY === "MISSING_API_KEY_DO_NOT_USE_PLACEHOLDER" 
          ) {
             errorMessageKey = 'geminiService.errors.apiKeyInvalid';
        } else if (originalErrorMessage.toLowerCase().includes("quota")) {
            errorMessageKey = 'geminiService.errors.quotaExceeded';
        } else {
             errorMessageKey = 'geminiService.errors.apiError';
        }
    }
    throw new Error(i18n.t(errorMessageKey, { originalError: originalErrorMessage }));
  }
};