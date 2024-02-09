import SubmitButtonPhoto from "./SubmitButtonPhoto";
import { revalidatePath } from "next/cache";
import { PhotoData } from "../../types";
import PocketBase, { RecordModel } from 'pocketbase';
import { promises as fs } from "fs";
import path from "path";

interface PhotoDisplayProps {
    photosDb: PhotoData[]
}

export default function AddPhotosAdmin({ photosDb }: PhotoDisplayProps) {

    function getMaxOrder(photosDb: PhotoData[], Type: string) {
        let maxOrder = 0;

        photosDb.map((photo) => {
            if (photo.type == Type)
                maxOrder++;
        })
        return maxOrder
    }

    const lieuxMaxOrder = getMaxOrder(photosDb, 'lieu')
    const concertsMaxOrder = getMaxOrder(photosDb, 'concert')
    const affichesMaxOrder = getMaxOrder(photosDb, 'affiche')

    async function addPhotos(formData: FormData) {
        'use server'

        const pb = new PocketBase(process.env.DB_ADDR);
        const newData = photosDb
        const type = formData.get("type") as string
        let ordre = Number(formData.get(type))
        const Image_array = Array.from(formData.getAll("ImageInput"))

        const postForm = new FormData
        for (const image of Image_array) {
            postForm.append('Images', image as File)
        }
        let record: any = []

        if (type == 'lieu')
            record = await pb.collection('Photos').update('q5bfart0si6hlyl', postForm);
        else if (type == 'concert')
            record = await pb.collection('Photos').update('j81c25iij9uicny', postForm);
        else if (type == 'affiche')
            record = await pb.collection('Photos').update('cc12szu6cisrejt', postForm);


        for (const image of record.Images) {
            let exist = 0
            newData.map((db_img: any) => {
                if (db_img.src == image)
                    exist = 1
            })
            if (!exist) {
                const data = {
                    type: type,
                    order: ordre++,
                    src: image
                }
                newData.push(data)
            }
        }
        const post_data = {
            "json_name": 'photosData',
            "json_file": JSON.stringify(newData)
        }
        await pb.collection('Jsons').update('hpvt7kkx079szsb', post_data);
        //for (const image of Image_array) {
        //    const data = {
        //        type: type,
        //        order: ordre++,
        //        src: (image as File).name
        //    }
        //    newData.push(data)
        //    const bytes = await (image as File).arrayBuffer()
        //    const buffer = Buffer.from(bytes)
        //    await fs.writeFile('/' + data.type + '/' + data.src, buffer)
        //}
        //const actual_path = path.join(process.cwd(), 'json')
        //await fs.writeFile(actual_path + '/photosData.json', JSON.stringify(newData));
        //revalidatePath("/Photos")
    }
    
    return (
        <div>
            <h2 className='text-xl font-bold text-center py-4'>Ajouter des photos</h2>
            <form action={addPhotos}  className="flex flex-col bg-black/70 sm:w-3/4 lg:w-2/4 m-auto">
                <div className="flex flex-row justify-center">
                    <select name="type" required className="bg-black shadow shadow-red-b border-0 m-3 focus:ring-red-b focus:outline-none">
                        <option value="lieu">Lieu</option>
                        <option value="concert">Concerts</option>
                        <option value="affiche">Affiches</option>
                    </select>

                    <input
                        id="Image"
                        type="file"
                        name="ImageInput"
                        required
                        multiple
                        accept="image/*"
                        className="text-white m-3 focus:ring-red-b"
                    ></input>
                </div>

                <input type="number" name="lieu" defaultValue={lieuxMaxOrder} className="hidden" />
                <input type="number" name="concert" defaultValue={concertsMaxOrder} className="hidden" />
                <input type="number" name="affiche" defaultValue={affichesMaxOrder} className="hidden" />

                <div className="w-full flex justify-center mb-3">
                    <SubmitButtonPhoto html={<p className="text-lg px-3 py-1">Ajouter</p>}/>
                </div>
            </form>
        </div>
    )
}