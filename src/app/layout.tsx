import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Heritage Surgical Associates',
  description: 'Trusted Orthopedic Care Since 1987',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
