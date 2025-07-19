
import React, { useState, useEffect, useCallback } from 'react';
import type { ResearchField, Keyword, Paper, Idea } from './types';
import { RESEARCH_FIELDS } from './constants';
import { getTrendingKeywords, getLatestPapers, getResearchIdeas } from './services/geminiService';
import ProviderSettings from './components/ProviderSettings';
import SettingsScreen from './components/SettingsScreen';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import ApiKeyBanner from './components/ApiKeyBanner';

const App: React.FC = () => {
  const [apiKeyReady, setApiKeyReady] = useState<boolean>(false);
  const [providerConfigured, setProviderConfigured] = useState<boolean>(false);
  const [selectedField, setSelectedField] = useState<ResearchField | null>(null);
  
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  
  const [loading, setLoading] = useState({ keywords: false, papers: false, ideas: false });

  useEffect(() => {
    // Simulating check for API key from environment variables
    if (process.env.API_KEY && process.env.API_KEY.trim() !== '') {
      setApiKeyReady(true);
    } else {
      setApiKeyReady(false);
    }
  }, []);

  const handleProviderContinue = () => {
    setProviderConfigured(true);
  };

  const handleFieldSelect = useCallback(async (field: ResearchField) => {
    setSelectedField(field);
    setKeywords([]);
    setPapers([]);
    setIdeas([]);
    
    setLoading({ keywords: true, papers: true, ideas: true });

    try {
        const keywordsPromise = getTrendingKeywords(field.name);
        const papersPromise = getLatestPapers(field.name);
        const ideasPromise = getResearchIdeas(field.name);

        const [keywordsResult, papersResult, ideasResult] = await Promise.all([
            keywordsPromise,
            papersPromise,
            ideasPromise
        ]);
        
        setKeywords(keywordsResult);
        setLoading(prev => ({ ...prev, keywords: false }));

        setPapers(papersResult);
        setLoading(prev => ({ ...prev, papers: false }));
        
        setIdeas(ideasResult);
        setLoading(prev => ({ ...prev, ideas: false }));

    } catch (error) {
        console.error("An error occurred during data fetching:", error);
        alert("An error occurred while fetching research data. Please check the console for details.");
        setLoading({ keywords: false, papers: false, ideas: false });
    }
  }, []);
  
  const resetSelection = () => {
    setSelectedField(null);
    setKeywords([]);
    setPapers([]);
    setIdeas([]);
  };

  const renderContent = () => {
    if (!providerConfigured) {
      return <ProviderSettings onContinue={handleProviderContinue} />;
    }
    if (!selectedField) {
      return <SettingsScreen fields={RESEARCH_FIELDS} onSelect={handleFieldSelect} />;
    }
    return <Dashboard
            keywords={keywords}
            papers={papers}
            ideas={ideas}
            loading={loading}
            field={selectedField}
          />;
  };

  if (!apiKeyReady) {
    return <ApiKeyBanner />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <Header selectedField={selectedField} onReset={resetSelection} />
      <main className="container mx-auto p-4 md:p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;