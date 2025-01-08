// import { createContext, useContext, ReactNode } from 'react';
// import { createClient } from '@supabase/supabase-js';
// import { SupabaseClient } from '@supabase/auth-helpers-nextjs';

// const SupabaseContext = createContext<SupabaseClient | null>(null);

// interface SupabaseProviderProps {
//   children: ReactNode;
// }

// export const SupabaseProvider = ({ children }: SupabaseProviderProps) => {
//   const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

//   return (
//     <SupabaseContext.Provider value={supabase}>
//       {children}
//     </SupabaseContext.Provider>
//   );
// };

// export const useSupabase = () => {
//   const context = useContext(SupabaseContext);
//   if (!context) {
//     throw new Error('useSupabase must be used within a SupabaseProvider');
//   }
//   return context;
// }; 