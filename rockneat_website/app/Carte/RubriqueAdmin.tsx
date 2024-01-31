'use client'

import Image from "next/image";
import { useState } from "react";
import CreateArticleAdmin from "./CreateArticleAdmin"
import UpdateArticleAdmin from "./UpdateArticleAdmin"

export default function RubriqueAdmin({ carte, rubrique }: any) {
    const [modifyButton, setModifyButton] = useState(1)
    const [title, setTitle] = useState(rubrique.type)
    const [description, setDescription] = useState(rubrique.description)
    let ordreMax = 0
    let key = 0
    let new_ordre = rubrique.ordre
    
    carte.map((rubrique: any) => {
        if (rubrique.ordre > ordreMax)
            ordreMax = rubrique.ordre
    })

    function handleMoove(number: number) {
        if (number < 0)
            carte.map((rubrique_db: any, index: number) => {
                if (rubrique_db.ordre == rubrique.ordre - 1)
                    carte[index].ordre = rubrique.ordre
                else if (rubrique_db.ordre == rubrique.ordre)
                    carte[index].ordre = rubrique.ordre - 1
            })
        else
            carte.map((rubrique_db: any, index: number) => {
                if (rubrique_db.ordre == rubrique.ordre)
                    carte[index].ordre = rubrique.ordre + 1
                else if (rubrique_db.ordre == rubrique.ordre + 1)
                    carte[index].ordre = rubrique.ordre
            })
        fetch('/api/Carte', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(carte)
        })
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        carte.map((rubrique_db: any, index: number) => {
            if (rubrique_db.type == rubrique.type)
            {
                carte[index].type = title
                carte[index].description = description
            }
        })
        fetch('/api/Carte', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(carte)
        })
        setModifyButton(1)
    }

    function handleDelete () {
        carte.map((rubrique_db: any, index: number) => {
            let swap_nbr = 0
            if (rubrique_db.type == rubrique.type)
                delete carte[index]
            if (new_ordre < rubrique_db.ordre)
            {
                swap_nbr = rubrique_db.ordre
                carte[index].ordre = new_ordre
                new_ordre = swap_nbr
            }
        })
        const new_carte = carte.filter((rubrique: any) => {
          return rubrique != null
        })
        fetch('/api/Carte', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(new_carte)
        })
        setModifyButton(1)
    }

    return (
        <div className="w-full bg-black/70 p-3 mb-2">
            { modifyButton ? (
                <div>
                    <h1 className="text-xl font-bold mb-2">{rubrique.type}</h1>
                    <p className="text-red whitespace-pre-line">{rubrique.description}</p>
                    <button onClick={() => {setModifyButton(0)}}>
                        <Image
                            src="/edit-write.svg"
                            width={40}
                            height={40}
                            alt="Mail"
                            className="object-contain h-5 w-5 mr-1 filter-white pt-1"
                        />
                    </button>
                    { (rubrique.ordre != 0) &&
                        <button onClick={() => {handleMoove(-1)}}>
                            <Image
                                src="/up.svg"
                                width={40}
                                height={40}
                                alt="Mail"
                                className="object-contain h-5 w-5 mr-1 filter-white pt-1"
                            />
                        </button>
                    }
                    { (rubrique.ordre != ordreMax) &&
                        <button onClick={() => {handleMoove(1)}}>
                            <Image
                                src="/down.svg"
                                width={40}
                                height={40}
                                alt="Mail"
                                className="object-contain h-5 w-5 mr-1 filter-white pt-1"
                            />
                        </button>
                    }
                </div>
            ):(
                <div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="title" className="text-white">Titre</label>
                        <input 
                            name="title"
                            defaultValue={rubrique.type}
                            onChange={(event) => {setTitle(event.target.value)}}
                        ></input>

                        <label htmlFor="description" className="text-white">Description</label>
                        <textarea 
                            name="description" 
                            cols={30}
                            rows={5}
                            defaultValue={rubrique.description}
                            onChange={(event) => {setDescription(event.target.value)}}
                        ></textarea>
                        <input type="submit" value="Change" />
                    </form>
                    <button onClick={handleDelete}>
                        Suprimer la rubrique
                    </button>
                    <button onClick={() => {setModifyButton(1)}}>
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
            { rubrique.articles.map((article: any) => {
                return <UpdateArticleAdmin key={key++} carte={carte} rubrique={rubrique} article={article} />
            })}
            <CreateArticleAdmin carte={carte} rubrique={rubrique} />
        </div>
    )
}