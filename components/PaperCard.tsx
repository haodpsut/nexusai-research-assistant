
import React from 'react';
import type { Paper } from '../types';

interface PaperCardProps {
  paper: Paper;
}

const PaperCard: React.FC<PaperCardProps> = ({ paper }) => {
  return (
    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700/50">
      <h3 className="font-bold text-md text-slate-100">{paper.title}</h3>
      <p className="text-xs text-slate-500 font-mono mt-1 mb-2 truncate">
        {paper.authors.join(', ')}
      </p>
      <p className="text-sm text-slate-400">{paper.summary}</p>
      {paper.url && (
        <a
          href={paper.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 text-sm text-cyan-400 hover:text-cyan-300 hover:underline"
        >
          View Source {paper.sourceTitle && `(${paper.sourceTitle})`}
        </a>
      )}
    </div>
  );
};

export default PaperCard;
