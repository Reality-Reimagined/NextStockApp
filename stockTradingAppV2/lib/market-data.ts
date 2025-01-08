import { marketDataCache } from './cache/marketDataCache';

const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY!;

export interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  percentChange: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  volume: number;
  timestamp: number;
}

export interface MarketNews {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

export async function getQuote(symbol: string): Promise<StockQuote | null> {
  const cacheKey = `quote-${symbol}`;
  const cached = marketDataCache.get<StockQuote>(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    );
    const data = await response.json();
    
    if (data.error) return null;

    const quote: StockQuote = {
      symbol,
      price: data.c,
      change: data.d,
      percentChange: data.dp,
      high: data.h,
      low: data.l,
      open: data.o,
      previousClose: data.pc,
      volume: data.v,
      timestamp: data.t,
    };

    marketDataCache.set(cacheKey, quote, 1); // Cache for 1 minute
    return quote;
  } catch (error) {
    console.error('Error fetching quote:', error);
    return null;
  }
}

export async function getMarketNews(category: string = 'general'): Promise<MarketNews[]> {
  const cacheKey = `news-${category}`;
  const cached = marketDataCache.get<MarketNews[]>(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/news?category=${category}&token=${FINNHUB_API_KEY}`
    );
    const data = await response.json();
    marketDataCache.set(cacheKey, data, 5); // Cache for 5 minutes
    return data;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export async function getCompanyProfile(symbol: string) {
  const cacheKey = `profile-${symbol}`;
  const cached = marketDataCache.get(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    );
    const data = await response.json();
    marketDataCache.set(cacheKey, data, 60); // Cache for 1 hour
    return data;
  } catch (error) {
    console.error('Error fetching company profile:', error);
    return null;
  }
}

export function subscribeToQuotes(symbols: string[], callback: (quote: StockQuote) => void) {
  const ws = new WebSocket(`wss://ws.finnhub.io?token=${FINNHUB_API_KEY}`);

  ws.onopen = () => {
    symbols.forEach(symbol => {
      ws.send(JSON.stringify({ type: 'subscribe', symbol }));
    });
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'trade') {
      const trade = data.data[0];
      const quote: StockQuote = {
        symbol: trade.s,
        price: trade.p,
        timestamp: trade.t,
        volume: trade.v,
        change: 0,
        percentChange: 0,
        high: trade.p,
        low: trade.p,
        open: trade.p,
        previousClose: trade.p,
      };
      callback(quote);
    }
  };

  return () => {
    if (ws.readyState === WebSocket.OPEN) {
      symbols.forEach(symbol => {
        ws.send(JSON.stringify({ type: 'unsubscribe', symbol }));
      });
      ws.close();
    }
  };
}