
import React from 'react';
import { NoteAction, Language, GroundingMetadata, GroundingChunk } from '../types';

interface OutputDisplayProps {
  processedText: string;
  action: NoteAction | null;
  language?: Language;
  groundingMetadata?: GroundingMetadata | null;
}

const TitleForAction: React.FC<{ action: NoteAction | null, language?: Language }> = ({ action, language }) => {
  let title = "Processed Output";
  if (action === NoteAction.SUMMARIZE) title = "Summary";
  else if (action === NoteAction.TRANSLATE) title = `Translation (${language || 'Selected Language'})`;
  else if (action === NoteAction.STRUCTURE_SOAP) title = "SOAP Note Structure";
  return <h3 className="text-lg font-semibold text-purple-300 mb-3">{title}</h3>;
};

const GroundingSources: React.FC<{ metadata: GroundingMetadata | null }> = ({ metadata }) => {
  if (!metadata || !metadata.groundingChunks || metadata.groundingChunks.length === 0) {
    return null;
  }

  const webChunks = metadata.groundingChunks.filter(chunk => chunk.web && chunk.web.uri);

  if (webChunks.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 pt-4 border-t border-slate-700">
      <h4 className="text-sm font-semibold text-gray-400 mb-2">Information Sources:</h4>
      <ul className="list-disc list-inside space-y-1">
        {webChunks.map((chunk, index) => (
          chunk.web && chunk.web.uri && (
            <li key={index} className="text-xs text-sky-400">
              <a 
                href={chunk.web.uri} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:underline"
                title={chunk.web.title || chunk.web.uri}
              >
                {chunk.web.title || new URL(chunk.web.uri).hostname}
              </a>
            </li>
          )
        ))}
      </ul>
    </div>
  );
};


export const OutputDisplay: React.FC<OutputDisplayProps> = ({ processedText, action, language, groundingMetadata }) => {
  const handleCopyText = () => {
    navigator.clipboard.writeText(processedText)
      .then(() => {
        // TODO: Add a small toast/notification for successful copy
        console.log("Text copied to clipboard");
      })
      .catch(err => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <TitleForAction action={action} language={language} />
        <button
          onClick={handleCopyText}
          className="text-sm text-purple-400 hover:text-purple-300 font-medium py-1 px-3 rounded-md border border-purple-500 hover:bg-purple-600 transition-colors"
          title="Copy to clipboard"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
          </svg>
          Copy
        </button>
      </div>
      <div className="bg-slate-700 p-4 rounded-lg shadow max-h-96 overflow-y-auto">
        <pre className="whitespace-pre-wrap text-gray-200 text-sm leading-relaxed">
          {processedText}
        </pre>
      </div>
      <GroundingSources metadata={groundingMetadata} />
    </div>
  );
};
