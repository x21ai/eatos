// @ts-nocheck
// Renders the structured blocks stored for each migrated support article.

export default function ArticleBody({ blocks = [] }) {
  return (
    <div className="min-w-0">
      {blocks.map((block, i) => {
        if (block.type === 'h2') {
          return (
            <h2
              key={i}
              className="mt-14 text-2xl font-bold tracking-tighter text-white first:mt-0 sm:text-3xl"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === 'h3') {
          return (
            <h3
              key={i}
              className="mt-12 text-xl font-bold tracking-tighter text-white first:mt-0 sm:text-2xl"
            >
              {block.text}
            </h3>
          );
        }
        if (block.type === 'h4') {
          return (
            <h4
              key={i}
              className="mt-10 text-base font-bold tracking-tight text-white first:mt-0 sm:text-lg"
            >
              {block.text}
            </h4>
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
              <img
                src={block.src}
                alt={block.alt || ''}
                loading="lazy"
                className="h-auto w-full object-cover"
              />
              {block.alt ? (
                <figcaption className="border-t border-white/8 px-4 py-3 text-xs text-zinc-500">
                  {block.alt}
                </figcaption>
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
      })}
    </div>
  );
}
