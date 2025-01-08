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

interface ScreenerResultsProps {
  filters: {
    marketCap: number[];
    sector: string;
    priceRange: number[];
  };
}

const mockResults = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Technology',
    price: 175.50,
    marketCap: '2.8T',
    peRatio: 28.5,
    volume: '52.3M',
  },
  // Add more mock results
];

export function ScreenerResults({ filters }: ScreenerResultsProps) {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Sector</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Market Cap</TableHead>
            <TableHead>P/E Ratio</TableHead>
            <TableHead>Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockResults.map((stock) => (
            <TableRow key={stock.symbol}>
              <TableCell className="font-medium">{stock.symbol}</TableCell>
              <TableCell>{stock.name}</TableCell>
              <TableCell>{stock.sector}</TableCell>
              <TableCell>${stock.price}</TableCell>
              <TableCell>{stock.marketCap}</TableCell>
              <TableCell>{stock.peRatio}</TableCell>
              <TableCell>{stock.volume}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}