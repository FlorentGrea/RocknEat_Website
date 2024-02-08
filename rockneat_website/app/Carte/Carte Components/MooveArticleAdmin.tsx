import SubmitButtonCarte from "./SubmitButtonCarte";
import { revalidatePath } from "next/cache";
import { promises as fs } from "fs";
import Image from "next/image";
import path from "path";

export default function MooveArticleAdmin({ carte, rubrique, article }: any) {
    const actual_path = path.join(process.cwd(), 'json')
    let ordreMax = 0
    
    rubrique.articles.map((article: any) => {
        if (article.ordre > ordreMax)
            ordreMax = article.ordre
    })

    async function mooveUp () {
        'use server'
        
        let r_index = 0
        let a_index_inf = 0
        let a_index = 0

        while (carte[r_index] && carte[r_index].type != rubrique.type)
            r_index++
        for (let index = 0; carte[r_index].articles[index]; index++) {
            if (carte[r_index].articles[index].ordre == article.ordre - 1)
                a_index_inf = index
            else if (carte[r_index].articles[index].ordre == article.ordre) 
                a_index = index
        }
        carte[r_index].articles[a_index_inf].ordre = article.ordre
        carte[r_index].articles[a_index].ordre = article.ordre - 1
        await fs.writeFile(actual_path + '/carteData.json', JSON.stringify(carte))
        revalidatePath("/Carte");
    }

    async function mooveDown() {
        'use server'
        
        let r_index = 0
        let a_index = 0
        let a_index_sup = 0

        while (carte[r_index] && carte[r_index].type != rubrique.type)
            r_index++
        for (let index = 0; carte[r_index].articles[index]; index++) {
            if (carte[r_index].articles[index].ordre == article.ordre)
                a_index = index
            else if (carte[r_index].articles[index].ordre == article.ordre + 1) 
                a_index_sup = index
        }
        carte[r_index].articles[a_index].ordre = article.ordre + 1
        carte[r_index].articles[a_index_sup].ordre = article.ordre
        await fs.writeFile(actual_path + '/carteData.json', JSON.stringify(carte))
        revalidatePath("/Carte");
    }

    return (
        <div className="flex flex-row" id={"modify" + 'R' + rubrique.ordre + '5A' + article.ordre}>
            { (article.ordre != 0) &&
                <form action={mooveUp}>
                    <input className="hidden"/>
                    <SubmitButtonCarte html={
                        <Image
                            src="/up.svg"
                            width={40}
                            height={40}
                            alt="Mail"
                            className="object-contain h-5 w-5 filter-white"
                        />}
                    />
                </form>
            }
            { (article.ordre != ordreMax) &&
                <form action={mooveDown}>
                    <input className="hidden"/>
                    <SubmitButtonCarte html={
                        <Image
                            src="/down.svg"
                            width={40}
                            height={40}
                            alt="Mail"
                            className="object-contain h-5 w-5 filter-white"
                        />}
                    />
                </form>
            }
        </div>
    )
}