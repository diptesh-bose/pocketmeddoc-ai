
export enum Language {
  ENGLISH = "English",
  SPANISH = "Spanish",
  FRENCH = "French",
  GERMAN = "German",
  MANDARIN = "Mandarin Chinese",
  HINDI = "Hindi",
  ARABIC = "Arabic",
  PORTUGUESE = "Portuguese",
  RUSSIAN = "Russian",
  JAPANESE = "Japanese",
}

export enum NoteAction {
  SUMMARIZE = "Summarize",
  TRANSLATE = "Translate",
  STRUCTURE_SOAP = "Structure (SOAP)",
}

export interface ProcessedNote {
  original: string;
  processed: string;
  action: NoteAction;
  targetLanguage?: Language;
  timestamp: Date;
}

export interface GroundingChunkWeb {
  uri: string;
  title: string;
}

export interface GroundingChunk {
  web?: GroundingChunkWeb;
  // Other types of grounding chunks can be added here if needed
}

export interface GroundingMetadata {
  groundingChunks?: GroundingChunk[];
  // other metadata properties
}
