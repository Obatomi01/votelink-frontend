// * TO FETCH DETAILS AND PROGRESS OF A POSITION.

import { onHandleAdminPageRequest } from '@/components/authAdmin';

import DataTable from '@/components/admin/dashboard/DataTable';
import styles from '@/styles/admin/election--detail.module.scss';
import ProtectedAdminRoute from '@/components/ProtectedAdminRoute';

import { API_URL } from '@/constants';

type VoteObject = {
  name: string;
  votes: number;
};

export default async function DashboardInfo({
  params,
}: {
  params: { position: string; id: string };
}) {
  await onHandleAdminPageRequest();

  const getElectionDetails = await fetch(
    `${API_URL}/admin/get-election/${params.id}/${params.position}`,
    {
      cache: 'no-store',
    }
  );

  // const election = await getElectionDetails.json();
  const { data, title, hasEnded } = await getElectionDetails.json();

  const sortedCastedVotes: Record<any, any> = Object.fromEntries(
    Object.entries(data.castedVotes).sort(([, valueA], [, valueB]) => {
      const numValueA = Number(valueA);
      const numValueB = Number(valueB);
      return numValueB - numValueA;
    })
  );
  sortedCastedVotes;

  const formattedCastedVotes: VoteObject[] = [];
  for (const key in sortedCastedVotes) {
    const voteObject: VoteObject = {
      votes: sortedCastedVotes[key],
      name: key,
    };

    formattedCastedVotes.push(voteObject);
  }

  return (
    <main className={styles['election--details']}>
      <div className={styles['heading--container']}>
        <h1>{title} Position</h1>
        <p className={hasEnded ? styles['ended'] : styles['active']}>
          {hasEnded ? 'Ended Election' : 'Active Election'}
        </p>
      </div>
      <DataTable
        castedVotes={formattedCastedVotes}
        firstColumn='Current Position'
        secondColumn='Name'
        thirdColumn='Number of votes'
        editVoter={false}
      />
    </main>
  );
}
