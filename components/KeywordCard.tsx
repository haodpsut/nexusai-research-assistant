
import React from 'react';
import type { Keyword } from '../types';

interface KeywordCardProps {
  keyword: Keyword;
}

const KeywordCard: React.FC<KeywordCardProps> = ({ keyword }) => {
  const scoreColor = keyword.score > 75 ? 'text-green-400' : keyword.score > 50 ? 'text-yellow-400' : 'text-orange-400';
  const scoreBg = keyword.score > 75 ? 'bg-green-500/10' : keyword.score > 50 ? 'bg-yellow-500/10' : 'bg-orange-500/10';

  return (
    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700/50">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-md text-slate-100 flex-1 pr-2">{keyword.keyword}</h3>
        <div className={`text-sm font-semibold px-2 py-0.5 rounded-full ${scoreColor} ${scoreBg}`}>
          {keyword.score}
        </div>
      </div>
      <p className="text-sm text-slate-400 mt-2">{keyword.description}</p>
    </div>
  );
};

export default KeywordCard;
