import { GoogleGenAI, GenerateContentResponse, Modality } from "@google/genai";
import { AdFormatSpec, CreativeAsset, Platform, PlatformTranslationKeys, CreativeRefinement } from '../types';
import i18n from '../i18n'; // Import i18n instance for translations

const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI;

if (!API_KEY || API_KEY === "MISSING_API_KEY_DO_NOT_USE_PLACEHOLDER") { // Use a more specific placeholder
  console.warn("API_KEY environment variable is not set or is a placeholder. Gemini API calls will fail if not configured in the execution environment.");
  // Initialize with a placeholder, but calls will be blocked or fail clearly
  ai = new GoogleGenAI({ apiKey: "MISSING_API_KEY_DO_NOT_USE_PLACEHOLDER" });
} else {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

const TEXT_MODEL = 'gemini-2.5-flash';
const IMAGE_MODEL = 'imagen-4.0-generate-001';
const IMAGE_EDIT_MODEL = 'gemini-2.5-flash-image';


const constructTextPrompt = (
  spec: AdFormatSpec,
  creativeIdea: string,
  campaignObjective?: string,
  inclusions?: string,
  exclusions?: string,
): string => {
  const t = (key: string) => i18n.t(key, { lng: 'en' });
  const originalFormatName = t(spec.formatNameKey);
  const originalPlatformName = t(PlatformTranslationKeys[spec.platform]);
  const originalPromptGuidance = spec.promptGuidanceKey ? t(spec.promptGuidanceKey) : "";
  const originalBestPractices = spec.bestPracticesKeys.map(key => t(key)).join(', ');
  const targetAudienceCountry = "Spain";

  let prompt = `You are a creative assistant for digital advertising. Your task is to generate content for an ad targeted at an audience in ${targetAudienceCountry}.
Platform: ${originalPlatformName}
Format: ${originalFormatName}
`;

  if (campaignObjective) {
    prompt += `Campaign Objective: ${campaignObjective}\n`;
  }

  prompt += `Creative Idea/Base Assets: "${creativeIdea}"\n`;

  if (inclusions) {
    prompt += `\n**Mandatory Elements:** You MUST include the following elements: "${inclusions}"\n`;
  }

  if (exclusions) {
    prompt += `\n**Negative Keywords:** Under NO circumstances should the following themes, words, or objects appear: "${exclusions}"\n`;
  }
  
  if (originalPromptGuidance) {
    prompt += `Specific Guidance for this format: ${originalPromptGuidance}\n`;
  }
  
  prompt += `\nKey Best Practices to incorporate: ${originalBestPractices}\n`;
  prompt += `\nOutput Instructions for ${spec.generationType}:\n`;

  switch (spec.generationType) {
    case 'video_script':
      prompt += ` Your output should be ONLY a complete, professional video script, structured for production. Do not add any conversational text. Start directly with Scene 1.
For each scene, provide:
- **Visuals:** A detailed, cinematic description of the action, setting, and key elements. Specify camera shots (e.g., 'Wide shot', 'Close-up on product', 'Drone shot of landscape'), camera movement (e.g., 'slow pan left', 'dolly in'), lighting (e.g., 'golden hour', 'soft natural light', 'dramatic studio lighting'), and overall mood.
- **Audio:** The full voice-over or dialogue script (in Spanish, as it is relevant for ${targetAudienceCountry}), plus suggestions for music style or key sound effects (SFX).
- **On-Screen Text:** Any text overlays required, including the final Call to Action (CTA).`;
      if(spec.maxLength) prompt += `\nThe video's total duration should be approximately ${spec.maxLength.value} ${spec.maxLength.unit}.`;
      break;
    case 'ad_copy':
      prompt += `Generate compelling ad copy (e.g., headlines, primary text, descriptions). Write in Spanish if the creative idea is in Spanish or if explicitly targeting ${targetAudienceCountry} with Spanish copy.`;
      if(spec.maxLength) prompt += ` Aim for approximately ${spec.maxLength.value} ${spec.maxLength.unit}.`;
      break;
    case 'audio_script':
      prompt += `Generate an engaging audio ad script. Include voice-over text, sound effect suggestions, and music cues. The script should be culturally relevant for ${targetAudienceCountry} (e.g. in Spanish).`;
      if(spec.maxLength) prompt += ` The audio ad should be approximately ${spec.maxLength.value} ${spec.maxLength.unit} long.`;
      break;
    case 'listing_copy':
      prompt += `Generate optimized product listing copy (e.g., title, bullet points, description). Focus on clarity, benefits, and keywords relevant to the product and ${targetAudienceCountry}. Write in Spanish if appropriate.`;
      break;
    default:
      prompt += `Generate relevant creative content for ${targetAudienceCountry} according to the format specifications and best practices.`;
  }
  return prompt;
}


export const generateCreativeAsset = async (
  spec: AdFormatSpec,
  creativeIdea: string,
  campaignObjective?: string,
  inclusions?: string,
  exclusions?: string
): Promise<CreativeAsset> => {
  if (!API_KEY || API_KEY === "MISSING_API_KEY_DO_NOT_USE_PLACEHOLDER") {
    throw new Error(i18n.t('geminiService.errors.apiKeyMissing', "API_KEY is not configured. Please set the API_KEY environment variable."));
  }

  const translatedPlatformName = i18n.t(PlatformTranslationKeys[spec.platform], {defaultValue: spec.platform});
  const translatedFormatName = i18n.t(spec.formatNameKey, {defaultValue: spec.formatNameKey});
  const assetFormatDescription = `${translatedPlatformName} - ${translatedFormatName}`;

  try {
    if (spec.generationType === 'image') {
       // STEP 1: Use a text model to generate a high-quality, concise prompt for the image model.
      const t = (key: string) => i18n.t(key, { lng: 'en' });
      const bestPractices = spec.bestPracticesKeys.map(key => t(key)).join(', ');

      let promptForPromptGenerator = `You are an expert prompt engineer for a text-to-image AI model. Your task is to take the following ad creative request and convert it into a single, concise, and highly descriptive paragraph. This paragraph will be the ONLY input for the image model.

**IMPORTANT RULES:**
1.  **Do NOT include labels, titles, or meta-instructions** like 'Prompt:', 'Description:', 'Style:', etc. in your final output. Your output must be a single block of descriptive text.
2.  Focus on visual details: composition, subjects, environment, lighting, colors, and mood.
3.  Synthesize all the provided information into a coherent visual description.

**Creative Request Details:**
-   **Core Idea:** "${creativeIdea}"
-   **Campaign Objective:** "${campaignObjective || 'Not specified'}"
-   **Mandatory Elements to Include:** "${inclusions || 'None'}"
-   **Elements to Exclude:** "${exclusions || 'None'}"
-   **Format Best Practices:** "${bestPractices}"
-   **Target Audience:** Spain. The image must be culturally authentic and relevant.

**CRITICAL INSTRUCTION FOR TEXT:** If the request includes text to be rendered *in the image*, you must include it in your description EXACTLY as specified.
-   **Language:** The language must be Spanish unless otherwise specified.
-   **Character Encoding & Accents:** Emphasize that the text must be rendered perfectly with correct Spanish accents and special characters (like 'í', 'ñ', 'á'). For example, if the request is for 'Envío Gratis', the prompt must explicitly state to render 'Envío Gratis' with the accent.

Now, generate the single-paragraph prompt for the image model based on the request above.`;
      
      console.log("Constructed Prompt for Prompt Generator (Gemini):", promptForPromptGenerator);

      const promptGenResponse = await ai.models.generateContent({
        model: TEXT_MODEL,
        contents: promptForPromptGenerator,
      });

      const imageGenPrompt = promptGenResponse.text;
      if (!imageGenPrompt) {
        throw new Error(i18n.t('geminiService.errors.promptGenFailed'));
      }
      
      console.log("Generated Image Prompt (for Imagen):", imageGenPrompt);


      // STEP 2: Use the generated prompt to create the image.
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
          }
      }
      
      const response = await ai.models.generateImages({
        model: IMAGE_MODEL,
        prompt: imageGenPrompt.trim(),
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
        throw new Error(i18n.t('geminiService.errors.imageGenFailed', "Image generation failed or returned no data."));
      }
    } else { // Handles text, video_script, ad_copy, image_concept, audio_script etc.
      const prompt = constructTextPrompt(spec, creativeIdea, campaignObjective, inclusions, exclusions);
      console.log("Constructed Text Prompt for Gemini:", prompt);

      const response: GenerateContentResponse = await ai.models.generateContent({
        model: TEXT_MODEL,
        contents: prompt,
      });
      
      const text = response.text;
      if (text === null || text === undefined) {
        console.error("Text generation response was null or undefined:", response);
        throw new Error(i18n.t('geminiService.errors.textGenFailed', "Text generation failed or returned no data."));
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
    let errorMessageKey = 'geminiService.errors.unknown';
    let errorMessageDefault = "An unknown error occurred while communicating with the Gemini API.";
    let originalErrorMessage = (error instanceof Error ? error.message : String(error));
    
    if (error instanceof Error) {
        if (originalErrorMessage.toLowerCase().includes("api key not valid") || 
            originalErrorMessage.toLowerCase().includes("permission denied") ||
            originalErrorMessage.toLowerCase().includes("api_key_invalid") ||
            originalErrorMessage.toLowerCase().includes("provide an api key") || // Updated check
            API_KEY === "MISSING_API_KEY_DO_NOT_USE_PLACEHOLDER" // Explicit check for placeholder
          ) {
             errorMessageKey = 'geminiService.errors.apiKeyInvalid';
        } else if (originalErrorMessage.toLowerCase().includes("quota")) {
            errorMessageKey = 'geminiService.errors.quotaExceeded';
        } else {
             errorMessageKey = 'geminiService.errors.apiError';
        }
    }
    // Use i18n.t with the determined key, providing the original error message for interpolation
    throw new Error(i18n.t(errorMessageKey, { ns: 'translation', defaultValue: errorMessageDefault, originalError: originalErrorMessage }));
  }
};


export const refineImage = async (
  refinement: CreativeRefinement,
  originalAsset: CreativeAsset
): Promise<CreativeAsset> => {
   if (!API_KEY || API_KEY === "MISSING_API_KEY_DO_NOT_USE_PLACEHOLDER") {
    throw new Error(i18n.t('geminiService.errors.apiKeyMissing'));
  }

  const { base64ImageData, refinementPrompt } = refinement;
  
  const match = base64ImageData.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!match) {
    throw new Error("Invalid base64 image data format.");
  }
  const mimeType = match[1];
  const data = match[2];

  const finalRefinementPrompt = `A user wants to refine the provided image based on this instruction: "${refinementPrompt}".

**CRITICAL INSTRUCTIONS FOR TEXT MODIFICATION:**
1.  **Exact Match:** Apply the text change precisely as requested. Pay extremely close attention to spelling, capitalization, and accents. The output text must be an exact match of what the user requested.
2.  **Language:** The language must be Spanish unless the user specifies otherwise. Do not confuse Spanish with Portuguese.
3.  **Character Encoding:** You MUST use UTF-8 character encoding. This is essential to correctly display all special characters and accents (e.g., 'í', 'ñ', 'á', 'ü').
For example, if the user asks to correct text to 'Envío Gratis', the final image MUST show 'Envío Gratis' with the correctly rendered accent 'í'.
This is a strict, non-negotiable requirement. Do not mis-encode characters.`;

  try {
    const response = await ai.models.generateContent({
      model: IMAGE_EDIT_MODEL,
      contents: {
        parts: [
          { inlineData: { data, mimeType } },
          { text: finalRefinementPrompt },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData && part.inlineData.data) {
        return {
          ...originalAsset, 
          data: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`,
        };
      }
    }
    
    throw new Error(i18n.t('geminiService.errors.refinementFailed'));
    
  } catch(error) {
     console.error("Gemini API Error (Refinement):", error);
     let errorMessageKey = 'geminiService.errors.unknown';
     let originalErrorMessage = (error instanceof Error ? error.message : String(error));

     if (error instanceof Error) {
        if (originalErrorMessage.toLowerCase().includes("api key not valid")) {
             errorMessageKey = 'geminiService.errors.apiKeyInvalid';
        } else if (originalErrorMessage.toLowerCase().includes("quota")) {
            errorMessageKey = 'geminiService.errors.quotaExceeded';
        } else {
             errorMessageKey = 'geminiService.errors.apiError';
        }
    }
    throw new Error(i18n.t(errorMessageKey, { defaultValue: "An unknown error occurred.", originalError: originalErrorMessage }));
  }
};

export const removeTextFromImage = async (
  base64ImageData: string,
  originalAsset: CreativeAsset
): Promise<CreativeAsset> => {
   if (!API_KEY || API_KEY === "MISSING_API_KEY_DO_NOT_USE_PLACEHOLDER") {
    throw new Error(i18n.t('geminiService.errors.apiKeyMissing'));
  }
  
  const match = base64ImageData.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!match) {
    throw new Error("Invalid base64 image data format.");
  }
  const mimeType = match[1];
  const data = match[2];

  const removalPrompt = "A strict instruction: Remove any and all text from this image completely. Do not add any new elements or objects. Inpaint the background where the text was located to make it look natural and seamless as if the text was never there.";

  try {
    const response = await ai.models.generateContent({
      model: IMAGE_EDIT_MODEL,
      contents: {
        parts: [
          { inlineData: { data, mimeType } },
          { text: removalPrompt },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData && part.inlineData.data) {
        return {
          ...originalAsset, 
          data: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`,
        };
      }
    }
    
    throw new Error(i18n.t('geminiService.errors.refinementFailed'));
    
  } catch(error) {
     console.error("Gemini API Error (Text Removal):", error);
     let errorMessageKey = 'geminiService.errors.unknown';
     let originalErrorMessage = (error instanceof Error ? error.message : String(error));

     if (error instanceof Error) {
        if (originalErrorMessage.toLowerCase().includes("api key not valid")) {
             errorMessageKey = 'geminiService.errors.apiKeyInvalid';
        } else if (originalErrorMessage.toLowerCase().includes("quota")) {
            errorMessageKey = 'geminiService.errors.quotaExceeded';
        } else {
             errorMessageKey = 'geminiService.errors.apiError';
        }
    }
    throw new Error(i18n.t(errorMessageKey, { defaultValue: "An unknown error occurred.", originalError: originalErrorMessage }));
  }
};