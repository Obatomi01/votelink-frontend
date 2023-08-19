'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Link from 'next/link';

import Image from 'next/image';

import styles from '../../styles/vote/vote.module.scss';
import TitleForm from './TitleForm';

import { onVoterCastVote, getUserData } from '../utils';

import CheckMark from '../../../public/icons/check-mark.png';
import ProtectedVoterRoute from '../ProtectedVoterRoute';
import { secureVoterRoute } from '../SecuredVoterRoute';

import cookie from 'js-cookie';

type VoteFormProps = {
  electionData: any;
  userID: string;
  token: string;
  hasVoted: boolean;
  sessionID: string;
};

type FormMessage = {
  show: boolean;
  content: any;
};

/**
 * @memberof vote page
 * @param props
 * @returns JSX form for voting
 */
function VoteForm(props: VoteFormProps) {
  const router = useRouter();

  const [formContents, setFormContents] = useState<any>({});

  const [formMessage, setFormMessage] = useState<FormMessage>({
    show: false,
    content: 'User has Voted',
  });

  // useEffect(() => {
  //   // updateUserData();
  // }, []);

  const updateUserData = async () => {
    const { votedSessions } = await getUserData(props.userID);

    votedSessions.forEach((id: any) => {
      if (id === props.sessionID) {
        setFormMessage({
          show: true,
          content: 'User has Voted!',
        });
      }
    });
  };

  useEffect(() => {
    router.refresh();
    // onReloadHandler();
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

  const onHandleFormContentsHandler = (castedVote: any) => {
    setFormContents((prevContent: any) => {
      return { ...prevContent, ...castedVote };
    });
  };

  const onFormSubmitHandler = async (event: any) => {
    event.preventDefault();

    Object.entries(formContents).forEach(([key, value]: [string, any]) => {
      value;
      if (value === '') {
        delete formContents[key];
      }
    });

    const userID = props.userID;
    const token = props.token;

    let formContentsArr = [];
    for (const position in formContents) {
      formContentsArr.push({
        electionTitle: position,
        votedCandidate: formContents[position],
      });
    }

    const submissionMessage = await onVoterCastVote({
      form: formContentsArr,
      userID,
      token,
      sessionID: props.sessionID,
    });

    setFormMessage({
      show: true,
      content: submissionMessage.message,
    });
  };

  return (
    <section>
      {(formMessage.show || props.hasVoted) && (
        <div className={styles['form--message__container']}>
          <h3>{formMessage.content}</h3>
          <Image src={CheckMark} alt='Icon' />
          <Link href={'/vote/sessions'}>
            <button className={`${styles['btn']}  ${styles['ok--btn']}`}>
              <p>Ok</p>
            </button>
          </Link>
        </div>
      )}
      <form
        className={`${
          formMessage.show || props.hasVoted
            ? styles['blurry--background']
            : styles.form
        }`}
        onSubmit={onFormSubmitHandler}
      >
        {props.electionData.map((election: any, index: number) => (
          <div className={styles['election--category__container']} key={index}>
            <h2>{election.title}</h2>
            <TitleForm
              categoryCandidates={election.candidates}
              categoryTitle={election.title}
              onHandleForm={onHandleFormContentsHandler}
            />
          </div>
        ))}
        <button type='submit' className={styles.btn}>
          Submit
        </button>
      </form>
    </section>
  );
}

export default VoteForm;
