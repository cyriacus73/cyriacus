import Link from "next/link";
import Tag from "./tag";

/**
 * Article list row used on /articles. Minimal, left-aligned.
 */
export default function ArticleCard({
  slug,
  title,
  date,
  tags,
  readingTime,
}: {
  slug: string;
  title: string;
  date: string;
  tags?: string[];
  readingTime?: string;
}) {
  return (
    <article className="py-6 border-b border-bg-border">
      <div className="flex items-center gap-6">
        <div className="w-28 text-text-faint">{date}</div>
        <div className="flex-1">
          <h3 className="font-mono text-xl">
            <Link href={`/articles/${slug}`} className="hover:text-accent">
              {title}
            </Link>
          </h3>
          <div className="mt-2 flex items-center gap-3">
            {tags?.map((t) => (
              <Tag key={t} label={t} />
            ))}
            {readingTime && <div className="text-text-muted">{readingTime}</div>}
          </div>
        </div>
      </div>
    </article>
  );
}
