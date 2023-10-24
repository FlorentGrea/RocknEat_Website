import './globals.css';
import Head from 'next/head';
import Header from './components/server components/Header';
import Nav from './components/client components/Nav';

export const metadata = {
  title: "Rock n'Eat Live",
  link: "/favicon.ico"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <title>Rock n'Eat Live</title>
        <meta
          name="Rock n'Eat Live"
          content="Salle de concert rock" 
        />
        <link rel="icon" href="/Rockneat_img.webp" />
      </Head>
      <body>
        <Header />
        <Nav />
        <main id="Nav" className='max-w-80 lg:max-w-60 m-auto'>
          {children}
        </main>
      </body>
    </html>
  )
}