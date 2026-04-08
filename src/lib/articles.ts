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

  // sort desc by date
  articles.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
  return articles;
}

export function getArticleBySlug(slug: string): Article | null {
  const p1 = path.join(ARTICLES_PATH, `${slug}.mdx`);
  const p2 = path.join(ARTICLES_PATH, `${slug}.md`);
  const file = fs.existsSync(p1) ? p1 : fs.existsSync(p2) ? p2 : null;
  if (!file) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { slug, frontmatter: data as ArticleFrontmatter, content };
}

export function listSlugs(): string[] {
  return getAllArticles().map((a) => a.slug);
}
