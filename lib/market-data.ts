import { createClient } from '@supabase/supabase-js';

const FINNHUB_API_KEY = process.env.NEXT_FINNHUB_API_KEY!; // Replace with environment variable
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

export async function getQuote(symbol: string): Promise<StockQuote | null> {
  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    );
    const data = await response.json();
    
    if (data.error) return null;

    return {
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
  } catch (error) {
    console.error('Error fetching quote:', error);
    return null;
  }
}

export async function getHistoricalData(symbol: string, resolution = 'D', from: number, to: number) {
  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${FINNHUB_API_KEY}`
    );
    const data = await response.json();
    
    if (data.error) return null;

    return data.t.map((timestamp: number, index: number) => ({
      time: timestamp,
      open: data.o[index],
      high: data.h[index],
      low: data.l[index],
      close: data.c[index],
      volume: data.v[index],
    }));
  } catch (error) {
    console.error('Error fetching historical data:', error);
    return null;
  }
}

export function subscribeToQuotes(symbols: string[], callback: (quote: StockQuote) => void) {
  const ws = new WebSocket('wss://ws.finnhub.io?token=' + FINNHUB_API_KEY);

  ws.onopen = () => {
    symbols.forEach(symbol => {
      ws.send(JSON.stringify({ type: 'subscribe', symbol }));
    });
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'trade') {
      const quote: StockQuote = {
        symbol: data.data[0].s,
        price: data.data[0].p,
        timestamp: data.data[0].t,
        volume: data.data[0].v,
        change: 0, // Calculate from previous close
        percentChange: 0,
        high: data.data[0].p,
        low: data.data[0].p,
        open: data.data[0].p,
        previousClose: data.data[0].p,
      };
      callback(quote);
    }
  };

  return () => {
    symbols.forEach(symbol => {
      ws.send(JSON.stringify({ type: 'unsubscribe', symbol }));
    });
    ws.close();
  };
}