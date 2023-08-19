import {
  onHandleVoterPageRequest,
  onGetUserDataHandler,
} from '@/components/authAdmin';

import { getUserData } from '@/components/utils';

import { API_URL } from '@/constants';

import styles from '@/styles/vote/vote.module.scss';

import ClientVoteForm from '@/components/vote/ClientVoteForm';

async function getElectionSessionData(id: string) {
  const response = await fetch(`${API_URL}/voter/vote-form/${id}`, {
    cache: 'no-store',
  });

  const data = await response.json();

  return data;
}

async function ElectionSessionPage({ params }: { params: { id: string } }) {
  await onHandleVoterPageRequest();
  let hasVoted = false;

  const { userID, token } = onGetUserDataHandler();

  const { votedSessions } = await getUserData(userID);

  votedSessions.forEach((id: any) => {
    if (id === params.id) {
      hasVoted = true;
    }
  });

  const { data } = await getElectionSessionData(params.id);

  let electionData: any = [];
  for (const position in data) {
    electionData.push({
      title: position,
      candidates: data[position]['candidates'],
    });
  }

  return (
    <main className={styles['form--container']}>
      <ClientVoteForm
        electionData={electionData}
        userID={userID}
        token={token}
        hasVoted={hasVoted}
        sessionID={params.id}
      />
    </main>
  );
}

export default ElectionSessionPage;
