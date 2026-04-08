/**
 * Math wrapper — preserves KaTeX markup in MDX. KaTeX stylesheet should be loaded globally
 * by the consumer when rendering math-enabled articles.
 */
export default function Math({ children }: { children: React.ReactNode }) {
  return <span className="math">{children}</span>;
}
