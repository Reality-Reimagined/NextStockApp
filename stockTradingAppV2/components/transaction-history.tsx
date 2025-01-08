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

const mockTransactions = [
  {
    id: 1,
    date: '2024-01-08',
    symbol: 'AAPL',
    type: 'BUY',
    shares: 100,
    price: 150.25,
    total: 15025,
  },
  // Add more mock transactions as needed
];

export function TransactionHistory() {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Shares</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell className="font-medium">{transaction.symbol}</TableCell>
              <TableCell className={transaction.type === 'BUY' ? 'text-green-500' : 'text-red-500'}>
                {transaction.type}
              </TableCell>
              <TableCell>{transaction.shares}</TableCell>
              <TableCell>${transaction.price.toFixed(2)}</TableCell>
              <TableCell>${transaction.total.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}