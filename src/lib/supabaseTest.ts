
import { supabase } from './supabase';

/**
 * Tests the Supabase connection by fetching distributors
 * @returns Promise with connection status
 */
export const testSupabaseConnection = async () => {
  try {
    // A simple query to check if we can connect
    const { data, error } = await supabase.from('distributors').select('count()', { count: 'exact' });
    
    if (error) {
      throw error;
    }
    
    return {
      connected: true,
      message: 'Successfully connected to Supabase',
      count: data[0]?.count || 0
    };
  } catch (error: any) {
    console.error('Supabase connection test failed:', error);
    return {
      connected: false,
      message: `Failed to connect to Supabase: ${error.message}`,
      error
    };
  }
};
