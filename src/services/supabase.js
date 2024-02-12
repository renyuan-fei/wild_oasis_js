// h0UC0glnqBPZFOIV

import {createClient} from '@supabase/supabase-js';

export const supabaseUrl = 'https://ylgdxywfstuubnxrppex.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsZ2R4eXdmc3R1dWJueHJwcGV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE0MTYzNTcsImV4cCI6MjAxNjk5MjM1N30.oqvIh0INZz-bQGdRhI5zUYE4awscPB38QiiLauYcYbo';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;