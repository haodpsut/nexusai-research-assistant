
import React, { useState } from 'react';
import { BrainIcon, OpenRouterIcon, OPENROUTER_MODELS } from '../constants';

interface ProviderSettingsProps {
  onContinue: () => void;
}

type Provider = 'gemini' | 'openrouter';

const ProviderCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}> = ({ title, description, icon, isSelected, onClick }) => {
  const selectedClasses = isSelected ? 'border-cyan-500 ring-2 ring-cyan-500' : 'border-slate-700 hover:border-slate-500';
  return (
    <button
      onClick={onClick}
      className={`group h-full relative p-6 text-left bg-slate-800/50 rounded-lg shadow-lg transition-all duration-300 ease-in-out focus:outline-none ${selectedClasses}`}
      aria-pressed={isSelected}
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
        </div>
      </div>
      <p className="mt-3 text-sm text-slate-400">{description}</p>
    </button>
  );
};

const ProviderSettings: React.FC<ProviderSettingsProps> = ({ onContinue }) => {
  const [selectedProvider, setSelectedProvider] = useState<Provider>('gemini');

  return (
    <div className="text-center max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
        Configure Your Research Assistant
      </h1>
      <p className="mt-4 text-lg text-slate-400">
        Choose your AI provider to get started. All data is sourced via Google Gemini for reliable and secure results.
      </p>
      
      <div className="mt-12 text-left">
          <h2 className="text-lg font-semibold text-slate-200 mb-3">Select AI Provider</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <ProviderCard
              title="Google Gemini"
              description="Powered by Google's state-of-the-art models for high-quality, grounded results."
              icon={<BrainIcon className="h-8 w-8 text-cyan-400" />}
              isSelected={selectedProvider === 'gemini'}
              onClick={() => setSelectedProvider('gemini')}
            />
            <ProviderCard
              title="OpenRouter"
              description="Access a variety of models from different providers. (Demonstration only)"
              icon={<OpenRouterIcon className="h-8 w-8 text-indigo-400" />}
              isSelected={selectedProvider === 'openrouter'}
              onClick={() => setSelectedProvider('openrouter')}
            />
          </div>
      </div>

      {selectedProvider === 'openrouter' && (
        <div className="mt-6 text-left bg-slate-800/50 p-6 rounded-lg animate-fade-in">
            <label htmlFor="openrouter-model" className="block text-sm font-medium text-slate-300">Select a free model</label>
            <select
                id="openrouter-model"
                name="openrouter-model"
                className="mt-2 block w-full pl-3 pr-10 py-2 text-base bg-slate-700 border-slate-600 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md text-white"
                aria-describedby="openrouter-disclaimer"
            >
                {OPENROUTER_MODELS.map(model => (
                    <option key={model.id}>{model.name}</option>
                ))}
            </select>
             <p id="openrouter-disclaimer" className="mt-3 text-xs text-amber-400/80 bg-amber-900/20 p-3 rounded-md">
                <strong>Demonstration Only:</strong> OpenRouter integration is not fully implemented. The application will use Google Gemini regardless of the selection here.
            </p>
        </div>
      )}

      <div className="mt-10">
        <button
          onClick={() => onContinue()}
          className="px-8 py-3 text-base font-medium text-white bg-cyan-600 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition-colors"
        >
          Confirm and Continue
        </button>
      </div>
    </div>
  );
};

export default ProviderSettings;