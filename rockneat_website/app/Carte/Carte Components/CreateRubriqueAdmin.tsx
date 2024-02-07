'use client'

import Image from "next/image";
import { useState } from "react"

export default function CreateRubriqueAdmin({ Carte }: any) {
    const [createButton, setCreateButton] = useState(1)
    let ordre = 0;
    Carte.map(() => {ordre++})

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const new_rubrique = {       
            "type": (event as any).target[0].value,
            "description": (event as any).target[1].value,
            "ordre": ordre,
            "pos_y": 0,
            "pos_x": 0,
            "articles": []
        }
        Carte.push(new_rubrique)
        fetch('/api/Carte', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(Carte)
        })
        setCreateButton(1)
    }

    return (
        <div className="flex justify-center">
            { createButton ? (
                <button className="text-lg bg-black px-3 py-1 mb-2 mt-5 shadow shadow-red-b" onClick={() => {setCreateButton(0)}}>
                    Créer une rubrique
                </button>
            ):(
                <div className="flex flex-row bg-black/70 p-2 mt-3">
                    <form onSubmit={handleFormSubmit} className="flex flex-col ml-5">
                        <label htmlFor="title" className="text-center">Titre</label>
                        <input className="mb-1 border-[1px] border-gray-500 bg-transparent focus:ring-red-b focus:border-transparent" name="title" required defaultValue='' />

                        <label htmlFor="description" className="text-center">Description</label>
                        <textarea name="description" className="bg-transparent focus:ring-red-b focus:border-transparent" cols={30} rows={5} defaultValue='' />

                        <input type="submit" className="text-lg bg-black px-3 py-1 my-1 shadow shadow-red-b" value="Créer" />
                    </form>
                    <button className="self-start" onClick={() => {setCreateButton(1)}}>
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