'use client'

import Link from "next/link"
import { usePathname } from 'next/navigation'

export default function Nav () {
    const currentRoute = usePathname()
    const navlinkStyle = 'block px-3 text-white hover:text-red-500'
    const activeStyle = navlinkStyle + ' text-red-500'
    const nonActiveStyle = navlinkStyle

    return (
        <nav className="bg-black sticky w-full top-0 border-b border-gray-600">
            <div className="sm:hidden">
                <ul className="flex flex-row justify-center p-2 mt-4 font-medium sm:space-x-8 sm:mt-0">
                    <li>
                        <Link href="/#Nav" id="Home" className={currentRoute === '/' ? activeStyle : nonActiveStyle}>
                            girafe
                        </Link>
                    </li>
                    <li>
                        <Link href="/Billeterie#Nav" className={currentRoute === '/Billeterie' ? activeStyle : nonActiveStyle}>
                            lapin
                        </Link>
                    </li>
                    <li>
                        <Link href="/Carte#Nav" className={currentRoute === '/Carte' ? activeStyle : nonActiveStyle}>
                            Cadillac
                        </Link>
                    </li>
                    <li>
                        <Link href="/Photos#Nav" className={currentRoute === '/Photos' ? activeStyle : nonActiveStyle}>
                            danse
                        </Link>
                    </li>
                    <li>
                        <Link href="/Infos#Nav" className={currentRoute === '/Infos' ? activeStyle : nonActiveStyle}>
                            petit pingouin
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="justify-center  hidden sm:flex">
                <ul className="flex flex-row p-2 mt-4 font-medium sm:space-x-8 sm:mt-0">
                    <li>
                        <Link href="/#Nav" id="Home" className={currentRoute === '/' ? activeStyle : nonActiveStyle}>
                            Programmation
                        </Link>
                    </li>
                    <li>
                        <Link href="/Billeterie#Nav" className={currentRoute === '/Billeterie' ? activeStyle : nonActiveStyle}>
                            Billeterie
                        </Link>
                    </li>
                    <li>
                        <Link href="/Carte#Nav" className={currentRoute === '/Carte' ? activeStyle : nonActiveStyle}>
                            Carte
                        </Link>
                    </li>
                    <li>
                        <Link href="/Photos#Nav" className={currentRoute === '/Photos' ? activeStyle : nonActiveStyle}>
                            Photos
                        </Link>
                    </li>
                    <li>
                        <Link href="/Infos#Nav" className={currentRoute === '/Infos' ? activeStyle : nonActiveStyle}>
                            Infos & Booking
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

//<nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
//  <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
//    <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//      <li>
//        <a href="#" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
//      </li>
//      <li>
//        <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
//      </li>
//      <li>
//        <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
//      </li>
//      <li>
//        <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
//      </li>
//    </ul>
//  </div>
//</nav>

//<Link href="/#Nav">
//Programmation
//</Link>
//<Link href="/Billeterie#Nav" className="">
//Billeterie
//</Link>
//<Link href="/Carte#Nav">
//Carte
//</Link>
//<Link href="/Photos#Nav" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
//Photos
//</Link>
//<Link href="/Infos#Nav">
//Infos & Booking
//</Link>