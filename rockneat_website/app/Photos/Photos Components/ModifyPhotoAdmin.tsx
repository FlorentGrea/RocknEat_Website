import SubmitButtonPhoto from "./SubmitButtonPhoto";
import { revalidatePath } from "next/cache";
import { PhotoData } from "../../types";
import PocketBase from 'pocketbase';
import Image from "next/image";


interface OnePhotoProps {
    photosDb: PhotoData[]
    displayedPhoto: PhotoData
    id: string
}

export default function ModifyPhotoAdmin({ photosDb, displayedPhoto, id }: OnePhotoProps) {
    let maxOrder = 0;
    
    photosDb.map((photo) => {
        if (photo.type == displayedPhoto.type && photo.order > maxOrder)
            maxOrder = photo.order
    })

    async function mooveUp () {
        'use server'

        const pb = new PocketBase(process.env.DB_ADDR);
        
        for (let index = 0; photosDb[index]; index++) {
            if (photosDb[index].type == displayedPhoto.type) {
                if (photosDb[index].order == displayedPhoto.order - 1)
                    photosDb[index].order = displayedPhoto.order
                else if (photosDb[index].order == displayedPhoto.order) 
                    photosDb[index].order = displayedPhoto.order - 1
            }
        }
        const post_data = {
            "json_name": 'photosData',
            "json_file": JSON.stringify(photosDb)
        }
        await pb.collection('Jsons').update('hpvt7kkx079szsb', post_data);
        revalidatePath("/Photos");
    }

    async function mooveDown() {
        'use server'

        const pb = new PocketBase(process.env.DB_ADDR);
        
        for (let index = 0; photosDb[index]; index++) {
            if (photosDb[index].type == displayedPhoto.type) {
                if (photosDb[index].order == displayedPhoto.order + 1)
                    photosDb[index].order = displayedPhoto.order
                else if (photosDb[index].order == displayedPhoto.order) 
                    photosDb[index].order = displayedPhoto.order + 1
            }
        }
        const post_data = {
            "json_name": 'photosData',
            "json_file": JSON.stringify(photosDb)
        }
        await pb.collection('Jsons').update('hpvt7kkx079szsb', post_data);
        revalidatePath("/Photos");
    }

    async function deleteImage() {
        'use server'

        const pb = new PocketBase(process.env.DB_ADDR);
        
        await pb.collection('Photos').update(id, {
            'Images-': [displayedPhoto.src],
        });
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
        const post_data = {
            "json_name": 'photosData',
            "json_file": JSON.stringify(newData)
        }
        await pb.collection('Jsons').update('hpvt7kkx079szsb', post_data);
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