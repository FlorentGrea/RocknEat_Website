async function getCarte() {
    const res = await fetch(
        'http://127.0.0.1:8090/api/collections/Carte/records?page=1&perPage=30', 
        { cache: 'no-store' }
    );
    const data = await res.json();
    return data?.items as any[];
}

export default async function CartePage() {
    const items = await getCarte();

    return (
        <div>
            <h1>La carte</h1>
            <div>
                <h1>Beer</h1>
                {items?.map((carte) => {
                    if (carte.Type == "Beer")
                        return <Carte key={carte.id} carte={carte} />
                })}
            </div>
            <div>
                <h1>Pizzas</h1>
                {items?.map((carte) => {
                    if (carte.Type == "Pizza")
                        return <Carte key={carte.id} carte={carte} />
                })}
            </div>
            <div>
                <h1>Burgers</h1>
                {items?.map((carte) => {
                    if (carte.Type == "Burger")
                        return <Carte key={carte.id} carte={carte} />
                })}
            </div>
            <div>
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
    const { id, Titre, Description, Prix } = carte || {};
    
    return (
            <div>
                <h2>{Titre}</h2>
                <h5>{Description}</h5>
                <p>{Prix}</p>
            </div>
    )
}