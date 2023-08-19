'use client';

import styles from '@/styles/vote/vote.module.scss';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Link from 'next/link';

type NoActiveElectionsProps = {
  message: string;
};

function NoActiveElections(props: NoActiveElectionsProps) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <section className={styles['form--container']}>
      <div className={styles['form--message__container']}>
        <h3>{props.message}</h3>
        <Link href={'/login'}>
          <button className={`${styles['btn']} ${styles['log--out__btn']}`}>
            <p>Logout</p>
          </button>
        </Link>
      </div>
    </section>
  );
}

export default NoActiveElections;
