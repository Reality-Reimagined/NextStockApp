'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { getQuote, subscribeToQuotes, type StockQuote } from '@/lib/market-data';

export function WatchlistTable() {
  const [stocks, setStocks] = useState<StockQuote[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchWatchlist = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('watchlists')
        .select('symbols')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching watchlist:', error);
        return;
      }

      // Fetch initial quotes
      const quotes = await Promise.all(
        data.symbols.map((symbol: string) => getQuote(symbol))
      );
      setStocks(quotes.filter((q): q is StockQuote => q !== null));

      // Subscribe to real-time updates
      const unsubscribe = subscribeToQuotes(data.symbols, (quote) => {
        setStocks(prev => {
          const index = prev.findIndex(s => s.symbol === quote.symbol);
          if (index === -1) return [...prev, quote];
          const updated = [...prev];
          updated[index] = quote;
          return updated;
        });
      });

      return unsubscribe;
    };

    const unsubscribe = fetchWatchlist();
    return () => {
      unsubscribe.then(fn => fn && fn());
    };
  }, [supabase]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Symbol</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Change</TableHead>
          <TableHead>% Change</TableHead>
          <TableHead>Volume</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stocks.map((stock) => (
          <TableRow key={stock.symbol}>
            <TableCell className="font-medium">{stock.symbol}</TableCell>
            <TableCell>${stock.price.toFixed(2)}</TableCell>
            <TableCell className={stock.change >= 0 ? 'text-green-500' : 'text-red-500'}>
              ${stock.change.toFixed(2)}
            </TableCell>
            <TableCell className={stock.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}>
              {stock.percentChange.toFixed(2)}%
            </TableCell>
            <TableCell>{(stock.volume / 1000000).toFixed(1)}M</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}