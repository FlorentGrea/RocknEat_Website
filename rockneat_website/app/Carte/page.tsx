import CreateRubriqueAdmin from "./Carte Components/CreateRubriqueAdmin";
import ModifyRubriqueAdmin from "./Carte Components/ModifyRubriqueAdmin";
import CreateArticleAdmin from "./Carte Components/CreateArticleAdmin";
import MooveRubriqueAdmin from "./Carte Components/MooveRubriqueAdmin";
import ModifyArticleAdmin from "./Carte Components/ModifyArticleAdmin";
import MooveArticleAdmin from "./Carte Components/MooveArticleAdmin";
import { getSession } from "@auth0/nextjs-auth0";
import PocketBase from 'pocketbase';

async function Article({ carte, rubrique, article }: any) {
    const session = await getSession();
    const user = session?.user;

    return (
        <div className={"flex flex-col " + (article.Description && "mb-3 ")}>
            <div className="flex flex-row">
                { article.Vege &&
                    <p className="mr-1 text-sm leading-6 text-green-500" id={"modify" + 'R' + rubrique.ordre + '1A' + article.ordre}>
                        {article.Vege ? "VÉGÉ • " : ""}
                    </p>
                }
                <p className="font-bold flex-grow" id={"modify" + 'R' + rubrique.ordre + '2A' + article.ordre}>{article.Titre}</p>
                { article.Prix ?
                    <p id={"modify" + 'R' + rubrique.ordre + '3A' + article.ordre}>
                        {article.Prix + ' €'}
                    </p> : []   
                }
                { user && <ModifyArticleAdmin carte={carte} rubrique={rubrique} article={article} />}
                { user && <MooveArticleAdmin carte={carte} rubrique={rubrique} article={article} />}
            </div>
            { article.Description && 
                <p className="text-sm w-full" id={"modify" + 'R' + rubrique.ordre + '4A' + article.ordre}>
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
    let key = 0

    Carte.sort((a: any, b: any) =>  a.ordre - b.ordre);

    Carte.map((rubrique: any, index: number) => {
        Carte[index].articles.sort((a: any, b: any) => a.ordre - b.ordre)
    })

    return (
        <div className='flex flex-col m-auto w-full'>
            { user && <CreateRubriqueAdmin Carte={Carte} />}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-center py-5">CARTE</h1>
            <div className="columns-1 md:columns-2 break-inside-auto gap-2 w-full">
                { Carte.map((rubrique: any) => {
                    return (
                        <div key={key++} className="inline-block w-full bg-black/70 p-3 mb-2">
                            <div className="flex flex-row">
                                <h1 className="text-xl font-bold mb-2 mr-1" id={"modify" + '1R' + rubrique.ordre}>{rubrique.type}</h1>
                                { user && <ModifyRubriqueAdmin carte={Carte} rubrique={rubrique} /> }
                                { user && <MooveRubriqueAdmin carte={Carte} rubrique={rubrique} />}
                            </div>
                            <p className="text-red whitespace-pre-line" id={"modify" + '2R' + rubrique.ordre}>{rubrique.description}</p>
                            { rubrique.articles.map((article: any) => {
                                return <Article key={key++} carte={Carte} rubrique={rubrique} article={article} />
                            })}
                            { user && <CreateArticleAdmin carte={Carte} rubrique={rubrique} />}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}