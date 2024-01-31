'use client'

import Link from "next/link"
import Image from "next/image"
import { usePathname } from 'next/navigation'
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Nav () {
    const { user, error, isLoading } = useUser();
    const currentRoute = usePathname()

    const navTextStyle = 'block px-3 hover:text-red '
    const activeTextStyle = navTextStyle + 'text-red'
    const nonActiveTextStyle = navTextStyle + 'text-white'

    const navIconStyle = "object-contain m-auto "
    const activeIconStyle = navIconStyle + 'filter-red'
    const nonActiveIconStyle = navIconStyle + 'filter-white'

    return (
        <nav className="sticky w-[90%] lg:w-[60%] z-50 overflow-hidden m-auto top-0 backdrop-blur-sm">
            <div className="md:hidden">
                <ul className="flex flex-row justify-center p-2 font-medium space-x-2 sm:space-x-8 sm:mt-0">
                    <li>
                        <Link href="/Programmation" className="block px-3">
                            <Image
                                src="/calendar.svg"
                                width={25}
                                height={25}
                                alt="Programation"
                                className={currentRoute === '/Programmation' ? activeIconStyle : nonActiveIconStyle}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link href="/Carte" className="block px-3">
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
                        <Link href="/Photos" className="block px-3">
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
                        <Link href="/Infos" className="block px-3">
                            <Image
                                src="/info.svg"
                                width={25}
                                height={25}
                                alt="Infos & Booking"
                                className={currentRoute === '/Infos' ? activeIconStyle : nonActiveIconStyle}
                            />
                        </Link>
                    </li>
                    {user && (
                    <li>    
                        <a href="/api/auth/logout" className="block px-3">
                            <Image
                                src="/logout.svg"
                                width={25}
                                height={25}
                                alt="Administration"
                                className={nonActiveIconStyle}
                            />
                        </a>
                    </li>
                    )}
                </ul>
            </div>
            <div className="justify-center hidden md:flex">
                <ul className="flex flex-row p-2 mt-4 font-medium sm:space-x-8 sm:mt-0">
                    <li>
                        <Link href="/Programmation" id="Home" className={currentRoute === '/Programmation' ? activeTextStyle : nonActiveTextStyle}>
                            Programmation
                        </Link>
                    </li>
                    <li>
                        <Link href="/Carte" className={currentRoute === '/Carte' ? activeTextStyle : nonActiveTextStyle}>
                            Carte
                        </Link>
                    </li>
                    <li>
                        <Link href="/Photos" className={currentRoute === '/Photos' ? activeTextStyle : nonActiveTextStyle}>
                            Photos
                        </Link>
                    </li>
                    <li>
                        <Link href="/Infos" className={currentRoute === '/Infos' ? activeTextStyle : nonActiveTextStyle}>
                            Infos & Booking
                        </Link>
                    </li>
                    {user && (
                    <li>
                        <a href="/api/auth/logout" className={nonActiveTextStyle}>
                            Déconnection
                        </a>
                    </li>
                    )}
                </ul>
            </div>
            <hr className='w-full sm:w-4/5 m-auto border border-red-b' />
        </nav>
    )
}