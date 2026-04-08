/**
 * Minimal footer.
 */
export default function Footer() {
  return (
    <footer className="py-10 text-sm text-text-faint">
      <div className="flex items-center justify-between">
        <div className="font-mono">© {new Date().getFullYear()} Cyriacus</div>
        <div>—</div>
      </div>
    </footer>
  );
}
