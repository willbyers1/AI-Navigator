
import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import ResultsGrid from './components/ResultsGrid';
import ApiKeyModal from './components/ApiKeyModal';
import LoadingState from './components/LoadingState';
import { getRecommendations } from './services/geminiService';
import { Recommendation, AppState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    apiKey: localStorage.getItem('gemini_api_key'),
    isLoading: false,
    error: null,
    results: [],
    thinkingStep: 'Analyzing context...'
  });

  const handleSaveKey = (key: string) => {
    localStorage.setItem('gemini_api_key', key);
    setState(prev => ({ ...prev, apiKey: key }));
  };

  const resetKey = () => {
    localStorage.removeItem('gemini_api_key');
    setState(prev => ({ ...prev, apiKey: null, error: null }));
  };

  const handleSearch = async (query: string) => {
    if (!state.apiKey) return;

    setState(prev => ({ 
      ...prev, 
      isLoading: true, 
      error: null, 
      thinkingStep: 'Analyzing context...' 
    }));

    try {
      const recommendations = await getRecommendations(
        query, 
        state.apiKey, 
        (step) => setState(prev => ({ ...prev, thinkingStep: step }))
      );
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        results: recommendations 
      }));
    } catch (err: any) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: err.message 
      }));
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0f172a]">
      {/* Background blobs for aesthetic */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      {!state.apiKey && <ApiKeyModal onSave={handleSaveKey} />}

      <header className="container mx-auto px-6 py-12 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold font-heading">AI Navigator</h1>
        </div>
        
        {state.apiKey && (
          <button 
            onClick={resetKey}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest font-bold"
          >
            Reset API Key
          </button>
        )}
      </header>

      <main className="container mx-auto px-6 pt-20 pb-12 relative z-10">
        <section className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6 leading-tight">
            Describe your goal.<br />
            Find the <span className="gradient-text">perfect AI.</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Powered by Gemini Flash Intelligence. The smart consultant for your next project.
          </p>
        </section>

        <SearchBar onSearch={handleSearch} disabled={state.isLoading} />

        {state.isLoading ? (
          <LoadingState step={state.thinkingStep} />
        ) : state.error ? (
          <div className="max-w-xl mx-auto glass border-red-500/20 p-8 rounded-2xl text-center">
            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Oops! The AI brain hiccuped</h3>
            <p className="text-slate-400 mb-6">{state.error}</p>
            <button 
              onClick={() => setState(p => ({ ...p, error: null }))}
              className="text-purple-400 hover:text-purple-300 font-bold"
            >
              Try Again
            </button>
          </div>
        ) : (
          <ResultsGrid results={state.results} />
        )}
      </main>

      <footer className="w-full text-center py-8 text-slate-600 text-xs mt-auto">
        <p>&copy; 2024 AI Navigator. Created By Mert Batu BULBUL.</p>
        <p className="mt-2">No data is sent to our servers. Your API key remains private.</p>
      </footer>
    </div>
  );
};

export default App;
