
import { Language } from './types';

export const SUPPORTED_LANGUAGES: Language[] = [
  Language.ENGLISH,
  Language.SPANISH,
  Language.FRENCH,
  Language.GERMAN,
  Language.MANDARIN,
  Language.HINDI,
  Language.ARABIC,
  Language.PORTUGUESE,
  Language.RUSSIAN,
  Language.JAPANESE,
];

export const GEMINI_TEXT_MODEL_NAME = "gemini-2.5-flash-preview-04-17";

export const DEFAULT_INPUT_LANGUAGE = Language.ENGLISH;
export const DEFAULT_TARGET_LANGUAGE = Language.ENGLISH;

export const APP_TITLE = "PocketMedDoc AI";

export const PRIVACY_DISCLAIMER = "This AI tool is for assistance and training purposes. Verify all outputs. Do not use real Patient Identifiable Information (PII) unless compliant with your institution's data security and privacy policies. All interactions are processed by a third-party AI service.";
