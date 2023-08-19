import styles from '@/styles/admin/election-management.module.scss';

import { redirect } from 'next/navigation';

import { onHandleAdminPageRequest } from '@/components/authAdmin';
import EditElectionSession from '@/components/admin/election-management/EditSession';

import { getElections } from '@/components/utils';
import ProtectedAdminRoute from '@/components/ProtectedAdminRoute';

async function EditSessionPage({ params }: { params: { id: string } }) {
  await onHandleAdminPageRequest();

  const { endDate, electionPositions, title, hasEnded, hasStarted } =
    await getElections(params.id);

  if (hasEnded || hasStarted) {
    redirect(`/admin/sessions/${params.id}`);
  }
  const newElectionPositions = electionPositions.map(
    (el: any, index: number) => {
      el['objID'] = index;
      return el;
    }
  );

  return (
    <section className={styles['form--container']}>
      <h2>Edit Session</h2>
      <EditElectionSession
        formerEndDate={endDate}
        electionPositions={newElectionPositions}
        formerTitle={title}
        sessionID={params.id}
      />
    </section>
  );
}

export default EditSessionPage;
