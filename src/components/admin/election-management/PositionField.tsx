'use client';

import styles from '@/styles/admin/election-management.module.scss';

import Image from 'next/image';

import React, { useState, useRef } from 'react';

import ElectionCandidates from './ElectionCandidates';

import ArrowDown from '@/../public/icons/caret-down.png';
import ArrowUp from '@/../public/icons/caret-arrow-up.png';

type PositionFieldProps = {
  positionCandidates: any;
  positionTitle: string;
  onChangeElectionPositionsHandler: (values: any) => void;
  onDeleteElectionPositonHandler: (position: string) => void;
};

function PositionField(props: PositionFieldProps) {
  // TODO: using Formik will be faster to check for the forms input
  const formerTitle = props.positionTitle;
  const [candidates, setCandidates] = useState<any>(props.positionCandidates);
  const [showCandidates, setShowCandidates] = useState(false);
  const positionRef = useRef<HTMLInputElement | null>(null);
  const [positionValue, setPositionValue] = useState(props.positionTitle);

  const [firstRefresh, setFirstRefresh] = useState(true);

  const onChangePositionValue = (value: string) => {
    props.onChangeElectionPositionsHandler({
      formerTitle,
      candidates,
      inputTitle: value,
    });
    setPositionValue(value);
  };

  const onCandidateChangeHandler = (newCandidateArr: string[]) => {
    const formattedCandidates = Array.from(new Set(newCandidateArr));
    setCandidates(formattedCandidates);
    props.onChangeElectionPositionsHandler({
      formerTitle,
      candidates: formattedCandidates,
    });
  };

  const onDeleteElectionPositonHandler = () => {
    props.onDeleteElectionPositonHandler(formerTitle);
  };

  const onShowCandidatesHandler = () => {
    setFirstRefresh(false);
    setShowCandidates(!showCandidates);
  };

  return (
    <div className={styles['position--container']}>
      <div className={`${styles['position--heading__container']}`}>
        <input
          value={positionValue}
          type='text'
          onChange={(event) => {
            onChangePositionValue(event.target.value);
          }}
          className={styles['input--container']}
        />
        <span>
          <Image
            src={ArrowUp}
            alt='Icon'
            className={`${styles['dropdown--icon']} ${
              !showCandidates ? styles['arrow--up'] : ''
            }`}
            onClick={onShowCandidatesHandler}
          />
        </span>
      </div>

      <div className={firstRefresh ? styles['edit--election__containers'] : ''}>
        <div
          className={
            showCandidates
              ? styles['show--candidates']
              : styles['hide-candidates']
          }
        >
          <ElectionCandidates
            onCandidateChange={onCandidateChangeHandler}
            candidatesArr={candidates}
            showError={false}
            showHeading={false}
            onDeleteElectionPositonHandler={onDeleteElectionPositonHandler}
            formSubmitted={false}
          />
        </div>
      </div>
    </div>
  );
}

export default PositionField;
