'use client';

import SearchItem from '@/components/SearchItem';
import DataTable from '../dashboard/DataTable';

import { useState, useEffect, useCallback } from 'react';
import { getAllVoters, getUserData } from '@/components/utils';
import {} from '@/components/SecuredAdminRoute';

import { useRouter } from 'next/navigation';
import cookie from 'js-cookie';

type AllVotersPage = {
  users: any;
};

/**
 * @memberof '/admin/voter-management/all-users' page
 * @returns JSX for all voters table
 */

function AllVoters(props: AllVotersPage) {
  const router = useRouter();

  const [allUsers, setAllUsers] = useState<any>(props.users);
  const [voters, setVoters] = useState<any>(props.users);

  const onReloadHandler = useCallback(async () => {
    // const userID = cookie.get('userID');

    // if (userID) {
    //   const { role } = await getUserData(userID);

    //   if (role !== 'admin') {
    //     router.refresh();
    //     return;
    //   }
    // }

    const { users } = await getAllVoters();
    setVoters(users);
    setAllUsers(users);
  }, []);

  useEffect(() => {
    router.refresh();
    onReloadHandler();
  }, [router, onReloadHandler]);

  const onSearchHandler = (value: string) => {
    const filteredVoters = allUsers.filter((voter: any) => {
      const index = voter.name.toLowerCase().indexOf(value.toLowerCase());

      if (index > -1) {
        return voter;
      }
    });

    setVoters(filteredVoters);
  };

  return (
    <section>
      <h1>All Voters Page</h1>
      <SearchItem
        onSearchHandler={onSearchHandler}
        placeholder='Enter a name'
        componentStyle='voter--search'
      />
      <DataTable
        allVoters={voters}
        firstColumn="Voter's name"
        secondColumn='User ID'
        thirdColumn=''
        editVoter={true}
        editFunction={onReloadHandler}
      />
    </section>
  );
}

export default AllVoters;
