async function getCarte() {
    const res = await fetch(
        'http://127.0.0.1:8090/api/collections/Carte/records?page=1&perPage=60', 
        { cache: 'no-store' }
    );
    const data = await res.json();
    return data?.items as any[];
}

export default async function CartePage() {
    const items = await getCarte();
    console.log(items.length)

    items?.map((carte) => {
        console.log(carte.Titre)
    })

    return (
        <div className='flex flex-wrap m-auto w-full'>
            <div className="border border-red mb-2">
                <h1>Beer</h1>
                <p>15 bières à la pression + de 150 bières en bouteilles</p>
                <p>Bières à la pression du moment :</p>
                {items?.map((carte) => {
                    if (carte.Type == "Beer")
                        return <h1 key={carte.id}>{carte.Titre}</h1>
                })}
            </div>
            <div className="border border-red mb-2">
                <h1>Pizzas</h1>
                <p>environ 30 cm</p>
                {items?.map((carte) => {
                    if (carte.Type == "Pizza")
                        return <Carte key={carte.id} carte={carte} />
                })}
            </div>
            <div className="border border-red mb-2">
                <h1>Burgers</h1>
                <p>Servi avec des frites</p>
                {items?.map((carte) => {
                    if (carte.Type == "Burger")
                        return <Carte key={carte.id} carte={carte} />
                })}
            </div>
            <div className="border border-red mb-2">
                <h1>BONUS TRACK !</h1>
                {items?.map((carte) => {
                    if (carte.Type == "Bonus")
                        return <Carte key={carte.id} carte={carte} />
                })}
            </div>
        </div>
    )
}

function Carte({ carte }: any) {
    const { Vege, Titre, Description, Prix } = carte || {};
    
    return (
            <div className="flex flex-col w-full mb-3">
                <div className="flex flex-row w-full">
                    {
                        Vege &&
                            <p className="mr-1 text-sm leading-6 text-green-500">{Vege ? "VÉGÉ • " : ""}</p>
                    }
                    <p className="font-bold flex-grow">{Titre}</p>
                    <p>{Prix} €</p>
                </div>
                <p className="text-sm">{Description}</p>
            </div>
    )
}