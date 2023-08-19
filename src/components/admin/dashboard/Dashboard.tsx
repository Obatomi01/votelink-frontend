'use client';

import Image from 'next/image';

import Link from 'next/link';

import NextIcon from '@/../public/icons/next.png';

import styles from '@/styles/admin/dashboard.module.scss';

type DashboardProp = {
  electionData: any;
};

/**
 * @memberof '/admin/dashboard' page
 * @param props
 * @returns
 */

function Dashboard(props: DashboardProp) {
  const { electionData } = props;

  const encodedName = encodeURIComponent(electionData.title);

  return (
    <section className={styles['dashboard--container']}>
      <h2>{electionData.title}</h2>

      <Link
        href={`/admin/sessions/${electionData.id}/dashboard/${encodedName}`}
      >
        <span className={styles['next--icon__container']}>
          <Image src={NextIcon} alt='Icon' className={styles['next--icon']} />
        </span>
      </Link>
    </section>
  );
}

export default Dashboard;
