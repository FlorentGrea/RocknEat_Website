import './globals.css';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Nav from './Nav';

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
      <body className='relative min-h-[99vh] pb-14'>
        <header className="h-24 md:h-40">
          <Link href="/">
              <Image
                  src="/Rockneat_img.webp"
                  width={445}
                  height={495}
                  alt="Home"
                  className="h-24 md:h-40 my-3 object-contain m-auto"
              />
          </Link>
        </header>
        <Nav />
        <main className='w-[90%] lg:w-[80%] xl:w-[70%] 2xl:w-[60%] z-10 m-auto'>
            {children}
        </main>
        <footer className='absolute w-full justify-center bottom-0 m-auto text-center'>
          <hr className='w-[90%] sm:w-[73%] lg:w-[48%] mt-6 m-auto border border-red-b' />
          <p className='py-2'>Site créé par <a href="https://www.linkedin.com/in/florent-grea-3a9b13137/" target='_blank'>Florent Gréa</a></p>
        </footer>
      </body>
    </html>
  )
}