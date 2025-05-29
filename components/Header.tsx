
import React from 'react';
import { APP_TITLE } from '../constants';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 bg-opacity-50 backdrop-blur-lg shadow-lg py-5 px-4 sm:px-6 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-purple-400 mr-3">
            <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.5C2.25 19.56 3.44 20.25 4.5 20.25h1.054a.75.75 0 0 0 .55-.233l2.348-2.684A9.707 9.707 0 0 0 12 21a9.735 9.735 0 0 0 3.25-.555.75.75 0 0 0 .5-.707V5.25a.75.75 0 0 0-.5-.707A9.707 9.707 0 0 0 12.75 3a9.735 9.735 0 0 0-1.5.033ZM6.166 14.758a.75.75 0 0 0-.55.233L4.562 16.047A8.235 8.235 0 0 1 3.75 16.5V6.172a8.235 8.235 0 0 1 .812-.425l1.054.164a.75.75 0 0 0 .55-.233L7.222 4.63a8.21 8.21 0 0 1 3.028-.58V17.83a8.21 8.21 0 0 1-3.028-.58l-1.054-.164ZM21.75 5.25V18.75a.75.75 0 0 1-.5.707 9.71 9.71 0 0 1-3.25.555 9.707 9.707 0 0 1-3.253-1.888V4.533A9.707 9.707 0 0 1 18 3a9.735 9.735 0 0 1 3.25.555.75.75 0 0 1 .5.707Z" />
          </svg>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            {APP_TITLE}
          </h1>
        </div>
        {/* Placeholder for potential future icons like settings or help */}
      </div>
    </header>
  );
};
