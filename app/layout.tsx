import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'NeGaraj — BMW сервис', description: 'BMW сервис с честными ценами за работу' };
export default function RootLayout({children}:{children:React.ReactNode}){ return <html lang='ru'><body>{children}</body></html>; }
