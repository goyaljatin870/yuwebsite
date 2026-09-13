import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabasePublishableKey = process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY || 'placeholder-publishable-key';

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
);