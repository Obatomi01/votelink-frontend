'use client';

import Image from 'next/image';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';

import styles from '@/styles/admin/dashboard.module.scss';

import Link from 'next/link';

import { getElectionSessions } from '@/actions/ServerActions';

import ElectionSession from './ElectionSession';

import Sort from '@/../public/icons/sort.png';
import SearchItem from '@/components/SearchItem';
import CheckBoxes from './CheckBoxes';
import { formatSessions } from '@/components/utils';

type DashboardsProp = {
  ascendingData: any;
  descendingData: any;
  activeAscendingData: any;
  activeDescendingData: any;
};

/**
 * @memberof '/admin/sessions' page
 * @param props
 * @returns
 */
function ElectionSessions(props: DashboardsProp) {
  const searchParams = useSearchParams();
  const [ascendingOrder, setAscendingOrder] = useState(false);

  const [extractedElectionData, setExtractedElectionData] = useState(
    props.activeAscendingData
  );

  const launchQuery = searchParams.get('launched');
  const unlaunchQuery = searchParams.get('unlaunched');
  const progressQuery = searchParams.get('showEndedSessions');

  let launched = false;
  let unlaunched = false;
  let showEndedSessions = false;
  if (launchQuery) {
    launched = true;
  }
  if (unlaunchQuery) {
    unlaunched = true;
  }
  if (progressQuery) {
    showEndedSessions = true;
  }

  const onReloadHandler = useCallback(async () => {
    const { sortedSessionAsc, activeAscData } = await getElectionSessions();

    const curData = showEndedSessions ? sortedSessionAsc : activeAscData;

    const filteredData = curData.filter((el: any) => {
      if (launchQuery && unlaunchQuery) {
        return el;
      }
      if (launchQuery) {
        return el.hasStarted;
      }
      if (unlaunchQuery) {
        return !el.hasStarted;
      }
      return el;
    });
    setExtractedElectionData(filteredData);
  }, [launchQuery, unlaunchQuery, showEndedSessions]);

  useEffect(() => {
    // const curData = showEndedSessions
    //   ? props.ascendingData
    //   : props.activeAscendingData;

    // const filteredData = curData.filter((el: any) => {
    //   if (launchQuery && unlaunchQuery) {
    //     return el;
    //   }
    //   if (launchQuery) {
    //     return el.hasStarted;
    //   }
    //   if (unlaunchQuery) {
    //     return !el.hasStarted;
    //   }
    //   return el;
    // });
    // setExtractedElectionData(filteredData);
    onReloadHandler();
  }, [searchParams, props.activeAscendingData, onReloadHandler]);

  const onSortElectionsHandler = () => {
    setAscendingOrder(!ascendingOrder);
    if (!ascendingOrder) {
      return setExtractedElectionData(
        showEndedSessions ? props.ascendingData : props.activeAscendingData
      );
    } else {
      return setExtractedElectionData(
        showEndedSessions ? props.descendingData : props.activeDescendingData
      );
    }
  };

  const onSearchHandler = (value: string) => {
    const sliceLength = value.length;
    if (sliceLength === 0) {
      if (ascendingOrder) {
        return setExtractedElectionData(
          showEndedSessions ? props.descendingData : props.activeDescendingData
        );
      } else {
        return setExtractedElectionData(
          showEndedSessions ? props.ascendingData : props.activeAscendingData
        );
      }
    }

    const mappedElectionData = extractedElectionData.filter((election: any) => {
      const comparisonTitle = election.title.toLowerCase();
      const subStringOccurs = comparisonTitle.indexOf(value);

      if (subStringOccurs > -1) {
        return election;
      }
    });

    setExtractedElectionData(mappedElectionData);
  };

  return (
    <div className={styles['dashboard--containers']}>
      <div className={styles['session--heading__container']}>
        <SearchItem
          onSearchHandler={onSearchHandler}
          placeholder='Enter a session'
          componentStyle='search--container'
        />
        <span>
          <Image
            src={Sort}
            alt='Icon'
            onClick={onSortElectionsHandler}
            className={styles['sort--icon']}
          />
        </span>
      </div>
      <CheckBoxes
        launched={launched}
        unlaunched={unlaunched}
        showEndedSessions={showEndedSessions}
      />

      {extractedElectionData.map((election: any) => (
        <ElectionSession key={election.id} electionData={election} />
      ))}

      <div className={styles['btns--container']}>
        <Link href={'/admin/election-session/create'}>
          <button className={styles['btn']}>
            <p>Add another Session</p>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ElectionSessions;
