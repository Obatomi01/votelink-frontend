'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import cookie from 'js-cookie';
import { getUserData } from './utils';

export default function ProtectedVoterRoute(props: any) {
  const router = useRouter();

  const token = cookie.get('token');
  const isLoggedIn = cookie.get('isLoggedIn');
  const userID = cookie.get('userID');

  useEffect(() => {
    onCheckRoleHandler();
  }, [token, isLoggedIn, router]);

  const onCheckRoleHandler = async () => {
    if (userID) {
      const { role } = await getUserData(userID);
      if (role !== 'voter' || !token || !isLoggedIn) {
        return router.push('login');
      }
    }
  };

  const { children } = props;

  return <>{children}</>;
}
