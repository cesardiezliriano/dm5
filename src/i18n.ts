import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// English translations
const en = {
  "header": {
    "llycLogo": "LLYC",
    "title": "DM 5 - Specs & Creatives",
    "subtitle": "Generate and validate optimized ad creatives with AI.",
    "langSwitcherLabel": "Language:"
  },
  "tabs": {
    "generator": "Creative Generator",
    "validator": "Creative Validator"
  },
  "platformSelector": {
    "label": "Advertising Platform",
    "selectPlaceholder": "Select a Platform"
  },
  "formatSelector": {
    "label": "Ad Format / Creative Type",
    "selectPlaceholder": "Select a Format",
    "disabledPlaceholder": "Select a platform first",
    "allFormats": "Validate against all compatible formats"
  },
  "objectiveInput": {
    "label": "Campaign Objective (Optional)",
    "placeholder": "e.g., Increase brand awareness, Drive website traffic, App installs"
  },
  "creativeInput": {
    "label": "Creative Idea / Base Asset Description",
    "placeholder": "Describe your product, service, target audience, key message, desired style, or any existing assets. For example: 'A minimalist ad for a new eco-friendly coffee brand targeting young professionals. Show a sleek product shot with natural elements.'",
    "subtext": "The more detail you provide, the better the AI can assist.",
    "inclusionsLabel": "Must-Include Elements (Optional)",
    "inclusionsPlaceholder": "e.g., 'the logo in the top right', 'the slogan Happy Days', 'a call to action with 10% off'",
    "inclusionsSubtext": "Specify any text, objects, or concepts that must appear in the creative.",
    "exclusionsLabel": "Elements to Exclude (Optional)",
    "exclusionsPlaceholder": "e.g., 'the color blue', 'images of people', 'the word cheap'",
    "exclusionsSubtext": "Specify any text, objects, or concepts that must NOT appear in the creative."
  },
  "assetGenerator": {
    "buttonText": "✨ Generate Creative Asset"
  },
  "loadingSpinner": {
    "message": "Generating your creative masterpiece..."
  },
  "errorMessage": {
    "prefix": "Oops! An error occurred:",
    "userErrorPrefix": "Please select a platform, format, and provide a creative idea."
  },
  "assetDisplay": {
    "titlePrefix": "Generated Asset:",
    "imageAlt": "Generated Creative",
    "saveImageHint": "Right-click or long-press on the image to save.",
    "copyTextHint": "You can copy the text above."
  },
  "specsDisplay": {
    "titlePrefix": "Format Details:",
    "forPlatform": "for",
    "techSpecsTitle": "Technical Specifications:",
    "generationTypeLabel": "Generation Type",
    "dimensionsLabel": "Dimensions",
    "aspectRatioLabel": "Aspect Ratio",
    "maxLengthSizeLabel": "Max Length/Size",
    "fileTypesLabel": "File Types",
    "maxFileSizeLabel": "Max File Size",
    "resolutionLabel": "Resolution",
    "safeZoneLabel": "Safe Zone",
    "iabEquivalentLabel": "IAB Equivalent",
    "bestPracticesTitle": "Creative Best Practices:",
    "noBestPractices": "No specific best practices listed for this format.",
    "promptGuidanceTitle": "AI Prompt Guidance:",
    "notesTitle": "Notes:",
    "ctaButtonRecommendationsLabel": "CTA Button Recommendations"
  },
  "footer": {
    "apiKeyWarning": "Ensure your API_KEY is correctly configured for Gemini API interactions.",
    "copyright": "Creative Campaign Assistant - LLYC"
  },
   "history": {
    "title": "Recent Activity",
    "useButton": "Use This Prompt",
    "clearButton": "Clear History",
    "clearConfirm": "Are you sure you want to clear your entire request history? This action cannot be undone.",
    "empty": "Your recent generation requests will appear here.",
    "used": "Used"
  },
   "validator": {
    "validateButton": "🔍 Validate Asset",
    "loading": "Analyzing your asset...",
    "uploadLabel": "Upload Creative Asset",
    "uploadAction": "Upload a file",
    "uploadOrDrag": "or drag and drop",
    "fileTypesHint": "Compatible types for this format: {{types}}",
    "textInputLabel": "Paste Ad Copy",
    "textInputPlaceholder": "Paste the ad copy here to validate its length...",
    "textInputSubtext": "The validator will check the character or word count against the format's limits.",
    "results": {
        "title": "Validation Results",
        "overallStatus": "Overall Status",
        "compliant": "Compliant",
        "nonCompliant": "Non-Compliant",
        "table": {
            "spec": "Specification",
            "expected": "Expected",
            "actual": "Actual",
            "status": "Status"
        },
        "status": {
            "ok": "OK",
            "fail": "Fail"
        }
    },
    "errors": {
        "noAssetOrFormat": "Please select a format and provide an asset to validate."
    },
    "spec": {
        "noSpec": "No specific technical specifications to validate for this format."
    }
  },
  "feedbackButton": {
      "tooltip": "Send Feedback",
      "emailSubject": "Feedback for {{appName}}",
      "emailBodyPlaceholder": "Hi team,\n\nI have the following feedback for the {{appName}} application:\n\n"
  },
  "helpBotButton": {
      "tooltip": "Help Center"
  },
  "helpBotModal": {
      "title": "Help Center",
      "closeButtonAriaLabel": "Close help modal",
      "topicsListHeader": "Topics",
      "noTopicSelected": "Select a topic from the list to see the details.",
      "introduction": "How can we help you today?",
      "backToTopics": "Back to Topics"
  },
  "helpTopics": {
    "aboutApp": {
        "question": "What is this application for?",
        "answer": "<strong>DM 5 - Specs & Creatives</strong> is a tool designed to streamline the creation of advertising materials. You can:<br><ul><li><strong>Generate creatives:</strong> Get AI-powered ad copy, image concepts, and video scripts tailored to specific platforms and ad formats.</li><li><strong>Validate assets:</strong> Check if your existing creatives meet the technical specifications (size, dimensions, length, etc.) of different ad platforms.</li></ul>Its goal is to save time, reduce errors, and improve the quality of your campaign assets."
    },
    "generatingAssets": {
        "question": "How do I generate a creative asset?",
        "answer": "It's a simple process:<br><ol><li>Select the <strong>'Creative Generator'</strong> tab.</li><li>Choose the <strong>Advertising Platform</strong> (e.g., Meta, Google Ads).</li><li>Select the specific <strong>Ad Format</strong> you need (e.g., Instagram Reel, Google Search Ad).</li><li>(Optional) Enter your <strong>Campaign Objective</strong> to give the AI more context.</li><li>Describe your <strong>Creative Idea</strong> in detail. The more specific you are, the better the result. You can also specify elements to include or exclude.</li><li>Click the <strong>'Generate Creative Asset'</strong> button and wait for the AI to work its magic.</li></ol>"
    },
     "validatingAssets": {
        "question": "How does the asset validator work?",
        "answer": "The validator checks your creative's technical specs against the requirements of the chosen ad format.<br><ol><li>Go to the <strong>'Creative Validator'</strong> tab.</li><li>Select the <strong>Platform</strong> and <strong>Ad Format</strong>.</li><li>Upload your file (image, video) or paste your text into the input area.</li><li>Click the <strong>'Validate Asset'</strong> button.</li><li>The results will show a checklist of specifications (e.g., Dimensions, File Size, Character Count) and indicate whether your asset is compliant or not.</li></ol>"
    },
    "apiKey": {
        "question": "Do I need an API Key?",
        "answer": "Yes. This application requires a valid Google Gemini API key to function. The application is configured to read this key from an environment variable (`API_KEY`) in its execution environment. Ensure this key is correctly set up for the application to work."
    },
    "interpretingResults": {
        "question": "How do I interpret the results?",
        "answer": "When you generate an asset, you will receive two main components:<br><ul><li><strong>Generated Asset:</strong> This is the creative itself—an image, a block of text, or a script.</li><li><strong>Format Details:</strong> This is a card showing the key technical specs and creative best practices for the ad format you selected. Use this as a guide for production and to ensure your final asset is compliant.</li></ul> For the validator, the results table clearly shows each specification, the expected value, the actual value of your asset, and a pass/fail status."
    }
  },
  "platforms": {
    "META": "Meta (Instagram/Facebook)",
    "YOUTUBE": "YouTube Ads",
    "DV360": "DV360 / DOOH / CTV",
    "LINKEDIN": "LinkedIn Ads",
    "TIKTOK": "TikTok Ads",
    "IAB": "IAB New Ad Portfolio",
    "GOOGLE_ADS": "Google Ads (Display/Search/Video)",
    "AMAZON": "Amazon Advertising",
    "SPOTIFY": "Spotify Ads",
    "X_TWITTER": "X (Twitter) Ads"
  },
  "adFormatNames": {
    "meta_reels_video_script": "Reels (Video Script/Ideas)",
    "meta_stories_image": "Stories (Image)",
    "meta_stories_video_script": "Stories (Video Script/Ideas)",
    "meta_feed_image": "Feed (Image)",
    "meta_feed_ad_copy": "Feed (Ad Copy)",
    "youtube_non_skippable_in_stream_video_script": "Non-Skippable In-Stream Ad (Video Script/Concept)",
    "youtube_bumper_ad_video_script": "Bumper Ad (Video Script/Concept)",
    "youtube_trueview_in_stream_video_script": "TrueView In-Stream Ad (Skippable) (Video Script/Concept)",
    "google_ads_video_action_campaign": "Google Ads: Video Action Campaign (Assets)",
    "tiktok_in_feed_ad_video_script": "In-Feed Ad (Video Script)",
    "tiktok_lead_gen_form_concept": "Lead Gen Instant Form (Concept & Questions)",
    "linkedin_single_image_ad_concept": "Single Image Ad (Image & Copy)",
    "linkedin_video_ad_script": "Video Ad (Script)",
    "google_display_ad_image_concept": "Google Ads: Display Ad (Image)",
    "google_search_ad_copy": "Google Ads: Search Ad (Copy)",
    "google_ads_performance_max_assets": "Google Ads: Performance Max (Asset Group Ideas)",
    "iab_digital_video_linear_ad_concept": "IAB: Digital Video Linear Ad (Concept/Script)",
    "iab_new_ad_portfolio_lean_concept": "IAB: LEAN Ad (Concept)",
    "dv360_dooh_concept": "DV360: Digital Out-of-Home (DOOH) (Concept)",
    "dv360_video_concept": "DV360: Video Ad (Script/Concept)",
    "amazon_sponsored_products_copy": "Amazon: Sponsored Products (Listing Copy)",
    "amazon_sponsored_brands_headline_logo_concept": "Amazon: Sponsored Brands (Headline & Logo/Image Concept)",
    "amazon_video_ad_script": "Amazon: Video Ad (Streaming TV / Online Video Script)",
    "amazon_audio_ad_script": "Amazon: Audio Ad (Script)",
    "spotify_audio_ad_script": "Spotify: Audio Ad (Script & Concept)",
    "spotify_video_takeover_script": "Spotify: Video Takeover (Vertical Video Script)",
    "x_twitter_image_ad_concept": "X/Twitter: Image Ad (Concept & Copy)",
    "x_twitter_video_ad_script": "X/Twitter: Video Ad (Script)"
  },
  "generationTypes": {
    "image_concept": "Image Concept", "image": "Image", "text": "Text", "video_script": "Video Script", "ad_copy": "Ad Copy", "creative_concept": "Creative Concept", "asset_ideas": "Asset Ideas", "form_concept": "Form Concept", "audio_script": "Audio Script", "listing_copy": "Product Listing Copy"
  },
  "fallbackError": "An unexpected error occurred during generation.",
  "geminiService": { "errors": { "apiKeyMissing": "API_KEY is not configured. Please set the API_KEY environment variable.", "imageGenFailed": "Image generation failed or returned no data.", "textGenFailed": "Text generation failed or returned no data.", "unknown": "An unknown error occurred while communicating with the Gemini API.", "apiKeyInvalid": "Gemini API Error: API Key is invalid or missing, or you lack permissions. Please ensure the API_KEY environment variable is correctly set and valid. Original error: {{originalError}}", "quotaExceeded": "Gemini API Error: You have exceeded your API quota. Please check your usage and limits. Original error: {{originalError}}", "apiError": "Gemini API Error: {{originalError}}", "refinementFailed": "Image refinement failed or returned no data." } },
  "refineImage": {
    "title": "Refine Generated Image",
    "placeholder": "Describe the changes you want... e.g., 'change the background to a beach', 'make the text larger', 'correct the text to say Free Shipping'",
    "button": "Refine",
    "removeTextButton": "Remove All Text",
    "loading": "Refining your image...",
    "removeTextLoading": "Removing text from image..."
  }
};

