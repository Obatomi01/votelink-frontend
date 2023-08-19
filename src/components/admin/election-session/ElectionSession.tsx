'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Link from 'next/link';

import moment from 'moment-timezone';

import NextIcon from '@/../public/icons/next.png';

import styles from '@/styles/admin/dashboard.module.scss';

type DashboardProp = {
  electionData: any;
};

/**
 * @memberof '/admin/sessions' page
 * @param props
 * @returns
 */

function ElectionSession(props: DashboardProp) {
  const { electionData } = props;
  const router = useRouter();

  const timeZone = 'Africa/Lagos';
  const localTimeInLagos = moment().tz(timeZone).toDate();

  const endDate = new Date(electionData.endDate);

  const hasPassed = localTimeInLagos > endDate;

  return (
    <div className={styles['dashboard--container']}>
      <div className={styles['dashboard--heading']}>
        <h2>{electionData.title}</h2>
        <p
          className={
            electionData.hasStarted
              ? styles['launched']
              : styles['not--launched']
          }
        >
          {electionData.hasStarted ? 'Launched' : 'Unlaunched'}
        </p>
      </div>
      <p className={hasPassed ? styles['ended-date'] : ''}>
        {hasPassed ? 'Ended on:' : 'Ends by:'}
        <span
          className={hasPassed ? styles['ended-date'] : styles['ending--date']}
        >
          {' '}
          {electionData.endDate} (UTC+1)
        </span>
      </p>

      <Link href={`/admin/sessions/${electionData.id}`}>
        <span className={styles['next--icon__container']}>
          <Image src={NextIcon} alt='Icon' className={styles['next--icon']} />
        </span>
      </Link>
    </div>
  );
}

export default ElectionSession;
