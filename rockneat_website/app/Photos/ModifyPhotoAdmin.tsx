'use client'

import Image from "next/image";
import { useRouter } from "next/navigation"
import { PhotoData } from "../types";

interface OnePhotoProps {
    Photos_db: PhotoData[]
    displayedPhoto: PhotoData
}

export default function ModifyPhotoAdmin({ Photos_db, displayedPhoto }: OnePhotoProps) {
    const Router = useRouter();
    let maxOrder = 0;
    Photos_db.map((photo) => {
        if (photo.Type == displayedPhoto.Type && photo.ordre > maxOrder)
            maxOrder = photo.ordre
    })

    function patchMoove(index: number, newOrder: number) {
        const patch_photo = new FormData
        patch_photo.set('id', Photos_db[index].id)
        patch_photo.set('Type', Photos_db[index].Type)
        patch_photo.set('ordre', newOrder.toString())
        fetch('/api/Photos', {
            method: 'PATCH',
            body: patch_photo
        })
    }

    function handleMoove(number: number) {
        if (number < 0)
            Photos_db.map((photo: any, index: number) => {
                if (photo.Type == displayedPhoto.Type)
                {
                    if (photo.ordre == displayedPhoto.ordre - 1)
                        patchMoove(index, displayedPhoto.ordre)
                    else if (photo.ordre == displayedPhoto.ordre)
                        patchMoove(index, displayedPhoto.ordre - 1)
                }
            })
        else
            Photos_db.map((photo: any, index: number) => {
                if (photo.Type == displayedPhoto.Type)
                {
                    if (photo.ordre == displayedPhoto.ordre)
                        patchMoove(index, displayedPhoto.ordre + 1)
                    else if (photo.ordre == displayedPhoto.ordre + 1)
                        patchMoove(index, displayedPhoto.ordre)
                }
            })
        Router.refresh()
    }

    /*function handleDelete () {
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
    }*/
    
    return (
        <div key={displayedPhoto.id} className="w-full mb-2 md:max-h-96 overflow-hidden bg-black/70 p-1">
            <Image
                src={'https://rockneatdb.pockethost.io/api/files/'+ displayedPhoto.collectionId + '/' + displayedPhoto.id + '/' + displayedPhoto.Image}
                width={1500}
                height={1500}
                alt={displayedPhoto.Type}
                className="w-full object-contain max-h-36"
            />
            { (displayedPhoto.ordre != 0) &&
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
            { (displayedPhoto.ordre != maxOrder) &&
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
            <button>
                suprimer la photo
            </button>
        </div>
    )
}