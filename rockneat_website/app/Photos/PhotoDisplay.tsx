import Image from "next/image"
import { PhotoData } from "../types"

interface PhotoDisplayProps {
    Photos: PhotoData[]
}

export default function PhotoDisplay ({ Photos }: PhotoDisplayProps) {

    return (
        <div className='flex flex-wrap justify-evenly'>
            <div className='columns-1 md:columns-2 lg:columns-3 gap-1 w-full'>
                {Photos.map((photo: PhotoData) => {
                    return (
                        <div key={photo.id} className="w-full mb-2 md:max-h-96 overflow-hidden bg-black/70 p-1">
                            <Image
                                src={'https://rockneatdb.pockethost.io/api/files/'+ photo.collectionId + '/' + photo.id + '/' + photo.Image}
                                width={1500}
                                height={1500}
                                alt={photo.Type}
                                className="w-full object-contain"
                            />
                        </div>
                )})}
            </div>
        </div>
    )
}