'use client'

import Image from "next/image"
import { useState } from "react"

export default function UpdateArticleAdmin({ carte, rubrique, article }: any) {
    const [modifyButton, setModifyButton] = useState(1)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [vege, setVege] = useState(false)
    let ordreMax = 0
    let new_ordre = article.ordre
    
    rubrique.articles.map((article: any) => {
        if (article.ordre > ordreMax)
            ordreMax = article.ordre
    })

    function handleMoove(number: number) {
        if (number < 0)
            carte.map((rubrique_db: any, index: number) => {
                rubrique_db.articles.map((article_db: any, article_index: number) => {
                    if (rubrique_db.type == rubrique.type && article_db.ordre == article.ordre - 1)
                        carte[index].articles[article_index].ordre = article.ordre
                    else if (rubrique_db.type == rubrique.type && article_db.ordre == article.ordre)
                        carte[index].articles[article_index].ordre = article.ordre - 1
                })
            })
        else
            carte.map((rubrique_db: any, index: number) => {
                rubrique_db.articles.map((article_db: any, article_index: number) => {
                    if (rubrique_db.type == rubrique.type && article_db.ordre == article.ordre)
                        carte[index].articles[article_index].ordre = article.ordre + 1
                    else if (rubrique_db.type == rubrique.type && article_db.ordre == article.ordre + 1)
                        carte[index].articles[article_index].ordre = article.ordre
                })
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
            rubrique_db.articles.map((article_db: any, article_index: number) => {
                if (rubrique_db.type == rubrique.type && article_db.Titre == article.Titre)
                {
                    carte[index].articles[article_index].Titre = title
                    carte[index].articles[article_index].Description = description
                    carte[index].articles[article_index].Prix = price
                    carte[index].articles[article_index].Vege = vege
                }
            })
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
            rubrique_db.articles.map((article_db: any, article_index: number) => {
                if (rubrique_db.type == rubrique.type && article_db.Titre == article.Titre)
                    delete carte[index].articles[article_index]
                let swap_nbr = 0
                if (rubrique_db.type == rubrique.type && new_ordre < article_db.ordre)
                {
                    swap_nbr = article_db.ordre
                    carte[index].articles[article_index].ordre = new_ordre
                    new_ordre = swap_nbr
                }
            })
        })
        carte.map((rubrique_db: any, index: number) => {
            carte[index].articles = carte[index].articles.filter((article: any) => {
                return article != null
            })
        })
        fetch('/api/Carte', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(carte)
        })
        setModifyButton(1)
    }

    return (
        <div className={ article.Description ? "flex flex-col mb-3" : "flex flex-col"}>
            <div className="flex flex-row w-64">
                { article.Vege &&
                    <p className="mr-1 text-sm leading-6 text-green-500">{article.Vege ? "VÉGÉ • " : ""}</p>
                }
                <p className="font-bold flex-grow">{article.Titre}</p>
                { article.Prix ? <p>{article.Prix + ' €'}</p> : [] }
            </div>
            { article.Description ? <p className="text-sm w-full">{article.Description}</p> : []}
            { modifyButton ? (
                <div>
                    <button onClick={() => {setModifyButton(0)}}>
                        <Image
                            src="/edit-write.svg"
                            width={40}
                            height={40}
                            alt="Mail"
                            className="object-contain h-5 w-5 mr-1 filter-white pt-1"
                        />
                    </button>
                    { (article.ordre != 0) &&
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
                    { (article.ordre != ordreMax) &&
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
                            required
                            onChange={(event) => {setTitle(event.target.value)}}
                        />

                        <label htmlFor="description" className="text-white">Description</label>
                        <textarea 
                            name="description"
                            cols={30}
                            rows={5}
                            onChange={(event) => {setDescription(event.target.value)}}
                        />

                        <label htmlFor="Price" className="text-white">Prix</label>
                        <input 
                            name="Price"
                            type="number"
                            onChange={(event) => {setPrice(event.target.value as any)}}
                        />

                        <label htmlFor="Vege" className="text-white">Végé</label>
                        <input
                            name="Vege" 
                            type="checkbox" 
                            onChange={(event) => {setVege(event.target.checked)}}/>
                        <input type="submit" value="Modifier" />
                    </form>
                    <button onClick={handleDelete}>
                        Suprimer l'article
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
        </div>
    )
}