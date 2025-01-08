interface CachedData<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class MarketDataCache {
  private static instance: MarketDataCache;
  private cache: Map<string, CachedData<any>>;

  private constructor() {
    this.cache = new Map();
    this.loadFromLocalStorage();
  }

  public static getInstance(): MarketDataCache {
    if (!MarketDataCache.instance) {
      MarketDataCache.instance = new MarketDataCache();
    }
    return MarketDataCache.instance;
  }

  private loadFromLocalStorage() {
    try {
      const savedCache = localStorage.getItem('marketDataCache');
      if (savedCache) {
        const parsed = JSON.parse(savedCache);
        Object.entries(parsed).forEach(([key, value]) => {
          this.cache.set(key, value as CachedData<any>);
        });
      }
    } catch (error) {
      console.error('Error loading cache from localStorage:', error);
    }
  }

  private saveToLocalStorage() {
    try {
      const cacheObject = Object.fromEntries(this.cache.entries());
      localStorage.setItem('marketDataCache', JSON.stringify(cacheObject));
    } catch (error) {
      console.error('Error saving cache to localStorage:', error);
    }
  }

  public set<T>(key: string, data: T, ttlMinutes: number = 5): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMinutes * 60 * 1000,
    });
    this.saveToLocalStorage();
  }

  public get<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const now = Date.now();
    if (now - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      this.saveToLocalStorage();
      return null;
    }

    return cached.data as T;
  }

  public clear(): void {
    this.cache.clear();
    localStorage.removeItem('marketDataCache');
  }

  public clearExpired(): void {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > value.ttl) {
        this.cache.delete(key);
      }
    }
    this.saveToLocalStorage();
  }
}

export const marketDataCache = MarketDataCache.getInstance(); 