// @ts-nocheck
export const metadata = {
  title: "Homepage Variant C",
  description: "Internal homepage layout variant used by the eatOS team.",
  alternates: { canonical: '/homepage2' },
  openGraph: {
    type: 'website',
    url: '/homepage2',
    title: "Homepage Variant C | eatOS",
    description: "Internal homepage layout variant used by the eatOS team.",
  },
  twitter: { card: 'summary_large_image', title: "Homepage Variant C | eatOS", description: "Internal homepage layout variant used by the eatOS team." },
  robots: { index: false, follow: false },
};

export default function Layout({ children }) {
  return children;
}
