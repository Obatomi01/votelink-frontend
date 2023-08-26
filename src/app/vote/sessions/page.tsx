import ProtectedVoterRoute from '@/components/ProtectedVoterRoute';
import { onHandleVoterPageRequest } from '@/components/authAdmin';
import NoActiveElections from '@/components/vote/NoActiveElections';
import VoterElectionSessions from '@/components/vote/VoterElectionSessions';

import Image from 'next/image';
import Logo from '@/../public/images/ammanlogo.png';

import { API_URL } from '@/constants';

import styles from '@/styles/admin/dashboard.module.scss';

async function getData() {
  const res = await fetch(`${API_URL}/voter/active-sessions`, {
    cache: 'no-store',
  });

  const data = await res.json();

  return data;
}

async function AllSessionsPage() {
  await onHandleVoterPageRequest();

  const { sessions } = await getData();
  if (sessions.length < 1) {
    return (
      <NoActiveElections message='No Election Session has started yet, Come back later.' />
    );
  }

  return (
    <section
      className={`${styles['admin--dashboard__container']} ${styles['voter--container']}`}
    >
      <Image
        src={Logo}
        alt='Logo'
        style={{
          display: 'block',
          marginInline: 'auto',
          marginBottom: '1.2rem',
        }}
      />
      <VoterElectionSessions electionSessions={sessions} />
    </section>
  );
}

export default AllSessionsPage;
