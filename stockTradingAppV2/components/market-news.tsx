'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { getMarketNews, type MarketNews } from '@/lib/market-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function MarketNews() {
  const [news, setNews] = useState<MarketNews[]>([]);
  const [category, setCategory] = useState('general');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const data = await getMarketNews(category);
        // Ensure data is an array before calling slice
        if (Array.isArray(data)) {
          setNews(data.slice(0, 5));
        } else {
          setNews([]);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        setNews([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, [category]);

  if (isLoading) {
    return (
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Market News</h2>
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-full"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">Market News</h2>
      <Tabs defaultValue="general" onValueChange={setCategory}>
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="forex">Forex</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
          <TabsTrigger value="merger">Mergers</TabsTrigger>
        </TabsList>
        <TabsContent value={category}>
          <div className="space-y-4">
            {news.length === 0 ? (
              <p className="text-muted-foreground">No news available</p>
            ) : (
              news.map((item) => (
                <div key={item.id} className="border-b pb-4 last:border-0">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    <h3 className="font-medium mb-1">{item.headline}</h3>
                    <p className="text-sm text-muted-foreground">{item.summary}</p>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>{item.source}</span>
                      <span>{new Date(item.datetime * 1000).toLocaleDateString()}</span>
                    </div>
                  </a>
                </div>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}