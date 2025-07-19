
import React from 'react';
import type { Paper } from '../types';

interface PaperCardProps {
  paper: Paper;
}

const PaperCard: React.FC<PaperCardProps> = ({ paper }) => {
  return (
    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700/50">
       <h3 className="font-bold text-md text-slate-100">
        {paper.url ? (
            <a 
                href={paper.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-cyan-400 hover:underline focus:outline-none focus:ring-1 focus:ring-cyan-500 rounded"
            >
                {paper.title}
            </a>
        ) : (
            paper.title
        )}
      </h3>
      <div className="flex justify-between items-center mt-1">
        <p className="text-xs text-slate-500 font-mono truncate pr-4">
            {paper.authors.join(', ')}
        </p>
        {paper.publicationDate && (
            <p className="text-xs text-slate-400 flex-shrink-0">
                {new Date(paper.publicationDate).toLocaleDateString()}
            </p>
        )}
      </div>
      <p className="text-sm text-slate-400 mt-2">{paper.summary}</p>
      {paper.sourceTitle && paper.sourceTitle !== 'N/A' && (
        <p className="mt-3 text-xs text-slate-500 font-mono">
          Source: <span className="font-semibold text-slate-400">{paper.sourceTitle}</span>
        </p>
      )}
    </div>
  );
};

export default PaperCard;
