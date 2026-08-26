// @ts-nocheck
// Centralized Asset Manifest
// This file auto-includes product images + global brand assets
// Any image added here will automatically appear in the Asset Library

import { products } from "@/app/products/products";

// Global brand assets used across multiple pages
export const globalAssets = [
  {
    name: "eatOS Logo (White Text)",
    url: "https://ucarecdn.com/03d261bb-af6b-4183-a35c-afdbb7e1a2b7/-/format/auto/",
    location: "Header, Login, Dark Pages",
    category: "Brand",
  },
  {
    name: "eatOS Logo (Dark Text)",
    url: "https://ucarecdn.com/4352d127-4bf5-42cf-a022-3110926687de/-/format/auto/",
    location: "Header, Footer, Light Pages",
    category: "Brand",
  },
];

// Hero and background images
export const heroAssets = [
  {
    name: "Cinematic Hero Background",
    url: "https://raw.createusercontent.com/2772a9ef-4ecd-4833-95e5-94b09a81c2a7/",
    location: "/page.jsx (Homepage)",
    category: "Hero",
  },
  {
    name: "Restaurant Ambience (Point of Sale Page)",
    url: "https://raw.createusercontent.com/0f9f7bed-312b-405c-a290-ec7efd519ed4/",
    location: "/point-of-sale/page.jsx",
    category: "Hero",
  },
  {
    name: "Payments Background",
    url: "https://raw.createusercontent.com/2abe6721-038c-4bab-8bdb-5667b4aeccbe/",
    location: "/accept-payments/page.jsx",
    category: "Hero",
  },
  {
    name: "AI Background",
    url: "https://raw.createusercontent.com/2e47ab48-4e43-4525-b058-cee7372aab34/",
    location: "/ai/page.jsx",
    category: "Hero",
  },
];

// Hardware and product images from homepage
export const hardwareAssets = [
  {
    name: "Quick Service Mode",
    url: "https://framerusercontent.com/images/IR05SrNN2KJg1vMOblov7yBD37w.png",
    location: "/page.jsx (Homepage)",
    category: "Hardware",
  },
  {
    name: "Full Service Mode",
    url: "https://framerusercontent.com/images/jmUYZhUVZsYzpWQJh0KHr9yn7oc.png",
    location: "/page.jsx (Homepage)",
    category: "Hardware",
  },
  {
    name: "eatOS Pro Terminal",
    url: "https://framerusercontent.com/images/1Wjp9r97M2Q8P7AR9Z6ih7WC2e8.png",
    location: "/page.jsx (Homepage)",
    category: "Hardware",
  },
  {
    name: "eatOS Mini Terminal",
    url: "https://framerusercontent.com/images/brQNx13ss2T4Sra6NhUzdAN9VQA.png",
    location: "/page.jsx (Homepage)",
    category: "Hardware",
  },
  {
    name: "AI Intelligence Interface",
    url: "https://framerusercontent.com/images/cLG0kROuoRurUKeaXm2SUjBYH9k.png",
    location: "/page.jsx (Homepage)",
    category: "Hardware",
  },
  {
    name: "Kitchen Display System",
    url: "https://framerusercontent.com/images/PO7lSjwObqoznVjdFK478wgC3PY.png",
    location: "/page.jsx (Homepage)",
    category: "Hardware",
  },
];

// Product reference screenshots (from eatos.com)
export const productScreenshots = products
  .filter((p) => !p.comingSoon)
  .map((product) => ({
    name: `Product Screenshot - ${product.title}`,
    url: `https://e1a4c9d0d2f9f737c5e1.ucr.io/-/preview/https://api.urlbox.io/v1/NTYqWgJv5s0qDIxN/jpeg?url=https%3A%2F%2Fwww.eatos.com%2Fproducts%2F${encodeURIComponent(product.slug)}&full_page=true&width=1024&max_height=2048&quality=80`,
    location: `Reference (${product.title})`,
    category: "Product Reference",
    productSlug: product.slug,
  }));

// Combine all manifest assets
export function getAllManifestAssets() {
  return [
    ...globalAssets,
    ...heroAssets,
    ...hardwareAssets,
    ...productScreenshots,
  ];
}

export default getAllManifestAssets;
