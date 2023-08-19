'use client';

import Image from 'next/image';
import Link from 'next/link';

import styles from '@/styles/admin/dashboard.module.scss';

import Next from '@/../public/icons/next.png';

type VoterElectionSessionProp = {
  electionSession: any;
};

/**
 * @memberof VoterElectionSessions
 * @param props
 * @returns
 */

function VoterElectionSession(props: VoterElectionSessionProp) {
  const { sessionTitle, id } = props.electionSession;

  return (
    <section className={styles['dashboard--container']}>
      <h2>{sessionTitle}</h2>

      <Link href={`/vote/sessions/${id}`}>
        <span className={styles['next--icon__container']}>
          <Image src={Next} alt='Icon' className={styles['next--icon']} />
        </span>
      </Link>
    </section>
  );
}

export default VoterElectionSession;
