interface PriceData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export class TechnicalAnalysis {
  private data: PriceData[];

  constructor(data: PriceData[]) {
    this.data = data.sort((a, b) => a.timestamp - b.timestamp);
  }

  public sma(period: number): number[] {
    const results: number[] = [];
    for (let i = period - 1; i < this.data.length; i++) {
      const sum = this.data
        .slice(i - period + 1, i + 1)
        .reduce((acc, curr) => acc + curr.close, 0);
      results.push(sum / period);
    }
    return results;
  }

  public ema(period: number): number[] {
    const results: number[] = [];
    const multiplier = 2 / (period + 1);

    // First EMA uses SMA as initial value
    const smaFirst = this.data
      .slice(0, period)
      .reduce((acc, curr) => acc + curr.close, 0) / period;
    results.push(smaFirst);

    for (let i = period; i < this.data.length; i++) {
      const ema = 
        (this.data[i].close - results[results.length - 1]) * multiplier +
        results[results.length - 1];
      results.push(ema);
    }

    return results;
  }

  public rsi(period: number = 14): number[] {
    const results: number[] = [];
    const gains: number[] = [];
    const losses: number[] = [];

    // Calculate price changes and separate gains and losses
    for (let i = 1; i < this.data.length; i++) {
      const change = this.data[i].close - this.data[i - 1].close;
      gains.push(Math.max(0, change));
      losses.push(Math.max(0, -change));
    }

    // Calculate initial averages
    let avgGain = gains.slice(0, period).reduce((a, b) => a + b) / period;
    let avgLoss = losses.slice(0, period).reduce((a, b) => a + b) / period;

    // Calculate initial RSI
    results.push(100 - (100 / (1 + avgGain / avgLoss)));

    // Calculate subsequent values
    for (let i = period; i < gains.length; i++) {
      avgGain = ((avgGain * (period - 1)) + gains[i]) / period;
      avgLoss = ((avgLoss * (period - 1)) + losses[i]) / period;
      results.push(100 - (100 / (1 + avgGain / avgLoss)));
    }

    return results;
  }

  public macd(
    shortPeriod: number = 12,
    longPeriod: number = 26,
    signalPeriod: number = 9
  ): { macd: number[]; signal: number[]; histogram: number[] } {
    const shortEma = this.ema(shortPeriod);
    const longEma = this.ema(longPeriod);
    const macdLine: number[] = [];

    // Calculate MACD line
    for (let i = longPeriod - 1; i < this.data.length; i++) {
      macdLine.push(shortEma[i] - longEma[i - (longPeriod - shortPeriod)]);
    }

    // Calculate signal line (9-day EMA of MACD line)
    const signalLine = new TechnicalAnalysis(
      macdLine.map((value, index) => ({
        timestamp: this.data[index + longPeriod - 1].timestamp,
        open: value,
        high: value,
        low: value,
        close: value,
        volume: 0,
      }))
    ).ema(signalPeriod);

    // Calculate histogram
    const histogram = macdLine.slice(signalPeriod - 1).map((macd, i) => 
      macd - signalLine[i]
    );

    return {
      macd: macdLine,
      signal: signalLine,
      histogram,
    };
  }

  public bollingerBands(
    period: number = 20,
    standardDeviations: number = 2
  ): { upper: number[]; middle: number[]; lower: number[] } {
    const sma = this.sma(period);
    const upper: number[] = [];
    const lower: number[] = [];

    for (let i = period - 1; i < this.data.length; i++) {
      const slice = this.data.slice(i - period + 1, i + 1);
      const mean = sma[i - (period - 1)];
      
      // Calculate standard deviation
      const squaredDiffs = slice.map(d => 
        Math.pow(d.close - mean, 2)
      );
      const variance = squaredDiffs.reduce((a, b) => a + b) / period;
      const stdDev = Math.sqrt(variance);

      upper.push(mean + (standardDeviations * stdDev));
      lower.push(mean - (standardDeviations * stdDev));
    }

    return {
      upper,
      middle: sma,
      lower,
    };
  }
} 