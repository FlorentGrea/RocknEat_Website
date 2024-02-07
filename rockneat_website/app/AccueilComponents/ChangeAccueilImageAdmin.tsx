import { revalidatePath } from "next/cache";
import { promises as fs } from "fs";
import { AccueilData } from "../types";
import Image from "next/image";

interface PhotoDisplayProps {
    Accueil: AccueilData
    name: string
}

export default function ChangeAccueilImageAdmin({ Accueil, name }: PhotoDisplayProps) {

    async function addPhoto(formData: FormData) {
        'use server'

        const newData = Accueil
        await fs.unlink('./public/Accueil/' + (name == 'Image_Salle_1' ? newData.Image_Salle_1 : newData.Image_Salle_2));
        const image = formData.get("ImageInput")
        if (name == 'Image_Salle_1')
            newData.Image_Salle_1 = (image as File).name
        else
            newData.Image_Salle_2 = (image as File).name
        const bytes = await (image as File).arrayBuffer()
        const buffer = Buffer.from(bytes)
        await fs.writeFile('./public/Accueil/' + (name == 'Image_Salle_1' ? newData.Image_Salle_1 : newData.Image_Salle_2), buffer)
        await fs.writeFile('./app/json/accueilData.json', JSON.stringify(newData));
        revalidatePath("/")
    }
    
    return (
        <div className="absolute bottom-0 w-full">
            <form name="modifyPhoto" action={addPhoto}  className="flex flex-row justify-center">
                <input
                    id="Image"
                    type="file"
                    name="ImageInput"
                    required
                    accept="image/*"
                    className="p-2 hidden"
                ></input>
                <label htmlFor="Image" className="flex flex-row w-fit text-lg bg-black px-3 py-1 my-1 shadow shadow-red-b">
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