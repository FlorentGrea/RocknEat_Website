import Link from "next/link"
import Image from "next/image"

export default function Header () {

    return (
        <header className="h-20v">
            <Link href="/">
                <Image
                    src="/Rockneat_img.webp"
                    width={445}
                    height={495}
                    alt="Home"
                    className="h-20v mt-4 object-contain m-auto"
                />
            </Link>
        </header>
    )
}