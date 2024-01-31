'use client'

import Image from "next/image";
import { useState } from "react"

export default function CarteAdmin(Carte: any) {
    const [createButton, setCreateButton] = useState(1)
    let ordre = 0;
    Carte = Carte.carte
    Carte.map(() => {ordre++})
    let new_rubrique: any = {       
        "type": "",
        "description": "",
        "ordre": ordre,
        "pos_y": 0,
        "pos_x": 0,
        "articles": []
    }

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        Carte.push(new_rubrique)
        fetch('/api/Carte', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(Carte)
        })
        setCreateButton(1)
    }

    return (
        <div>
            <div>
                <button className={ !createButton ? "hidden" : "" } onClick={() => {
                    setCreateButton(0);
                }}>Créer une rubrique</button>
            </div>
            { !createButton ?
                <div>
                    <h2>Créer une rubrique</h2>

                    <form onSubmit={handleFormSubmit} className="text-black">

                        <label htmlFor="title" className="text-white">Titre</label>
                        <input 
                            name="title"
                            required
                            onChange={(event) => {new_rubrique.type = event.target.value}}
                        ></input>

                        <label htmlFor="description" className="text-white">Description</label>
                        <textarea 
                            name="description" 
                            cols={30}
                            rows={5}
                            onChange={(event) => {new_rubrique.description = event.target.value}}
                        ></textarea>

                        <input type="submit" className="text-white" value="Créer" />
                    </form>
                    <button onClick={() => {setCreateButton(1)}}>
                        <Image
                            src="/close-cross.svg"
                            width={40}
                            height={40}
                            alt="Mail"
                            className="object-contain h-5 w-5 mr-1 filter-white pt-1"
                        />
                    </button>
                </div>
            : []}
        </div>
    )
}