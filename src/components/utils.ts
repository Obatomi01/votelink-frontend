import { API_URL } from '@/constants';

const onHandleFormPostRequest = async (url: string, form: any) => {
  const sendForm = await fetch(`${API_URL}/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
    next: {
      revalidate: 1000,
    },
  });

  const message = await sendForm.json();
  return message;
};

export const onGetDataFromForm = async (form: any, id: string) => {
  return onHandleFormPostRequest(`admin/create-election/${id}`, form);
};

export const onVoterCastVote = async (form: any) => {
  return onHandleFormPostRequest('voter/cast-vote', form);
};

export const onCreateNewUser = async (form: any) => {
  return onHandleFormPostRequest('admin/user/create-user', form);
};

export const onGetUser = async (form: any) => {
  return onHandleFormPostRequest('voter/user/get-users', form);
};

export async function getUserData(userID: string) {
  const res = await fetch(`${API_URL}/voter/user/get-user-details/${userID}`);

  return await res.json();
}

export const getElections = async (id: any) => {
  const data = await fetch(`${API_URL}/admin/get-election-sessions/${id}`, {
    cache: 'no-store',
  });

  const elections = await data.json();
  return elections;
};

export const formatSessions = (sessions: any) => {
  const dates = sessions.map((el: any) => el.endDate);

  // Function to convert date strings to Date objects
  function parseDate(dateString: any) {
    return new Date(dateString);
  }

  // Create an array of objects with the original date string and Date object
  const dateObjects = dates.map((dateString: any) => ({
    original: dateString,
    dateObject: parseDate(dateString),
  }));

  // Sort the date objects array based on the Date objects
  const sortedDateObjectsAsc = dateObjects
    .slice()
    .sort((a: any, b: any) => a.dateObject - b.dateObject);
  const sortedDateObjectsDesc = dateObjects
    .slice()
    .sort((a: any, b: any) => b.dateObject - a.dateObject);

  // Extract the original date strings from the sorted objects arrays
  const sortedDatesAsc = sortedDateObjectsAsc.map((obj: any) => obj.original);
  const sortedDatesDesc = sortedDateObjectsDesc.map((obj: any) => obj.original);

  const sortedSessionAsc: any = [];
  sortedDatesAsc.forEach((date: any) => {
    // TODO: we want to check for the session that has this date as the endDate

    sessions.forEach((session: any) => {
      if (session.endDate === date) {
        sortedSessionAsc.push(session);
      }
    });
  });

  const sortedSessionDesc: any = [];
  sortedDatesDesc.forEach((date: any) => {
    sessions.forEach((session: any) => {
      if (session.endDate === date) {
        sortedSessionDesc.push(session);
      }
    });
  });

  const activeAscData = sortedSessionAsc.filter(
    (el: any) => el.hasEnded === false
  );

  const activeDescData = sortedSessionDesc.filter(
    (el: any) => el.hasEnded === false
  );

  return { sortedSessionAsc, sortedSessionDesc, activeAscData, activeDescData };
};

export const getAllVoters = async () => {
  const response = await fetch(`${API_URL}/admin/get-all-voters`, {
    cache: 'no-store',
  });

  const data = await response.json();
  return data;
};
