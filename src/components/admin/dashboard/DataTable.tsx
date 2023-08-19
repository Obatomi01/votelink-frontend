'use client';

import styles from '@/styles/admin/election--detail.module.scss';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Link from 'next/link';

import { deleteUser } from '@/actions/ServerActions';
import {} from '@/components/SecuredAdminRoute';

import cookie from 'js-cookie';
import { getUserData } from '@/components/utils';

type DataTableProps = {
  castedVotes?: any;
  allVoters?: any;
  firstColumn: string;
  secondColumn: string;
  thirdColumn: string;
  editVoter: boolean;
  editFunction?: () => void;
};

/**
 * @memberof allUsers and result table
 * @returns JSX for  table
 */
function DataTable(props: DataTableProps) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  const onReloadHandler = async () => {
    const userID = cookie.get('userID');

    if (userID) {
      const { role } = await getUserData(userID);

      if (role !== 'admin') {
        router.refresh();
        return;
      }
    }
  };

  const {
    firstColumn,
    secondColumn,
    thirdColumn,
    allVoters,
    editVoter,
    castedVotes,
  } = props;

  const onDeleteUserHandler = async (id: string) => {
    const { ok, message } = await deleteUser(id);
    if (ok && props.editFunction) {
      props.editFunction();
    }
  };

  return (
    <div className={styles['table-wrap']}>
      <table>
        <thead>
          <tr>
            <th>{firstColumn}</th>
            <th>{secondColumn}</th>
            <th>{thirdColumn}</th>
          </tr>
        </thead>

        <tbody>
          {editVoter
            ? allVoters.map((candidate: any, index: number) => (
                <tr key={candidate.userID}>
                  <td>{candidate.name}</td>
                  <td>{candidate.userID}</td>
                  <td>
                    <button
                      type='button'
                      className={`${styles['btn']} ${styles['delete--btn']}`}
                      onClick={() => {
                        onDeleteUserHandler(candidate.userID);
                      }}
                    >
                      <p>Delete</p>
                    </button>
                  </td>
                </tr>
              ))
            : castedVotes.map((candidate: any, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{candidate.name}</td>
                  <td>{candidate.votes}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
