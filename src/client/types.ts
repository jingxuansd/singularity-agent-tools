export type ResearchOutputBoundary = {
  asOfDate?: string;
  researchOnly: true;
  disclaimer: string;
};

export type MarketDirection = ResearchOutputBoundary & {
  trend: string;
  suggestedMaxPositionPct?: number;
  distributionDays?: number;
  evidence: string[];
  risks: string[];
};

export type StockSearchFilters = {
  query?: string;
  industry?: string;
  minLynchScore?: number;
  minRsRating?: number;
  maxPeg?: number;
  limit?: number;
};

export type StockSearchResult = ResearchOutputBoundary & {
  results: Array<{
    ticker: string;
    name: string;
    industry?: string;
    lynchScore?: number;
    rsRating?: number;
    peg?: number;
    signals: string[];
    risks: string[];
  }>;
};

export type StockAnalysis = ResearchOutputBoundary & {
  ticker: string;
  name?: string;
  scores: Record<string, number | null>;
  signals: Array<{
    type: string;
    strength: "low" | "medium" | "high";
    evidence: string;
  }>;
  risks: string[];
};

export type SellSignals = ResearchOutputBoundary & {
  ticker: string;
  signals: Array<{
    type: string;
    severity: "watch" | "caution" | "high";
    evidence: string;
  }>;
};

export type ResearchBrief = ResearchOutputBoundary & {
  subject: string;
  summary: string;
  keyFindings: string[];
  risks: string[];
  followUpQuestions: string[];
};
