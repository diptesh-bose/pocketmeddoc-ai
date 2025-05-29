
import React from 'react';

interface NoteInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const NoteInput: React.FC<NoteInputProps> = ({ value, onChange, placeholder }) => {
  return (
    <div>
      <label htmlFor="note-input" className="block text-lg font-semibold mb-2 text-purple-300">
        Clinical Notes
      </label>
      <textarea
        id="note-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Enter notes here..."}
        rows={8}
        className="w-full p-4 bg-slate-700 border border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-100 placeholder-gray-400 resize-y transition-colors duration-200"
        aria-label="Clinical Notes Input"
      />
       <p className="mt-2 text-xs text-gray-400">
        Supports multilingual input. The AI will attempt to auto-detect the language.
      </p>
    </div>
  );
};
