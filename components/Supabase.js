//postgres://postgres.ulpvgmbqdveehyrvivgk:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres

import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
//const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')

// Create a single supabase client for interacting with your database
//const supabase = createClient('https://ulpvgmbqdveehyrvivgk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVscHZnbWJxZHZlZWh5cnZpdmdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNDQ1MjUsImV4cCI6MjAyOTYyMDUyNX0.8cNZ71vUtVvprbLOyDt-C4kmYQnQxpzxyRVy-O-zgK0')

const supabaseUrl = 'https://ulpvgmbqdveehyrvivgk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVscHZnbWJxZHZlZWh5cnZpdmdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNDQ1MjUsImV4cCI6MjAyOTYyMDUyNX0.8cNZ71vUtVvprbLOyDt-C4kmYQnQxpzxyRVy-O-zgK0'
const supabase = createClient(supabaseUrl, supabaseKey)

export const harkkaData = async () => {
  const { data: joukkueetData, error: joukkueetError } = await supabase
    .from('joukkueet')
    .select('*');

    const { data: seuratData, error: seuratError } = await supabase
    .from('seurat')
    .select('*');

  const { data: ottelutData, error: ottelutError } = await supabase
    .from('ottelut')
    .select('*');

  if (joukkueetError) {
    console.error('Virhe haettaessa joukkueiden tietoja:', joukkueetError.message);
    return null;
  }

  if (ottelutError) {
    console.error('Virhe haettaessa otteluiden tietoja:', ottelutError.message);
    return null;
  }

  console.log('Joukkueiden hakutulos:', joukkueetData);
  console.log('Otteluiden hakutulos:', ottelutData);
  console.log('Seurojen hakutulos:', seuratData);
  


  // Tee jotain joukkueiden ja otteluiden tiedoilla, esimerkiksi yhdistä ne tai käsittele erikseen

  return { joukkueet: joukkueetData, ottelut: ottelutData, seurat: seuratData };

};

export default supabase;