export const STRATEGIES = [
  'Copy Top Trader',
  'Análise Probabilística',
  'Médias Moveis + RSI',
] as const;

export type Strategy = (typeof STRATEGIES)[number];
