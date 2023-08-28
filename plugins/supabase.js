import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ptbhetsbqexqdpwfmmdg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0YmhldHNicWV4cWRwd2ZtbWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI5NTcwNTEsImV4cCI6MjAwODUzMzA1MX0.-kBjRYBPtMniB-Y1FLABVFBki1yW52RGiCbzg4EgxiY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
