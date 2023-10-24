import Image from 'next/image'

async function getTicketing() {
    const res = await fetch(
        'http://127.0.0.1:8090/api/collections/Ticketing/records?page=1&perPage=30', 
        { cache: 'no-store' }
    );
    const data = await res.json();
    return data?.items as any[];
}

export default async function BilleteriePage() {
    const tickets = await getTicketing();

    return (
        <div className='flex flex-col m-auto'>
            <h1>Billeterie</h1>
            <div>
                {tickets?.map((ticket) => {
                    return <Tickets key={ticket.id} ticket={ticket} />
                })}
            </div>
        </div>
    )
}

function Tickets({ ticket }: any) {
    const { id, image, title, description, prix, link } = ticket || {};
    
    return (
            <div>
                <Image
                    src={'http://127.0.0.1:8090/api/files/Ticketing/' + id + '/' + image}
                    width={50}
                    height={50}
                    alt={title}
                />
                <h2>{title}</h2>
                <h5>{description}</h5>
                <p>{prix}</p>
                <a href={link}>Réserver</a>
            </div>
    )
}