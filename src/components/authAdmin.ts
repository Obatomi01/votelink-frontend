import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getUserDataFromServer } from '@/actions/ServerActions';

export const onHandleAdminPageRequest = async () => {
  const userID = cookies().get('userID')?.value || '';

  if (userID) {
    const { role } = await getUserDataFromServer(userID);

    if (role !== 'admin') {
      redirect('/login');
    }
  }

  const isLoggedIn = cookies().get('isLoggedIn')?.value;

  if (!isLoggedIn || userID === '') {
    redirect('/login');
  }
};

export const onGetUserDataHandler = () => {
  const userID = cookies().get('userID')?.value || '';
  const token = cookies().get('token')?.value || '';

  return { userID, token };
};

export const onHandleVoterPageRequest = async () => {
  const userID = cookies().get('userID')?.value || '';

  if (userID) {
    const { role } = await getUserDataFromServer(userID);

    if (role !== 'voter') {
      redirect('/login');
    }
  }

  const isLoggedIn = cookies().get('isLoggedIn')?.value;

  if (!isLoggedIn || userID === '') {
    redirect('/login');
  }
};
