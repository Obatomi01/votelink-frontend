'use server';

import { API_URL } from '@/constants';

import { formatSessions } from '@/components/utils';

export const startElections = async (id: string) => {
  const res = await fetch(`${API_URL}/admin/election/start-election/${id}`, {
    method: 'POST',
  });

  const data = await res.json();

  return data;
};

export const createNewElectionSession = async (form: any) => {
  const res = await fetch(`${API_URL}/admin/election/create-session`, {
    method: 'POST',
    body: JSON.stringify(form),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = res.json();

  return data;
};

export const updateElectionSession = async (form: any, sessionID: string) => {
  const res = await fetch(`${API_URL}/admin/update-session/${sessionID}`, {
    method: 'POST',
    body: JSON.stringify(form),
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });

  const data = res.json();
  return data;
};

export const deleteElectionSession = async (sessionID: string) => {
  const response = await fetch(`${API_URL}/admin/delete-session/${sessionID}`, {
    method: 'POST',
    cache: 'no-cache',
  });

  const data = await response.json();
  return data;
};

export async function getElectionSessions() {
  const res = await fetch(`${API_URL}/admin/get-election-sessions`, {
    cache: 'no-store',
  });

  const { sessions } = await res.json();

  const { sortedSessionAsc, sortedSessionDesc, activeAscData, activeDescData } =
    formatSessions(sessions);

  return { sortedSessionAsc, sortedSessionDesc, activeAscData, activeDescData };
}

export const deleteUser = async (userID: string) => {
  const response = await fetch(`${API_URL}/admin/delete-user/${userID}`, {
    method: 'POST',
    cache: 'no-store',
  });

  const data = await response.json();
  return data;
};

export async function getUserDataFromServer(userID: string) {
  const res = await fetch(`${API_URL}/voter/user/get-user-details/${userID}`, {
    cache: 'no-store',
  });

  const data = await res.json();
  return data;
}
