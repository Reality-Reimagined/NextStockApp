'use client';

import { SiteHeader } from '@/components/site-header';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { PortfolioList } from '@/components/portfolio-list';
import { TransactionHistory } from '@/components/transaction-history';

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Portfolio Management</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Position
          </Button>
        </div>

        <Tabs defaultValue="holdings" className="space-y-4">
          <TabsList>
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>
          <TabsContent value="holdings">
            <PortfolioList />
          </TabsContent>
          <TabsContent value="transactions">
            <TransactionHistory />
          </TabsContent>
          <TabsContent value="analysis">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="p-6">
                <h3 className="text-lg font-medium">Sector Allocation</h3>
                {/* Sector allocation chart will go here */}
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-medium">Performance Metrics</h3>
                {/* Performance metrics will go here */}
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-medium">Risk Analysis</h3>
                {/* Risk analysis will go here */}
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}