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
    <article className="py-5 sm:py-6 border-b border-bg-border">

      {/* On mobile: stack vertically. On sm+: side-by-side with date column. */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:gap-6">

        {/* Date — sits above title on mobile, left column on desktop */}
        <div className="font-mono text-xs sm:text-sm text-text-faint sm:w-28 sm:pt-1 mb-1 sm:mb-0 shrink-0">
          {date}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-mono text-base sm:text-xl leading-snug">
            <Link
              href={`/articles/${slug}`}
              className="hover:text-accent transition-colors wrap-break-word"
            >
              {title}
            </Link>
          </h3>

          {/* Tags + reading time — wrap freely */}
          {(tags?.length || readingTime) && (
            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5">
              {tags?.map((t) => (
                <Tag key={t} label={t} />
              ))}
              {readingTime && (
                <span className="font-mono text-xs text-text-muted">
                  {readingTime}
                </span>
              )}
            </div>
          )}
        </div>

      </div>
    </article>
  );
}