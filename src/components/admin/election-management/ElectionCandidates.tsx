import { useState } from 'react';

import styles from '@/styles/admin/election-management.module.scss';

type ElectionCandidatesProps = {
  onCandidateChange: any;
  candidatesArr: any;
  showError: any;
  showHeading: boolean;
  onDeleteElectionPositonHandler?: () => void;
  formSubmitted: boolean;
};

/**
 * @prop onCandidateChange
 * @memberof NewElectionForm
 * @returns JSX for multiple candidates' input
 */
function ElectionCandidates(props: ElectionCandidatesProps) {
  const { showHeading, showError, onDeleteElectionPositonHandler } = props;
  const [candidates, setCandidates] = useState<string[]>(props.candidatesArr);

  const onCandidateChange = (index: number, value: string) => {
    const updatedCandidates = [...candidates];
    updatedCandidates[index] = value;
    setCandidates(updatedCandidates);
    props.onCandidateChange(updatedCandidates);
  };

  const addCandidateField = () => {
    setCandidates([...candidates, '']);
  };

  const onDeleteCandidateField = (index: any) => {
    const updatedArr = [...candidates];
    updatedArr.splice(index, 1);
    setCandidates(updatedArr);
    props.onCandidateChange(updatedArr);
  };

  return (
    <div className={styles['form--field__container']}>
      {showHeading && <h3>Candidates</h3>}
      {candidates.map((candidate, index) => (
        <div key={index} className={styles['candidate--container']}>
          <div className={styles['candidate--input__container']}>
            <input
              type='text'
              value={candidate}
              onChange={(event) => onCandidateChange(index, event.target.value)}
              title='candidate'
              placeholder="Enter a candidate's name"
            />
            <button
              className={`${styles.btn} ${styles['delete--btn']}  ${
                props.formSubmitted ? styles['disabled'] : ''
              }`}
              onClick={onDeleteCandidateField.bind(null, index)}
              type='button'
              disabled={props.formSubmitted}
            >
              <p>Delete Entry</p>
            </button>
          </div>
        </div>
      ))}

      {showError && (
        <div id='feedback'>
          <p className={styles.error}>{showError}</p>
        </div>
      )}

      <div className={showHeading ? '' : styles['edit--election__container']}>
        <button
          type='button'
          onClick={addCandidateField}
          className={`${styles['btn']} ${styles['candidate--btn']}  ${
            props.formSubmitted ? styles['disabled'] : ''
          }`}
          disabled={props.formSubmitted}
        >
          <p>Add Position Candidate</p>
        </button>
        {!showHeading && (
          <button
            type='button'
            className={`${styles.btn} ${styles['delete--btn']}`}
            onClick={onDeleteElectionPositonHandler}
            style={{
              backgroundColor: '#FF4444',
            }}
          >
            <p>Delete Position</p>
          </button>
        )}
      </div>
    </div>
  );
}

export default ElectionCandidates;
