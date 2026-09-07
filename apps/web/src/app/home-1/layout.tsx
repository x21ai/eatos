// @ts-nocheck
export const metadata = {
  title: "Homepage Variant A",
  description: "Internal homepage layout variant used by the eatOS team.",
  alternates: { canonical: '/home-1' },
  openGraph: {
    type: 'website',
    url: '/home-1',
    title: "Homepage Variant A | eatOS",
    description: "Internal homepage layout variant used by the eatOS team.",
  },
  twitter: { card: 'summary_large_image', title: "Homepage Variant A | eatOS", description: "Internal homepage layout variant used by the eatOS team." },
  robots: { index: false, follow: false },
};

export default function Layout({ children }) {
  return children;
}
