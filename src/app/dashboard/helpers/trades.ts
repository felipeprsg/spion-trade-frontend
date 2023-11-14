import { format, parse, isAfter, isBefore, subDays } from 'date-fns';

import { Trader } from '@/types/Trader';

export function getTrader(traders: Trader[], name: Trader['name']): Trader {
  return traders.find((trader) => trader.name === name)!;
}

export function getRecentTrades(trades: Trader['trades'], days: number = 30) {
  return trades.filter((trade) => {
    const performedAt = trade.performedAt.toDate();
    const daysAgo = subDays(new Date(), days);
    return isAfter(performedAt, daysAgo);
  });
}

export function getAssertivity(trades: Trader['trades']): {
  wins: number;
  losses: number;
  assertivity: number;
} {
  const { wins, losses } = trades.reduce(
    (account, trade) => {
      if (trade.win === true) {
        account.wins++;
      }

      if (trade.win === false) {
        account.losses++;
      }

      return account;
    },
    { wins: 0, losses: 0 }
  );

  if (wins + losses === 0) {
    return { wins, losses, assertivity: 1 };
  }

  const assertivity = wins / (wins + losses);

  return { wins, losses, assertivity };
}

export function isCurrentlyOpen(openAt: string, closedAt: string): boolean {
  const now = new Date();

  const openingDateTime = parse(openAt, 'HH:mm', now);
  const closingDateTime = parse(closedAt, 'HH:mm', now);

  return isAfter(now, openingDateTime) && isBefore(now, closingDateTime);
}
