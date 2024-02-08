import SubmitButtonPhoto from "./SubmitButtonPhoto";
import { revalidatePath } from "next/cache";
import { PhotoData } from "../../types";
import { promises as fs } from "fs";
import Image from "next/image";
import path from "path";

interface OnePhotoProps {
    photosDb: PhotoData[]
    displayedPhoto: PhotoData
}

export default function ModifyPhotoAdmin({ photosDb, displayedPhoto }: OnePhotoProps) {
    const actual_path = path.join(process.cwd(), 'json')
    let maxOrder = 0;
    
    photosDb.map((photo) => {
        if (photo.type == displayedPhoto.type && photo.order > maxOrder)
            maxOrder = photo.order
    })

    async function mooveUp () {
        'use server'
        
        for (let index = 0; photosDb[index]; index++) {
            if (photosDb[index].type == displayedPhoto.type) {
                if (photosDb[index].order == displayedPhoto.order - 1)
                    photosDb[index].order = displayedPhoto.order
                else if (photosDb[index].order == displayedPhoto.order) 
                    photosDb[index].order = displayedPhoto.order - 1
            }
        }
        await fs.writeFile(actual_path + '/photosData.json', JSON.stringify(photosDb))
        revalidatePath("/Photos");
    }

    async function mooveDown() {
        'use server'

        for (let index = 0; photosDb[index]; index++) {
            if (photosDb[index].type == displayedPhoto.type) {
                if (photosDb[index].order == displayedPhoto.order + 1)
                    photosDb[index].order = displayedPhoto.order
                else if (photosDb[index].order == displayedPhoto.order) 
                    photosDb[index].order = displayedPhoto.order + 1
            }
        }
        await fs.writeFile(actual_path + '/photosData.json', JSON.stringify(photosDb))
        revalidatePath("/Photos");
    }

    async function deleteImage() {
        'use server'

        const order = displayedPhoto.order
        for (let index = 0; photosDb[index]; index++) {
            if (photosDb[index].type == displayedPhoto.type)
                if (photosDb[index].src == displayedPhoto.src) {
                    delete photosDb[index]
                }
                else if (photosDb[index].order > order)
                    photosDb[index].order--
        }
        let newData = photosDb
        newData = newData.filter(( element ) => {
            return element !== undefined;
        });
        await fs.unlink('/' + displayedPhoto.type + '/' + displayedPhoto.src);
        await fs.writeFile(actual_path + '/photosData.json', JSON.stringify(newData))
        revalidatePath("/Photos");
    }
    
    return (
        <div>
            <div className="absolute top-0 left-0 p-2">
                <div>
                    { (displayedPhoto.order != 0) &&
                        <form action={mooveUp}>
                            <input className="hidden"/>
                            <SubmitButtonPhoto html={
                                <Image
                                    src="/up.svg"
                                    width={40}
                                    height={40}
                                    alt="Mail"
                                    className="object-contain h-7 w-7 filter-white"
                                />}
                            />
                        </form>
                    }
                    { (displayedPhoto.order != maxOrder) &&
                        <form action={mooveDown}>
                            <input className="hidden"/>
                            <SubmitButtonPhoto html={
                                <Image
                                    src="/down.svg"
                                    width={40}
                                    height={40}
                                    alt="Mail"
                                    className="object-contain h-7 w-7 filter-white"
                                />}
                            />
                        </form>
                    }
                </div>
            </div>
            <form action={deleteImage} className="absolute bottom-1 left-1/4 w-1/2 text-center p-1 ">
                <input className="hidden"/>
                <SubmitButtonPhoto html={<p className="my-1 mx-2">supprimer la photo</p>} />
            </form>
        </div>
    )
}