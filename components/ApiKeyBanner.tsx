
import React from 'react';

const ApiKeyBanner: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 p-4 text-center">
        <div className="max-w-2xl bg-slate-800 p-8 rounded-lg border border-red-500/50 shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h1 className="mt-4 text-2xl font-bold text-slate-100">Configuration Error</h1>
            <p className="mt-2 text-slate-400">
                The Gemini API key is not configured. This application requires the <code className="bg-slate-700 text-amber-400 font-mono text-sm px-1 py-0.5 rounded">API_KEY</code> environment variable to be set in order to function.
            </p>
            <p className="mt-4 text-xs text-slate-500">
                Please ensure the environment variable is correctly set up in your deployment environment. The application will not be able to make requests to the Google AI services without it.
            </p>
        </div>
    </div>
  );
};

export default ApiKeyBanner;
