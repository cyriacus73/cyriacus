import ArticleCard from "../../components/ui/article-card";
import { getAllArticles } from "../../lib/articles";

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <section className="py-12">
      <div className="mx-auto" style={{ maxWidth: 720 }}>
        <h2 className="font-mono text-2xl">Articles</h2>
        <div className="mt-6">
          {articles.length === 0 ? (
            <p className="text-text-muted">No articles yet.</p>
          ) : (
            articles.map((a) => (
              <ArticleCard
                key={a.slug}
                slug={a.slug}
                title={a.frontmatter.title}
                date={a.frontmatter.date}
                tags={a.frontmatter.tags}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
