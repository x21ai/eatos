// @ts-nocheck
import './global.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Providers from '@/components/Providers';
import CookieBanner from '@/components/CookieBanner';

export const metadata = {
  metadataBase: new URL('https://eatos.com'),
  title: {
    default: 'eatOS - The Restaurant Operating System',
    template: '%s | eatOS',
  },
  description:
    'eatOS is the all-in-one restaurant operating system. Point of sale, payments, kitchen display, online ordering, inventory, and AI intelligence built for restaurants of every size.',
  keywords: [
    'restaurant Point of Sale',
    'restaurant software',
    'point of sale',
    'restaurant management',
    'kitchen display system',
    'restaurant payments',
    'eatOS',
  ],
  openGraph: {
    type: 'website',
    siteName: 'eatOS',
    title: 'eatOS - The Restaurant Operating System',
    description:
      'All-in-one restaurant software: Point of Sale, payments, kitchen display, online ordering, and AI intelligence.',
    images: [
      {
        url: 'https://ucarecdn.com/c0c7e8e9-324d-4d51-8fa6-8a867032ad32/-/format/auto/',
        width: 1200,
        height: 630,
        alt: 'eatOS Restaurant Operating System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@myeatos',
    title: 'eatOS - The Restaurant Operating System',
    description:
      'All-in-one restaurant software: Point of Sale, payments, kitchen display, online ordering, and AI intelligence.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="bg-white text-black font-montserrat antialiased min-h-screen flex flex-col"
        suppressHydrationWarning
      >
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
