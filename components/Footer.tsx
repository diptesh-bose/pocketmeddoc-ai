
import React from 'react';
import { PRIVACY_DISCLAIMER, APP_TITLE } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 bg-opacity-50 backdrop-blur-lg shadow-md py-6 px-4 text-center text-gray-400 text-xs sm:text-sm">
      <div className="container mx-auto">
        <p className="mb-2">{PRIVACY_DISCLAIMER}</p>
        <p>&copy; {new Date().getFullYear()} {APP_TITLE}. All rights reserved (Simulated).</p>
      </div>
    </footer>
  );
};
