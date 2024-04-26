//postgres://postgres.ulpvgmbqdveehyrvivgk:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres

import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
//const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')

// Create a single supabase client for interacting with your database
//const supabase = createClient('https://ulpvgmbqdveehyrvivgk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVscHZnbWJxZHZlZWh5cnZpdmdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNDQ1MjUsImV4cCI6MjAyOTYyMDUyNX0.8cNZ71vUtVvprbLOyDt-C4kmYQnQxpzxyRVy-O-zgK0')

const supabaseUrl = 'https://ulpvgmbqdveehyrvivgk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVscHZnbWJxZHZlZWh5cnZpdmdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNDQ1MjUsImV4cCI6MjAyOTYyMDUyNX0.8cNZ71vUtVvprbLOyDt-C4kmYQnQxpzxyRVy-O-zgK0'
const supabase = createClient(supabaseUrl, supabaseKey)

export const harkkaData = async () =>{

const { data, error } = await supabase
  .from('joukkueet')
  .select('*')

  if(error) {
        console.error('ei löydy dataa', error.message);
    return null;
  }
  console.log('Hakutulos: ', data);
  return data;
  
};

export default supabase;