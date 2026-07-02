import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio BackTrack',
  description: 'Backtest index fund portfolios with historical analytics.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head />
      <body>{children}</body>
    </html>
  );
}
