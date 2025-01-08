import { useState, useEffect } from 'react';

interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  lastUpdated: Date;
}

interface MarketDataHook {
  data: Record<string, MarketData>;
  isLoading: boolean;
  error: Error | null;
  subscribeToSymbol: (symbol: string) => void;
  unsubscribeFromSymbol: (symbol: string) => void;
}

export function useMarketData(initialSymbols: string[] = []): MarketDataHook {
  const [data, setData] = useState<Record<string, MarketData>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [subscribedSymbols, setSubscribedSymbols] = useState<Set<string>>(
    new Set(initialSymbols)
  );

  useEffect(() => {
    const ws = new WebSocket('wss://your-websocket-endpoint');
    
    ws.onopen = () => {
      setIsLoading(false);
      // Subscribe to initial symbols
      subscribedSymbols.forEach(symbol => {
        ws.send(JSON.stringify({ type: 'subscribe', symbol }));
      });
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setData(prevData => ({
        ...prevData,
        [message.symbol]: {
          symbol: message.symbol,
          price: message.price,
          change: message.change,
          changePercent: message.changePercent,
          volume: message.volume,
          lastUpdated: new Date(),
        },
      }));
    };

    ws.onerror = (event) => {
      setError(new Error('WebSocket error occurred'));
      setIsLoading(false);
    };

    return () => {
      ws.close();
    };
  }, [subscribedSymbols]);

  const subscribeToSymbol = (symbol: string) => {
    setSubscribedSymbols(prev => new Set([...prev, symbol]));
  };

  const unsubscribeFromSymbol = (symbol: string) => {
    setSubscribedSymbols(prev => {
      const next = new Set(prev);
      next.delete(symbol);
      return next;
    });
  };

  return {
    data,
    isLoading,
    error,
    subscribeToSymbol,
    unsubscribeFromSymbol,
  };
} 