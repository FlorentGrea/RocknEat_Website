import Link from "next/link"
import Image from "next/image"

export default function Header () {

    return (
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
    )
}