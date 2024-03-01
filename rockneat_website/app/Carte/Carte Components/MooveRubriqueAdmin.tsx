import SubmitButtonCarte from "./SubmitButtonCarte";
import { revalidatePath } from "next/cache";
import PocketBase from 'pocketbase';
import Image from "next/image";

export default function MooveRubriqueAdmin({ carte, rubrique }: any) {
    let ordreMax = 0
    
    carte.map((rubrique: any) => {
        if (rubrique.ordre > ordreMax)
            ordreMax = rubrique.ordre
    })

    async function mooveUp () {
        'use server'
        
        const pb = new PocketBase(process.env.DB_ADDR);
        for (let index = 0; carte[index]; index++) {
            if (carte[index].ordre == rubrique.ordre - 1)
                carte[index].ordre = rubrique.ordre
            else if (carte[index].ordre == rubrique.ordre) 
                carte[index].ordre = rubrique.ordre - 1
        }
        const jsonData = {
            "json_file": JSON.stringify(carte)
        }
        await pb.collection('Jsons').update('emip3npy7ntnwse', jsonData);
        revalidatePath("/Carte");
    }

    async function mooveDown() {
        'use server'

        const pb = new PocketBase(process.env.DB_ADDR);
        for (let index = 0; carte[index]; index++) {
            if (carte[index].ordre == rubrique.ordre + 1)
                carte[index].ordre = rubrique.ordre
            else if (carte[index].ordre == rubrique.ordre) 
                carte[index].ordre = rubrique.ordre + 1
        }
        const jsonData = {
            "json_file": JSON.stringify(carte)
        }
        await pb.collection('Jsons').update('emip3npy7ntnwse', jsonData);
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