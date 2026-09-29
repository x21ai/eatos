import KbDemoArticle from './KbDemoArticle';

export const metadata = {
  title: 'Article | eatOS Knowledge Base',
  description:
    'A support article published from the eatOS Knowledge Base editor, shown in the live demo preview.',
  robots: { index: false, follow: false },
};

export default async function KbDemoArticlePage({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const { articleId } = await params;
  return <KbDemoArticle articleId={articleId} />;
}
