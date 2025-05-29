
import { GoogleGenAI, GenerateContentResponse, GenerateContentParameters, Content } from "@google/genai";
import { Language, NoteAction, GroundingMetadata } from '../types';
import { GEMINI_TEXT_MODEL_NAME } from '../constants';

// Ensure API_KEY is accessed correctly. In a Vite/Create React App, it's import.meta.env.VITE_API_KEY or process.env.REACT_APP_API_KEY
// For this environment, we assume process.env.API_KEY is directly available.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY is not set. Please ensure the API_KEY environment variable is configured.");
  // Potentially throw an error or handle this state in the UI more gracefully
}

const ai = new GoogleGenAI({ apiKey: API_KEY! }); // Use non-null assertion if confident it's set by the build/env

const generatePrompt = (notes: string, action: NoteAction, targetLanguage?: Language): Content => {
  let promptText: string;
  switch (action) {
    case NoteAction.SUMMARIZE:
      promptText = `Summarize the following clinical notes concisely for a quick overview. Focus on key information and main points. Notes: "${notes}"`;
      break;
    case NoteAction.TRANSLATE:
      promptText = `Translate the following clinical notes into ${targetLanguage || Language.ENGLISH}. Notes: "${notes}"`;
      break;
    case NoteAction.STRUCTURE_SOAP:
      promptText = `Analyze the following clinical notes and structure them into SOAP format (Subjective, Objective, Assessment, Plan). 
Each section should be clearly delineated. 
If information for a specific section (Subjective, Objective, Assessment, Plan) is not present in the notes, explicitly state 'Not specified' or 'Information not available' for that section.
Notes: "${notes}"`;
      break;
    default:
      throw new Error("Unknown action type for prompt generation.");
  }
  // Return content as an object { parts: [{ text: string }] }
  // This matches the { role?: 'user'; parts: Part[] } structure of UserContent
  return { parts: [{ text: promptText }] };
};

interface ProcessedGeminiResult {
  text: string;
  groundingMetadata?: GroundingMetadata | null;
}

export const processNotesWithGemini = async (
  notes: string,
  action: NoteAction,
  targetLanguage?: Language
): Promise<ProcessedGeminiResult> => {
  if (!API_KEY) {
    throw new Error("API Key not configured. Cannot contact AI service.");
  }

  const promptContent = generatePrompt(notes, action, targetLanguage);
  
  const params: GenerateContentParameters = {
    model: GEMINI_TEXT_MODEL_NAME,
    contents: promptContent,
    config: {
      temperature: 0.5, // Moderate temperature for factual clinical context
      topP: 0.9,
      topK: 40,
      // Not using thinkingConfig: { thinkingBudget: 0 } as quality is preferred for medical notes
    },
  };

  try {
    const response: GenerateContentResponse = await ai.models.generateContent(params);
    
    const textOutput = response.text;
    if (typeof textOutput !== 'string') {
        console.error("Unexpected API response format, text is missing:", response);
        throw new Error("AI response did not contain valid text output.");
    }

    const groundingMetadata = response.candidates?.[0]?.groundingMetadata as GroundingMetadata | undefined;

    return { text: textOutput, groundingMetadata: groundingMetadata ?? null };

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
      // Check for specific Gemini API error messages if available
      if (error.message.includes("API key not valid")) {
        throw new Error("Invalid API Key. Please check your configuration.");
      }
      if (error.message.toLowerCase().includes("quota") || error.message.toLowerCase().includes("rate limit")) {
        throw new Error("API quota exceeded or rate limit reached. Please try again later.");
      }
    }
    throw new Error(`AI processing failed. ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
