// app/layout.tsx
import Link from 'next/link';
import './globals.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Verkefni 5</title>
      </head>
      <body>
        <header>
          <h1>Verkefni 5</h1>
          <nav>
            <Link href="/">Home</Link> | <Link href="/news">Articles</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>&copy; Verkefni unnið af Ólafi Marel Árnasyni, 2025.</p>
        </footer>
      </body>
    </html>
  );
}
