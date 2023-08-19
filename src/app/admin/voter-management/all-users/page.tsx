import AllVoters from '@/components/admin/voter-management/AllVoters';

import styles from '@/styles/admin/election--detail.module.scss';

import { getAllVoters } from '@/components/utils';
import ProtectedAdminRoute from '@/components/ProtectedAdminRoute';
import { onHandleAdminPageRequest } from '@/components/authAdmin';

async function EditVotersPage() {
  await onHandleAdminPageRequest();
  const { users } = await getAllVoters();

  return (
    <main className={styles['election--details']}>
      <AllVoters users={users} />
    </main>
  );
}

export default EditVotersPage;
