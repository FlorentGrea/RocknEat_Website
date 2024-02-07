'use client'

import Image from "next/image"
import { useState } from "react"
import { AccueilData } from "../types"

interface ChangeDescriptionAdminProps {
    user: any
    data: AccueilData
    name: string
    html: any
}

export default function ChangeDescriptionAdmin({ user, data, name, html }: ChangeDescriptionAdminProps) {
    const Accueil = data
    const [click, setClick] = useState(1)
    const [text, setText] = useState(Accueil.Slogan)

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (name == 'Description')
            Accueil.Description = text
        else if (name == 'Description_Salle_1')
            Accueil.Description_Salle_1 = text
        else if (name == 'Description_Salle_2')
            Accueil.Description_Salle_2 = text
        fetch('/api/Accueil', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(Accueil)
        })
        setClick(1)
    }

    if (!user)
        return (<div>{html}</div>)
    return (
        <div>
            { click ? (
                <div className="flex flex-row justify-center">
                    {html}
                    <button className=" self-start" onClick={() => {setClick(0)}}>
                        <Image
                            src="/edit-write.svg"
                            width={40}
                            height={40}
                            alt="Mail"
                            className="object-contain h-5 w-5 filter-white pt-1"
                        />
                    </button>
                </div>
            ):(
                <div className="flex flex-row justify-center w-full my-2">
                    <form onSubmit={handleSubmit} className="flex flex-row justify-center align-middle w-[70%] mr-1">
                        <textarea  
                            name={html} 
                            defaultValue={
                                (name == 'Description') ? Accueil.Description : (
                                    (name == 'Description_Salle_1') ? Accueil.Description_Salle_1 : (
                                        (name == 'Description_Salle_2') ? Accueil.Description_Salle_2 : ""
                                ))
                            } 
                            onChange={(event) => {setText(event.target.value)}}
                            className="w-[90%] bg-transparent focus:ring-red-b"
                        />
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
                    <button onClick={() => {setClick(1)}} className="self-start">
                        <Image
                            src="/close-cross.svg"
                            width={40}
                            height={40}
                            alt="Mail"
                            className="object-contain h-5 w-5 filter-white pt-1"
                        />
                    </button>
                </div>
            )}
        </div>
    )
}