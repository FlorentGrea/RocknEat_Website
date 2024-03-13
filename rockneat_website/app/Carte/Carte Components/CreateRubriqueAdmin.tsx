'use client'

import {  useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import Image from "next/image";

interface CreateRubriqueAdminProps {
    newCarte: any,
    setNewCarte: React.SetStateAction<any>,
}

export default function CreateRubriqueAdmin({ newCarte, setNewCarte }: CreateRubriqueAdminProps) {
    const [createButton, setCreateButton] = useState(1)

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const tmpCarte= [...newCarte]
        const new_rubrique = {
            "type": (event as any).target[0].value,
            "description": (event as any).target[1].value,
            "id": uuidv4(),
            "pos_y": 0,
            "pos_x": 0,
            "articles": []
        }

        tmpCarte.push(new_rubrique)
        setNewCarte(tmpCarte)
        setCreateButton(1)
    }

    return (
        <div className="flex justify-center mb-3">
            { createButton ? (
                <button className="text-lg font-semibold px-3 py-1 bg-black rounded-md border-2 border-red hover:border-white" onClick={() => {setCreateButton(0)}}>
                    Créer une rubrique
                </button>
            ):(
                <div className="flex flex-row bg-black/70 bg-black bg-gradient-to-tl from-red/20 via-black to-black shadow-sm shadow-black/30 p-2 mt-3">
                    <form onSubmit={handleFormSubmit} className="flex flex-col ml-5">
                        <label htmlFor="title" className="text-center">Titre</label>
                        <input className="mb-1 border-[1px] border-gray-500 bg-transparent focus:ring-red-b focus:border-transparent" name="title" required defaultValue='' />

                        <label htmlFor="description" className="text-center">Description</label>
                        <textarea name="description" className="bg-transparent focus:ring-red-b focus:border-transparent" cols={30} rows={5} defaultValue='' />

                        <input type="submit" className="text-lg font-semibold px-3 py-1 mb-2 mt-5 bg-black rounded-md border-2 border-red hover:border-white" value="Créer" />
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