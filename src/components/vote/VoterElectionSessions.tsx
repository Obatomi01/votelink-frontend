'use client';

import VoterElectionSession from './VoterElectionSession';

import Link from 'next/link';

import styles from '@/styles/admin/dashboard.module.scss';
import ProtectedVoterRoute from '../ProtectedVoterRoute';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import cookie from 'js-cookie';
import { getUserData } from '../utils';
import { secureVoterRoute } from '../SecuredVoterRoute';

type VoterElectionSessionsProp = {
  electionSessions: any;
};

function VoterElectionSessions(props: VoterElectionSessionsProp) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  const onReloadHandler = async () => {
    const userID = cookie.get('userID');

    if (userID) {
      const { role } = await getUserData(userID);

      if (role !== 'voter') {
        router.refresh();
        return;
      }
    }
  };

  return (
    <section className={styles['dashboard--containers']}>
      {props.electionSessions.map((session: any, index: number) => (
        <VoterElectionSession electionSession={session} key={index} />
      ))}
      <Link href={'/login'}>
        <button className={styles['btn']}>
          <p>Logout</p>
        </button>
      </Link>
    </section>
  );
}

export default VoterElectionSessions;
