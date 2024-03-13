'use client'

import Image from "next/image"

interface ModifyRubriqueAdminProps {
    newCarte: any,
    setNewCarte: React.SetStateAction<any>,
    rubrique: any,
    setModifyButton: React.SetStateAction<any>,
}

export default function ModifyRubriqueAdmin({ newCarte, setNewCarte, rubrique, setModifyButton }: ModifyRubriqueAdminProps) {

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const tmpCarte = [...newCarte]
        tmpCarte.map((rubrique_db: any, index: number) => {
            if (rubrique_db.type == rubrique.type)
            {
                tmpCarte[index].type = (event as any).target[0].value
                tmpCarte[index].description = (event as any).target[1].value
            }
        })
        
        setNewCarte(tmpCarte)
        setModifyButton(1)
    }

    function handleDelete () {
        const tmpCarte = [...newCarte]

        tmpCarte.map((rubrique_db: any, index: number) => {
            if (rubrique_db.type == rubrique.type)
                delete tmpCarte[index]
        })

        const delCarte = tmpCarte.filter((rubrique: any) => {
          return rubrique != null
        })

        setNewCarte(delCarte)
        setModifyButton(1)
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
                <input type="submit" value="Modifier"  className="text-lg font-semibold my-2 px-3 py-1 bg-black rounded-md border-2 border-red hover:border-white" />
                <button onClick={handleDelete} className="mb-2 text-lg font-semibold px-3 py-1 bg-black rounded-md border-2 border-red hover:border-white">
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