'use client';

import { SiteHeader } from '@/components/site-header';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';
import { ScreenerResults } from '@/components/screener-results';

export default function ScreenerPage() {
  const [filters, setFilters] = useState({
    marketCap: [0, 100],
    sector: '',
    priceRange: [0, 1000],
  });

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Stock Screener</h1>
        </div>

        <Card className="p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Market Cap Range ($B)</label>
              <Slider
                defaultValue={[0, 100]}
                max={1000}
                step={1}
                onValueChange={(value) => setFilters({ ...filters, marketCap: value })}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Sector</label>
              <Select onValueChange={(value) => setFilters({ ...filters, sector: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="consumer">Consumer</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Price Range ($)</label>
              <Slider
                defaultValue={[0, 1000]}
                max={1000}
                step={1}
                onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
              />
            </div>
          </div>

          <div className="mt-6">
            <Button>Apply Filters</Button>
          </div>
        </Card>

        <ScreenerResults filters={filters} />
      </main>
    </div>
  );
}