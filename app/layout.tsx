import './globals.css';
import Script from 'next/script';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio BackTrack',
  description: 'Backtest index fund portfolios with historical analytics.'
};

const themeInitScript = `(function(){try{var stored=localStorage.getItem('portfolio-backtrack-theme');var prefers=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches;var next=stored|| (prefers? 'light':'dark');document.documentElement.classList.toggle('light', next==='light');document.documentElement.classList.toggle('dark', next==='dark');}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
