import './globals.css';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Nav from './Nav';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export const metadata = {
  title: "Rock n'Eat Live",
  link: "/favicon.ico"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <html lang="en" className="">
      <Head>
        <title>Rock n&apos;Eat Live</title>
        <meta
          name="Rock n'Eat Live"
          content="Salle de concert rock" 
        />
      </Head>
      <UserProvider>
        <body className="relative min-h-[100vh] pb-14 bg-[url('/bg.jpg')] bg-fixed bg-cover bg-top bg-white/10">
          <header className="relative h-20 md:h-28 lg:h-36 w-[90%] lg:w-[80%] 2xl:w-[70%] m-auto flex flex-row justify-end">
            <Link href="/" className='absolute top-[10%] md:top-[15%] left-[-1%] lg:left-[-4%] 2xl:left-[-8%] w-[25vw] min-[425px]:w-[19vw] sm:w-[16vw] lg:w-[12vw] 2xl:w-[10vw] z-50'>
                <Image
                    src="/Rockneat_img.webp"
                    width={445}
                    height={495}
                    alt="Home"
                    className="object-contain m-auto"
                />
            </Link>
            <Nav />
          </header>
          <main className='w-[90%] lg:w-[80%] 2xl:w-[70%] z-10 m-auto'>
              {children}
          </main>
          <footer className='absolute w-full justify-center bottom-0 m-auto text-center'>
            <hr className='w-[90%] sm:w-[73%] lg:w-[48%] mt-6 m-auto border border-red-b' />
            <p className='py-2'>Site créé par <a href="https://www.linkedin.com/in/florent-grea-3a9b13137/" target='_blank'>Florent Gréa</a></p>
          </footer>
        </body>
      </UserProvider>
    </html>
  )
}