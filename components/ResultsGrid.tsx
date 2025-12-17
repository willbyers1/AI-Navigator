
import React from 'react';
import { Recommendation } from '../types';

interface ResultsGridProps {
  results: Recommendation[];
}

const ResultsGrid: React.FC<ResultsGridProps> = ({ results }) => {
  if (results.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto pb-20">
      {results.map((tool, index) => (
        <div 
          key={tool.name} 
          className="glass p-6 rounded-2xl flex flex-col justify-between animate-slide-in hover:border-white/30 transition-all group"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-400/10 px-2 py-1 rounded">
                {tool.category}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {tool.pricing}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
              {tool.name}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 italic">
              &ldquo;{tool.reason}&rdquo;
            </p>
          </div>
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center bg-white/5 border border-white/10 hover:bg-white/10 text-white py-3 rounded-xl transition-all flex items-center justify-center gap-2 group-hover:bg-purple-600 group-hover:border-purple-500"
          >
            Visit Website
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      ))}
    </div>
  );
};

export default ResultsGrid;
