import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '../styles/globals.css';
import PageLoader from '@/components/PageLoader';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || 'https://ryhar.my.id',
  ),
  title: {
    default: 'Ditsa | Portfolio',
    template: '%s | Ditsa Portfolio',
  },
  description:
    'Personal portfolio of Ditsa Ardiva Prananda Putra. Software Developer specializing in Next.js, Node.js, and modern web development.',
  keywords: [
    'Ditsa Ardiva Prananda Putra',
    'Portfolio',
    'Software Developer',
    'Web Development',
    'Backend',
    'Frontend',
    'Next.js',
    'React',
    'Node.js',
  ],
  authors: [{ name: 'Ditsa Ardiva Prananda Putra' }],
  creator: 'Ditsa Ardiva Prananda Putra',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    title: 'Ditsa | Portfolio',
    description:
      'Personal portfolio of Ditsa Ardiva Prananda Putra. Software Developer specializing in Next.js, Node.js, and modern web development.',
    siteName: 'Ditsa Portfolio',
    images: [
      {
        url: '/images/heroo.jpg',
        width: 1200,
        height: 630,
        alt: 'Ditsa Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ditsa | Portfolio',
    description:
      'Personal portfolio of Ditsa Ardiva Prananda Putra. Software Developer specializing in Next.js, Node.js, and modern web development.',
    images: ['/images/heroo.jpg'],
    creator: '@Ditsa',
  },
  icons: {
    icon: '/images/heroo.jpg',
    shortcut: '/images/heroo.jpg',
    apple: '/images/heroo.jpg',
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'ZbLhiilDbtLDyIx5eH6Jeoe1jPkXNKId-LhXG1HhLWA',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
