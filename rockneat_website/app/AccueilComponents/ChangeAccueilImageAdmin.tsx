import { revalidatePath } from "next/cache";
import { AccueilData } from "../types";
import PocketBase from 'pocketbase';
import Image from "next/image";

interface PhotoDisplayProps {
    Accueil: AccueilData
    name: string
}

export default function ChangeAccueilImageAdmin({ Accueil, name }: PhotoDisplayProps) {

    async function addPhoto(formData: FormData) {
        'use server'

        const pb = new PocketBase(process.env.DB_ADDR);
        const id = name == 'Image_Salle_1' ? 'z8j1g9wd0sd6ion' : '7jyubioar8q8n9j'
        const newData = Accueil
        const image = formData.get("ImageInput")
        const postData = new FormData
        postData.set('Images', image as File)
        postData.set('Images_name', (name == 'Image_Salle_1' ? 'Accueil_1' : 'Accueil_2'))
        await pb.collection('Photos').update(id, {'Images-': [name == 'Image_Salle_1' ? newData.Image_Salle_1 : newData.Image_Salle_2]});
        const record = await pb.collection('Photos').update(id, postData);
        const data = await JSON.parse(JSON.stringify(record))
        if (name == 'Image_Salle_1')
            newData.Image_Salle_1 = data.Images[0]
        else
            newData.Image_Salle_2 = data.Images[0]
        const jsonData = {
            "json_file": JSON.stringify(newData)
        }
        await pb.collection('Jsons').update('zggxukzkdiujtsf', jsonData);
        revalidatePath("/")
    }
    
    return (
        <div className="absolute bottom-0 w-full">
            <form name="modifyPhoto" action={addPhoto}  className="flex flex-row justify-center">
                <input
                    id={name}
                    type="file"
                    name="ImageInput"
                    required
                    accept="image/*"
                    className="p-2 hidden"
                ></input>
                <label htmlFor={name} className="flex flex-row w-fit text-lg bg-black px-3 py-1 my-1 shadow shadow-red-b">
                    <Image
                        src="/upload.svg"
                        width={40}
                        height={40}
                        alt="Mail"
                        className="object-contain h-5 w-5 filter-white self-center mr-1"
                    />
                    <p className="text-base">Nouvelle Photo</p>
                </label>
                <button type="submit" className="ml-2">
                    <Image
                        src="/validation.svg"
                        width={40}
                        height={40}
                        alt="Mail"
                        className="object-contain h-6 w-6 filter-white"
                    />
                </button>
            </form>
        </div>
    )
}