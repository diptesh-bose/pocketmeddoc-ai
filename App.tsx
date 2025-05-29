
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { NoteInput } from './components/NoteInput';
import { ActionToolbar } from './components/ActionToolbar';
import { OutputDisplay } from './components/OutputDisplay';
import { Footer } from './components/Footer';
import { Spinner } from './components/common/Spinner';
import { Alert } from './components/common/Alert';
import { processNotesWithGemini } from './services/geminiService';
import { Language, NoteAction, GroundingMetadata } from './types';
import { DEFAULT_TARGET_LANGUAGE } from './constants';

const App: React.FC = () => {
  const [currentNote, setCurrentNote] = useState<string>('');
  const [processedText, setProcessedText] = useState<string>('');
  const [groundingMetadata, setGroundingMetadata] = useState<GroundingMetadata | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [targetLanguage, setTargetLanguage] = useState<Language>(DEFAULT_TARGET_LANGUAGE);
  const [lastAction, setLastAction] = useState<NoteAction | null>(null);

  const handleNoteChange = useCallback((text: string) => {
    setCurrentNote(text);
    if (text === '') {
      setProcessedText(''); // Clear output when input is cleared
      setGroundingMetadata(null);
      setError(null);
    }
  }, []);

  const handleProcessNote = useCallback(async (action: NoteAction) => {
    if (!currentNote.trim()) {
      setError("Please enter some notes to process.");
      setProcessedText('');
      setGroundingMetadata(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setProcessedText('');
    setGroundingMetadata(null);
    setLastAction(action);

    try {
      const result = await processNotesWithGemini(currentNote, action, targetLanguage);
      setProcessedText(result.text);
      if (result.groundingMetadata) {
         setGroundingMetadata(result.groundingMetadata);
      }
    } catch (err) {
      console.error("Processing error:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred during processing.";
      setError(`Failed to process notes: ${errorMessage}. Ensure your API key is correctly configured.`);
      setProcessedText('');
      setGroundingMetadata(null);
    } finally {
      setIsLoading(false);
    }
  }, [currentNote, targetLanguage]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col gap-6 md:gap-8">
        <div className="bg-slate-800 bg-opacity-70 backdrop-blur-md shadow-2xl rounded-xl p-6 md:p-8">
          <NoteInput
            value={currentNote}
            onChange={handleNoteChange}
            placeholder="Enter clinical notes here... (e.g., patient symptoms, observations, initial thoughts)"
          />
        </div>

        <div className="bg-slate-800 bg-opacity-70 backdrop-blur-md shadow-2xl rounded-xl p-6 md:p-8">
          <ActionToolbar
            onProcess={handleProcessNote}
            targetLanguage={targetLanguage}
            onTargetLanguageChange={setTargetLanguage}
            isLoading={isLoading}
            disabled={!currentNote.trim()}
          />
        </div>
        
        {isLoading && (
          <div className="flex justify-center items-center p-6">
            <Spinner />
            <p className="ml-3 text-lg">AI is thinking...</p>
          </div>
        )}

        {error && (
          <div className="mt-4">
            <Alert type="error" message={error} onClose={() => setError(null)} />
          </div>
        )}

        {processedText && !isLoading && (
          <div className="bg-slate-800 bg-opacity-70 backdrop-blur-md shadow-2xl rounded-xl p-6 md:p-8">
            <OutputDisplay 
              processedText={processedText} 
              action={lastAction} 
              language={targetLanguage}
              groundingMetadata={groundingMetadata} 
            />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
