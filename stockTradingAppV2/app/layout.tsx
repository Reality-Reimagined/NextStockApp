// import './globals.css';
// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import { ThemeProvider } from '@/components/theme-provider';
// import { Toaster } from '@/components/ui/toaster';
// import { SupabaseProvider } from '@/lib/supabase/supabase-provider'; // Import the SupabaseProvider

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'StockVision - Real-time Stock Market Analysis',
//   description: 'Advanced stock market analysis and portfolio management platform',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <SupabaseProvider> {/* Wrap children with SupabaseProvider */}
//           <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
//             {children}
//             <Toaster />
//           </ThemeProvider>
//         </SupabaseProvider>
//       </body>
//     </html>
//   );
// }




import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'StockVision - Real-time Stock Market Analysis',
  description: 'Advanced stock market analysis and portfolio management platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}