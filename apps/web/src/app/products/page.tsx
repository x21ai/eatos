import ProductsPage from './ProductsIndexClient';
import { JsonLd, softwareApplicationJsonLd } from '@/lib/seo';

const description =
  'eatOS restaurant point of sale products: terminals, handhelds, kitchen displays, kiosks, guest-facing displays, and payment devices.';

export default function Page() {
  return (
    <>
      <JsonLd
        data={softwareApplicationJsonLd({
          name: 'eatOS Restaurant Point of Sale',
          description,
          path: '/products',
        })}
      />
      <ProductsPage />
    </>
  );
}
