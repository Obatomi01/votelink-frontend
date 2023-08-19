'use client';

import { getUserData } from './utils';
import { useRouter } from 'next/navigation';
import cookie from 'js-cookie';

export const secureVoterRoute = () => {
  // const router = useRouter();

  const token = cookie.get('token');
  const isLoggedIn = cookie.get('isLoggedIn');
  // const userID = cookie.get('userID');

  if (!token || !isLoggedIn) {
    // router.refresh();
    return;
  }

  // const onCheckRoleHandler = async () => {
  //   const { role } = await getUserData(userID || '');
  //   if (role !== 'voter') {
  //     router.push('/login');
  //     return;
  //   }
  // };
  // onCheckRoleHandler();
};
