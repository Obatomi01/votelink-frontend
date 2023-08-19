import type { Metadata } from 'next';

import { Nunito } from 'next/font/google';

import Nav from '@/components/Nav';

const nunito = Nunito({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Votelink - Admin',
  description: 'A Voting Platform',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={nunito.className}>
      <section
        style={{
          display: 'flex',
        }}
      >
        <Nav />
        {children}
      </section>
    </section>
  );
}
