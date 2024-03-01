'use client'

import Link from 'next/link';

interface SmoothScrollProps {
    children: React.ReactNode,
    href: string
}

export default function SmoothScroll({ children, href }: SmoothScrollProps) {

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()

        const href = e.currentTarget.href
        const targetId = href.replace(/.*\#/, "")
        const elem = document.getElementById(targetId)

        elem?.scrollIntoView({
            behavior: "smooth",
        })
    }

    return (
        <Link href={href} onClick={handleScroll}>
            {children}
        </Link>
    )
}