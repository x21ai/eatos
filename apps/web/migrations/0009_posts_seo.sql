-- SEO fields used by the blog/news admin editor and list API.
ALTER TABLE posts ADD COLUMN seo_title TEXT;
ALTER TABLE posts ADD COLUMN seo_description TEXT;
ALTER TABLE news_posts ADD COLUMN seo_title TEXT;
ALTER TABLE news_posts ADD COLUMN seo_description TEXT;
