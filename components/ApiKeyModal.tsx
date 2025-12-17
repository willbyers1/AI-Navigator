
import React, { useState } from 'react';

interface ApiKeyModalProps {
  onSave: (key: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSave }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSave(inputValue.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="glass w-full max-w-md rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 font-heading text-white">Unleash the AI</h2>
        <p className="text-slate-400 mb-6 text-sm">
          To provide expert recommendations, AI Navigator requires a Gemini API Key. 
          Your key is stored locally and never leaves your browser.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter Gemini API Key..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 mb-6"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-purple-500/20"
            >
              Get Started
            </button>
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-center text-xs text-slate-500 hover:text-slate-300 underline"
            >
              Get a free API key at Google AI Studio
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApiKeyModal;
