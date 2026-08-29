// Typed API contract for the eatOS shop catalog. Backend, frontend and any
// future AI tooling all read these shapes. Prices are always structured money
// objects in minor-unit-safe numbers plus an ISO currency code, never strings.

export interface Money {
  amount: number;
  currency: string;
}

export interface ShopImage {
  url: string;
  alt: string;
  width: number | null;
  height: number | null;
}

export interface ShopVariant {
  id: string;
  title: string;
  sku: string | null;
  price: Money | null;
  compareAtPrice: Money | null;
  available: boolean;
  requiresShipping: boolean;
  options: string[];
  imageUrl: string | null;
}

export interface ShopProductOption {
  name: string;
  values: string[];
}

export interface ShopProduct {
  id: string;
  slug: string;
  title: string;
  vendor: string | null;
  productType: string | null;
  tags: string[];
  descriptionHtml: string;
  images: ShopImage[];
  options: ShopProductOption[];
  variants: ShopVariant[];
  priceFrom: Money | null;
  compareAtPrice: Money | null;
  available: boolean;
  collectionSlugs: string[];
  publishedAt: string | null;
  updatedAt: string | null;
}

export interface ShopCollection {
  slug: string;
  title: string;
  descriptionHtml: string;
  image: string | null;
  productSlugs: string[];
}

export interface ShopContentPage {
  slug: string;
  title: string;
  bodyHtml: string;
  hasBody: boolean;
}

export interface ShopCatalog {
  source: string;
  importedAt: string;
  collections: ShopCollection[];
  products: ShopProduct[];
  pages: ShopContentPage[];
}
