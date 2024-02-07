'use client'

import Image from "next/image"
import { useState, useEffect } from "react"

export default function ModifyArticleAdmin({ carte, rubrique, article }: any) {
    const [modifyButton, setModifyButton] = useState(1)
    let ordreMax = 0
    let new_ordre = article.ordre
    
    rubrique.articles.map((article: any) => {
        if (article.ordre > ordreMax)
            ordreMax = article.ordre
    })

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        carte.map((rubrique_db: any, index: number) => {
            rubrique_db.articles.map((article_db: any, article_index: number) => {
                if (rubrique_db.type == rubrique.type && article_db.Titre == article.Titre)
                {
                    carte[index].articles[article_index].Titre = (event as any).target[0].value
                    carte[index].articles[article_index].Description = (event as any).target[1].value
                    carte[index].articles[article_index].Prix = (event as any).target[2].value
                    carte[index].articles[article_index].Vege = (event as any).target[3].checked
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
    
    useEffect (() => {
        const hideArticle1 = document.getElementById("modify" + 'R' + rubrique.ordre + '1A' + article.ordre)
        const hideArticle2 = document.getElementById("modify" + 'R' + rubrique.ordre + '2A' + article.ordre)
        const hideArticle3 = document.getElementById("modify" + 'R' + rubrique.ordre + '3A' + article.ordre)
        const hideArticle4 = document.getElementById("modify" + 'R' + rubrique.ordre + '4A' + article.ordre)
        const hideArticle5 = document.getElementById("modify" + 'R' + rubrique.ordre + '5A' + article.ordre)
        if (modifyButton) {
            hideArticle1 && (hideArticle1.style.display = 'flex')
            hideArticle2 && (hideArticle2.style.display = 'flex')
            hideArticle3 && (hideArticle3.style.display = 'flex')
            hideArticle4 && (hideArticle4.style.display = 'flex')
            hideArticle5 && (hideArticle5.style.display = 'flex')
        }
        else {
            hideArticle1 && (hideArticle1.style.display = 'none')
            hideArticle2 && (hideArticle2.style.display = 'none')
            hideArticle3 && (hideArticle3.style.display = 'none')
            hideArticle4 && (hideArticle4.style.display = 'none')
            hideArticle5 && (hideArticle5.style.display = 'none')
        }
    }, [modifyButton])

    if (modifyButton) {
        return (
            <div className="ml-2">
                <button className="cartePendingButton" onClick={() => {setModifyButton(0)}}>
                    <Image
                        src="/edit-write.svg"
                        width={40}
                        height={40}
                        alt="Mail"
                        className="object-contain h-5 w-5 mr-1 filter-white pt-1 disabled:animate-pulse"
                    />
                </button>
            </div>
    )}
    
    return (
        <div className="flex flex-row w-full justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col ml-5">
                <label htmlFor="title" className="text-center">Titre</label>
                <input 
                    name="title" 
                    required 
                    defaultValue={article.Titre} 
                    className="mb-1 border-[1px] border-gray-500 bg-transparent focus:ring-red-b focus:border-transparent"
                />

                <label htmlFor="description" className="text-center">Description</label>
                <textarea 
                    name="description" 
                    cols={30} 
                    rows={5}
                    defaultValue={article.Description} 
                    className="mb-1 border-[1px] border-gray-500 bg-transparent focus:ring-red-b focus:border-transparent"
                />

                <div className="flex flex-row">
                    <div className="flex flex-col">
                        <label htmlFor="Price" className="text-white">Prix</label>
                        <input name="Price" type="number" 
                            defaultValue={article.Prix} 
                            className="mb-1 border-[1px] border-gray-500 bg-transparent focus:ring-red-b focus:border-transparent" 
                        />
                    </div>
                            
                    <div className="flex flex-col align-middle">
                        <label htmlFor="Vege">Végé</label>
                        <input 
                            name="Vege" 
                            type="checkbox" 
                            defaultChecked={article.Vege ? true : false}
                            className="self-center w-6 h-6 mt-2 mb-1 border-[1px] border-gray-500 bg-transparent focus:ring-red-b focus:border-transparent"
                        />
                    </div>
                </div>
                <input type="submit" value="Modifier" className="text-lg bg-black px-3 py-1 my-1 shadow shadow-red-b" />
                <button className="cartePendingButton disabled:animate-pulse text-lg bg-black px-3 py-1 mt-2 mb-5 shadow shadow-red-b" onClick={handleDelete}>
                    Suprimer l'article
                </button>
            </form>
            <button onClick={() => {setModifyButton(1)}} className="self-start">
                <Image
                    src="/close-cross.svg"
                    width={40}
                    height={40}
                    alt="Mail"
                    className="object-contain h-5 w-5 filter-white"
                />
            </button>
        </div>
    )
}