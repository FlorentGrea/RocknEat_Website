'use client'

import Image from "next/image";
import { useState } from "react";

export default function CreateArticleAdmin({ carte, rubrique }: any) {
    const [newArticleButton, setNewArticleButton] = useState(1)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [vege, setVege] = useState(false)
    let ordre = 0;
    rubrique.articles.map(() => {ordre++})

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const new_article = {
            "Description": description,
            "Prix": price,
            "ordre": ordre,
            "Titre": title,
            "Vege": vege
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
        setNewArticleButton(1)
    }

    return (
        <div>
            { newArticleButton ? (
                <button onClick={() => {setNewArticleButton(0)}}>
                    Ajouter un article
                </button>
            ):(
                <div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="title" className="text-white">Titre</label>
                        <input 
                            name="title"
                            required
                            defaultValue={''}
                            onChange={(event) => {setTitle(event.target.value)}}
                        />

                        <label htmlFor="description" className="text-white">Description</label>
                        <textarea 
                            name="description"
                            cols={30}
                            rows={5}
                            defaultValue={''}
                            onChange={(event) => {setDescription(event.target.value)}}
                        />

                        <label htmlFor="Price" className="text-white">Prix</label>
                        <input 
                            name="Price"
                            type="number"
                            defaultValue={0}
                            onChange={(event) => {setPrice(event.target.value as any)}}
                        />

                        <label htmlFor="Vege" className="text-white">Végé</label>
                        <input
                            name="Vege" 
                            type="checkbox" 
                            onChange={(event) => {setVege(event.target.checked)}}/>
                        <input type="submit" value="Créer" />
                    </form>
                    <button onClick={() => {setNewArticleButton(1)}}>
                        <Image
                            src="/close-cross.svg"
                            width={40}
                            height={40}
                            alt="Mail"
                            className="object-contain h-5 w-5 mr-1 filter-white pt-1"
                        />
                    </button>
                </div>
            )}
        </div>
    )
}