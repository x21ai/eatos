// Contract for the shop. The catalogue views render only from these shapes, so
// the database can be designed independently as long as the columns map on.
// Prices are always an amount plus an ISO currency code, never a string.

export interface Money {
  amount: number;
  currency: string;
}

export interface ProductRow {
  slug: string;
  title: string;
  vendor: string | null;
  product_type: string | null;
  tags: string[] | null;
  description_html: string | null;
  price_amount: number | null;
  compare_at_amount: number | null;
  currency: string | null;
  available: boolean | null;
  status: 'draft' | 'published' | string;
  published_at: string | null;
  updated_at: string | null;
}

export interface ProductImageRow {
  product_slug: string;
  url: string;
  alt: string | null;
  width: number | null;
  height: number | null;
  position: number | null;
}

export interface ProductVariantRow {
  id: string;
  product_slug: string;
  title: string;
  sku: string | null;
  price_amount: number | null;
  compare_at_amount: number | null;
  currency: string | null;
  available: boolean | null;
  requires_shipping: boolean | null;
  options: string[] | null;
  image_url: string | null;
}

export interface CollectionRow {
  slug: string;
  title: string;
  description_html: string | null;
  image: string | null;
  position: number | null;
}

export interface CollectionProductRow {
  collection_slug: string;
  product_slug: string;
  position: number | null;
}

export const PRODUCT_COLUMNS =
  'slug,title,vendor,product_type,tags,description_html,price_amount,compare_at_amount,currency,available,status,published_at,updated_at';

export const COLLECTION_COLUMNS = 'slug,title,description_html,image,position';

export function money(amount: number | null, currency: string | null): Money | null {
  if (typeof amount !== 'number' || amount <= 0) return null;
  return { amount, currency: currency || 'USD' };
}
