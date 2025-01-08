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

const mockData = [
  {
    symbol: 'AAPL',
    shares: 100,
    avgPrice: 150.25,
    currentPrice: 175.50,
    totalValue: 17550,
    gainLoss: 2525,
    gainLossPercent: 16.81,
  },
  // Add more mock data as needed
];

export function PortfolioList() {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Shares</TableHead>
            <TableHead>Avg Price</TableHead>
            <TableHead>Current Price</TableHead>
            <TableHead>Total Value</TableHead>
            <TableHead>Gain/Loss</TableHead>
            <TableHead>%</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map((position) => (
            <TableRow key={position.symbol}>
              <TableCell className="font-medium">{position.symbol}</TableCell>
              <TableCell>{position.shares}</TableCell>
              <TableCell>${position.avgPrice.toFixed(2)}</TableCell>
              <TableCell>${position.currentPrice.toFixed(2)}</TableCell>
              <TableCell>${position.totalValue.toFixed(2)}</TableCell>
              <TableCell className={position.gainLoss >= 0 ? 'text-green-500' : 'text-red-500'}>
                ${position.gainLoss.toFixed(2)}
              </TableCell>
              <TableCell className={position.gainLossPercent >= 0 ? 'text-green-500' : 'text-red-500'}>
                {position.gainLossPercent.toFixed(2)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}