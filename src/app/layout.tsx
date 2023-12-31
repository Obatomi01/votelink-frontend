import type { Metadata } from 'next';
import './globals.css';
import { Nunito } from 'next/font/google';
import { AuthProvider } from '@/components/AuthContext';

const nunito = Nunito({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Votelink',
  description: 'A Voting Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={nunito.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
