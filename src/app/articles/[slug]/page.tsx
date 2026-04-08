import { getArticleBySlug, listSlugs } from "../../../lib/articles";
import { marked } from "marked";

export async function generateStaticParams() {
  return listSlugs().map((s) => ({ slug: s }));
}

export default async function ArticlePage({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return <div className="py-20">Article not found.</div>;
  }

  const html = marked(article.content || "");

  return (
    <article className="py-16">
      <div className="mx-auto" style={{ maxWidth: 720 }}>
        <h1 className="font-mono text-3xl leading-tight">{article.frontmatter.title}</h1>
        <div className="mt-3 text-sm text-text-muted">
          {article.frontmatter.date} — {/* reading time placeholder */}
        </div>
        <div className="mt-8 prose max-w-none font-serif" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </article>
  );
}
