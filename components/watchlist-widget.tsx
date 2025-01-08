'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const mockWatchlist = [
  {
    symbol: 'TSLA',
    price: 237.49,
    change: 5.23,
    changePercent: 2.25,
    volume: '52.3M',
  },
  // Add more mock data as needed
];

export function WatchlistWidget() {
  return (
    <Card>
      <div className="flex items-center justify-between p-4">
        <h3 className="text-lg font-medium">Watchlist</h3>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Symbol
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Change</TableHead>
            <TableHead>% Change</TableHead>
            <TableHead>Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockWatchlist.map((stock) => (
            <TableRow key={stock.symbol}>
              <TableCell className="font-medium">{stock.symbol}</TableCell>
              <TableCell>${stock.price}</TableCell>
              <TableCell className={stock.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                ${stock.change.toFixed(2)}
              </TableCell>
              <TableCell className={stock.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}>
                {stock.changePercent.toFixed(2)}%
              </TableCell>
              <TableCell>{stock.volume}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}