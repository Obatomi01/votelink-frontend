'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import ElectionSessions from '../election-session/ElectionSessions';

import { getElectionSessions } from '@/actions/ServerActions';
import {} from '@/components/SecuredAdminRoute';

import cookie from 'js-cookie';
import { getUserData } from '@/components/utils';

type DashboardsProp = {
  ascendingData: any;
  descendingData: any;
  activeAscendingData: any;
  activeDescendingData: any;
};

function Sessions(props: DashboardsProp) {
  const router = useRouter();

  // ();

  const [sessions, setSessions] = useState({
    activeDescData: props.ascendingData,
    activeAscData: props.activeAscendingData,
    sortedSessionAsc: props.ascendingData,
    sortedSessionDesc: props.descendingData,
  });

  useEffect(() => {
    router.refresh();
    onReloadHandler();
  }, [router]);

  const onReloadHandler = async () => {
    const userID = cookie.get('userID');

    if (userID) {
      const { role } = await getUserData(userID);

      if (role !== 'admin') {
        router.refresh();
        return;
      }
    }

    const {
      sortedSessionAsc,
      activeAscData,
      sortedSessionDesc,
      activeDescData,
    } = await getElectionSessions();

    setSessions({
      activeAscData,
      activeDescData,
      sortedSessionAsc,
      sortedSessionDesc,
    });
  };
  return (
    <ElectionSessions
      ascendingData={sessions.sortedSessionAsc}
      descendingData={sessions.sortedSessionDesc}
      activeAscendingData={sessions.activeAscData}
      activeDescendingData={sessions.activeDescData}
    />
  );
}

export default Sessions;
