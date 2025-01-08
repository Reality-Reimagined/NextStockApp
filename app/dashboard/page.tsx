'use client';

import { SiteHeader } from '@/components/site-header';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, BarChart, Activity, DollarSign } from 'lucide-react';
import { StockChart } from '@/components/stock-chart';
import { WatchlistWidget } from '@/components/watchlist-widget';
import { PortfolioSummary } from '@/components/portfolio-summary';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Portfolio Value</span>
            </div>
            <div className="mt-2 text-2xl font-bold">$24,685.00</div>
            <div className="text-xs text-muted-foreground">+2.5% from last month</div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Day Change</span>
            </div>
            <div className="mt-2 text-2xl font-bold text-green-500">+$456.78</div>
            <div className="text-xs text-muted-foreground">+1.8% today</div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Total Positions</span>
            </div>
            <div className="mt-2 text-2xl font-bold">12</div>
            <div className="text-xs text-muted-foreground">Across 4 sectors</div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <LineChart className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Active Alerts</span>
            </div>
            <div className="mt-2 text-2xl font-bold">5</div>
            <div className="text-xs text-muted-foreground">2 triggered today</div>
          </Card>
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
                  <h3 className="text-lg font-medium">Market Performance</h3>
                  <StockChart symbol="SPY" />
                </div>
              </Card>
              <Card className="col-span-3">
                <div className="p-6">
                  <h3 className="text-lg font-medium">Market Movers</h3>
                  <div className="mt-4 space-y-4">
                    {/* Market movers will be populated here */}
                  </div>
                </div>
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