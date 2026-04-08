import Link from "next/link";

/**
 * Home page — short, direct introduction and links to articles.
 */
export default function Home() {
  return (
    <section className="py-20">
      <div className="mx-auto" style={{ maxWidth: 720 }}>
        <h1 className="font-mono text-4xl leading-tight">I write about systems, code, and machines.</h1>
        <p className="mt-6 font-serif text-lg leading-8 text-text-muted">
          I am Cyriacus — an electrical engineering student. This site is a public record
          of what I build and think about: TinyML on microcontrollers, control theory,
          and software systems for real problems.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/articles"
            className="inline-block rounded-sm border border-bg-border px-4 py-2 font-mono text-sm text-text-primary hover:text-accent"
          >
            Read articles
          </Link>
        </div>

        <div className="mt-12 border-t border-bg-border pt-8 text-sm text-text-faint">
          <strong className="font-mono">Currently</strong>
          <ul className="mt-3 ml-4 list-disc">
            <li>Building EKAM — an AI BI platform for creators.</li>
            <li>Research on TinyML model quantization for low-power MCUs.</li>
            <li>Thinking about swarm aerial robotics and distributed control.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
