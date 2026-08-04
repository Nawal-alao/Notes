import { createClient } from "@supabase/supabase-js";
const PUBLIC_SUPABASE_URL = "https://ezertvvtgyxbpiqfgrgf.supabase.co/rest/v1";
const PUBLIC_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6ZXJ0dnZ0Z3l4YnBpcWZncmdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU3NjE1NTMsImV4cCI6MjEwMTMzNzU1M30.qlQWCq8YTR1SvPWz6_Oi6ZKvTk2L5Aw2kbRQ6NdFFTE";
createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
