
import React from 'react';

interface LoadingStateProps {
  step: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ step }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="relative mb-8">
        <div className="w-20 h-20 border-4 border-purple-500/20 rounded-full"></div>
        <div className="absolute inset-0 w-20 h-20 border-4 border-t-purple-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-20 h-20 border-4 border-b-blue-500 rounded-full animate-pulse blur-sm opacity-50"></div>
      </div>
      <h3 className="text-xl font-heading font-medium text-white mb-2">Thinking...</h3>
      <p className="text-purple-400 text-sm pulse-glow">{step}</p>
    </div>
  );
};

export default LoadingState;
