import { getArticleBySlug, listSlugs } from "../../../lib/articles";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import Callout from "../../../components/mdx/callout";
import CodeBlock from "../../../components/mdx/code-block";
import Figure from "../../../components/mdx/figure";

const components = { Callout, CodeBlock, Figure };

function readingTime(content: string): number {
  const displayMathRegex = /\$\$[\s\S]*?\$\$/g;
  const inlineMathRegex = /\$[^$\n]+\$/g;
  const codeBlockRegex = /```[\s\S]*?```/g;
  const imageRegex = /!\[.*?\]\(.*?\)/g;

  const displayMath = content.match(displayMathRegex) || [];
  const withoutDisplayMath = content.replace(displayMathRegex, " ");
  const inlineMath = withoutDisplayMath.match(inlineMathRegex) || [];
  const codeBlocks = content.match(codeBlockRegex) || [];
  const images = content.match(imageRegex) || [];

  const stripped = content
    .replace(codeBlockRegex, " ")
    .replace(displayMathRegex, " ")
    .replace(inlineMathRegex, " ")
    .replace(/<\/?[A-Za-z][^>]*>/g, " ")
    .trim();

  const words = stripped ? stripped.split(/\s+/).filter(Boolean).length : 0;

  const mathDensity =
    (inlineMath.length + displayMath.length * 2) / Math.max(words, 1);

  const WPM =
    mathDensity > 0.02 ? 140 : mathDensity > 0.01 ? 160 : 180;

  const totalSeconds =
    (words / WPM) * 60 +
    inlineMath.length * 12 +
    displayMath.length * 40 +
    codeBlocks.length * 25 +
    images.length * 8;

  return Math.max(1, Math.ceil(totalSeconds / 60));
}

export async function generateStaticParams() {
  return listSlugs().map((s) => ({ slug: s }));
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="py-20 font-mono text-text-muted">
        Article not found.
      </div>
    );
  }

  const minutes = readingTime(article.content);

  return (
    <article className="py-10 sm:py-16 px-4 sm:px-6">
      <div className="mx-auto w-full" style={{ maxWidth: 720 }}>

        {/* Header */}
        <div className="border-b border-bg-border pb-8">

          {/* Tags — wrap naturally, never spill */}
          {article.frontmatter.tags && article.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {article.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs text-accent bg-accent/10 rounded px-2 py-0.5 leading-tight"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title — scales down gracefully on small screens */}
          <h1 className="font-mono text-2xl sm:text-3xl leading-snug text-text-primary break-words">
            {article.frontmatter.title}
          </h1>

          {/* Meta — wraps on very narrow screens instead of overflowing */}
          <div className="mt-3 font-mono text-xs sm:text-sm text-text-faint flex flex-wrap gap-x-2 gap-y-1 items-center">
            <span>{article.frontmatter.date}</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span>{minutes} min read</span>
          </div>
        </div>

        {/* Body */}
        <div className="article-body mt-8 sm:mt-10">
          <MDXRemote
            source={article.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkMath],
                rehypePlugins: [rehypeKatex],
              },
            }}
            components={components}
          />
        </div>

      </div>
    </article>
  );
}