import Image from "next/image";
import { EventsData } from "../../types";

interface DisplayEventProps {
    event: EventsData
}

function DisplayEvent({ event }: DisplayEventProps) {

    return (
        <div className="group relative w-full h-full shadow-sm shadow-black/30 hover:shadow-black/80 overflow-hidden">
            <Image
                src={
                    event.image ?
                    'https://rockneatdb.pockethost.io/' + 'api/files/' + event.collectionId + '/' + event.id + '/' + event.image
                    : event.title ? '/no-event.jpg' : '/placeholder.png'
                }
                width={1500}
                height={1500}
                alt='oui'
                className="object-cover w-full h-full z-10"
            />
            <div className="absolute w-[60%] m-auto top-[12%] left-[20%] z-30">
                {event.status ?
                    <div className={
                        `w-full m-auto text-[8px] min-[375px]:text-[10px] sm:text-xs lg:text-sm font-bold text-center ${
                        event.status === "ANNULÉ" ? "bg-red" :
                        event.status === "REPORTÉ" ? "bg-yellow-300" :
                        "bg-green-500"
                    }`}>
                        {event.status}
                    </div>
                :
                    <div className="w-full h-5 m-auto"></div>
                }
            </div>
            <div className='absolute w-full h-full top-0 bg-gradient-to-tr from-black/100 to-white/10 group-hover:bg-white/5'/>
            <div className="absolute right-[0%] top-[0%] p-1 text-center w-fit px-1 mb-1 text-[8px] min-[375px]:text-[10px] sm:text-xs xl:text-sm font-bold bg-red">
                { (new Date(event.date).toLocaleDateString('fr-FR', {weekday: 'long', day: '2-digit', month: 'long'})).toUpperCase() }
            </div>
            <div className="group absolute w-[90%] h-[70%] bottom-[10%] left-[5%] z-30">
                <div className="absolute flex flex-col w-full transform place-content-end bottom-[5%] animate-slide-top group-hover:animate-slide-bottom">
                    <h1 className="text-left text-[8px] min-[375px]:text-[10px] sm:text-xs xl:text-sm font-bold">{ event.title.toUpperCase() }</h1>
                    <h1 className="hidden transform group-hover:flex text-left text-[8px] min-[375px]:text-[10px] sm:text-xs xl:text-sm font-bold">{ event.description }</h1>
                    { event.link ?
                        <a href={event.link} target="_blank" className="hidden group-hover:flex flex-row self-center w-fit h-4 sm:h-6 px-2 my-1 text-[8px] min-[375px]:text-[10px] sm:text-xs xl:text-sm font-bold bg-red">
                            <span className="m-auto">Réserver</span>
                            <Image
                                src="/ticket.svg"
                                width={20}
                                height={20}
                                alt="Administration"
                                className="ml-1 filter-white"
                            />
                        </a>
                        : event.title && 
                            <div className="hidden transform group-hover:flex transition-all duration-200 flex-row self-center w-fit h-5 px-2 my-1 text-[8px] min-[375px]:text-[10px] sm:text-xs lg:text-sm font-bold bg-red">
                                <span className="m-auto">Prix Libre</span>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

interface MainEventsProps {
    db_events: EventsData[]
}

export default function MainEvents ({ db_events }: MainEventsProps) {
    const actualDate = new Date()
    let index = 0

    while ((new Date(db_events[index].date)).toISOString() < actualDate.toISOString()) {
        index++
    }

    return (
        <div className="flex flex-row">
            <div className="relative w-full sm:w-[49.5%] lg:w-[24.4%] aspect-[2/3] m-1 sm:m-[0.25%] lg:m-[0.3%] animate-slide-bottom-d1">
                <DisplayEvent event={db_events[index + 0]} />
            </div>
            <div className="relative w-full sm:w-[49.5%] lg:w-[24.4%] aspect-[2/3] m-1 sm:m-[0.25%] lg:m-[0.3%] animate-slide-bottom-d2">
                <DisplayEvent event={db_events[index + 1]} />
            </div>
            <div className="hidden sm:flex relative w-full sm:w-[49.5%] lg:w-[24.4%] aspect-[2/3] m-1 sm:m-[0.25%] lg:m-[0.3%] animate-slide-bottom-d3">
                <DisplayEvent event={db_events[index + 2]} />
            </div>
            <div className="hidden lg:flex relative w-full sm:w-[49.5%] lg:w-[24.4%] aspect-[2/3] m-1 sm:m-[0.25%] lg:m-[0.3%] animate-slide-bottom-d4">
                <DisplayEvent event={db_events[index + 3]} />
            </div>
        </div>
    )
}