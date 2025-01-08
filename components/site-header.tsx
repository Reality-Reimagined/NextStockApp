'use client';

import { LineChart, BarChart3, Settings, User } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <LineChart className="h-6 w-6" />
            <span className="font-bold">StockVision</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/dashboard" className="transition-colors hover:text-foreground/80">
              Dashboard
            </Link>
            <Link href="/portfolio" className="transition-colors hover:text-foreground/80">
              Portfolio
            </Link>
            <Link href="/watchlist" className="transition-colors hover:text-foreground/80">
              Watchlist
            </Link>
            <Link href="/screener" className="transition-colors hover:text-foreground/80">
              Screener
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

// 'use client';

// import { LineChart, BarChart3, Settings, User, LogOut, LogIn } from 'lucide-react';
// import { ThemeToggle } from '@/components/theme-toggle';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// import { useSupabase } from '@/lib/supabase/supabase-provider';
// import { useEffect, useState } from 'react';
// import { AuthChangeEvent, Session } from '@supabase/supabase-js';
// import { cn } from '@/lib/utils';

// export function SiteHeader() {
//   const { supabase } = useSupabase();
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     const getUser = async () => {
//       const { data: { user } } = await supabase.auth.getUser();
//       setUser(user);
//     };
//     getUser();

//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       (event: AuthChangeEvent, session: Session | null) => {
//         setUser(session?.user ?? null);
//       }
//     );

//     return () => subscription.unsubscribe();
//   }, [supabase]);

//   const handleSignOut = async () => {
//     await supabase.auth.signOut();
//   };

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-14 items-center">
//         <div className="mr-4 flex">
//           <Link href="/" className="mr-6 flex items-center space-x-2">
//             <LineChart className={cn("h-6 w-6")} />
//             <span className="font-bold">StockVision</span>
//           </Link>
//           <nav className="flex items-center space-x-6 text-sm font-medium">
//             {user && (
//               <>
//                 <Link href="/dashboard" className="transition-colors hover:text-foreground/80">
//                   Dashboard
//                 </Link>
//                 <Link href="/portfolio" className="transition-colors hover:text-foreground/80">
//                   Portfolio
//                 </Link>
//                 <Link href="/watchlist" className="transition-colors hover:text-foreground/80">
//                   Watchlist
//                 </Link>
//                 <Link href="/screener" className="transition-colors hover:text-foreground/80">
//                   Screener
//                 </Link>
//               </>
//             )}
//           </nav>
//         </div>
//         <div className="flex flex-1 items-center justify-end space-x-2">
//           <nav className="flex items-center space-x-2">
//             {user ? (
//               <>
//                 <Button variant="ghost" size="icon">
//                   <User className={cn("h-5 w-5")} />
//                 </Button>
//                 <Button variant="ghost" size="icon">
//                   <Settings className={cn("h-5 w-5")} />
//                 </Button>
//                 <Button variant="ghost" size="icon" onClick={handleSignOut}>
//                   <LogOut className={cn("h-5 w-5")} />
//                 </Button>
//               </>
//             ) : (
//               <Link href="/auth">
//                 <Button variant="default">
//                   <LogIn className={cn("mr-2 h-5 w-5")} />
//                   Sign In
//                 </Button>
//               </Link>
//             )}
//             <ThemeToggle />
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// }

// // 'use client';

// // import { LineChart, Settings, User, LogOut, LogIn } from 'lucide-react';
// // import { ThemeToggle } from '@/components/theme-toggle';
// // import { Button } from '@/components/ui/button';
// // import Link from 'next/link';
// // import { useEffect, useState } from 'react';
// // import { AuthChangeEvent, Session } from '@supabase/supabase-js';
// // // import { useSupabase } from '@/lib/supabase/supabase-provider';
// // import { createClient } from '@supabase/supabase-js';

// // export function SiteHeader() {
// //   const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
// //   const [user, setUser] = useState<any>(null);

// //   useEffect(() => {
// //     const getUser = async () => {
// //       const { data: { user } } = await supabase.auth.getUser();
// //       setUser(user);
// //     };
// //     getUser();

// //     const { data: { subscription } } = supabase.auth.onAuthStateChange(
// //       (event: AuthChangeEvent, session: Session | null) => {
// //         setUser(session?.user ?? null);
// //       }
// //     );

// //     return () => subscription.unsubscribe();
// //   }, [supabase]);

// //   const handleSignOut = async () => {
// //     await supabase.auth.signOut();
// //   };

// //   return (
// //     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
// //       <div className="container flex h-14 items-center">
// //         <div className="mr-4 flex">
// //           <Link href="/" className="mr-6 flex items-center space-x-2">
// //             <LineChart className="h-6 w-6" />
// //             <span className="font-bold">StockVision</span>
// //           </Link>
// //           <nav className="flex items-center space-x-6 text-sm font-medium">
// //             {user && (
// //               <>
// //                 <Link href="/dashboard" className="transition-colors hover:text-foreground/80">
// //                   Dashboard
// //                 </Link>
// //                 <Link href="/portfolio" className="transition-colors hover:text-foreground/80">
// //                   Portfolio
// //                 </Link>
// //                 <Link href="/watchlist" className="transition-colors hover:text-foreground/80">
// //                   Watchlist
// //                 </Link>
// //                 <Link href="/screener" className="transition-colors hover:text-foreground/80">
// //                   Screener
// //                 </Link>
// //               </>
// //             )}
// //           </nav>
// //         </div>
// //         <div className="flex flex-1 items-center justify-end space-x-2">
// //           <nav className="flex items-center space-x-2">
// //             {user ? (
// //               <>
// //                 <Button variant="ghost" size="icon">
// //                   <User className="h-5 w-5" />
// //                 </Button>
// //                 <Button variant="ghost" size="icon">
// //                   <Settings className="h-5 w-5" />
// //                 </Button>
// //                 <Button variant="ghost" size="icon" onClick={handleSignOut}>
// //                   <LogOut className="h-5 w-5" />
// //                 </Button>
// //               </>
// //             ) : (
// //               <Link href="/auth/sign-in">
// //                 <Button variant="default">
// //                   <LogIn className="mr-2 h-5 w-5" />
// //                   Sign In
// //                 </Button>
// //               </Link>
// //             )}
// //             <ThemeToggle />
// //           </nav>
// //         </div>
// //       </div>
// //     </header>
// //   );
// // }