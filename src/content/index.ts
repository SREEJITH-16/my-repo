import raw from "./data.json";
import type { PortfolioContent } from "./types";

export const content = raw as unknown as PortfolioContent;

export * from "./types";
