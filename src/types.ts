export enum Platform {
  META = "Meta (Instagram/Facebook)",
  YOUTUBE = "YouTube Ads",
  DV360 = "DV360 / DOOH / CTV",
  LINKEDIN = "LinkedIn Ads",
  TIKTOK = "TikTok Ads",
  IAB = "IAB New Ad Portfolio",
  GOOGLE_ADS = "Google Ads (Display/Search)",
  AMAZON = "Amazon Advertising",
  SPOTIFY = "Spotify Ads",
  X_TWITTER = "X (Twitter) Ads",
}

// Keys for platform names for translation
export const PlatformTranslationKeys: Record<Platform, string> = {
  [Platform.META]: "platforms.META",
  [Platform.YOUTUBE]: "platforms.YOUTUBE",
  [Platform.DV360]: "platforms.DV360",
  [Platform.LINKEDIN]: "platforms.LINKEDIN",
  [Platform.TIKTOK]: "platforms.TIKTOK",
  [Platform.IAB]: "platforms.IAB",
  [Platform.GOOGLE_ADS]: "platforms.GOOGLE_ADS",
  [Platform.AMAZON]: "platforms.AMAZON",
  [Platform.SPOTIFY]: "platforms.SPOTIFY",
  [Platform.X_TWITTER]: "platforms.X_TWITTER"
};


export enum MetaFormat {
  REELS_VIDEO_SCRIPT = "Reels (Video Script/Ideas)",
  STORIES_IMAGE = "Stories (Image)",
  STORIES_VIDEO_SCRIPT = "Stories (Video Script/Ideas)",
  FEED_IMAGE = "Feed (Image)",
  FEED_VIDEO_SCRIPT = "Feed (Video Script/Ideas)",
  FEED_AD_COPY = "Feed (Ad Copy)",
  CAROUSEL_IDEAS = "Carousel (Component Ideas)",
}

export enum YouTubeFormat {
  IN_STREAM_VIDEO_SCRIPT = "In-Stream Ad (Video Script/Concept)",
  NON_SKIPPABLE_IN_STREAM_VIDEO_SCRIPT = "Non-Skippable In-Stream Ad (Video Script/Concept)",
  BUMPER_AD_VIDEO_SCRIPT = "Bumper Ad (Video Script/Concept)",
  MASTHEAD_CONCEPT = "Masthead (Creative Concept)",
  SHORTS_VIDEO_SCRIPT = "Shorts (Video Script/Concept)",
  AUDIO_AD_CONCEPT = "Audio Ad (Concept/Script)",
  TRUEVIEW_DISCOVERY_AD_COPY = "TrueView Discovery Ad (Copy & Thumbnail Idea)",
  TRUEVIEW_IN_STREAM_VIDEO_SCRIPT = "TrueView In-Stream Ad (Video Script/Concept)",
  VIDEO_ACTION_CAMPAIGN_SCRIPT = "Video Action Campaign (Script/Concept)", // Google Ads Video
  VIDEO_REACH_CAMPAIGN_SCRIPT = "Video Reach Campaign (Script/Concept)", // Google Ads Video
  OUTSTREAM_VIDEO_SCRIPT = "Outstream Video Ad (Script/Concept)", // Google Ads Video
}

export enum TikTokFormat {
  IN_FEED_AD_VIDEO_SCRIPT = "In-Feed Ad (Video Script)",
  TOPVIEW_AD_VIDEO_SCRIPT = "TopView Ad (Video Script)",
  SPARK_AD_CONCEPT = "Spark Ad (Content Idea)",
  LEAD_GEN_FORM_CONCEPT = "Lead Gen Instant Form (Concept & Questions)",
}

export enum LinkedInFormat {
  SINGLE_IMAGE_AD_CONCEPT = "Single Image Ad (Image Concept & Copy)",
  CAROUSEL_AD_IDEAS = "Carousel Ad (Component Ideas & Copy)",
  VIDEO_AD_SCRIPT = "Video Ad (Script)",
  TEXT_AD_COPY = "Text Ad (Copy)",
  DOCUMENT_AD_CONCEPT = "Document Ad (Content Concept)",
  CONVERSATION_AD_CONCEPT = "Conversation Ad (Flow/Copy Concept)",
  EVENT_AD_CONCEPT = "Event Ad (Concept/Copy)",
}

export enum GoogleAdsFormat {
  DISPLAY_AD_IMAGE_CONCEPT = "Display Ad (Image Concept)",
  DISPLAY_AD_HEADLINES = "Display Ad (Headlines/Descriptions)",
  SEARCH_AD_COPY = "Search Ad (Copy)",
  RESPONSIVE_DISPLAY_AD_ASSETS = "Responsive Display Ad (Asset Ideas)",
  APP_CAMPAIGN_ASSETS = "App Campaign (Asset Ideas - Text, Image, Video)",
  PERFORMANCE_MAX_ASSETS = "Performance Max (Asset Group Ideas)",
  DEMAND_GEN_ASSETS = "Demand Gen Campaign (Image/Video/Carousel Concept)" // Mix of types
}

