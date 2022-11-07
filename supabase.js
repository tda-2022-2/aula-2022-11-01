import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://unsycebwimwnmwwqwidi.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuc3ljZWJ3aW13bm13d3F3aWRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYxMzI3OTksImV4cCI6MTk4MTcwODc5OX0.a16GK_EqcKw-Pcog5GePrfPSHBL0DD4G9FCRvarK0l8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
    }
});