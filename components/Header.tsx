
import React from 'react';
import type { ResearchField } from '../types';

interface HeaderProps {
    selectedField: ResearchField | null;
    onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ selectedField, onReset }) => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-700/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-cyan-400">NexusAI</span>
            <span className="text-2xl font-light text-slate-300">Research Assistant</span>
          </div>
          {selectedField && (
            <button
              onClick={onReset}
              className="px-4 py-2 text-sm font-medium text-slate-200 bg-slate-700 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition-colors"
            >
              Change Field
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
