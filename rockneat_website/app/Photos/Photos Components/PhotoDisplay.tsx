import Image from "next/image"
import { PhotoData } from "../../types"
import { getSession } from "@auth0/nextjs-auth0";
import ModifyPhotoAdmin from "./ModifyPhotoAdmin";

interface PhotoDisplayProps {
    photosDb: PhotoData[]
    photosList: PhotoData[]
}

export default async function PhotoDisplay ({ photosDb, photosList }: PhotoDisplayProps) {
    const session = await getSession();
    const user = session?.user;

    return (
        <div className='flex flex-wrap justify-evenly'>
            <div className='columns-1 md:columns-2 lg:columns-3 break-inside-auto gap-1 w-full'>
                {photosList.map((photo: PhotoData) => {

                    return (
                        <div key={photo.order} className="relative break-inside-avoid w-full mb-2 md:max-h-96 bg-black/70 p-1">
                            { user && <ModifyPhotoAdmin photosDb={photosDb} displayedPhoto={photo} /> }
                            <Image
                                src={'/'+ photo.type + '/' + photo.src}
                                width={1500}
                                height={1500}
                                alt={photo.type}
                                className="w-full object-cover md:max-h-[23rem]"
                            />
                        </div>
                )})}
            </div>
        </div>
    )
}