import type { Metadata } from 'next';
import { Cinzel, Sarabun } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const sarabun = Sarabun({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '600'],
  variable: '--font-sarabun',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ดาวแห่งโชคชะตา · ดูดวงไพ่ยิปซี',
  description: 'ค้นหาคำตอบและทิศทางชีวิตของคุณผ่านไพ่ยิปซีโบราณ ดูดวงออนไลน์ รองรับทุกอุปกรณ์',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${cinzel.variable} ${sarabun.variable}`}>
      <body className="min-h-screen bg-deep text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
