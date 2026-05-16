import { getArticleBySlug, listSlugs } from "../../../lib/articles";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import Callout from "../../../components/mdx/callout";
import CodeBlock from "../../../components/mdx/code-block";
import Figure from "../../../components/mdx/figure";

const components = { Callout, CodeBlock, Figure };

function readingTime(content: string): number {
  // detect special content
  const inlineMathMatches = content.match(/\$[^$\n]+\$/g) || [];
  const displayMathMatches = content.match(/\$\$[\s\S]*?\$\$/g) || [];
  const codeBlockMatches = content.match(/```[\s\S]*?```/g) || [];
  const imageMatches = content.match(/!\[.*?\]\(.*?\)/g) || [];

  // count words after stripping fenced code and math (we'll account for them separately)
  const stripped = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/\$[^$\n]+\$/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .trim();

  const words = stripped ? stripped.split(/\s+/).filter(Boolean).length : 0;

  // tuning parameters (adjust to taste)
  const WPM = 180; // technical reader baseline (words per minute)
  const inlineMathSecs = 24;   // extra seconds per inline formula
  const displayMathSecs = 80; // extra seconds per display equation
  const codeBlockSecs = 30;   // extra seconds per fenced code block
  const imageSecs = 8;        // seconds per image/figure

  const baseSeconds = (words / WPM) * 60;
  const extraSeconds =
    inlineMathMatches.length * inlineMathSecs +
    displayMathMatches.length * displayMathSecs +
    codeBlockMatches.length * codeBlockSecs +
    imageMatches.length * imageSecs;

  const totalMinutes = Math.max(1, Math.ceil((baseSeconds + extraSeconds) / 60));
  return totalMinutes;
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
    return <div className="py-20 font-mono text-text-muted">Article not found.</div>;
  }

  const minutes = readingTime(article.content);

  return (
    <article className="py-16">
      <div className="mx-auto" style={{ maxWidth: 720 }}>

        {/* Header */}
        <div className="border-b border-bg-border pb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {article.frontmatter.tags?.map((tag) => (
              <span key={tag} className="font-mono text-xs text-accent">{tag}</span>
            ))}
          </div>
          <h1 className="font-mono text-3xl leading-tight text-text-primary">
            {article.frontmatter.title}
          </h1>
          <div className="mt-3 font-mono text-sm text-text-faint">
            {article.frontmatter.date} &nbsp;·&nbsp; {minutes} min read
          </div>
        </div>

        {/* Body */}
        <div className="article-body mt-10">
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
