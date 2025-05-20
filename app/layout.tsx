import { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { siteConfig } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'skills training',
    'vocational training',
    'fashion',
    'dressmaking',
    'tailoring',
    'sewing',
    'grooming',
    'beading',
    'crafts',
    'Ghana',
  ],
  authors: [
    {
      name: 'Tetteh Kodjo-Sarso',
      url: 'github.com/Reggeditt',
    },
  ],
  creator: 'Lucbilt Skills Training Institute',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lucbilt.org',
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: '@lucbiltinstitute',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen antialiased', inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}