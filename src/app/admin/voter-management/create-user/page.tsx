// * PAGE FOR CREATING A NEW USER.
import { onHandleAdminPageRequest } from '@/components/authAdmin';

import styles from '@/styles/admin/election-management.module.scss';

import CreateUser from '@/components/admin/voter-management/CreateUser';

async function CreateUserPage() {
  await onHandleAdminPageRequest();

  return (
    <main className={styles['form--container']}>
      <h2>Create a new Voter</h2>
      <CreateUser />
    </main>
  );
}

export default CreateUserPage;
