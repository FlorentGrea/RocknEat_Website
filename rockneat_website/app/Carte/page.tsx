import { getSession } from "@auth0/nextjs-auth0";
import PocketBase from 'pocketbase';
import AdminCartePage from "./Carte Components/AdminCartePage";

async function Article({ rubrique, article }: any) {

    return (
        <div className={"flex flex-col " + (article.Description && "mb-3 ")}>
            <div className="flex flex-row">
                { article.Vege &&
                    <p className="mr-1 text-sm lg:text-base xl:text-lg font-bold leading-6 text-green-500" id={"modify" + 'R' + rubrique.id + '1A' + article.id}>
                        {article.Vege ? "VÉGÉ • " : ""}
                    </p>
                }
                <p className="text-sm lg:text-base xl:text-lg font-bold flex-grow" id={"modify" + 'R' + rubrique.id + '2A' + article.id}>{article.Titre}</p>
                { article.Prix ?
                    <p id={"modify" + 'R' + rubrique.id + '3A' + article.id}>
                        {article.Prix + ' €'}
                    </p> : []   
                }
            </div>
            { article.Description && 
                <p className="text-xs lg:text-sm xl:text-base w-full" id={"modify" + 'R' + rubrique.id + '4A' + article.id}>
                    {article.Description}
                </p> 
            }
        </div>
    )
}

export default async function CartePage() {
    const pb = new PocketBase(process.env.DB_ADDR);
    const record = await pb.collection('Jsons').getOne('emip3npy7ntnwse', { cache: 'no-store' })
    const Carte = JSON.parse(JSON.stringify(record.json_file))
    const session = await getSession();
    const user = session?.user;
    let slide = 1

    if (user)
        return (<AdminCartePage Carte={Carte}/>)

    return (
        <div className='flex flex-col m-auto w-full mt-4 sm:mt-6 md:mt-8 lg:mt-14'>
            <div className="columns-1 md:columns-2 break-inside-auto gap-2 w-full">
                { Carte.map((rubrique: any) => {
                    return (
                        <div key={rubrique.id} className={`inline-block w-full bg-black bg-gradient-to-tl from-red/20 via-black to-black shadow-sm shadow-black/30 p-3 mb-2 animate-slide-bottom-d${slide++}`}>
                            <div className="flex flex-row">
                                <h1 className="text-sm lg:text-base xl:text-lg font-bold mb-2 mr-1" id={"modify" + '1R' + rubrique.id}>{rubrique.type}</h1>
                            </div>
                            <p className="text-xs lg:text-sm xl:text-base text-red font-semibold whitespace-pre-line" id={"modify" + '2R' + rubrique.id}>{rubrique.description}</p>
                            { rubrique.articles.map((article: any) => {
                                return <Article key={article.id} rubrique={rubrique} article={article} />
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}