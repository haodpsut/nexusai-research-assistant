
import React from 'react';
import type { ResearchField } from './types';

export const BrainIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export const QuantumIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8m0-13a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const SatelliteIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 110-7.07m7.072 0a5 5 0 110 7.07M12 12a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export const AlgorithmIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

export const OpenRouterIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m5.632 2.684C15.114 12.938 15 12.482 15 12s.114-.938.316-1.342m-6.248 0L9 12l-1.264.658M15.316 10.658L15 12l1.264.658m-8.56-3.536a9 9 0 1012.728 0M4 12a8 8 0 018-8" />
    </svg>
);

export const PaperIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export const LightbulbIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

export const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

export const RESEARCH_FIELDS: ResearchField[] = [
  { id: 'ai', name: 'Artificial Intelligence', description: 'Explore trends in ML, DL, NLP, and computer vision.', icon: <BrainIcon className="h-8 w-8 text-cyan-400" /> },
  { id: 'quantum', name: 'Quantum Computing', description: 'Discover advances in quantum algorithms and hardware.', icon: <QuantumIcon className="h-8 w-8 text-purple-400" /> },
  { id: 'satellite', name: 'Satellite Networking & 6G', description: 'Analyze the future of global communication networks.', icon: <SatelliteIcon className="h-8 w-8 text-green-400" /> },
  { id: 'algorithms', name: 'Advanced Algorithms', description: 'Track new methods like DRL, FL, and GNNs.', icon: <AlgorithmIcon className="h-8 w-8 text-orange-400" /> },
];

export const OPENROUTER_MODELS = [
  { id: 'nous', name: 'Nous: Capybara 7B (Free)' },
  { id: 'mistral', name: 'Mistral: Mistral 7B Instruct (Free)' },
  { id: 'gemma', name: 'Google: Gemma 7B (Free)' },
  { id: 'mythomax', name: 'MythoMax L2 13B (Free)' },
];