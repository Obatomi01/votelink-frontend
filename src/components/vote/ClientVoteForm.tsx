'use client';

import {
  onHandleVoterPageRequest,
  onGetUserDataHandler,
} from '@/components/authAdmin';

import cookie from 'js-cookie';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { getUserData } from '@/components/utils';

import styles from '@/styles/vote/vote.module.scss';

import VoteForm from '@/components/vote/VoteForm';

import Image from 'next/image';
import Logo from '@/../public/images/ammanlogo.png';

type ClientFormState = {
  userID: string;
  token: string;
  hasVoted: boolean;
};

type ClientVoteFormProps = {
  electionData: any;
  userID: string;
  token: string;
  hasVoted: boolean;
  sessionID: string;
};

function ClientVoteForm(props: ClientVoteFormProps) {
  const router = useRouter();

  const [voteForm, setVoteForm] = useState<ClientFormState>({
    userID: props.userID,
    token: props.userID,
    hasVoted: props.hasVoted,
  });

  voteForm.hasVoted;
  voteForm.userID;

  const onReloadHandler = useCallback(async () => {
    const curUserID = cookie.get('userID') || '';
    const curToken = cookie.get('token') || '';

    let hasVoted = false;
    const { votedSessions } = await getUserData(curUserID);

    votedSessions.forEach((id: any) => {
      if (id === props.sessionID) {
        hasVoted = true;
      }
    });

    setVoteForm({
      userID: curUserID,
      token: curToken,
      hasVoted,
    });
  }, [props.sessionID]);

  useEffect(() => {
    router.refresh();
    onReloadHandler();
  }, [router, onReloadHandler]);

  return (
    <section>
      <Image
        src={Logo}
        alt='Logo'
        style={{
          display: 'block',
          marginInline: 'auto',
          marginBottom: '1.2rem',
        }}
      />
      <VoteForm
        electionData={props.electionData}
        userID={voteForm.userID}
        token={voteForm.token}
        hasVoted={voteForm.hasVoted}
        sessionID={props.sessionID}
      />
    </section>
  );
}

export default ClientVoteForm;
