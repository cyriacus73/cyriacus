/**
 * Small tag component — displays a tag label in the amber accent.
 */
export default function Tag({ label }: { label: string }) {
  return (
    <span className="inline-block font-mono text-xs text-accent px-2 py-0.5">{label}</span>
  );
}
