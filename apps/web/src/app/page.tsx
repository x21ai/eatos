// @ts-nocheck
import HomeClient from './HomeClient';
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  JsonLd,
  marketingMetadata,
  softwareApplicationJsonLd,
} from '@/lib/seo';

export const metadata = marketingMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: '/',
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={softwareApplicationJsonLd({
          name: 'eatOS Restaurant Point of Sale',
          description: HOME_DESCRIPTION,
          path: '/',
        })}
      />
      <HomeClient />
    </>
  );
}
