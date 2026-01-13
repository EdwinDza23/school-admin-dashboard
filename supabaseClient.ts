import { createClient } from '@supabase/supabase-js'

// Use process.env to access environment variables, as import.meta.env is not recognized by the current TypeScript configuration.
// This follows the institutional standard for environment variable access.
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'

const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)
