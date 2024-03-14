'use client'

import Image from "next/image"

interface ModifyArticleAdminProps {
    newCarte: any,
    setNewCarte: React.SetStateAction<any>,
    rubrique: any,
    article: any,
    setModifyButton: React.SetStateAction<any>,
}

export default function ModifyArticleAdmin({ newCarte, setNewCarte, rubrique, article, setModifyButton }: ModifyArticleAdminProps) {

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const tmpCarte = [...newCarte]
        tmpCarte.map((rubrique_db: any, index: number) => {
            rubrique_db.articles.map((article_db: any, article_index: number) => {
                if (rubrique_db.type == rubrique.type && article_db.Titre == article.Titre)
                {
                    tmpCarte[index].articles[article_index].Titre = (event as any).target[1].value
                    tmpCarte[index].articles[article_index].Description = (event as any).target[3].value
                    tmpCarte[index].articles[article_index].Prix = (event as any).target[2].value
                    tmpCarte[index].articles[article_index].Vege = (event as any).target[0].checked
                }
            })
        })

        setNewCarte(tmpCarte)
        setModifyButton(1)
    }

    function handleDelete () {
        const tmpCarte = [...newCarte]

        tmpCarte.map((rubrique_db: any, index: number) => {
            rubrique_db.articles.map((article_db: any, article_index: number) => {
                if (rubrique_db.type == rubrique.type && article_db.Titre == article.Titre)
                    delete tmpCarte[index].articles[article_index]
            })
        })
        tmpCarte.map((rubrique_db: any, index: number) => {
            tmpCarte[index].articles = tmpCarte[index].articles.filter((article: any) => {
                return article != null
            })
        })

        setNewCarte(tmpCarte)
        setModifyButton(1)
    }
    
    return (
        <div className="flex flex-row w-full justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col md:justify-center w-[90%] md:ml-5">
                <div className="flex flex-row w-full">
                    <div className="flex flex-col align-middle w-[15%] text-sm lg:text-base xl:text-lg">
                        <label htmlFor="Vege">Végé</label>
                        <input 
                            name="Vege" 
                            type="checkbox" 
                            defaultChecked={article.Vege ? true : false}
                            className="self-center w-6 h-6 mt-2 mb-1 border-[1px] border-gray-500 bg-transparent focus:ring-red-b focus:border-transparent"
                        />
                    </div>

                    <div className="flex flex-col align-middle mx-2 flex-grow w-[45%] text-sm lg:text-base xl:text-lg">
                        <label htmlFor="title" className="text-center">Titre</label>
                        <input 
                            name="title" 
                            required 
                            defaultValue={article.Titre} 
                            className="mb-1 border-[1px] h-10 border-gray-500 bg-transparent focus:ring-red-b focus:border-transparent"
                        />
                    </div>
                    
                    <div className="flex flex-col align-middle w-[20%] text-sm lg:text-base xl:text-lg">
                        <label htmlFor="Price" className="text-white">Prix</label>
                        <input name="Price" type="number" 
                            defaultValue={article.Prix} 
                            className="mb-1 border-[1px] border-gray-500 bg-transparent focus:ring-red-b focus:border-transparent" 
                        />
                    </div>
                </div>

                <label htmlFor="description" className="text-center text-sm lg:text-base xl:text-lg">Description</label>
                <textarea 
                    name="description" 
                    cols={30} 
                    rows={5}
                    defaultValue={article.Description}
                    className="mb-1 border-[1px] border-gray-500 bg-transparent focus:ring-red-b focus:border-transparent text-sm lg:text-base xl:text-lg"
                />

                <input type="submit" value="Modifier" className="mb-2 text-sm lg:text-base xl:text-lg font-semibold px-3 py-1 bg-black rounded-md border-2 border-red hover:border-white" />
                <button className="text-sm lg:text-base xl:text-lg font-semibold px-3 py-1 bg-black rounded-md border-2 border-red hover:border-white mb-2" onClick={handleDelete}>
                    Suprimer l&apos;article
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