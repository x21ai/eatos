// @ts-nocheck
// This route permanently redirects to /book-demo, which is the primary URL.
export const metadata = {
  title: 'Book a Restaurant Technology Demo',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://eatos.com/book-demo',
  },
};

export default function GetStartedLayout({ children }) {
  return children;
}
