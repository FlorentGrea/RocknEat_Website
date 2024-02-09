'use client'

import { useRouter } from "next/navigation"
import { useState } from "react";
import Image from "next/image";

export default function CreateArticleAdmin({ carte, rubrique }: any) {
    const [newArticleButton, setNewArticleButton] = useState(1)
    const Router = useRouter();
    let ordre = 0;

    rubrique.articles.map(() => {ordre++})

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const new_article = {
            "Description": (event as any).target[1].value,
            "Prix": (event as any).target[2].value,
            "ordre": ordre,
            "Titre": (event as any).target[0].value,
            "Vege": (event as any).target[3].checked
        }
        carte.map((rubrique_db: any, index: number) => {
            if (rubrique_db.type == rubrique.type)
                carte[index].articles.push(new_article)
        })
        fetch('/api/Carte', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(carte)
        })
        try {
            Router.refresh()
        } finally {
            setNewArticleButton(1)
        }
    }

    return (
        <div className="flex justify-center w-full">
            { newArticleButton ? (
                <button className="w-fit text-lg bg-black px-3 py-1 my-2 shadow shadow-red-b" onClick={() => {setNewArticleButton(0)}}>
                    Ajouter un article
                </button>
            ):(
                <div className="flex flex-row">
                    <form onSubmit={handleSubmit} className="flex flex-col ml-5">
                        <label htmlFor="title" className="text-center">Titre</label>
                        <input name="title" required defaultValue={''} className="mb-1 border-[1px] border-gray-500 bg-transparent focus:ring-red-b focus:border-transparent"/>

                        <label htmlFor="description" className="text-center">Description</label>
                        <textarea name="description" cols={30} rows={5} defaultValue={''} className="mb-1 border-[1px] border-gray-500 bg-transparent focus:ring-red-b focus:border-transparent"/>

                        <div className="flex flex-row">
                            <div className="flex flex-col">
                                <label htmlFor="Price" className="text-white">Prix</label>
                                <input name="Price" type="number" defaultValue={0} className="mb-1 border-[1px] border-gray-500 bg-transparent focus:ring-red-b focus:border-transparent" />
                            </div>
                            
                            <div className="flex flex-col align-middle">
                                <label htmlFor="Vege">Végé</label>
                                <input name="Vege" type="checkbox" className="self-center w-6 h-6 mt-2 mb-1 border-[1px] border-gray-500 bg-transparent focus:ring-red-b focus:border-transparent"/>
                            </div>
                        </div>
                        <input type="submit" value="Créer" className="text-lg bg-black px-3 py-1 my-1 shadow shadow-red-b" />
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