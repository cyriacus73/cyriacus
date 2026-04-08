/**
 * Simple Figure component with caption.
 */
import Image from "next/image";
export default function Figure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt?: string;
  caption?: string;
}) {
  return (
    <figure className="my-6">
      {/* next/image could be used with dimensions; keep simple for now */}
      <Image src={src} alt={alt || ""} width={800} height={600} className="w-full" />
      {caption && <figcaption className="mt-2 text-sm text-text-faint">{caption}</figcaption>}
    </figure>
  );
}
