import Login from '@/components/Login';

import styles from '@/styles/admin/election-management.module.scss';

export default async function Home() {
  return (
    <section
      className={`${styles['form--container']} ${styles['login--container']}`}
    >
      <h2>User Login</h2>
      <Login />
    </section>
  );
}
