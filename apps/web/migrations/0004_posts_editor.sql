-- The admin editor writes one HTML string; the public pages render structured
-- blocks. Keep both on the row so editing never loses formatting.
ALTER TABLE posts ADD COLUMN content_html TEXT;
ALTER TABLE news_posts ADD COLUMN content_html TEXT;

-- Keywords field used by the editor's SEO panel.
ALTER TABLE posts ADD COLUMN keywords TEXT;
ALTER TABLE news_posts ADD COLUMN keywords TEXT;
