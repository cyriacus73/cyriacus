import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <div className="py-12">
        <h1 className="font-mono text-4xl font-semibold tracking-tight text-text-primary mb-8">
          Contact
        </h1>
        
        <div className="space-y-6">
          <div>
            <p className="font-mono text-sm text-text-muted mb-2">Email</p>
            <a
              href="mailto:cicada42@duck.com"
              className="text-text-primary hover:text-accent font-mono text-base transition-colors"
            >
               cicada42@duck.com
            </a>
          </div>

          <div>
            <p className="font-mono text-sm text-text-muted mb-2">GitHub</p>
            <a
              href="https://github.com/cyriacus73"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-primary hover:text-accent font-mono text-base transition-colors"
            >
              github.com/cyriacus73
            </a>
          </div>

          <div>
            <p className="font-mono text-sm text-text-muted mb-2">X</p>
            <a
              href="https://x.com/cyriacus73"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-primary hover:text-accent font-mono text-base transition-colors"
            >
              @cyriacus73
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
