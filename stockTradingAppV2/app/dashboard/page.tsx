'use client';

import { SiteHeader } from '@/components/site-header';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { StockChart } from '@/components/stock-chart';
import { MarketNews } from '@/components/market-news';
import { WatchlistWidget } from '@/components/watchlist-widget';
import { PortfolioSummary } from '@/components/portfolio-summary';
import { useEffect, useState } from 'react';
import { getQuote, type StockQuote } from '@/lib/market-data';

const MARKET_INDICES = ['SPY', 'QQQ', 'DIA', 'IWM'];

export default function DashboardPage() {
  const [indices, setIndices] = useState<Record<string, StockQuote>>({});

  useEffect(() => {
    const fetchIndices = async () => {
      const quotes = await Promise.all(
        MARKET_INDICES.map(symbol => getQuote(symbol))
      );
      const newIndices: Record<string, StockQuote> = {};
      quotes.forEach((quote, index) => {
        if (quote) {
          newIndices[MARKET_INDICES[index]] = quote;
        }
      });
      setIndices(newIndices);
    };

    fetchIndices();
    const interval = setInterval(fetchIndices, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(indices).map(([symbol, quote]) => (
            <Card key={symbol} className="p-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">{symbol}</span>
              </div>
              <div className="mt-2 text-2xl font-bold">
                ${quote?.price.toFixed(2)}
              </div>
              <div className={`text-sm ${quote?.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {quote?.change >= 0 ? '+' : ''}{quote?.change.toFixed(2)} ({quote?.percentChange.toFixed(2)}%)
              </div>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Market Overview</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-4">S&P 500 Performance</h3>
                  <StockChart symbol="SPY" />
                </div>
              </Card>
              <Card className="col-span-3">
                <MarketNews />
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="portfolio">
            <PortfolioSummary />
          </TabsContent>
          <TabsContent value="watchlist">
            <WatchlistWidget />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}