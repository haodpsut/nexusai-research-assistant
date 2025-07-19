
import React from 'react';
import type { Keyword, Paper, Idea, ResearchField } from '../types';
import KeywordCard from './KeywordCard';
import PaperCard from './PaperCard';
import IdeaCard from './IdeaCard';
import { exportToCSV } from '../utils/csvExporter';
import { DownloadIcon, BrainIcon, PaperIcon, LightbulbIcon } from '../constants';
import LoadingSpinner from './LoadingSpinner';

interface DashboardProps {
  keywords: Keyword[];
  papers: Paper[];
  ideas: Idea[];
  loading: { keywords: boolean; papers: boolean; ideas: boolean };
  field: ResearchField;
}

const SectionHeader: React.FC<{ title: string; icon: React.ReactNode; onExport: () => void; loading: boolean; hasData: boolean }> = ({ title, icon, onExport, loading, hasData }) => (
    <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-700">
        <div className="flex items-center space-x-3">
            {icon}
            <h2 className="text-xl font-bold text-slate-100">{title}</h2>
        </div>
        {!loading && hasData && (
          <button onClick={onExport} className="flex items-center space-x-2 text-sm px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-md transition-colors text-slate-300 hover:text-white">
              <DownloadIcon className="h-4 w-4" />
              <span>Export CSV</span>
          </button>
        )}
    </div>
);


const Dashboard: React.FC<DashboardProps> = ({ keywords, papers, ideas, loading, field }) => {
    
    const handleExportKeywords = () => exportToCSV(keywords, `${field.id}-trending-keywords`);
    const handleExportPapers = () => exportToCSV(papers.map(p => ({...p, authors: p.authors.join(';')})), `${field.id}-latest-papers`);
    const handleExportIdeas = () => exportToCSV(ideas.map(i => ({...i, keywords: i.keywords.join(';')})), `${field.id}-research-ideas`);

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">Dashboard: <span className="text-cyan-400">{field.name}</span></h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* Trending Keywords Column */}
                <div className="bg-slate-800/50 p-6 rounded-lg">
                    <SectionHeader title="Trending Keywords" icon={<BrainIcon className="h-6 w-6 text-cyan-400" />} onExport={handleExportKeywords} loading={loading.keywords} hasData={keywords.length > 0} />
                    {loading.keywords ? <LoadingSpinner /> : (
                        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                            {keywords.length > 0 ? keywords.map((kw, index) => <KeywordCard key={index} keyword={kw} />) : <p className="text-slate-400">No keywords found.</p>}
                        </div>
                    )}
                </div>

                {/* Latest Papers Column */}
                <div className="bg-slate-800/50 p-6 rounded-lg">
                    <SectionHeader title="Latest Papers" icon={<PaperIcon className="h-6 w-6 text-purple-400" />} onExport={handleExportPapers} loading={loading.papers} hasData={papers.length > 0}/>
                    {loading.papers ? <LoadingSpinner /> : (
                        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                            {papers.length > 0 ? papers.map((paper, index) => <PaperCard key={index} paper={paper} />) : <p className="text-slate-400">No papers found.</p>}
                        </div>
                    )}
                </div>

                {/* Research Ideas Column */}
                <div className="bg-slate-800/50 p-6 rounded-lg">
                    <SectionHeader title="Research Ideas" icon={<LightbulbIcon className="h-6 w-6 text-orange-400" />} onExport={handleExportIdeas} loading={loading.ideas} hasData={ideas.length > 0} />
                    {loading.ideas ? <LoadingSpinner /> : (
                        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                            {ideas.length > 0 ? ideas.map((idea, index) => <IdeaCard key={index} idea={idea} />) : <p className="text-slate-400">No ideas found.</p>}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
