// @ts-nocheck
export const metadata = {
  alternates: { canonical: '/products' },
  title: {
    default: 'Restaurant Products and Devices',
    template: '%s | eatOS',
  },
  description:
    'Explore the eatOS product family: Point of Sale terminals, handhelds, kitchen displays, kiosks, guest facing displays and payment devices.',
  openGraph: {
    url: '/products',
    type: 'website',
    title: 'Restaurant Products and Devices | eatOS',
    description:
      'Point of Sale terminals, handhelds, kitchen displays, kiosks, guest facing displays and payment devices.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Restaurant Products and Devices | eatOS',
    description:
      'Point of Sale terminals, handhelds, kitchen displays, kiosks, guest facing displays and payment devices.',
  },
};

export default function ProductsLayout({ children }) {
  return children;
}
