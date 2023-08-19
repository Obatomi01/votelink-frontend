import NewElectionSession from '@/components/admin/election-session/NewElectionSession';
import styles from '@/styles/admin/election-management.module.scss';

import { onHandleAdminPageRequest } from '@/components/authAdmin';
import ProtectedAdminRoute from '@/components/ProtectedAdminRoute';

async function CreateElectionSessionPage() {
  await onHandleAdminPageRequest();

  return (
    <section className={styles['form--container']}>
      <h2>Create a new Election Session</h2>
      <NewElectionSession />
    </section>
  );
}

export default CreateElectionSessionPage;
