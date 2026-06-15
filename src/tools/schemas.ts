import { z } from "zod";

export const searchStocksSchema = {
  query: z.string().optional(),
  industry: z.string().optional(),
  minLynchScore: z.number().min(0).max(100).optional(),
  minRsRating: z.number().min(0).max(100).optional(),
  maxPeg: z.number().positive().optional(),
  limit: z.number().int().min(1).max(100).default(20),
};

export const tickerSchema = {
  ticker: z.string().min(1).describe("A-share ticker, such as 300750"),
};

export const researchBriefSchema = {
  ticker: z.string().optional(),
  topic: z.string().optional(),
};
