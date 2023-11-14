import { MenuData } from "../types";

interface CarteProps {
    carte: MenuData
}

function Carte({ carte }: CarteProps) {
    return (
            <div className="flex flex-col mb-3">
                <div className="flex flex-row w-64">
                    {
                        carte.Vege &&
                            <p className="mr-1 text-sm leading-6 text-green-500">{carte.Vege ? "VÉGÉ • " : ""}</p>
                    }
                    <p className="font-bold flex-grow">{carte.Titre}</p>
                    <p>{carte.Prix} €</p>
                </div>
                <p className="text-sm w-full">{carte.Description}</p>
            </div>
    )
}

async function getMenu() {
    const res = await fetch(
        'http://127.0.0.1:8090/api/collections/Carte/records?page=1&perPage=60', 
        { cache: 'no-store' }
    );
    const data = await res.json();
    return data?.items as MenuData[];
}

export default async function CartePage() {
    const Menu = await getMenu();

    return (
        <div className='flex flex-col m-auto w-full'>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-center py-5">CARTE</h1>
            <div className="flex flex-col sm:hidden justify-between w-full">
                <div className="w-full bg-black/70 p-3 mb-2">
                    <h1 className="text-xl font-bold">BIERES</h1>
                    <p>15 bières à la pression <br /> + de 150 bières en bouteilles</p>
                    <p className="text-red">Bières à la pression du moment :</p>
                    {Menu?.map((carte) => {
                        if (carte.Type == "Beer")
                            return <h1 key={carte.id}>{carte.Titre}</h1>
                    })}
                </div>
                <div className="w-full bg-black/70 p-3 mb-2">
                    <h1 className="text-xl font-bold">PIZZAS</h1>
                    <p className="text-red">environ 30 cm</p>
                    {Menu?.map((carte) => {
                        if (carte.Type == "Pizza")
                            return <Carte key={carte.id} carte={carte} />
                    })}
                </div>
                <div className="w-full bg-black/70 p-3 mb-2">
                    <h1 className="text-xl font-bold">BURGERS</h1>
                    <p className="text-red">Servi avec des frites</p>
                    {Menu?.map((carte) => {
                        if (carte.Type == "Burger")
                            return <Carte key={carte.id} carte={carte} />
                    })}
                </div>
                <div className="w-full bg-black/70 p-3 mb-2">
                    <h1 className="text-xl font-bold">BONUS TRACK !</h1>
                    {Menu?.map((carte) => {
                        if (carte.Type == "Bonus")
                            return <Carte key={carte.id} carte={carte} />
                    })}
                </div>
            </div>
            <div className="sm:flex flex-row hidden justify-between w-full">
                <div className="w-[49%]">
                    <div className="w-full bg-black/70 p-3 mb-4">
                        <h1 className="text-xl font-bold">PIZZAS</h1>
                        <p className="text-red">environ 30 cm</p>
                        {Menu?.map((carte) => {
                            if (carte.Type == "Pizza")
                                return <Carte key={carte.id} carte={carte} />
                        })}
                    </div>
                    <div className="w-full bg-black/70 p-3 mb-4">
                        <h1 className="text-xl font-bold">BONUS TRACK !</h1>
                        {Menu?.map((carte) => {
                            if (carte.Type == "Bonus")
                                return <Carte key={carte.id} carte={carte} />
                        })}
                    </div>
                </div>
                <div className="w-[49%]">
                    <div className="w-full bg-black/70 p-3 mb-4">
                        <h1 className="text-xl font-bold">BIERES</h1>
                        <p>15 bières à la pression <br /> + de 150 bières en bouteilles</p>
                        <p className="text-red">Bières à la pression du moment :</p>
                        {Menu?.map((carte) => {
                            if (carte.Type == "Beer")
                                return <h1 key={carte.id}>{carte.Titre}</h1>
                        })}
                    </div>
                    <div className="w-full bg-black/70 p-3 mb-4">
                        <h1 className="text-xl font-bold">BURGERS</h1>
                        <p className="text-red">Servi avec des frites</p>
                        {Menu?.map((carte) => {
                            if (carte.Type == "Burger")
                                return <Carte key={carte.id} carte={carte} />
                        })}
                    </div>
                </div>
                
            </div>
        </div>
    )
}