import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { LineChart, TrendingUp, Shield, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <LineChart className="h-16 w-16" />
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Advanced Stock Market Analysis Platform
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Real-time market data, advanced analytics, and portfolio management tools to help you make informed investment decisions.
            </p>
            <div className="space-x-4">
              <Button size="lg">Get Started</Button>
              <Button size="lg" variant="outline">Learn More</Button>
            </div>
          </div>
        </section>

        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <TrendingUp className="h-12 w-12" />
                <div className="space-y-2">
                  <h3 className="font-bold">Real-time Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    Live market data and advanced technical analysis tools
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Shield className="h-12 w-12" />
                <div className="space-y-2">
                  <h3 className="font-bold">Portfolio Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Track and analyze your investments in real-time
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Zap className="h-12 w-12" />
                <div className="space-y-2">
                  <h3 className="font-bold">Smart Alerts</h3>
                  <p className="text-sm text-muted-foreground">
                    Customizable price alerts and market notifications
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}