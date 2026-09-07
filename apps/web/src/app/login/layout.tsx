// @ts-nocheck
export const metadata = {
  title: "Sign In",
  description: "Sign in to your eatOS account to manage your restaurant, orders, menu and reporting.",
  alternates: { canonical: '/login' },
  openGraph: {
    type: 'website',
    url: '/login',
    title: "Sign In | eatOS",
    description: "Sign in to your eatOS account to manage your restaurant, orders, menu and reporting.",
  },
  twitter: { card: 'summary_large_image', title: "Sign In | eatOS", description: "Sign in to your eatOS account to manage your restaurant, orders, menu and reporting." },
  robots: { index: false, follow: false },
};

export default function Layout({ children }) {
  return children;
}
