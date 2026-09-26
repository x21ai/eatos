// @ts-nocheck
// Renders the structured blocks stored for each migrated support article.

import { getArticleEmbeds, prepareArticle, sectionDomId } from './articleBodyModel';

const headingClass = {
  h2: 'mt-14 scroll-mt-28 text-2xl font-bold tracking-tighter text-white first:mt-0 sm:text-3xl',
  h3: 'mt-12 scroll-mt-28 text-xl font-bold tracking-tighter text-white first:mt-0 sm:text-2xl',
  h4: 'mt-10 scroll-mt-28 text-base font-bold tracking-tight text-white first:mt-0 sm:text-lg',
};

function videoSrc(provider, id) {
  if (provider === 'vimeo') return `https://player.vimeo.com/video/${id}`;
  if (provider === 'youtube') return `https://www.youtube.com/embed/${id}?rel=0`;
  return '';
}

function VideoPlayer({ provider, id, title, posterSrc }) {
  const src = id ? videoSrc(provider, id) : '';
  return (
    <figure className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black">
      <div className="relative aspect-video">
        {src ? (
          <iframe
            src={src}
            title={title || 'eatOS tutorial video'}
            className="absolute inset-0 h-full w-full"
            allow={
              provider === 'vimeo'
                ? 'autoplay; fullscreen; picture-in-picture'
                : 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            }
            allowFullScreen
            loading="lazy"
          />
        ) : posterSrc ? (
          <img
            src={posterSrc}
            alt={title || 'Video thumbnail'}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
      </div>
    </figure>
  );
}

function TableOfContents({ items }) {
  const hasH2 = items.some((item) => item.level === 'h2');
  return (
    <nav aria-label="Table of contents" className="mt-14 first:mt-0">
      <h3 className="text-xl font-bold tracking-tighter text-white sm:text-2xl">Table of Contents</h3>
      {items.length ? (
        <ol className="mt-4 space-y-2 border-l border-white/10 pl-4">
          {items.map((item) => (
            <li
              key={item.id}
              className={item.level === 'h4' || (item.level === 'h3' && hasH2) ? 'pl-3' : undefined}
            >
              <a href={`#${item.id}`} className="text-sm leading-6 text-zinc-300 transition-colors hover:text-white">
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      ) : null}
    </nav>
  );
}

function renderBlock(block, i) {
  if (block.type === 'h2' || block.type === 'h3' || block.type === 'h4') {
    const Tag = block.type;
    return (
      <Tag key={i} id={sectionDomId(i)} className={headingClass[block.type]}>
        {block.text}
      </Tag>
    );
  }
  if (block.type === 'ul' || block.type === 'ol') {
    const Tag = block.type === 'ol' ? 'ol' : 'ul';
    return (
      <Tag key={i} className="mt-6 space-y-3">
        {block.items.map((item, idx) => (
          <li key={`${i}-${idx}`} className="flex gap-3 text-sm leading-7 text-zinc-300 sm:text-base sm:leading-8">
            {block.type === 'ol' ? (
              <span aria-hidden className="shrink-0 text-sm font-semibold text-brand-on-dark">
                {idx + 1}.
              </span>
            ) : (
              <span aria-hidden className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
            )}
            <span className="min-w-0">{item}</span>
          </li>
        ))}
      </Tag>
    );
  }
  if (block.type === 'image') {
    return (
      <figure key={i} className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <img src={block.src} alt={block.alt || ''} loading="lazy" className="h-auto w-full object-cover" />
        {block.alt ? (
          <figcaption className="border-t border-white/8 px-4 py-3 text-xs text-zinc-500">{block.alt}</figcaption>
        ) : null}
      </figure>
    );
  }
  if (block.type === 'quote') {
    return (
      <blockquote
        key={i}
        className="mt-8 border-l-2 border-brand pl-5 text-sm italic leading-7 text-zinc-300 sm:text-base sm:leading-8"
      >
        {block.text}
      </blockquote>
    );
  }
  if (block.type === 'code') {
    return (
      <pre
        key={i}
        className="mt-8 overflow-x-auto rounded-2xl border border-white/10 bg-zinc-900 p-5 text-xs leading-6 text-zinc-200"
      >
        <code>{block.text}</code>
      </pre>
    );
  }
  if (block.type === 'table') {
    return (
      <div key={i} className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full border-collapse text-left text-sm">
          {block.head?.length ? (
            <thead className="bg-white/[0.05]">
              <tr>
                {block.head.map((cell, idx) => (
                  <th
                    key={idx}
                    className="border-b border-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-300"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
          ) : null}
          <tbody>
            {block.rows.map((row, rIdx) => (
              <tr key={rIdx} className="odd:bg-white/[0.02]">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="border-b border-white/8 px-4 py-3 align-top text-zinc-300">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <p key={i} className="mt-6 text-sm leading-7 text-zinc-300 sm:text-base sm:leading-8">
      {block.text}
    </p>
  );
}

export default function ArticleBody({ blocks = [], slug = '' }) {
  const nodes = prepareArticle(blocks, getArticleEmbeds(slug));
  return (
    <div className="min-w-0">
      {nodes.map((node, index) => {
        if (node.kind === 'toc') return <TableOfContents key={`toc-${index}`} items={node.items} />;
        if (node.kind === 'video') {
          return (
            <VideoPlayer
              key={`video-${index}`}
              provider={node.provider}
              id={node.id}
              title={node.title}
              posterSrc={node.posterSrc}
            />
          );
        }
        return renderBlock(node.block, node.index);
      })}
    </div>
  );
}
