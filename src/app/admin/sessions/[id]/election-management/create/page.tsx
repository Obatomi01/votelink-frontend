import { redirect } from 'next/navigation';

import { onHandleAdminPageRequest } from '@/components/authAdmin';

import NewElectionForm from '@/components/admin/election-management/NewElectionForm';

import styles from '@/styles/admin/election-management.module.scss';

import { getElections } from '@/components/utils';
import ProtectedAdminRoute from '@/components/ProtectedAdminRoute';

async function ElectionManagement({ params }: { params: { id: string } }) {
  await onHandleAdminPageRequest();

  const { hasEnded, hasStarted } = await getElections(params.id);

  if (hasEnded || hasStarted) {
    redirect(`/admin/sessions/${params.id}`);
  }

  return (
    <section className={styles['form--container']}>
      <h2>Create a new Election Position</h2>
      <NewElectionForm id={params.id} />
    </section>
  );
}

export default ElectionManagement;
