import Image from "next/image"
import { PhotoData } from "../types"

interface PhotoDisplayProps {
    Photos: PhotoData
}

export default function PhotoDisplay ({ Photos }: PhotoDisplayProps) {
    const FirstCol: string[] = []
    const SecondCol: string[] = []
    const ThirdCol: string[] = []

    Photos?.img_saved?.map((photo: string) => {
        if (Photos?.img_saved.indexOf(photo) % 3 == 0)
            FirstCol.push(photo)
        else if (Photos?.img_saved.indexOf(photo) % 3 == 1)
            SecondCol.push(photo)
        else
            ThirdCol.push(photo)
    })

    return (
        <div className='flex flex-wrap justify-evenly'>
            <div className='columns-1 md:columns-2 lg:columns-3 gap-1 w-full'>
                {Photos?.img_saved?.map((photo: string) => {

                    return (
                        <div key={photo} className="w-full mb-2 md:max-h-96 overflow-hidden bg-black/70 p-1">
                            <Image
                                src={'https://rockneatdb.pockethost.io/api/files/'+ Photos.collectionId + '/' + Photos.id + '/' + photo}
                                width={1500}
                                height={1500}
                                alt={Photos.Type}
                                className="w-full object-contain"
                            />
                        </div>
                )})}
            </div>
        </div>
    )
}