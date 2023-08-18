import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://phwdsycbbiudzavpydle.supabase.co"; /* import.meta.env.VITE_PUBLIC_SUPABASE_URL */
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBod2RzeWNiYml1ZHphdnB5ZGxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIzNzkyODEsImV4cCI6MjAwNzk1NTI4MX0.OcXc6XrQ851D_Frc82vPcf4897qBu_QULJvfc6HugsA"/* import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY */

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

