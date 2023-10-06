import './globals.css';
import Header from './components/server components/Header';
import Nav from './components/client components/Nav';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Nav />
        <main id="Nav">
          {children}
        </main>
      </body>
    </html>
  )
}