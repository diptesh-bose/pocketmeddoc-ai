
import React from 'react';
import { Language } from '../types';

interface LanguageSelectorProps {
  id: string;
  selectedLanguage: Language;
  onChange: (language: Language) => void;
  languages: Language[];
  disabled?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  id,
  selectedLanguage,
  onChange,
  languages,
  disabled = false
}) => {
  return (
    <select
      id={id}
      value={selectedLanguage}
      onChange={(e) => onChange(e.target.value as Language)}
      disabled={disabled}
      className="w-full sm:w-auto p-2.5 bg-slate-700 border border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-100 disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200"
      aria-label="Select language"
    >
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
};
