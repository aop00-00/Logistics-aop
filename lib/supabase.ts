
import { createClient } from '@supabase/supabase-js';

// Configuration based on provided credentials
const SUPABASE_URL = 'https://dqviilqvmjmtbnykdheb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxdmlpbHF2bWptdGJueWtkaGViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5NjcwNDMsImV4cCI6MjA4MjU0MzA0M30.7MEevnnImOJn66u6Gj7X4XVTa8c3yJqND3Vuch2caSs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
