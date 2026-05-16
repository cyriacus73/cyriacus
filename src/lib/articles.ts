import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ARTICLES_PATH = path.join(process.cwd(), "content", "articles");

export type ArticleFrontmatter = {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  status?: string;
  math?: boolean;
};

export type Article = {
  slug: string;
  frontmatter: ArticleFrontmatter;
  content: string;
};

/**
 * Read all mdx/md files in the content/articles directory and return parsed frontmatter.
 */
export function getAllArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_PATH)) return [];
  const files = fs.readdirSync(ARTICLES_PATH).filter((f) => /\.mdx?$/.test(f));
  const articles = files.map((file) => {
    const full = path.join(ARTICLES_PATH, file);
    const raw = fs.readFileSync(full, "utf8");
    const { data, content } = matter(raw);
    const slug = file.replace(/\.mdx?$/, "");
    return {
      slug,
      frontmatter: data as ArticleFrontmatter,
      content,
    } as Article;
  });

  // Filter out drafts in production. Drafts should be visible during local
  // development only (NODE_ENV !== 'production'). This keeps unpublished
  // articles from being listed or statically generated in production builds.
  const includeDrafts = process.env.NODE_ENV !== "production";
  const visible = articles.filter((a) => {
    const status = a.frontmatter?.status?.toLowerCase?.();
    if (status === "draft" && !includeDrafts) return false;
    return true;
  });

  // sort desc by date
  visible.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
  return visible;
}

export function getArticleBySlug(slug: string): Article | null {
  const p1 = path.join(ARTICLES_PATH, `${slug}.mdx`);
  const p2 = path.join(ARTICLES_PATH, `${slug}.md`);
  const file = fs.existsSync(p1) ? p1 : fs.existsSync(p2) ? p2 : null;
  if (!file) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const front = data as ArticleFrontmatter;

  // If the article is a draft, only return it when running locally. In
  // production we intentionally hide draft articles to prevent accidental
  // exposure via direct URL access.
  const isDraft = typeof front.status === "string" && front.status.toLowerCase() === "draft";
  if (isDraft && process.env.NODE_ENV === "production") return null;

  return { slug, frontmatter: front, content };
}

export function listSlugs(): string[] {
  return getAllArticles().map((a) => a.slug);
}
