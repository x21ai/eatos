import KbDemoHome from './KbDemoHome';

export const metadata = {
  title: 'Knowledge Base | eatOS',
  description:
    'A live preview of the support articles published from the eatOS Knowledge Base editor.',
  robots: { index: false, follow: false },
};

export default function KbDemoPage() {
  return <KbDemoHome />;
}
