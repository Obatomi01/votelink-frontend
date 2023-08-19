'use client';

import { startElections } from '@/actions/ServerActions';
import { getElections } from '@/components/utils';

import { useTransition, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import Image from 'next/image';

import styles from '@/styles/admin/dashboard.module.scss';

import Link from 'next/link';

import Dashboard from './Dashboard';

import Spinner from '@/../public/icons/loading.png';
import { deleteElectionSession } from '@/actions/ServerActions';
import {} from '@/components/SecuredAdminRoute';
import SearchItem from '@/components/SearchItem';

import { getUserData } from '@/components/utils';
import cookie from 'js-cookie';

type DashboardsProp = {
  data: any;
  title: string;
  sessionID: string;
  hasStarted: boolean;
  hasEnded: boolean;
};

type FormMessage = {
  message: string;
  ok: boolean;
  showMessage: boolean;
};

/**
 * @memberof '/admin/sessions/[id]' page
 * @param props
 * @returns JSX
 */
function Dashboards(props: DashboardsProp) {
  const router = useRouter();

  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();
  const [isDeleting, startDeleting] = useTransition();
  const [formMessage, setFormMessage] = useState<FormMessage>({
    message: 'Session successfully deleted',
    ok: false,
    showMessage: false,
  });

  const [masterElectionData, setMasterElectionData] = useState<any>(
    props.data[0]
  );

  const [electionData, setElectionData] = useState<any>(props.data[0]);
  const [sessionStarted, setSessionStarted] = useState(props.hasStarted);

  useEffect(() => {
    router.refresh();
    onReloadHandler();
  }, []);

  const onReloadHandler = async () => {
    // const userID = cookie.get('userID');

    // if (userID) {
    //   const { role } = await getUserData(userID);

    //   if (role !== 'admin') {
    //     router.refresh();
    //     return;
    //   }
    // }

    const { electionPositions, hasStarted } = await getElections(
      props.sessionID
    );

    setElectionData(electionPositions);
    setMasterElectionData(electionPositions);
    setSessionStarted(hasStarted);
  };

  const onHandleStartElections = () => {
    startTransition(async () => {
      const data = await startElections(props.sessionID);

      if (data.ok) {
        setSessionStarted(true);
      }
    });
  };

  const onDeleteSessionHandler = () => {
    startDeleting(async () => {
      const { message, ok } = await deleteElectionSession(props.sessionID);

      if (ok) {
        setFormMessage({
          message,
          ok,
          showMessage: true,
        });
      }
    });

    router.push('/admin/sessions');
  };

  const onSearchHandler = (value: string) => {
    const filteredElection = masterElectionData.filter((election: any) => {
      const index = election.title.toLowerCase().indexOf(value.toLowerCase());

      if (index > -1) {
        return election;
      }
    });

    setElectionData(filteredElection);
  };

  return (
    <section className={styles['dashboard--containers']}>
      {formMessage.showMessage && (
        <h2
          className={
            formMessage.ok ? styles['no--form__error'] : styles['form--error']
          }
        >
          {formMessage.message}
        </h2>
      )}

      <div className={styles['dashboards--container__heading']}>
        <h1 className={styles['session-title']}>{props.title}</h1>
        {props.hasEnded ? (
          <p className={styles['ended']}>Ended</p>
        ) : (
          <p className={styles['active']}>Active</p>
        )}
      </div>

      <SearchItem
        onSearchHandler={onSearchHandler}
        placeholder='Enter a position'
        componentStyle='position--search'
      />

      {electionData < 1 ? (
        <div className={styles['no-election']}>
          <h3>No Election Position has been added to {props.title}</h3>
        </div>
      ) : (
        electionData.map((election: any, index: number) => (
          <Dashboard key={index} electionData={election} />
        ))
      )}
      <div className={styles['btns--container']}>
        <button
          className={`${
            isPending ? styles['spinner--submit__btn'] : styles['submit--btn']
          } ${
            sessionStarted || props.hasEnded || electionData < 1
              ? styles['disabled']
              : ''
          }`}
          onClick={onHandleStartElections}
          type='submit'
          disabled={sessionStarted || props.hasEnded}
        >
          {isPending ? (
            <span className={styles['spinner']}>
              <Image
                src={Spinner}
                alt='icon'
                className={`${styles['spinner-icon']} ${styles['btn--spinner']}`}
              />
            </span>
          ) : (
            <p>{sessionStarted ? 'Launched' : 'Launch Elections'}</p>
          )}
        </button>

        {sessionStarted || props.hasEnded ? (
          <button
            className={`${styles['btn']} ${
              sessionStarted || props.hasEnded ? styles['disabled'] : ''
            }`}
          >
            <p>Add another Position</p>
          </button>
        ) : (
          <Link href={`${pathname}/election-management/create`}>
            <button className={styles['btn']}>
              <p>Add {electionData < 1 ? 'a' : 'another'} Position</p>
            </button>
          </Link>
        )}
      </div>

      <div className={styles['btns--container']}>
        {!sessionStarted && !props.hasEnded && (
          <Link href={`${pathname}/election-session/edit`}>
            <button className={styles['btn']}>
              <p>Edit</p>
            </button>
          </Link>
        )}

        <button
          type='button'
          className={`${styles['btn']} ${styles['delete--btn']}`}
          onClick={onDeleteSessionHandler}
        >
          <p>{isDeleting ? 'Deleting' : 'Delete'}</p>
        </button>
      </div>
    </section>
  );
}

export default Dashboards;
