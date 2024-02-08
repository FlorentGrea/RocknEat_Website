import SubmitButtonCarte from "./SubmitButtonCarte";
import { revalidatePath } from "next/cache";
import { promises as fs } from "fs";
import Image from "next/image";
import path from "path";

export default function MooveRubriqueAdmin({ carte, rubrique }: any) {
    const actual_path = path.join(process.cwd(), 'json')
    let ordreMax = 0
    
    carte.map((rubrique: any) => {
        if (rubrique.ordre > ordreMax)
            ordreMax = rubrique.ordre
    })

    async function mooveUp () {
        'use server'
        
        for (let index = 0; carte[index]; index++) {
            if (carte[index].ordre == rubrique.ordre - 1)
                carte[index].ordre = rubrique.ordre
            else if (carte[index].ordre == rubrique.ordre) 
                carte[index].ordre = rubrique.ordre - 1
            console.log(carte[index], carte[index].ordre)
        }
        await fs.writeFile(actual_path + '/carteData.json', JSON.stringify(carte))
        revalidatePath("/Carte");
    }

    async function mooveDown() {
        'use server'

        for (let index = 0; carte[index]; index++) {
            if (carte[index].ordre == rubrique.ordre + 1)
                carte[index].ordre = rubrique.ordre
            else if (carte[index].ordre == rubrique.ordre) 
                carte[index].ordre = rubrique.ordre + 1
        }
        await fs.writeFile(actual_path + '/carteData.json', JSON.stringify(carte))
        revalidatePath("/Carte");
    }

    return (
        <div className="flex flex-row ml-2" id={"modify" + '3R' + rubrique.ordre}>
            { (rubrique.ordre != 0) &&
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
            { (rubrique.ordre != ordreMax) &&
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