
import React from 'react';

interface AlertProps {
  type: 'error' | 'warning' | 'info' | 'success';
  message: string;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  let bgColor = '';
  let textColor = '';
  let borderColor = '';
  let iconPath = '';

  switch (type) {
    case 'error':
      bgColor = 'bg-red-900 bg-opacity-30';
      textColor = 'text-red-300';
      borderColor = 'border-red-700';
      iconPath = "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"; // XCircleIcon
      break;
    case 'warning':
      bgColor = 'bg-yellow-900 bg-opacity-30';
      textColor = 'text-yellow-300';
      borderColor = 'border-yellow-700';
      iconPath = "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"; // ExclamationTriangleIcon
      break;
    case 'info':
      bgColor = 'bg-blue-900 bg-opacity-30';
      textColor = 'text-blue-300';
      borderColor = 'border-blue-700';
      iconPath = "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"; // InformationCircleIcon
      break;
    case 'success':
      bgColor = 'bg-green-900 bg-opacity-30';
      textColor = 'text-green-300';
      borderColor = 'border-green-700';
      iconPath = "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"; // CheckCircleIcon
      break;
  }

  return (
    <div 
      className={`p-4 rounded-lg border ${borderColor} ${bgColor} ${textColor} flex items-start shadow-md`}
      role="alert"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
      </svg>
      <span className="flex-grow">{message}</span>
      {onClose && (
        <button 
          onClick={onClose} 
          className={`ml-4 -mx-1.5 -my-1.5 p-1.5 rounded-md ${textColor} hover:bg-opacity-50 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-current focus:ring-white transition-colors`}
          aria-label="Close alert"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};
