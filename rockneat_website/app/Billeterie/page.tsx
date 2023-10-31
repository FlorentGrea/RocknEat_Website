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
        <div className='flex flex-col items-center m-auto'>
            {tickets?.map((ticket) => {
                return <Tickets key={ticket.id} ticket={ticket} />
            })}
        </div>
    )
}

function Tickets({ ticket }: any) {
    const { id, image, title, description, date, prix, link } = ticket || {};
    
    return (
        <div className='flex flex-col w-full items-center'>
            <div className="flex flex-col md:flex-row items-center md:justify-between md:w-4/5 h-30 my-3">
                <div className='flex flex-col md:flex-row items-center'>
                        <Image
                            src={'http://127.0.0.1:8090/api/files/Ticketing/' + id + '/' + image}
                            width={110}
                            height={110}
                            alt={title}
                        />
                    <div className="flex flex-col w-full text-center md:text-start mx-4 align-middle">
                        <h1 className="font-bold mb-2">{title}</h1>
                        <p>{date}</p>
                        <p className='text-xs'>{description}</p>
                        <p className='text-xs'>{prix}</p>
                    </div>
                </div>
                <button className='flex text-center md:justify-end bg-gray-900 font-semibold hover:text-red-b py-1 my-2 px-4 border rounded border-transparent overflow-hidden'>
                    <a href={link} target="_blank">Réservez</a>
                </button>
            </div>
            <hr className='w-4/5 my-3 border border-red-b' />
        </div>
    )
}