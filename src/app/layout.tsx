import type { Metadata } from "next";
import { IBM_Plex_Mono, Spectral } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import Script from "next/script";
import Nav from "../components/ui/nav";
import Footer from "../components/ui/footer";

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const serif = Spectral({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Cyriacus' Mind",
  description: "Writing on systems, TinyML, robotics, and technical thinking.",
};

/**
 * Root layout for the site. Loads fonts and provides the global nav/footer.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${mono.variable} ${serif.variable} h-full antialiased`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <meta name="theme-color" content="#ffffff" />
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: `(function() {
            try {
              const stored = localStorage.getItem('theme');
              const theme = stored || 'light';
              document.documentElement.setAttribute('data-theme', theme);
            } catch (e) {}
          })();` }}
        />
      </head>
      <body className="min-h-screen bg-bg text-text-primary">
        <div className="mx-auto flex min-h-screen w-full max-w-275 flex-col px-6">
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
