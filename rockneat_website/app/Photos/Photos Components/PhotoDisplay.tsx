import Image from "next/image"
import { PhotoData, PhotoList } from "../../types"

interface PhotoDisplayProps {
    photosDb: PhotoList[]
    index: number
}

export default async function PhotoDisplay ({ photosDb, index }: PhotoDisplayProps) {
    let slide = 1

    return (
        <div className='flex flex-wrap justify-evenly'>
            <div className='columns-1 md:columns-2 lg:columns-3 break-inside-auto gap-1 w-full'>
                {photosDb[index].photos.map((photo: PhotoData) => {

                    return (
                        <div key={photo.id} className={`relative break-inside-avoid w-full mb-2 md:max-h-96 bg-black bg-gradient-to-tl from-red/20 via-black to-black shadow-sm shadow-black/30 p-[2px] animate-slide-bottom-d${slide++ % 5 + 1}`}>
                            <Image
                                src={process.env.DB_ADDR + 'api/files/Photos/' + photo.p_id + '/' + photo.src}
                                width={1500}
                                height={1500}
                                alt='coucou'
                                className="w-full object-cover md:max-h-[23rem]"
                            />
                        </div>
                )})}
            </div>
        </div>
    )
}