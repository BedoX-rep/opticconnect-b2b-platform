
import React, { useEffect, useState } from 'react';
import { testSupabaseConnection } from '@/lib/supabaseTest';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, XCircle } from 'lucide-react';

const SupabaseStatus = () => {
  const [status, setStatus] = useState<{
    connected: boolean;
    message: string;
    error?: any;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const result = await testSupabaseConnection();
        setStatus(result);
      } catch (error) {
        setStatus({
          connected: false,
          message: 'Failed to check Supabase connection',
          error
        });
      } finally {
        setLoading(false);
      }
    };

    checkConnection();
  }, []);

  if (loading) {
    return (
      <Alert>
        <AlertTitle>Checking Supabase connection...</AlertTitle>
        <AlertDescription>Please wait while we verify the connection.</AlertDescription>
      </Alert>
    );
  }

  if (!status) {
    return null;
  }

  return (
    <Alert variant={status.connected ? "default" : "destructive"}>
      <div className="flex items-center gap-2">
        {status.connected ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
        <AlertTitle>
          {status.connected ? 'Connected to Supabase' : 'Supabase Connection Issue'}
        </AlertTitle>
      </div>
      <AlertDescription>{status.message}</AlertDescription>
    </Alert>
  );
};

export default SupabaseStatus;
