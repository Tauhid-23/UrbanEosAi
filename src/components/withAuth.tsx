
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
      // In the static demo, we check for the session storage item.
      // If it doesn't exist, we redirect to login.
      const sessionUser = sessionStorage.getItem('demo-user');
      if (!loading && !sessionUser) {
        router.push('/login');
      }
    }, [user, loading, router]);

    if (loading) {
      return <Loading />;
    }
    
    // The user object might be null on initial load, but the session storage check handles redirection.
    // If the session exists, we can render the component.
    if (!user && !sessionStorage.getItem('demo-user')) {
      return null;
    }

    return <Component {...props} />;
  };
  
  AuthComponent.displayName = `withAuth(${(Component.displayName || Component.name || 'Component')})`;

  return AuthComponent;
};

export default withAuth;
