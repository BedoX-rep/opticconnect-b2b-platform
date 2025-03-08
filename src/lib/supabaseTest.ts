
import { supabase } from './supabase';

/**
 * Tests the Supabase connection by fetching distributors
 * @returns Promise with connection status
 */
export const testSupabaseConnection = async () => {
  try {
    // A simple query to check if we can connect - only using SELECT
    const { data, error } = await supabase
      .from('distributors')
      .select('count()', { count: 'exact', head: true });
    
    if (error) {
      console.error('Supabase connection test error:', error);
      throw error;
    }
    
    return {
      connected: true,
      message: 'Successfully connected to Supabase',
      count: data?.length || 0
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
