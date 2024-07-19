import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Budget Battles',
    default: 'Budget Battles',
  },
  description: 'A simple budgeting dashboard.',
  // metadataBase: new URL('https://google.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-slate-300`}>{children}</body>
    </html>
  );
}
