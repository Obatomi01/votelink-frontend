import Login from '@/components/Login';

import Image from 'next/image';
import Logo from '@/../public/images/ammanlogo.png';

import styles from '@/styles/admin/election-management.module.scss';

export default async function Home() {
  return (
    <section
      className={`${styles['form--container']} ${styles['login--container']}`}
    >
      <Image
        src={Logo}
        alt='Logo'
        style={{
          display: 'block',
          marginInline: 'auto',
          marginBottom: '1.2rem',
        }}
      />
      <h2>User Login</h2>
      <Login />
    </section>
  );
}
