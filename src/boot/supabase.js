import { createClient } from '@supabase/supabase-js'
import useAuthUser from 'src/composables/UseAuthUser'

const SUPABASE_URL = 'https://dxawjeeudswrgpwxvtjq.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4YXdqZWV1ZHN3cmdwd3h2dGpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg0NTg1NzEsImV4cCI6MjAxNDAzNDU3MX0.TIHE3iXIi-Fqe4Kh1gfF8K-jlprdk6GDidukNduTuRg'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser()

  user.value = session?.user || null
})
export default function useSupabase () {
  return { supabase }
}
