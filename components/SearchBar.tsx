
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  disabled: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, disabled }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !disabled) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mb-12 relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
      <div className="relative glass rounded-2xl flex flex-col md:flex-row p-2 shadow-2xl">
        <textarea
          rows={1}
          placeholder="e.g., I want to create a high-quality video for my YouTube channel..."
          className="flex-grow bg-transparent border-none focus:ring-0 text-white p-4 text-lg resize-none min-h-[60px]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          disabled={disabled}
        />
        <button
          type="submit"
          disabled={disabled || !query.trim()}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 m-1"
        >
          {disabled ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            'Generate'
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
