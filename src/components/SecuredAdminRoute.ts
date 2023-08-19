'use client';

// import { getUserData } from './utils';
import { useRouter } from 'next/navigation';
import cookie from 'js-cookie';

export const secureAdminRoute = () => {
  const router = useRouter();
  const token = cookie.get('token');
  const isLoggedIn = cookie.get('isLoggedIn');

  if (!token || !isLoggedIn) {
    router.refresh();
    return;
  }
};

// export const onCheckAdminRoleHandler = async () => {
//   const userID = cookie.get('userID');

//   const { role } = await getUserData(userID || '');

//   return { role };
// };
