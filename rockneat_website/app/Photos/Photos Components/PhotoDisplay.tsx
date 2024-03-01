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
    let id = ''
    
    if (photosList[0].type == 'lieu')
        id = 'q5bfart0si6hlyl'
    else if (photosList[0].type == 'concert')
        id = 'j81c25iij9uicny'
    else if (photosList[0].type == 'affiche')
        id = 'cc12szu6cisrejt'

    return (
        <div className='flex flex-wrap justify-evenly'>
            <div className='columns-1 md:columns-2 lg:columns-3 break-inside-auto gap-1 w-full'>
                {photosList.map((photo: PhotoData) => {

                    return (
                        <div key={photo.order} className={`relative break-inside-avoid w-full mb-2 md:max-h-96 bg-black bg-gradient-to-tl from-red/20 via-black to-black shadow-sm shadow-black/30 p-[2px] animate-slide-bottom-d${photo.order % 5 + 1}`}>
                            { user && <ModifyPhotoAdmin photosDb={photosDb} displayedPhoto={photo} id={id} /> }
                            <Image
                                src={process.env.DB_ADDR + 'api/files/Photos/' + id + '/' + photo.src}
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