export enum IABFormat {
  DIGITAL_VIDEO_LINEAR_AD_CONCEPT = "Digital Video Linear Ad (Concept/Script)",
  DIGITAL_VIDEO_NON_LINEAR_AD_CONCEPT = "Digital Video Non-Linear Ad (Overlay Concept)",
  NEW_AD_PORTFOLIO_LEAN_CONCEPT = "LEAN Ad (Concept - e.g., Interstitial)",
  BANNER_AD_CONCEPT = "Banner Ad (Standard Sizes Concept)",
  RICH_MEDIA_AD_CONCEPT = "Rich Media Ad (Interactive Concept)",
  NATIVE_AD_CONCEPT = "Native Ad (Content-aligned Concept)",
}

export enum AmazonFormat {
  SPONSORED_PRODUCTS_COPY = "Sponsored Products (Listing Copy Optimization)",
  SPONSORED_BRANDS_HEADLINE_LOGO_CONCEPT = "Sponsored Brands (Headline & Logo/Image Concept)",
  SPONSORED_DISPLAY_IMAGE_CONCEPT = "Sponsored Display (Image Concept & Headline)",
  AMAZON_VIDEO_AD_SCRIPT = "Amazon Video Ad (Streaming TV / Online Video Script)",
  AMAZON_AUDIO_AD_SCRIPT = "Amazon Audio Ad (Script)",
  AMAZON_FIRE_TV_AD_CONCEPT = "Amazon Fire TV Ad (Display/Video Concept)",
  AMAZON_DOOH_CONCEPT = "Amazon DOOH (Concept for Digital Billboards)",
  CUSTOM_ADVERTISING_CONCEPT = "Custom Advertising Solution (Overall Concept)",
}

export enum SpotifyFormat {
  AUDIO_AD_SCRIPT = "Audio Ad (Script & Concept)",
  VIDEO_TAKEOVER_SCRIPT = "Video Takeover (Vertical Video Script)",
  SPONSORED_PLAYLIST_CONCEPT = "Sponsored Playlist (Concept & Branding)",
  OVERLAY_AD_CONCEPT = "Overlay Ad (Display Concept)",
  HOMEPAGE_TAKEOVER_CONCEPT = "Homepage Takeover (Concept)",
}

export enum XTwitterFormat {
  PROMOTED_AD_TEXT_IMAGE_CONCEPT = "Promoted Ad (Text & Image/GIF/Video Concept)",
  PROMOTED_VIDEO_SCRIPT = "Promoted Video (Script)",
  IMAGE_APP_CARD_CONCEPT = "Image App Card (Image & Copy Concept)",
  VIDEO_APP_CARD_CONCEPT = "Video App Card (Video Script & Copy Concept)",
  CAROUSEL_AD_IDEAS = "Carousel Ad (Images/Videos & Copy Ideas)",
  TAKEOVER_AD_CONCEPT = "Timeline Takeover / Trend Takeover (Concept)",
}


export type AdFormatName =
  | MetaFormat
  | YouTubeFormat
  | TikTokFormat
  | LinkedInFormat
  | GoogleAdsFormat
  | IABFormat
  | AmazonFormat
  | SpotifyFormat
  | XTwitterFormat
  | string;

// AdFormatSpec uses keys for translatable strings
export interface AdFormatSpec {
  id: string; // Remains as is, used as internal identifier
  platform: Platform; // Enum for filtering, display will use PlatformTranslationKeys
  formatNameKey: string; // Translation key for format name, e.g., "adFormatNames.meta_reels_video_script"
  generationType: "image_concept" | "image" | "text" | "video_script" | "ad_copy" | "creative_concept" | "asset_ideas" | "form_concept" | "audio_script" | "listing_copy";
  dimensions?: { width: number; height: number; unit: "px" | "%" };
  aspectRatio?: string;
  maxLength?: { value: number; unit: "seconds" | "MB" | "characters" | "words" | "pages" | "slides" };
  fileTypes?: string[];
  maxFileSize?: string;
  resolution?: string;
  safeZone?: string;
  bestPracticesKeys: string[]; // Array of translation keys, e.g., ["bestPractices.meta_reels_bp1", ...]
  iabEquivalent?: string; // This could also be a key if it needs translation
  promptGuidanceKey?: string; // Translation key for prompt guidance
  notesKey?: string; // Translation key for notes, can include links to official docs
  sourceUrl?: string; // Direct URL to the source document
  ctaButtonRecommendations?: string[]; // Example: ["Learn More", "Shop Now"] - could also be keys
}

export interface CreativeAsset {
  type: "image" | "text" | "audio"; // Added audio
  data: string; // For image: base64 URL. For text: string. For audio: script text or concept.
  assetFormatDescription: string;
}


export interface GeneratedCreativeOutput {
  aiSummary: string;
  asset: CreativeAsset;
  selectedFormatSpec: AdFormatSpec;
}

export type PlatformKey = keyof typeof Platform;

// Types for the Creative Validator
export interface ValidationResultItem {
  key: string;
  specName: string;
  expected: string;
  actual: string;
  compliant: boolean;
}

export interface ValidationResult {
  overallCompliant: boolean;
  results: ValidationResultItem[];
}

export interface FormattedValidationResult {
  formatNameKey: string;
  result: ValidationResult;
}

// Type for Help Modal topics
export interface HelpTopic {
  id: string;
  questionKey: string; // Translation key for the question/title
  answerKey: string; // Translation key for the answer/content
}