'use client'

import Link from "next/link"
import Image from "next/image"
import { usePathname } from 'next/navigation'

export default function Nav () {
    const currentRoute = usePathname()

    const navTextStyle = 'block px-3 hover:text-red '
    const activeTextStyle = navTextStyle + 'text-red'
    const nonActiveTextStyle = navTextStyle + 'text-white'

    const navIconStyle = "object-contain m-auto "
    const activeIconStyle = navIconStyle + 'filter-red'
    const nonActiveIconStyle = navIconStyle + 'filter-white'

    return (
        <nav className= "bg-black sticky w-full top-0 border-b border-gray-600">
            <div className="sm:hidden">
                <ul className="flex flex-row justify-center p-2 mt-4 font-medium sm:space-x-8 sm:mt-0">
                    <li>
                        <Link href="/#Nav" className="block px-3">
                            <Image
                                src="/calendar.svg"
                                width={25}
                                height={25}
                                alt="Programation"
                                className={currentRoute === '/' ? activeIconStyle : nonActiveIconStyle}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link href="/Billeterie#Nav" className="block px-3">
                            <Image
                                src="/ticket.svg"
                                width={25}
                                height={25}
                                alt="Billeterie"
                                className={currentRoute === '/Billeterie' ? activeIconStyle : nonActiveIconStyle}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link href="/Carte#Nav" className="block px-3">
                            <Image
                                src="/burger.svg"
                                width={25}
                                height={25}
                                alt="Carte"
                                className={currentRoute === '/Carte' ? activeIconStyle : nonActiveIconStyle}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link href="/Photos#Nav" className="block px-3">
                            <Image
                                src="/photo.svg"
                                width={25}
                                height={25}
                                alt="Photos"
                                className={currentRoute === '/Photos' ? activeIconStyle : nonActiveIconStyle}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link href="/Infos#Nav" className="block px-3">
                            <Image
                                src="/info.svg"
                                width={25}
                                height={25}
                                alt="Infos & Booking"
                                className={currentRoute === '/Infos' ? activeIconStyle : nonActiveIconStyle}
                            />
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="justify-center  hidden sm:flex">
                <ul className="flex flex-row p-2 mt-4 font-medium sm:space-x-8 sm:mt-0">
                    <li>
                        <Link href="/#Nav" id="Home" className={currentRoute === '/' ? activeTextStyle : nonActiveTextStyle}>
                            Programmation
                        </Link>
                    </li>
                    <li>
                        <Link href="/Billeterie#Nav" className={currentRoute === '/Billeterie' ? activeTextStyle : nonActiveTextStyle}>
                            Billeterie
                        </Link>
                    </li>
                    <li>
                        <Link href="/Carte#Nav" className={currentRoute === '/Carte' ? activeTextStyle : nonActiveTextStyle}>
                            Carte
                        </Link>
                    </li>
                    <li>
                        <Link href="/Photos#Nav" className={currentRoute === '/Photos' ? activeTextStyle : nonActiveTextStyle}>
                            Photos
                        </Link>
                    </li>
                    <li>
                        <Link href="/Infos#Nav" className={currentRoute === '/Infos' ? activeTextStyle : nonActiveTextStyle}>
                            Infos & Booking
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}