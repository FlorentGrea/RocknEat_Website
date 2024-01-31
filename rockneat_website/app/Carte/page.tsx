import { getSession } from "@auth0/nextjs-auth0";
import CarteAdmin from "./CarteAdmin";
import RubriqueAdmin from "./RubriqueAdmin";

async function Article(article: any) {
    article = article.article
    const session = await getSession();
    const user = session?.user;

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
        </div>
    )
}

export default async function CartePage()
{
    const session = await getSession();
    const user = session?.user;
    const response = await fetch(process.env.API_ACCESS + 'api/Carte', { cache: 'no-store' })
    const Carte = await response.json()
    const Col1: any = []
    const Col2: any = []
    let key = 0

    Carte.sort((a: any, b: any) =>  a.ordre - b.ordre);

    Carte.map((rubrique: any, index: number) => {
        Carte[index].articles.sort((a: any, b: any) => a.ordre - b.ordre)
    })

    Carte.map((rubrique: any) => {
        if (rubrique.ordre % 2 == 0)
            Col1.push(rubrique)
        else
            Col2.push(rubrique)
    })
    
    return (
        <div className='flex flex-col m-auto w-full'>
            { user &&
                <CarteAdmin carte={Carte} />
            }
            <h1 className="text-2xl sm:text-4xl font-extrabold text-center py-5">CARTE</h1>
            <div className="flex flex-col sm:hidden justify-between w-full">
                { Carte.map((rubrique: any) => {
                    if (user)
                        return (<RubriqueAdmin key={key++} carte={Carte} rubrique={rubrique} />)
                    return (
                        <div key={key++} className="w-full bg-black/70 p-3 mb-2">
                            <h1 className="text-xl font-bold mb-2">{rubrique.type}</h1>
                            <p className="text-red whitespace-pre-line">{rubrique.description}</p>
                            { rubrique.articles.map((article: any) => {
                                return <Article key={key++} article={article} />
                            })}
                        </div>
                    )
                })}
            </div>
            <div className="sm:flex flex-row hidden justify-between w-full">
                <div className="w-[49%]">
                    { Col1.map((rubrique: any) => {
                        if (user)
                            return (<RubriqueAdmin key={key++} carte={Carte} rubrique={rubrique} />)
                        return (
                            <div key={key++} className="w-full bg-black/70 p-3 mb-4">
                                <h1 className="text-xl font-bold mb-2">{rubrique.type}</h1>
                                <p className="text-red">{rubrique.description}</p>
                                { rubrique.articles.map((article: any) => {
                                    return <Article key={key++} article={article} />
                                })}
                            </div>
                        )
                    })}
                </div>
                <div className="w-[49%]">
                    { Col2.map((rubrique: any) => {
                        if (user)
                            return (<RubriqueAdmin key={key++} carte={Carte} rubrique={rubrique} />)
                        return (
                            <div key={key++} className="w-full bg-black/70 p-3 mb-4">
                                <h1 className="text-xl font-bold mb-2">{rubrique.type}</h1>
                                <p className="text-red">{rubrique.description}</p>
                                { rubrique.articles.map((article: any) => {
                                    return <Article key={key++} article={article} />
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}