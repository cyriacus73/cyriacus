import Link from "next/link";
import ThemeToggle from "./theme-toggle";

/**
 * Site navigation bar.
 *
 * Props: none.
 */
export default function Nav() {
  return (
    <header className="flex items-center justify-between py-6">
      <div>
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight text-text-primary">
          Cyriacus
        </Link>
      </div>
      <nav>
        <ul className="flex gap-6 items-center">
          <li>
            <Link href="/contact" className="font-mono text-sm text-text-muted hover:text-accent">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/articles" className="font-mono text-sm text-text-muted hover:text-accent">
              Articles
            </Link>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
