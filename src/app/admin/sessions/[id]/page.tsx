import { onHandleAdminPageRequest } from '@/components/authAdmin';

import styles from '@/styles/admin/dashboard.module.scss';
import Dashboards from '@/components/admin/dashboard/Dashboards';

import { redirect } from 'next/navigation';

import { getElections } from '@/components/utils';
import ProtectedAdminRoute from '@/components/ProtectedAdminRoute';

export default async function SessionPage({
  params,
}: {
  params: { id: string };
}) {
  await onHandleAdminPageRequest();

  const { electionPositions, title, hasStarted, hasEnded, ok } =
    await getElections(params.id);

  if (!ok) {
    redirect('/admin/sessions');
  }

  return (
    <section className={styles['admin--dashboard__container']}>
      <h1>Election info</h1>
      <Dashboards
        data={[electionPositions]}
        title={title}
        sessionID={params.id}
        hasStarted={hasStarted}
        hasEnded={hasEnded}
      />
    </section>
  );
}
