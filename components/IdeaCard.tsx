
import React from 'react';
import type { Idea } from '../types';

interface IdeaCardProps {
  idea: Idea;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea }) => {
  return (
    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700/50">
      <h3 className="font-bold text-md text-slate-100">{idea.title}</h3>
      <div className="mt-2 flex flex-wrap gap-2">
        {idea.keywords.map((kw, index) => (
          <span key={index} className="px-2 py-0.5 text-xs bg-slate-700 text-slate-300 rounded-full font-mono">
            {kw}
          </span>
        ))}
      </div>
      <p className="text-sm text-slate-400 mt-3">{idea.outline}</p>
    </div>
  );
};

export default IdeaCard;
