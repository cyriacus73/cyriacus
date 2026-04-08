/**
 * Simple CodeBlock for MDX. Syntax highlighting can be added later.
 */
export default function CodeBlock({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang?: string;
}) {
  return (
    <pre className="my-4 overflow-auto rounded-none border border-bg-border bg-black/60 p-4 text-sm">
      <code className={`language-${lang}`}>{children}</code>
    </pre>
  );
}
