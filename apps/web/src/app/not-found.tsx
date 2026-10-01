import NotFoundClient from './NotFoundClient';
import { defaultSocialImages } from '@/lib/seo';

export const metadata = {
  title: { absolute: 'Page not found | eatOS' },
  description: 'That eatOS page does not exist.',
  robots: { index: false, follow: false },
  // Replace a parent layout canonical so a missing slug does not advertise
  // the section index as its address.
  alternates: {},
  openGraph: {
    title: 'Page not found | eatOS',
    description: 'That eatOS page does not exist.',
    images: defaultSocialImages,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page not found | eatOS',
    description: 'That eatOS page does not exist.',
    images: defaultSocialImages,
  },
};

export default function NotFound() {
  return <NotFoundClient />;
}
