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
    <html lang="en" className="bg-[url('/bgtest.webp')] bg-fixed bg-cover bg-top">
      <Head>
        <title>Rock n'Eat Live</title>
        <meta
          name="Rock n'Eat Live"
          content="Salle de concert rock" 
        />
        <link rel="icon" href="/Rockneat_img.webp"/>
      </Head>
      <body>
        <Header />
        <Nav />
        <main className='max-w-80 z-10 lg:max-w-60 m-auto'>
            {children}
        </main>
      </body>
    </html>
  )
}