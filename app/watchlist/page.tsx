'use client';

import { SiteHeader } from '@/components/site-header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { WatchlistTable } from '@/components/watchlist-table';
import { AddSymbolDialog } from '@/components/add-symbol-dialog';
import { useState } from 'react';

export default function WatchlistPage() {
  const [showAddSymbol, setShowAddSymbol] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Watchlist</h1>
          <Button onClick={() => setShowAddSymbol(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Symbol
          </Button>
        </div>

        <Card>
          <WatchlistTable />
        </Card>

        <AddSymbolDialog open={showAddSymbol} onOpenChange={setShowAddSymbol} />
      </main>
    </div>
  );
}