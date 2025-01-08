'use client';

import { useEffect, useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMarketData } from '@/hooks/useMarketData';
import { TechnicalAnalysis } from '@/lib/services/technicalAnalysis';
import { marketDataCache } from '@/lib/cache/marketDataCache';

interface PriceData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface StockChartProps {
  symbol: string;
  interval?: '1d' | '1h' | '15m' | '5m' | '1m';
}

export function StockChart({ symbol, interval = '1d' }: StockChartProps) {
  const [historicalData, setHistoricalData] = useState<PriceData[]>([]);
  const [selectedIndicators, setSelectedIndicators] = useState<string[]>(['sma']);
  const { data: realtimeData, subscribeToSymbol } = useMarketData([symbol]);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      // Try to get from cache first
      const cacheKey = `${symbol}-${interval}`;
      const cachedData = marketDataCache.get<PriceData[]>(cacheKey);
      
      if (cachedData) {
        setHistoricalData(cachedData);
        return;
      }

      try {
        const response = await fetch(
          `https://your-api-endpoint/historical/${symbol}?interval=${interval}`
        );
        const data = await response.json();
        setHistoricalData(data);
        
        // Cache the data
        marketDataCache.set(cacheKey, data, 15); // Cache for 15 minutes
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    fetchHistoricalData();
    subscribeToSymbol(symbol);
  }, [symbol, interval]);

  const technicalIndicators = useMemo(() => {
    if (!historicalData.length) return null;

    const analysis = new TechnicalAnalysis(historicalData);
    const indicators: Record<string, number[]> = {};

    if (selectedIndicators.includes('sma')) {
      indicators.sma20 = analysis.sma(20);
    }
    if (selectedIndicators.includes('ema')) {
      indicators.ema20 = analysis.ema(20);
    }
    if (selectedIndicators.includes('bollinger')) {
      const bands = analysis.bollingerBands();
      indicators.upperBand = bands.upper;
      indicators.lowerBand = bands.lower;
    }
    if (selectedIndicators.includes('rsi')) {
      indicators.rsi = analysis.rsi();
    }

    return indicators;
  }, [historicalData, selectedIndicators]);

  const chartData = useMemo(() => {
    if (!historicalData.length) return [];

    return historicalData.map((item, index) => {
      const dataPoint: Record<string, number | string> = {
        timestamp: new Date(item.timestamp).toLocaleDateString(),
        price: item.close,
      };

      if (technicalIndicators) {
        Object.entries(technicalIndicators).forEach(([key, values]) => {
          if (values[index] !== undefined) {
            dataPoint[key] = values[index];
          }
        });
      }

      return dataPoint;
    });
  }, [historicalData, technicalIndicators]);

  const toggleIndicator = (indicator: string) => {
    setSelectedIndicators(prev =>
      prev.includes(indicator)
        ? prev.filter(i => i !== indicator)
        : [...prev, indicator]
    );
  };

  return (
    <Card className="p-4">
      <div className="mb-4 flex space-x-2">
        <Button
          variant={selectedIndicators.includes('sma') ? 'default' : 'outline'}
          onClick={() => toggleIndicator('sma')}
        >
          SMA
        </Button>
        <Button
          variant={selectedIndicators.includes('ema') ? 'default' : 'outline'}
          onClick={() => toggleIndicator('ema')}
        >
          EMA
        </Button>
        <Button
          variant={selectedIndicators.includes('bollinger') ? 'default' : 'outline'}
          onClick={() => toggleIndicator('bollinger')}
        >
          Bollinger
        </Button>
        <Button
          variant={selectedIndicators.includes('rsi') ? 'default' : 'outline'}
          onClick={() => toggleIndicator('rsi')}
        >
          RSI
        </Button>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            dot={false}
            name="Price"
          />
          {selectedIndicators.includes('sma') && (
            <Line
              type="monotone"
              dataKey="sma20"
              stroke="#82ca9d"
              dot={false}
              name="SMA 20"
            />
          )}
          {selectedIndicators.includes('ema') && (
            <Line
              type="monotone"
              dataKey="ema20"
              stroke="#ffc658"
              dot={false}
              name="EMA 20"
            />
          )}
          {selectedIndicators.includes('bollinger') && (
            <>
              <Line
                type="monotone"
                dataKey="upperBand"
                stroke="#ff7300"
                dot={false}
                name="Upper Band"
              />
              <Line
                type="monotone"
                dataKey="lowerBand"
                stroke="#ff7300"
                dot={false}
                name="Lower Band"
              />
            </>
          )}
          {selectedIndicators.includes('rsi') && (
            <Line
              type="monotone"
              dataKey="rsi"
              stroke="#ff0000"
              dot={false}
              name="RSI"
              yAxisId="right"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}