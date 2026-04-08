/**
 * Callout block for MDX content.
 */
export default function Callout({
  type = "note",
  children,
}: {
  type?: "note" | "warning" | "insight";
  children: React.ReactNode;
}) {
  return (
    <div className="my-6 rounded-none border-l-4 border-bg-border bg-bg-surface px-4 py-3">
      <div className="font-mono text-sm font-semibold">{type.toUpperCase()}</div>
      <div className="mt-2">{children}</div>
    </div>
  );
}
