import type { Metadata } from "next";
import { IBM_Plex_Mono, Spectral } from "next/font/google";
import "./globals.css";
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
  title: "Cyriacus — Notes and essays",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const stored = localStorage.getItem('theme');
                const theme = stored || 'dark';
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
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
