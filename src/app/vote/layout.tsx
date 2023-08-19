import type { Metadata } from 'next';

import { Nunito } from 'next/font/google';

const nunito = Nunito({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Votelink - Vote',
  description: 'A Voting Platform',
};

export default function VoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={nunito.className}>{children}</section>;
}
