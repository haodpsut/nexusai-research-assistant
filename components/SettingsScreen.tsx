
import React from 'react';
import type { ResearchField } from '../types';

interface SettingsScreenProps {
  fields: ResearchField[];
  onSelect: (field: ResearchField) => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ fields, onSelect }) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
        Unlock Research Trends
      </h1>
      <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
        Choose your field of interest to get started. Our AI will analyze the latest data to bring you trending keywords, recent papers, and novel research ideas.
      </p>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {fields.map((field) => (
          <button
            key={field.id}
            onClick={() => onSelect(field)}
            className="group relative p-6 text-left bg-slate-800/50 rounded-lg shadow-lg hover:bg-slate-700/70 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">{field.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-slate-100">{field.name}</h3>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-400">{field.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsScreen;