// Spanish translations
const es = {
  "header": {
    "llycLogo": "LLYC",
    "title": "DM 5 - Specs & Creatives",
    "subtitle": "Genera y valida creatividades publicitarias optimizadas con IA.",
    "langSwitcherLabel": "Idioma:"
  },
  "tabs": {
    "generator": "Generador Creativo",
    "validator": "Validador Creativo"
  },
  "platformSelector": {
    "label": "Plataforma Publicitaria",
    "selectPlaceholder": "Selecciona una Plataforma"
  },
  "formatSelector": {
    "label": "Formato de Anuncio / Tipo de Creatividad",
    "selectPlaceholder": "Selecciona un Formato",
    "disabledPlaceholder": "Selecciona una plataforma primero",
    "allFormats": "Validar contra todos los formatos compatibles"
  },
  "objectiveInput": {
    "label": "Objetivo de Campaña (Opcional)",
    "placeholder": "Ej: Aumentar notoriedad de marca, Generar tráfico web, Instalaciones de app"
  },
  "creativeInput": {
    "label": "Idea Creativa / Descripción Base del Activo",
    "placeholder": "Describe tu producto, servicio, público objetivo, mensaje clave, estilo deseado o cualquier activo existente. Por ejemplo: 'Un anuncio minimalista para una nueva marca de café ecológico dirigida a jóvenes profesionales. Mostrar una foto de producto elegante con elementos naturales.'",
    "subtext": "Cuanto más detalle proporciones, mejor podrá ayudarte la IA.",
    "inclusionsLabel": "Elementos a Incluir (Opcional)",
    "inclusionsPlaceholder": "Ej: 'el logo en la esquina superior derecha', 'el eslogan Días Felices', 'una llamada a la acción con 10% dto.'",
    "inclusionsSubtext": "Especifica cualquier texto, objeto o concepto que deba aparecer en la creatividad.",
    "exclusionsLabel": "Elementos a Excluir (Opcional)",
    "exclusionsPlaceholder": "Ej: 'el color azul', 'imágenes de personas', 'la palabra barato'",
    "exclusionsSubtext": "Especifica cualquier texto, objeto o concepto que NO deba aparecer en la creatividad."
  },
  "assetGenerator": {
    "buttonText": "✨ Generar Activo Creativo"
  },
  "loadingSpinner": {
    "message": "Generando tu obra maestra creativa..."
  },
  "errorMessage": {
    "prefix": "¡Ups! Ocurrió un error:",
    "userErrorPrefix": "Por favor, selecciona una plataforma, un formato y proporciona una idea creativa."
  },
  "assetDisplay": {
    "titlePrefix": "Activo Generado:",
    "imageAlt": "Creatividad Generada",
    "saveImageHint": "Haz clic derecho o mantén pulsado sobre la imagen para guardarla.",
    "copyTextHint": "Puedes copiar el texto de arriba."
  },
  "specsDisplay": {
    "titlePrefix": "Detalles del Formato:",
    "forPlatform": "para",
    "techSpecsTitle": "Especificaciones Técnicas:",
    "generationTypeLabel": "Tipo de Generación",
    "dimensionsLabel": "Dimensiones",
    "aspectRatioLabel": "Relación de Aspecto",
    "maxLengthSizeLabel": "Longitud/Tamaño Máx.",
    "fileTypesLabel": "Tipos de Archivo",
    "maxFileSizeLabel": "Tamaño Máx. Archivo",
    "resolutionLabel": "Resolución",
    "safeZoneLabel": "Zona Segura",
    "iabEquivalentLabel": "Equivalente IAB",
    "bestPracticesTitle": "Mejores Prácticas Creativas:",
    "noBestPractices": "No hay mejores prácticas específicas listadas para este formato.",
    "promptGuidanceTitle": "Guía para el Prompt de IA:",
    "notesTitle": "Notas:",
    "ctaButtonRecommendationsLabel": "Recomendaciones Botón CTA"
  },
  "footer": {
    "apiKeyWarning": "Asegúrate de que tu API_KEY esté configurada correctamente para las interacciones con la API de Gemini.",
    "copyright": "Asistente de Campañas Creativas - LLYC"
  },
   "history": {
    "title": "Actividad Reciente",
    "useButton": "Usar esta Petición",
    "clearButton": "Borrar Historial",
    "clearConfirm": "¿Seguro que quieres borrar todo tu historial de peticiones? Esta acción no se puede deshacer.",
    "empty": "Tus peticiones de generación recientes aparecerán aquí.",
    "used": "Usado"
  },
  "validator": {
    "validateButton": "🔍 Validar Activo",
    "loading": "Analizando tu activo...",
    "uploadLabel": "Sube el Activo Creativo",
    "uploadAction": "Sube un archivo",
    "uploadOrDrag": "o arrástralo y suéltalo",
    "fileTypesHint": "Tipos compatibles para este formato: {{types}}",
    "textInputLabel": "Pega el Copy del Anuncio",
    "textInputPlaceholder": "Pega el copy del anuncio aquí para validar su longitud...",
    "textInputSubtext": "El validador comprobará el número de caracteres o palabras contra los límites del formato.",
    "results": {
        "title": "Resultados de la Validación",
        "overallStatus": "Estado General",
        "compliant": "Cumple",
        "nonCompliant": "No Cumple",
        "table": {
            "spec": "Especificación",
            "expected": "Esperado",
            "actual": "Actual",
            "status": "Estado"
        },
        "status": {
            "ok": "OK",
            "fail": "Fallo"
        }
    },
    "errors": {
        "noAssetOrFormat": "Por favor, selecciona un formato y proporciona un activo para validar."
    },
    "spec": {
        "noSpec": "No hay especificaciones técnicas que validar para este formato."
    }
  },
    "feedbackButton": {
      "tooltip": "Enviar Feedback",
      "emailSubject": "Feedback para {{appName}}",
      "emailBodyPlaceholder": "Hola equipo,\n\nTengo el siguiente feedback para la aplicación {{appName}}:\n\n"
  },
  "helpBotButton": {
      "tooltip": "Centro de Ayuda"
  },
  "helpBotModal": {
      "title": "Centro de Ayuda",
      "closeButtonAriaLabel": "Cerrar modal de ayuda",
      "topicsListHeader": "Temas",
      "noTopicSelected": "Selecciona un tema de la lista para ver los detalles.",
      "introduction": "¿En qué podemos ayudarte?",
      "backToTopics": "Volver a Temas"
  },
  "helpTopics": {
    "aboutApp": {
        "question": "¿Para qué sirve esta aplicación?",
        "answer": "<strong>DM 5 - Specs & Creatives</strong> es una herramienta diseñada para agilizar la creación de materiales publicitarios. Puedes:<br><ul><li><strong>Generar creatividades:</strong> Obtén copys, conceptos de imagen y guiones de vídeo con IA, adaptados a plataformas y formatos específicos.</li><li><strong>Validar activos:</strong> Comprueba si tus creatividades existentes cumplen con las especificaciones técnicas (tamaño, dimensiones, longitud, etc.) de las distintas plataformas publicitarias.</li></ul>Su objetivo es ahorrar tiempo, reducir errores y mejorar la calidad de los activos de tus campañas."
    },
    "generatingAssets": {
        "question": "¿Cómo genero un activo creativo?",
        "answer": "Es un proceso sencillo:<br><ol><li>Selecciona la pestaña <strong>'Generador Creativo'</strong>.</li><li>Elige la <strong>Plataforma Publicitaria</strong> (ej. Meta, Google Ads).</li><li>Selecciona el <strong>Formato de Anuncio</strong> específico que necesites (ej. Reel de Instagram, Anuncio de Búsqueda de Google).</li><li>(Opcional) Introduce el <strong>Objetivo de Campaña</strong> para dar más contexto a la IA.</li><li>Describe tu <strong>Idea Creativa</strong> en detalle. Cuanto más específico seas, mejor será el resultado. También puedes especificar elementos a incluir o excluir.</li><li>Haz clic en el botón <strong>'Generar Activo Creativo'</strong> y espera a que la IA haga su magia.</li></ol>"
    },
     "validatingAssets": {
        "question": "¿Cómo funciona el validador de activos?",
        "answer": "El validador comprueba las especificaciones técnicas de tu creatividad contra los requisitos del formato de anuncio elegido.<br><ol><li>Ve a la pestaña <strong>'Validador Creativo'</strong>.</li><li>Selecciona la <strong>Plataforma</strong> y el <strong>Formato de Anuncio</strong>.</li><li>Sube tu archivo (imagen, vídeo) o pega tu texto en el área de entrada.</li><li>Haz clic en el botón <strong>'Validar Activo'</strong>.</li><li>Los resultados mostrarán una lista de especificaciones (ej. Dimensiones, Tamaño del archivo, Número de caracteres) e indicarán si tu activo cumple o no.</li></ol>"
    },
    "apiKey": {
        "question": "¿Necesito una API Key?",
        "answer": "Sí. Esta aplicación requiere una API key de Google Gemini válida para funcionar. La aplicación está configurada para leer esta clave desde una variable de entorno (`API_KEY`) en su entorno de ejecución. Asegúrate de que esta clave esté correctamente configurada para que la aplicación funcione."
    },
    "interpretingResults": {
        "question": "¿Cómo interpreto los resultados?",
        "answer": "Cuando generas un activo, recibirás dos componentes principales:<br><ul><li><strong>Activo Generado:</strong> Esta es la creatividad en sí: una imagen, un bloque de texto o un guion.</li><li><strong>Detalles del Formato:</strong> Es una tarjeta que muestra las especificaciones técnicas clave y las mejores prácticas creativas para el formato de anuncio que seleccionaste. Úsalo como guía para la producción y para asegurar que tu activo final cumpla con los requisitos.</li></ul>Para el validador, la tabla de resultados muestra claramente cada especificación, el valor esperado, el valor real de tu activo y un estado de aprobado/fallido."
    }
  },
  "platforms": {
    "META": "Meta (Instagram/Facebook)",
    "YOUTUBE": "YouTube Ads",
    "DV360": "DV360 / DOOH / CTV",
    "LINKEDIN": "LinkedIn Ads",
    "TIKTOK": "TikTok Ads",
    "IAB": "IAB New Ad Portfolio",
    "GOOGLE_ADS": "Google Ads (Display/Search/Video)",
    "AMAZON": "Amazon Advertising",
    "SPOTIFY": "Spotify Ads",
    "X_TWITTER": "X (Twitter) Ads"
  },
  "adFormatNames": {
    "meta_reels_video_script": "Reels (Guion/Ideas de Video)",
    "meta_stories_image": "Stories (Imagen)",
    "meta_stories_video_script": "Stories (Guion/Ideas de Video)",
    "meta_feed_image": "Feed (Imagen)",
    "meta_feed_ad_copy": "Feed (Copy de Anuncio)",
    "youtube_non_skippable_in_stream_video_script": "Anuncio In-Stream No Saltable (Guion/Concepto de Video)",
    "youtube_bumper_ad_video_script": "Bumper Ad (Guion/Concepto de Video)",
    "youtube_trueview_in_stream_video_script": "Anuncio TrueView In-Stream (Saltable) (Guion/Concepto de Video)",
    "google_ads_video_action_campaign": "Google Ads: Campaña de Vídeo de Acción (Activos)",
    "tiktok_in_feed_ad_video_script": "Anuncio In-Feed (Guion de Video)",
    "tiktok_lead_gen_form_concept": "Formulario Instantáneo Lead Gen (Concepto y Preguntas)",
    "linkedin_single_image_ad_concept": "Anuncio de Imagen Única (Imagen y Copy)",
    "linkedin_video_ad_script": "Anuncio de Video (Guion)",
    "google_display_ad_image_concept": "Google Ads: Anuncio de Display (Imagen)",
    "google_search_ad_copy": "Google Ads: Anuncio de Búsqueda (Copy)",
    "google_ads_performance_max_assets": "Google Ads: Máximo Rendimiento (Ideas para Grupos de Activos)",
    "iab_digital_video_linear_ad_concept": "IAB: Anuncio Lineal de Video Digital (Concepto/Guion)",
    "iab_new_ad_portfolio_lean_concept": "IAB: Anuncio LEAN (Concepto)",
    "dv360_dooh_concept": "DV360: Digital Out-of-Home (DOOH) (Concepto)",
    "dv360_video_concept": "DV360: Anuncio de Video (Guion/Concepto)",
    "amazon_sponsored_products_copy": "Amazon: Sponsored Products (Copy de Listing)",
    "amazon_sponsored_brands_headline_logo_concept": "Amazon: Sponsored Brands (Concepto Titular y Logo/Imagen)",
    "amazon_video_ad_script": "Amazon: Anuncio de Video (Streaming TV / Video Online - Guion)",
    "amazon_audio_ad_script": "Amazon: Anuncio de Audio (Guion)",
    "spotify_audio_ad_script": "Spotify: Anuncio de Audio (Guion y Concepto)",
    "spotify_video_takeover_script": "Spotify: Video Takeover (Guion Video Vertical)",
    "x_twitter_image_ad_concept": "X/Twitter: Anuncio con Imagen (Concepto y Copy)",
    "x_twitter_video_ad_script": "X/Twitter: Anuncio de Video (Guion)"
  },
  "generationTypes": {
    "image_concept": "Concepto de Imagen", "image": "Imagen", "text": "Texto", "video_script": "Guion de Video", "ad_copy": "Copy de Anuncio", "creative_concept": "Concepto Creativo", "asset_ideas": "Ideas de Activos", "form_concept": "Concepto de Formulario", "audio_script": "Guion de Audio", "listing_copy": "Copy de Ficha de Producto"
  },
  "fallbackError": "Ocurrió un error inesperado durante la generación.",
  "geminiService": { "errors": { "apiKeyMissing": "API_KEY no está configurada. Por favor, establece la variable de entorno API_KEY.", "imageGenFailed": "La generación de imagen falló o no devolvió datos.", "textGenFailed": "La generación de texto falló o no devolvió datos.", "unknown": "Ocurrió un error desconocido al comunicarse con la API de Gemini.", "apiKeyInvalid": "Error API Gemini: La API Key es inválida, no existe o careces de permisos. Asegúrate de que la variable de entorno API_KEY está correctamente configurada y es válida. Error original: {{originalError}}", "quotaExceeded": "Error API Gemini: Has excedido tu cuota de API. Por favor, revisa tu uso y límites. Error original: {{originalError}}", "apiError": "Error API Gemini: {{originalError}}", "refinementFailed": "La modificación de la imagen falló o no devolvió datos." } },
  "refineImage": {
    "title": "Refinar Imagen Generada",
    "placeholder": "Describe los cambios que quieres... ej: 'cambia el fondo a una playa', 'haz el texto más grande', 'corrige el texto para que ponga Envío Gratis'",
    "button": "Refinar",
    "removeTextButton": "Quitar Todo el Texto",
    "loading": "Refinando tu imagen...",
    "removeTextLoading": "Quitando texto de la imagen..."
  }
};


i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en
      },
      es: {
        translation: es
      }
    },
    lng: 'es', // Set a default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    debug: false,
  });

export default i18next;