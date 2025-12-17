
export interface Recommendation {
  name: string;
  category: string;
  reason: string;
  url: string;
  pricing: string;
}

export interface AppState {
  apiKey: string | null;
  isLoading: boolean;
  error: string | null;
  results: Recommendation[];
  thinkingStep: string;
}
