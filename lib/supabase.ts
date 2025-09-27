import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only create client if environment variables are properly configured
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const signUp = async (email: string, password: string, role: 'admin' | 'student' = 'student') => {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured. Please set up your environment variables.' } };
  }
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role,
      },
    },
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured. Please set up your environment variables.' } };
  }
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  if (!supabase) {
    return { error: { message: 'Supabase not configured. Please set up your environment variables.' } };
  }
  
  const { error } = await supabase.auth.signOut();
  return { error };
};