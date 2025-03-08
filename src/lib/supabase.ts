
import { createClient } from '@supabase/supabase-js';

// These values are safe to expose in the client-side code
const supabaseUrl = 'https://qfnjwxpbwrttodbcufyd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmbmp3eHBid3J0dG9kYmN1ZnlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NTYzMzEsImV4cCI6MjA1NzAzMjMzMX0.aXZC9TP83fHbtGhJG4BWedP_E7gb_vN8hqEt0SYZ3EU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
