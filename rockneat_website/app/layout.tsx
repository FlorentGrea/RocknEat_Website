import Link from 'next/link';
import './globals.css';
import Image from 'next/image'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <div>
            <Link href="/">
              <Image 
                src="/Rockneat_img.webp"
                width={200}
                height={200}
                alt="Home"
              />
            </Link>
          </div>
          <nav>
            <Link href="/">
              Programmation
            </Link>
            <Link href="/Billeterie">
              Billeterie
            </Link>
            <Link href="/Carte">
              Carte
            </Link>
            <Link href="/Photos">
              Photos
            </Link>
            <Link href="/Infos">
              Infos & Booking
            </Link>
          </nav>
          {children}
        </main>
      </body>
    </html>
  )
}