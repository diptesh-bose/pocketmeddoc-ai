
import React from 'react';
import { Language, NoteAction } from '../types';
import { SUPPORTED_LANGUAGES } from '../constants';
import { LanguageSelector } from './LanguageSelector';

interface ActionToolbarProps {
  onProcess: (action: NoteAction) => void;
  targetLanguage: Language;
  onTargetLanguageChange: (language: Language) => void;
  isLoading: boolean;
  disabled: boolean;
}

const ActionButton: React.FC<{
  action: NoteAction;
  onClick: (action: NoteAction) => void;
  isLoading: boolean;
  disabled: boolean;
  icon?: React.ReactNode;
  bgColor?: string;
  hoverBgColor?: string;
}> = ({ action, onClick, isLoading, disabled, icon, bgColor = 'bg-purple-600', hoverBgColor = 'hover:bg-purple-700' }) => (
  <button
    onClick={() => onClick(action)}
    disabled={isLoading || disabled}
    className={`flex-1 sm:flex-none flex items-center justify-center text-white font-medium py-2.5 px-4 rounded-lg shadow-md transition-all duration-150 ease-in-out transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${bgColor} ${!disabled ? hoverBgColor : ''} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-purple-500`}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {action}
  </button>
);

export const ActionToolbar: React.FC<ActionToolbarProps> = ({
  onProcess,
  targetLanguage,
  onTargetLanguageChange,
  isLoading,
  disabled
}) => {
  const commonButtonProps = { isLoading, disabled, onClick: onProcess };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-purple-300">Processing Actions</h3>
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
        <ActionButton 
          {...commonButtonProps} 
          action={NoteAction.SUMMARIZE} 
          icon={<DocumentTextIcon />}
          bgColor="bg-sky-600"
          hoverBgColor="hover:bg-sky-700"
        />
        <ActionButton 
          {...commonButtonProps} 
          action={NoteAction.STRUCTURE_SOAP} 
          icon={<BeakerIcon />}
          bgColor="bg-emerald-600"
          hoverBgColor="hover:bg-emerald-700"
        />
        <ActionButton 
          {...commonButtonProps} 
          action={NoteAction.TRANSLATE} 
          icon={<TranslateIcon />}
          bgColor="bg-amber-600"
          hoverBgColor="hover:bg-amber-700"
        />
      </div>

      <div className="pt-2">
        <label htmlFor="target-language" className="block text-sm font-medium text-gray-300 mb-1">
          Target Language (for Translation)
        </label>
        <LanguageSelector
          id="target-language"
          selectedLanguage={targetLanguage}
          onChange={onTargetLanguageChange}
          languages={SUPPORTED_LANGUAGES}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

// SVG Icons (Heroicons)
const DocumentTextIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
  </svg>
);

const BeakerIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
  </svg>
);

const TranslateIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 NaN NaNL11.25 11.25M3 21V5.621m0 0H5.625M3 5.621a48.474 48.474 0 0 1 NaN NaNM12 3c2.755 0 5.455.232 8.083.678a1.5 1.5 0 0 1 1.417 1.417v2.133c0 .744-.452 1.395-1.136 1.65L12 12M3 5.621v1.931L11.25 11.25M12 3c-.205 0-.408.004-.612.011M12 3c.205 0 .408.004.612.011M12 3v8.25M12 15v6M3 21a48.474 48.474 0 0 1 NaN NaNL11.25 11.25M3 5.621l.923 1.931M11.25 11.25l.923 1.931m0 0L12 12.25m0 0l-.923-1.931m0 0L12 12m0-9v.011" />
  </svg>
);
