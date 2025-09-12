'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Loading from '@/app/loading';

const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  const AuthComponent = (props: P) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push('/login');
      }
    }, [user, loading, router]);

    if (loading || !user) {
      return <Loading />;
    }

    return <Component {...props} />;
  };
  
  AuthComponent.displayName = `withAuth(${(Component.displayName || Component.name || 'Component')})`;

  return AuthComponent;
};

export default withAuth;
