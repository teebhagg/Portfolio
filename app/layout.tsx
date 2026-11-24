import type { Metadata } from 'next';
import { Instrument_Sans } from 'next/font/google';
import '@/styles/globals.css';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { StructuredData } from '@/components/structured-data';
import { getSiteStructuredData } from '@/lib/seo';

import { metadata as meta } from './config';

const inter = Instrument_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(meta.site.url),
  title: {
    default: meta.site.title,
    template: `%s | ${meta.site.title}`
  },
  description: meta.site.description,
  alternates: {
    canonical: '/',
    types: {
      'text/plain': '/llms.txt',
      'text/markdown': '/llms-full.txt'
    }
  },
  authors: [{ name: meta.author.name, url: 'https://github.com/teebhagg' }],
  creator: meta.author.name,
  publisher: meta.author.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.site.title,
    description: meta.site.description,
    images: [
      {
        url: '/images/social-cover.png',
        alt: 'Joshua Ansah, software engineer'
      }
    ]
  },
  openGraph: {
    url: meta.site.url,
    type: 'website',
    title: meta.site.title,
    siteName: meta.site.title,
    description: meta.site.description,
    locale: 'en_GH',
    images: [
      {
        url: '/images/social-cover.png',
        width: 1200,
        height: 630,
        alt: 'Joshua Ansah, software engineer'
      }
    ]
  },
  icons: {
    icon: '/favicon/favicon.svg',
    shortcut: '/favicon/favicon.svg',
    apple: [
      {
        url: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ],
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon/favicon-16x16.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon/favicon-32x32.png'
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="describedby" href="/llms.txt" />
        <link
          rel="alternate"
          type="text/markdown"
          href="/llms-full.txt"
          title="Full Markdown reference for AI agents"
        />
      </head>
      <body className={inter.className}>
        <StructuredData data={getSiteStructuredData()} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
