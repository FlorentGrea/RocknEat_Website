'use client'

import { useRouter } from "next/navigation"
import { AccueilData } from "../types"
import { useState } from "react"
import Image from "next/image"

interface ChangeTitleAdminProps {
    user: any
    data: AccueilData
    name: string
    html: any
}

export default function ChangeTitleAdmin({ user, data, name, html }: ChangeTitleAdminProps) {
    const Accueil = data
    const [text, setText] = useState(
        (name == 'Slogan') ? Accueil.Slogan : (
            (name == 'Nom_Salle_1') ? Accueil.Nom_Salle_1 : (
                (name == 'Nom_Salle_2') ? Accueil.Nom_Salle_2 :  ""
    )))
    const [click, setClick] = useState(1)
    const Router = useRouter();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (name == 'Slogan')
            Accueil.Slogan = text
        else if (name == 'Nom_Salle_1')
            Accueil.Nom_Salle_1 = text
        else if (name == 'Nom_Salle_2')
            Accueil.Nom_Salle_2 = text
        fetch('/api/Accueil', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(Accueil)
        })
        try {
            Router.refresh()
        } finally {
            setClick(1)
        }
    }

    if (!user)
        return (<div>{html}</div>)
    return (
        <div>
            { click ? (
                <div className="flex flex-row justify-center">
                    {html}
                    <button className="self-start" onClick={() => {setClick(0)}}>
                        <Image
                            src="/edit-write.svg"
                            width={40}
                            height={40}
                            alt="Mail"
                            className="object-contain h-5 w-5 filter-white"
                        />
                    </button>
                </div>
            ):(
                <div className="flex flex-row justify-center w-full my-2">
                    <form onSubmit={handleSubmit} className="flex flex-row justify-center align-middle w-[70%] mr-1">
                        <input 
                            type="text" 
                            name={html} 
                            defaultValue={text} 
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
                            className="object-contain h-5 w-5 filter-white"
                        />
                    </button>
                </div>
            )}
        </div>
    )
}