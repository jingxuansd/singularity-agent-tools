import type {
  MarketDirection,
  ResearchBrief,
  SellSignals,
  StockAnalysis,
  StockSearchFilters,
  StockSearchResult,
} from "./types.js";

type ClientOptions = {
  baseUrl: string;
  apiKey?: string;
};

export class SingularityClient {
  private readonly baseUrl: string;
  private readonly apiKey?: string;

  constructor(options: ClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, "");
    this.apiKey = options.apiKey;
  }

  async getMarketDirection(): Promise<MarketDirection> {
    return this.request<MarketDirection>("/api/market-direction");
  }

  async searchStocks(filters: StockSearchFilters): Promise<StockSearchResult> {
    return this.request<StockSearchResult>("/api/stock/screener", {
      method: "POST",
      body: JSON.stringify(filters),
    });
  }

  async analyzeStock(ticker: string): Promise<StockAnalysis> {
    const searchParams = new URLSearchParams({ ticker });
    return this.request<StockAnalysis>(`/api/stock/analyze?${searchParams}`);
  }

  async getSellSignals(ticker: string): Promise<SellSignals> {
    return this.request<SellSignals>(`/api/stock/sell-signals/${ticker}`, {
      method: "POST",
    });
  }

  async generateResearchBrief(input: {
    ticker?: string;
    topic?: string;
  }): Promise<ResearchBrief> {
    return this.request<ResearchBrief>("/api/research/brief", {
      method: "POST",
      body: JSON.stringify(input),
    });
  }

  private async request<T>(
    path: string,
    init: RequestInit = {},
  ): Promise<T> {
    const headers = new Headers(init.headers);
    headers.set("accept", "application/json");

    if (init.body && !headers.has("content-type")) {
      headers.set("content-type", "application/json");
    }

    if (this.apiKey) {
      headers.set("authorization", `Bearer ${this.apiKey}`);
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers,
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(
        `Singularity API request failed: ${response.status} ${response.statusText} ${body}`,
      );
    }

    return response.json() as Promise<T>;
  }
}
