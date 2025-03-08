
import { createClient } from '@supabase/supabase-js';

// These values are safe to expose in the client-side code
const supabaseUrl = 'https://qfnjwxpbwrttodbcufyd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmbmp3eHBid3J0dG9kYmN1ZnlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NTYzMzEsImV4cCI6MjA1NzAzMjMzMX0.aXZC9TP83fHbtGhJG4BWedP_E7gb_vN8hqEt0SYZ3EU';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to check if a user is logged in
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Helper function to get user data from the distributors table
export const getDistributorProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('distributors')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching distributor profile:', error);
    throw error;
  }
  
  return data;
};

// Helper function for image uploads
export const uploadImage = async (
  file: File, 
  bucket: string, 
  folder: string, 
  userId: string
) => {
  try {
    // Create unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;
    
    // Upload the file
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);
      
    if (uploadError) throw uploadError;
    
    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
      
    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export default supabase;
