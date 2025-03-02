import { createClient,Session } from "@supabase/supabase-js";
import {createdBrowserClient} from '@supabase/ssr'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);