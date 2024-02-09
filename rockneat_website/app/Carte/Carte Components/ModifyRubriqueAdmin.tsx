'use client'

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function ModifyRubriqueAdmin({ carte, rubrique }: any) {
    const [modifyButton, setModifyButton] = useState(1)
    const Router = useRouter();
    let new_ordre = rubrique.ordre

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        carte.map((rubrique_db: any, index: number) => {
            if (rubrique_db.type == rubrique.type)
            {
                carte[index].type = (event as any).target[0].value
                carte[index].description = (event as any).target[1].value
            }
        })
        try {
            fetch('/api/Carte', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(carte)
            })
        } catch (error) {
            console.log(error)
        } finally {
            try {
                Router.refresh()
            } finally {
                setModifyButton(1)
            }
        }
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
        try {
            fetch('/api/Carte', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(new_carte)
            })
        } catch (error) {
            console.log(error)
        } finally {
            try {
                Router.refresh()
            } finally {
                setModifyButton(1)
            }
        }
    }
    
    useEffect (() => {
        const hideRubrique1 = document.getElementById("modify" + '1R' + rubrique.ordre)
        const hideRubrique2 = document.getElementById("modify" + '2R' + rubrique.ordre)
        const hideRubrique3 = document.getElementById("modify" + '3R' + rubrique.ordre)
        if (modifyButton) {
            hideRubrique1 && (hideRubrique1.style.display = 'flex')
            hideRubrique2 && (hideRubrique2.style.display = 'flex')
            hideRubrique3 && (hideRubrique3.style.display = 'flex')
        }
        else {
            hideRubrique1 && (hideRubrique1.style.display = 'none')
            hideRubrique2 && (hideRubrique2.style.display = 'none')
            hideRubrique3 && (hideRubrique3.style.display = 'none')
        }
    }, [modifyButton])

    if (modifyButton) {
        return (
            <div>
                <button className="cartePendingButton self-start" onClick={() => {setModifyButton(0)}}>
                    <Image
                        src="/edit-write.svg"
                        width={40}
                        height={40}
                        alt="Mail"
                        className="object-contain h-5 w-5 mr-1 filter-white pt-1 disabled:animate-pulse"
                    />
                </button>
            </div>
        )
    }

    return (
        <div className="flex w-full justify-center">
            <div className="flex flex-row">
            <form onSubmit={handleSubmit} className="flex flex-col ml-5">
                <label htmlFor="title" className="text-center">Titre</label>
                <input 
                    name="title"
                    defaultValue={rubrique.type}
                    className="mb-1 border-[1px] border-gray-500 bg-transparent focus:ring-red-b focus:border-transparent"
                />

                <label htmlFor="description" className="text-center">Description</label>
                <textarea 
                    name="description" 
                    cols={30}
                    rows={5}
                    defaultValue={rubrique.description}
                    className="bg-transparent focus:ring-red-b focus:border-transparent"
                />
                <input type="submit" value="Modifier"  className="text-lg bg-black px-3 py-1 my-1 shadow shadow-red-b" />
                <button onClick={handleDelete} className="cartePendingButton disabled:animate-pulse text-lg bg-black px-3 py-1 mt-2 mb-5 shadow shadow-red-b">
                    Suprimer la rubrique
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
        </div>
    )
}