'use client'

import Link from "next/link"
import Image from "next/image"
import { usePathname } from 'next/navigation'
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Nav () {
    const { user, error, isLoading } = useUser();
    const currentRoute = usePathname()

    const navTextStyle = 'block md:px-3 hover:text-red '
    const activeTextStyle = navTextStyle + 'text-red'
    const nonActiveTextStyle = navTextStyle + 'text-white'

    const navIconStyle = "object-contain m-auto "
    const activeIconStyle = navIconStyle + 'filter-red'
    const nonActiveIconStyle = navIconStyle + 'filter-white'

    return (
        <nav className="flex justify-end overflow-hidden top-0">
            <div className="xl:hidden flex flex-col justify-end">
                <ul className="flex flex-row w-fit p-2 justify-end font-medium sm:space-x-2 sm:mt-0">
                    <li>
                        <Link href="/Programmation" className="block px-1 sm:px-2 md:px-3">
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
                        <Link href="/Carte" className="block px-1 md:px-3">
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
                        <Link href="/Photos" className="block px-1 md:px-3">
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
                        <Link href="/Infos" className="block px-1 md:px-3">
                            <Image
                                src="/info.svg"
                                width={25}
                                height={25}
                                alt="Infos & Booking"
                                className={currentRoute === '/Infos' ? activeIconStyle : nonActiveIconStyle}
                            />
                        </Link>
                    </li>
                    <li>    
                        <a href="https://web.digitick.com/index-css5-rockneat-pg1.html" target="_blank" className="block px-1 md:px-3">
                            <Image
                                src="/ticket.svg"
                                width={25}
                                height={25}
                                alt="Administration"
                                className={`${nonActiveIconStyle}`}
                            />
                        </a>
                    </li>
                    {user && (
                    <li>    
                        <a href="/api/auth/logout" className="block px-1 md:px-3">
                            <Image
                                src="/logout.svg"
                                width={22}
                                height={22}
                                alt="Administration"
                                className={`mt-[2px] ${nonActiveIconStyle}`}
                            />
                        </a>
                    </li>
                    )}
                </ul>
            </div>
            <div className="hidden xl:flex flex-col justify-end">
                <ul className="flex flex-row p-2 mt-4 text-lg font-bold sm:space-x-2 sm:mt-0">
                    <li>
                        <Link href="/Programmation" id="Home" className={currentRoute === '/Programmation' ? activeTextStyle : nonActiveTextStyle}>
                            PROGRAMMATION
                        </Link>
                    </li>
                    <li>
                        <Link href="/Carte" className={currentRoute === '/Carte' ? activeTextStyle : nonActiveTextStyle}>
                            CARTE
                        </Link>
                    </li>
                    <li>
                        <Link href="/Photos" className={currentRoute === '/Photos' ? activeTextStyle : nonActiveTextStyle}>
                            PHOTOS
                        </Link>
                    </li>
                    <li>
                        <Link href="/Infos" className={currentRoute === '/Infos' ? activeTextStyle : nonActiveTextStyle}>
                            INFOS & BOOKING
                        </Link>
                    </li>
                    <li>
                        <a href="https://web.digitick.com/index-css5-rockneat-pg1.html" target="_blank" className={nonActiveTextStyle}>
                            BILLETERIE
                        </a>
                    </li>
                    {user && (
                    <li>
                        <a href="/api/auth/logout" className={nonActiveTextStyle}>
                            DÉCONNEXION
                        </a>
                    </li>
                    )}
                </ul>
            </div>
        </nav>
    )
}