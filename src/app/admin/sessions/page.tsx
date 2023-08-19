import styles from '@/styles/admin/dashboard.module.scss';

import { API_URL } from '@/constants';

import { onHandleAdminPageRequest } from '@/components/authAdmin';

import { formatSessions } from '@/components/utils';
import Sessions from '@/components/admin/dashboard/Sessions';
import ProtectedAdminRoute from '@/components/ProtectedAdminRoute';

async function getElectionSessions() {
  const res = await fetch(`${API_URL}/admin/get-election-sessions`, {
    cache: 'no-store',
  });

  const data = await res.json();
  return data;
}

async function ElectionSessionsPage() {
  await onHandleAdminPageRequest();
  const { sessions } = await getElectionSessions();

  // const dates = sessions.map((el: any) => el.endDate);

  // // Function to convert date strings to Date objects
  // function parseDate(dateString: any) {
  //   return new Date(dateString);
  // }

  // // Create an array of objects with the original date string and Date object
  // const dateObjects = dates.map((dateString: any) => ({
  //   original: dateString,
  //   dateObject: parseDate(dateString),
  // }));

  // // Sort the date objects array based on the Date objects
  // const sortedDateObjectsAsc = dateObjects
  //   .slice()
  //   .sort((a: any, b: any) => a.dateObject - b.dateObject);
  // const sortedDateObjectsDesc = dateObjects
  //   .slice()
  //   .sort((a: any, b: any) => b.dateObject - a.dateObject);

  // // Extract the original date strings from the sorted objects arrays
  // const sortedDatesAsc = sortedDateObjectsAsc.map((obj: any) => obj.original);
  // const sortedDatesDesc = sortedDateObjectsDesc.map((obj: any) => obj.original);

  // const sortedSessionAsc: any = [];
  // sortedDatesAsc.forEach((date: any) => {
  //   // TODO: we want to check for the session that has this date as the endDate

  //   sessions.forEach((session: any) => {
  //     if (session.endDate === date) {
  //       sortedSessionAsc.push(session);
  //     }
  //   });
  // });

  // const sortedSessionDesc: any = [];
  // sortedDatesDesc.forEach((date: any) => {
  //   sessions.forEach((session: any) => {
  //     if (session.endDate === date) {
  //       sortedSessionDesc.push(session);
  //     }
  //   });
  // });

  // const activeAscData = sortedSessionAsc.filter(
  //   (el: any) => el.hasEnded === false
  // );

  // const activeDescData = sortedSessionDesc.filter(
  //   (el: any) => el.hasEnded === false
  // );

  const { sortedSessionAsc, sortedSessionDesc, activeAscData, activeDescData } =
    formatSessions(sessions);

  return (
    <section className={styles['admin--dashboard__container']}>
      <h1>All Election Sessions</h1>
      <Sessions
        ascendingData={sortedSessionAsc}
        descendingData={sortedSessionDesc}
        activeAscendingData={activeAscData}
        activeDescendingData={activeDescData}
      />
    </section>
  );
}

export default ElectionSessionsPage;
