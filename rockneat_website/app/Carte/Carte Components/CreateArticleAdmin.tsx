'use client'

import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import Image from "next/image";


interface CreateArticleAdminProps {
    newCarte: any,
    setNewCarte: React.SetStateAction<any>,
    rubrique: any
}

export default function CreateArticleAdmin({ newCarte, setNewCarte, rubrique }: CreateArticleAdminProps) {
    const [newArticleButton, setNewArticleButton] = useState(1)

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        
        const tmpCarte= [...newCarte]
        const new_article = {
            "Description": (event as any).target[3].value,
            "Prix": (event as any).target[2].value,
            "id": uuidv4(),
            "Titre": (event as any).target[1].value,
            "Vege": (event as any).target[0].checked
        }

        tmpCarte.map((rubrique_db: any, index: number) => {
            if (rubrique_db.type == rubrique.type)
                tmpCarte[index].articles.push(new_article)
        })
        setNewCarte(tmpCarte)
        setNewArticleButton(1)
    }

    return (
        <div className="flex justify-center w-full">
            { newArticleButton ? (
                <button className="text-lg font-semibold px-3 py-1 bg-black rounded-md border-2 border-red hover:border-white" onClick={() => {setNewArticleButton(0)}}>
                    Ajouter un article
                </button>
            ):(
                <div className="flex flex-row w-[80%]">
                    <form onSubmit={handleSubmit} className="flex flex-col w-full">
                        <div className="flex flex-row">
                            <div className="flex flex-col align-middle">
                                <label htmlFor="Vege">Végé</label>
                                <input name="Vege" type="checkbox" className="self-center w-6 h-6 mt-2 mb-1 border-[1px] border-gray-500 bg-transparent focus:ring-red-b focus:border-transparent"/>
                            </div>

                            <div className="flex flex-col align-middle mx-2 flex-grow">
                                <label htmlFor="title" className="text-center">Titre</label>
                                <input name="title" required defaultValue={''} className="mb-1 h-10 border-[1px] border-gray-500 bg-transparent focus:ring-red-b focus:border-transparent"/>
                            </div>

                            <div className="flex flex-col align-middle w-[20%]">
                                <label htmlFor="Price" className="text-white">Prix</label>
                                <input name="Price" type="number" defaultValue={0} className="mb-1 border-[1px] border-gray-500 bg-transparent focus:ring-red-b focus:border-transparent" />
                            </div> 
                        </div>

                        <label htmlFor="description" className="text-center">Description</label>
                        <textarea name="description" cols={30} rows={5} defaultValue={''} className="mb-1 border-[1px] border-gray-500 bg-transparent focus:ring-red-b focus:border-transparent"/>

                        <input type="submit" value="Créer" className="text-lg font-semibold px-3 py-1 bg-black rounded-md border-2 border-red hover:border-white" />
                    </form>
                    <button onClick={() => {setNewArticleButton(1)}} className="self-start">
                        <Image
                            src="/close-cross.svg"
                            width={40}
                            height={40}
                            alt="Mail"
                            className="object-contain h-5 w-5 filter-white"
                        />
                    </button>
                </div>
            )}
        </div>
    )
}