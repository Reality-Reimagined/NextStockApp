'use client';

import { Card } from '@/components/ui/card';
import { LineChart, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

export function PortfolioSummary() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="p-6">
        <div className="flex items-center space-x-2">
          <DollarSign className="h-4 w-4 text-green-500" />
          <h3 className="text-lg font-medium">Total Value</h3>
        </div>
        <div className="mt-4">
          <div className="text-2xl font-bold">$24,685.00</div>
          <div className="text-sm text-muted-foreground">+$1,234 (5.2%)</div>
        </div>
      </Card>
      <Card className="p-6">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-4 w-4 text-green-500" />
          <h3 className="text-lg font-medium">Top Gainers</h3>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <span>AAPL</span>
            <span className="text-green-500">+8.5%</span>
          </div>
          <div className="flex items-center justify-between">
            <span>MSFT</span>
            <span className="text-green-500">+6.2%</span>
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <div className="flex items-center space-x-2">
          <TrendingDown className="h-4 w-4 text-red-500" />
          <h3 className="text-lg font-medium">Top Losers</h3>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <span>META</span>
            <span className="text-red-500">-3.2%</span>
          </div>
          <div className="flex items-center justify-between">
            <span>NFLX</span>
            <span className="text-red-500">-2.1%</span>
          </div>
        </div>
      </Card>
    </div>
  );
}