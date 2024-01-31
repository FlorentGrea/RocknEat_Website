'use client'

import Image from "next/image"
import { useState } from "react"

interface AccueilAdminProps {
    data: any
    htmlName: string
}

interface lineType {
    [key: string]: any;
}

export default function AccueilAdmin({ data, htmlName }: AccueilAdminProps) {
    const Accueil = data
    const [click, setClick] = useState(1)
    const [text, setText] = useState(Accueil.Slogan)
    const line: lineType = {
        'Slogan': <h1 className="text-2xl sm:text-4xl font-extrabold text-center py-5">{Accueil.Slogan}</h1>,
        'Description': <h3 className='text-xl font-bold py-3'>{Accueil.Description}</h3>,
        'Nom_Salle_1': <h1 className="text-2xl sm:text-4xl font-extrabold text-center py-5">{Accueil.Nom_Salle_1}</h1>,
        'Image_Salle_1': 'TBD',
        'Description_Salle_1': <p>{Accueil.Description_Salle_1}</p>,
        'Nom_Salle_2': <h2 className='text-xl font-extrabold'>{Accueil.Nom_Salle_2}</h2>,
        'Image_Salle_2': 'TBD',
        'Description_Salle_2': <h1>{Accueil.Description_Salle_2}</h1>
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        Accueil[htmlName] = text;
        fetch('/api/Accueil', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(Accueil)
        })
        setClick(1)
    }

    return (
        <div>
            {click ? (
                <div>
                    {line[htmlName]}
                    <button onClick={() => {setClick(0)}}>
                        <Image
                            src="/edit-write.svg"
                            width={40}
                            height={40}
                            alt="Mail"
                            className="object-contain h-5 w-5 mr-1 filter-white pt-1"
                        />
                    </button>
                </div>
            ):(
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <input type="text" name={htmlName} placeholder={Accueil[htmlName]} onChange={(event) => {setText(event.target.value)}}/>
                        </label>
                        <input type="submit" value="Change" />
                    </form>
                </div>
            )}
        </div>
    )
}