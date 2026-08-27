// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { Heart, Link2 } from 'lucide-react';

function FacebookIcon({ size = 18, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}


function XIcon({ size = 18, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 4l16 16" />
      <path d="M20 4L4 20" />
    </svg>
  );
}

// Deterministic base count per post so the number is stable between visits.
function baseCount(slug) {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) % 1000;
  }
  return 3 + (hash % 28);
}

const iconClass =
  'flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/5 hover:text-white';

export default function PostReactions({ slug, title, onCopyLink }) {
  const [liked, setLiked] = useState(false);
  const [url, setUrl] = useState('');
  const base = baseCount(slug);
  const storageKey = `eatos-blog-like:${slug}`;

  useEffect(() => {
    setUrl(window.location.href);
    try {
      setLiked(window.localStorage.getItem(storageKey) === '1');
    } catch {
      // ignore unavailable storage
    }
  }, [storageKey]);

  const toggleLike = () => {
    const next = !liked;
    setLiked(next);
    try {
      if (next) window.localStorage.setItem(storageKey, '1');
      else window.localStorage.removeItem(storageKey);
    } catch {
      // ignore unavailable storage
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title || '');

  const shares = [
    {
      label: 'Share on Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <Facebook size={18} />,
    },
    {
      label: 'Share on X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <XIcon size={18} />,
    },
    {
      label: 'Share on LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <Linkedin size={18} />,
    },
  ];

  return (
    <div className="mt-16">
      <div className="border-t border-white/10 py-4">
        <div className="flex items-center gap-1">
          {shares.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className={iconClass}
            >
              {item.icon}
            </a>
          ))}
          <button
            type="button"
            onClick={onCopyLink}
            aria-label="Copy link to this article"
            className={iconClass}
          >
            <Link2 size={18} />
          </button>
        </div>
      </div>

      <div className="border-t border-white/10 py-4">
        <div className="flex items-center justify-end gap-2">
          <span className="text-sm font-medium text-zinc-400">{base + (liked ? 1 : 0)}</span>
          <button
            type="button"
            onClick={toggleLike}
            aria-pressed={liked}
            aria-label={liked ? 'Remove your like' : 'Like this article'}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/5 ${
              liked ? 'text-brand' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  );
}
