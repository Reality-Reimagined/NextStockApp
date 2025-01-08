'use client';

import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { marketDataCache } from '@/lib/cache/marketDataCache';
const finnhub = require('finnhub');

interface ChartData {
  date: string;
  price: number;
}

export function StockChart({ symbol }: { symbol: string }) {
  const [data, setData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const cacheKey = `chart-${symbol}`;
        const cachedData = marketDataCache.get<ChartData[]>(cacheKey);
        
        if (cachedData) {
          setData(cachedData);
          setIsLoading(false);
          return;
        }

        const api_key = finnhub.ApiClient.instance.authentications['api_key'];
        api_key.apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY; // Replace this with your API key
        const finnhubClient = new finnhub.DefaultApi();

        const now = Math.floor(Date.now() / 1000);
        const oneMonthAgo = now - (30 * 24 * 60 * 60);

        finnhubClient.stockCandles(symbol, 'D', oneMonthAgo, now, (error, data, response) => {
          if (error) {
            console.error('Error fetching chart data:', error);
            setIsLoading(false);
            return;
          }

          console.log('API Response:', data); // Log the API response

          if (data.s === 'ok' && Array.isArray(data.t)) {
            const chartData = data.t.map((timestamp: number, index: number) => ({
              date: new Date(timestamp * 1000).toLocaleDateString(),
              price: data.c[index],
            }));

            setData(chartData);
            marketDataCache.set(cacheKey, chartData, 5); // Cache for 5 minutes
          } else {
            console.error('Error: No valid data returned from API');
          }
          setIsLoading(false);
        });
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  if (isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <div className="animate-pulse w-full h-3/4 bg-muted rounded"></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => value.split('/')[1]}
          />
          <YAxis
            domain={['auto', 'auto']}
            tickFormatter={(value) => `$${value.toFixed(2)}`}
          />
          <Tooltip
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="hsl(var(--primary))"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}




// 'use client';

// import { useEffect, useState } from 'react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
// import { marketDataCache } from '@/lib/cache/marketDataCache';
// import * as finnhub from 'finnhub';

// interface ChartData {
//   date: string;
//   price: number;
// }

// export function StockChart({ symbol }: { symbol: string }) {
//   const [data, setData] = useState<ChartData[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const cacheKey = `chart-${symbol}`;
//         const cachedData = marketDataCache.get<ChartData[]>(cacheKey);
        
//         if (cachedData) {
//           setData(cachedData);
//           setIsLoading(false);
//           return;
//         }

//         const api_key = finnhub.ApiClient.instance.authentications['api_key'];
//         api_key.apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY; // Replace this with your API key
//         const finnhubClient = new finnhub.DefaultApi();

//         const now = Math.floor(Date.now() / 1000);
//         const oneMonthAgo = now - (30 * 24 * 60 * 60);

//         finnhubClient.stockCandles(symbol, 'D', oneMonthAgo, now, (error, data, response) => {
//           if (error) {
//             console.error('Error fetching chart data:', error);
//             setIsLoading(false);
//             return;
//           }

//           if (data.s === 'ok' && Array.isArray(data.t)) {
//             const chartData = data.t.map((timestamp: number, index: number) => ({
//               date: new Date(timestamp * 1000).toLocaleDateString(),
//               price: data.c[index],
//             }));

//             setData(chartData);
//             marketDataCache.set(cacheKey, chartData, 5); // Cache for 5 minutes
//           } else {
//             console.error('Error: No valid data returned from API');
//           }
//           setIsLoading(false);
//         });
//       } catch (error) {
//         console.error('Error fetching chart data:', error);
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [symbol]);

//   if (isLoading) {
//     return (
//       <div className="h-[400px] flex items-center justify-center">
//         <div className="animate-pulse w-full h-3/4 bg-muted rounded"></div>
//       </div>
//     );
//   }

//   if (data.length === 0) {
//     return (
//       <div className="h-[400px] flex items-center justify-center">
//         <p className="text-muted-foreground">No data available</p>
//       </div>
//     );
//   }

//   return (
//     <div className="h-[400px]">
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis
//             dataKey="date"
//             tickFormatter={(value) => value.split('/')[1]}
//           />
//           <YAxis
//             domain={['auto', 'auto']}
//             tickFormatter={(value) => `$${value.toFixed(2)}`}
//           />
//           <Tooltip
//             formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
//             labelFormatter={(label) => `Date: ${label}`}
//           />
//           <Line
//             type="monotone"
//             dataKey="price"
//             stroke="hsl(var(--primary))"
//             dot={false}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }




