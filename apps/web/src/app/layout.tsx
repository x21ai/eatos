// @ts-nocheck
import './global.css';
import Providers from '@/components/Providers';
import SiteChrome from '@/components/SiteChrome';
import { HOME_DESCRIPTION, HOME_TITLE, JsonLd, defaultSocialImages, siteJsonLd } from '@/lib/seo';

const CRISP_WEBSITE_ID = 'cf9ee4db-97df-4864-8fa6-194ad4762b95';

export const metadata = {
  metadataBase: new URL('https://eatos.com'),
  title: {
    default: HOME_TITLE,
    template: '%s | eatOS',
  },
  description: HOME_DESCRIPTION,
  keywords: [
    'eatOS',
    'restaurant POS',
    'restaurant point of sale',
    'restaurant software',
    'point of sale',
    'restaurant management',
    'kitchen display system',
    'restaurant payments',
  ],
  openGraph: {
    type: 'website',
    siteName: 'eatOS',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: defaultSocialImages,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@myeatos',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: defaultSocialImages,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },

};

export default function RootLayout({ children }) {
  const crispWebsiteId =
    process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID ??
    process.env.CRISP_WEBSITE_ID ??
    CRISP_WEBSITE_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="bg-white text-black font-montserrat antialiased min-h-screen flex flex-col"
        suppressHydrationWarning
      >
        <Providers>
          <JsonLd data={siteJsonLd()} />
          <SiteChrome crispWebsiteId={crispWebsiteId}>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
