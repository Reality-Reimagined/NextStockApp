'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface AddSymbolDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddSymbolDialog({ open, onOpenChange }: AddSymbolDialogProps) {
  const [symbol, setSymbol] = useState('');
  const supabase = createClientComponentClient();

  const handleAddSymbol = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('watchlists')
      .select('symbols')
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching watchlist:', error);
      return;
    }

    const existingSymbols = data?.symbols || [];
    const newSymbols = [...new Set([...existingSymbols, symbol.toUpperCase()])];

    const { error: upsertError } = await supabase
      .from('watchlists')
      .upsert({
        user_id: user.id,
        symbols: newSymbols,
      });

    if (upsertError) {
      console.error('Error updating watchlist:', upsertError);
      return;
    }

    setSymbol('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Symbol to Watchlist</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Enter stock symbol (e.g., AAPL)"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
          <Button onClick={handleAddSymbol}>Add Symbol</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}