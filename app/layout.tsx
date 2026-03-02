import './globals.css';
import type { Metadata } from 'next';
import { Inter, Orbitron } from 'next/font/google';

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' });
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' });

export const metadata: Metadata = {
  title: 'NeGaraj — BMW сервис',
  description: 'BMW сервис с честными ценами за работу'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ru'>
      <body className={`${inter.variable} ${orbitron.variable}`}>{children}</body>
    </html>
  );
}