// 'use client';

// import { useEffect, useState } from 'react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
// import { marketDataCache } from '@/lib/cache/marketDataCache';

// interface ChartData {
//   date: string;
//   price: number;
// }

// export function StockChart({ symbol }: { symbol: string }) {
//   const [data, setData] = useState<ChartData[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const cacheKey = `chart-${symbol}`;
//         const cachedData = marketDataCache.get<ChartData[]>(cacheKey);
        
//         if (cachedData) {
//           setData(cachedData);
//           setIsLoading(false);
//           return;
//         }

//         const now = Math.floor(Date.now() / 1000);
//         const oneMonthAgo = now - (30 * 24 * 60 * 60);
        
//         const response = await fetch(
//           `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${oneMonthAgo}&to=${now}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
//         );
        
//         const result = await response.json();
//         console.log(result); // Log the API response
        
//         if (result.s === 'ok' && Array.isArray(result.t)) {
//           const chartData = result.t.map((timestamp: number, index: number) => ({
//             date: new Date(timestamp * 1000).toLocaleDateString(),
//             price: result.c[index],
//           }));
          
//           setData(chartData);
//           marketDataCache.set(cacheKey, chartData, 5); // Cache for 5 minutes
//         } else {
//           console.error('Error: No valid data returned from API');
//         }
//       } catch (error) {
//         console.error('Error fetching chart data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [symbol]);

//   if (isLoading) {
//     return (
//       <div className="h-[400px] flex items-center justify-center">
//         <div className="animate-pulse w-full h-3/4 bg-muted rounded"></div>
//       </div>
//     );
//   }

//   if (data.length === 0) {
//     return (
//       <div className="h-[400px] flex items-center justify-center">
//         <p className="text-muted-foreground">No data available</p>
//       </div>
//     );
//   }

//   return (
//     <div className="h-[400px]">
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis
//             dataKey="date"
//             tickFormatter={(value) => value.split('/')[1]}
//           />
//           <YAxis
//             domain={['auto', 'auto']}
//             tickFormatter={(value) => `$${value.toFixed(2)}`}
//           />
//           <Tooltip
//             formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
//             labelFormatter={(label) => `Date: ${label}`}
//           />
//           <Line
//             type="monotone"
//             dataKey="price"
//             stroke="hsl(var(--primary))"
//             dot={false}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }




// 'use client';

// import { useEffect, useState } from 'react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
// import { marketDataCache } from '@/lib/cache/marketDataCache';

// interface ChartData {
//   date: string;
//   price: number;
// }

// export function StockChart({ symbol }: { symbol: string }) {
//   const [data, setData] = useState<ChartData[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const cacheKey = `chart-${symbol}`;
//         const cachedData = marketDataCache.get<ChartData[]>(cacheKey);
        
//         if (cachedData) {
//           setData(cachedData);
//           setIsLoading(false);
//           return;
//         }

//         const now = Math.floor(Date.now() / 1000);
//         const oneMonthAgo = now - (30 * 24 * 60 * 60);
        
//         const response = await fetch(
//           `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${oneMonthAgo}&to=${now}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
//         );
        
//         const result = await response.json();
        
//         if (result.s === 'ok' && Array.isArray(result.t)) {
//           const chartData = result.t.map((timestamp: number, index: number) => ({
//             date: new Date(timestamp * 1000).toLocaleDateString(),
//             price: result.c[index],
//           }));
          
//           setData(chartData);
//           marketDataCache.set(cacheKey, chartData, 5); // Cache for 5 minutes
//         }
//       } catch (error) {
//         console.error('Error fetching chart data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [symbol]);

//   if (isLoading) {
//     return (
//       <div className="h-[400px] flex items-center justify-center">
//         <div className="animate-pulse w-full h-3/4 bg-muted rounded"></div>
//       </div>
//     );
//   }

//   if (data.length === 0) {
//     return (
//       <div className="h-[400px] flex items-center justify-center">
//         <p className="text-muted-foreground">No data available</p>
//       </div>
//     );
//   }

//   return (
//     <div className="h-[400px]">
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis
//             dataKey="date"
//             tickFormatter={(value) => value.split('/')[1]}
//           />
//           <YAxis
//             domain={['auto', 'auto']}
//             tickFormatter={(value) => `$${value.toFixed(2)}`}
//           />
//           <Tooltip
//             formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
//             labelFormatter={(label) => `Date: ${label}`}
//           />
//           <Line
//             type="monotone"
//             dataKey="price"
//             stroke="hsl(var(--primary))"
//             dot={false}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }