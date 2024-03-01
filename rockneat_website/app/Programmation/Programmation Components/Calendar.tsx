'use client'

import { useState } from "react";
import { EventsData } from "../../types";
import Image from "next/image";

interface displayEventsProps {
    db_events: EventsData[]
    chosenDate: Date
}

function DisplayEvents({ db_events, chosenDate }: displayEventsProps) {
    let key = 0
    const actualDate = new Date()
    const firstDay = new Date(chosenDate.getFullYear(), chosenDate.getMonth(), 1);
    let firstMonday = new Date(chosenDate.getFullYear(), chosenDate.getMonth(), firstDay.getDay() * -1 + 2)
    var lastDay = new Date(chosenDate.getFullYear(), chosenDate.getMonth() + 1, 0);
    const dateArr = []
    while (firstMonday <= lastDay) {
        const dayEvent = {
            date: new Date(firstMonday),
            event: {}
        }
        db_events.map((event: EventsData) => {
            const eventDate = new Date(event.date)
            if (eventDate.toDateString() == firstMonday.toDateString())
                dayEvent.event = event
        })
        dateArr.push(dayEvent)
        firstMonday = new Date(firstMonday.setDate(firstMonday.getDate() + 1));
    }

    return (
        <div className="w-full">
            <div className="flex flex-col md:hidden">
                {
                    dateArr.map((el: any) => {
                        const date = new Date(el.event.date)

                        if (el.event.title && date >= firstDay) {
                            return (
                                <div  key={key++ + 'smallscreen'} className="group relative h-24 mb-1 shadow-sm shadow-black/30 transform hover:h-56 transition-all duration-300 overflow-hidden">
                                    { el.date.toDateString() == actualDate.toDateString() && <div className="absolute w-full h-full border-solid border-2 border-red z-30"/>}
                                    <div className="absolute flex items-center justify-center text-center text-[10px] sm:text-[12px] lg:text-[11px] font-bold w-[18%] h-6 top-0 right-0 bg-red z-40">
                                        { el.date.toLocaleString('fr-FR', {day: 'numeric' })}
                                    </div>
                                    <Image
                                        src={
                                            el.event.image ?
                                            ('https://rockneatdb.pockethost.io/' + 'api/files/' + el.event.collectionId + '/' + el.event.id + '/' + el.event.image)
                                            : (el.event.title ? '/no-event.jpg' : '/placeholder.png')
                                        }
                                        width={1500}
                                        height={1500}
                                        alt='coucou'
                                        className="object-cover w-full h-full z-10"
                                    /> 
                                    <div className="absolute w-full h-full top-0 bg-gradient-to-tr from-black/80 z-20"/>
                                    <div className="absolute w-[60%] m-auto top-[12%] left-[20%] z-30">
                                        {el.event.status ?
                                            <div className={
                                                `w-full m-auto text-[10px] sm:text-[12px] lg:text-[11px] font-bold text-center ${
                                                el.event.status === "ANNULÉ" ? "bg-red" :
                                                el.event.status === "REPORTÉ" ? "bg-yellow-300" :
                                                "bg-green-500"
                                            }`}>
                                                {el.event.status}
                                            </div>
                                        :
                                            <div className="w-full h-5 m-auto"></div>
                                        }
                                    </div>
                                    <div className="absolute flex flex-col place-content-end w-[90%] h-[70%] bottom-[10%] left-[5%] z-30">
                                        <div className="text-left text-[10px] sm:text-[12px] lg:text-[11px] font-bold">{el.event.title ? date.getHours() - 1 + 'H' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() : ''}</div>
                                        <h1 className="text-left text-[10px] sm:text-[12px] lg:text-[11px] font-bold">{el.event.title ? el.event.title.toUpperCase() : 'FERMÉ' }</h1>                  
                                        <div className="hidden group-hover:flex flex-col place-content-end">
                                            <h1 className="text-left text-[8px] min-[375px]:text-[10px] sm:text-xs lg:text-sm font-bold">{ el.event.description }</h1>
                                            { el.event.link ?
                                                <a href={el.event.link} target="_blank" className="hidden group-hover:flex flex-row self-center w-fit h-5 px-2 my-1 text-[8px] min-[375px]:text-[10px] sm:text-xs lg:text-sm font-bold bg-red">
                                                    <span className="m-auto">Réserver</span>
                                                    <Image
                                                        src="/ticket.svg"
                                                        width={20}
                                                        height={20}
                                                        alt="Administration"
                                                        className="ml-1 filter-white"
                                                    />
                                                </a>
                                            : el.event.title && 
                                                <div className="hidden transform group-hover:flex transition-all duration-200 flex-row self-center w-fit h-5 px-2 my-1 text-[8px] min-[375px]:text-[10px] sm:text-xs lg:text-sm font-bold bg-red">
                                                    <span className="m-auto">Prix Libre</span>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    { el.date < firstDay && <div className="absolute w-full h-full top-0 bg-white/50 z-50"/> }
                                </div>
                    )}})
                }
            </div>
            <div className="hidden md:flex flex-col">
                <div className="flex flex-row">
                    <div className="w-[14%] mr-[0.28%] mb-[0.28%] text-center bg-red bg-gradient-to-tl from-black/40 via-red to-red">Lundi</div>
                    <div className="w-[14%] mr-[0.28%] mb-[0.28%] text-center bg-red bg-gradient-to-tl from-black/40 via-red to-red">Mardi</div>
                    <div className="w-[14%] mr-[0.28%] mb-[0.28%] text-center bg-red bg-gradient-to-tl from-black/40 via-red to-red">Mercredi</div>
                    <div className="w-[14%] mr-[0.28%] mb-[0.28%] text-center bg-red bg-gradient-to-tl from-black/40 via-red to-red">Jeudi</div>
                    <div className="w-[14%] mr-[0.28%] mb-[0.28%] text-center bg-red bg-gradient-to-tl from-black/40 via-red to-red">Vendredi</div>
                    <div className="w-[14%] mr-[0.28%] mb-[0.28%] text-center bg-red bg-gradient-to-tl from-black/40 via-red to-red">Samedi</div>
                    <div className="w-[14%] mr-[0.28%] mb-[0.28%] text-center bg-red bg-gradient-to-tl from-black/40 via-red to-red">Dimanche</div>
                </div>
                <div className="flex flex-wrap w-full">
                    {
                        dateArr.map((el: any) => {
                            const date = new Date(el.event.date)

                            return (
                                <div key={key++ + 'bigscreen'} className={`group relative w-[14%] aspect-square mr-[0.28%] mb-[0.28%] z-20 ${el.date.toDateString() == actualDate.toDateString() && "border-solid border-2 border-red z-30"} overflow-hidden`}>
                                    <div className="absolute flex items-center justify-center text-center text-[10px] sm:text-[12px] lg:text-[11px] font-bold w-[18%] h-[18%] top-0 right-0 bg-red z-[60]">
                                        { el.date.toLocaleString('fr-FR', {day: 'numeric' })}
                                    </div>
                                    <Image
                                        src={
                                            el.event.image ?
                                            'https://rockneatdb.pockethost.io/' + 'api/files/' + el.event.collectionId + '/' + el.event.id + '/' + el.event.image
                                            : el.event.title ? '/no-event.jpg' : '/placeholder.png'
                                        }
                                        width={1500}
                                        height={1500}
                                        alt='coucou'
                                        className="object-cover w-full h-full"
                                    />
                                    <div className="absolute w-[60%] m-auto top-[12%] left-[20%] z-30">
                                        {el.event.status ?
                                            <div className={
                                                `w-full m-auto text-[8px] lg:text-[11px] font-bold text-center ${
                                                el.event.status === "ANNULÉ" ? "bg-red" :
                                                el.event.status === "REPORTÉ" ? "bg-yellow-300" :
                                                "bg-green-500"
                                            }`}>
                                                {el.event.status}
                                            </div>
                                        :
                                            <div className="w-full h-5 m-auto"></div>
                                        }
                                    </div>
                                    <div className={`absolute top-0 w-full h-full bg-gradient-to-tr ${el.event.title ? "from-black/70" : "from-black/100"} to-white/10 group-hover:bg-red/50`}/>
                                    <div className="group absolute flex flex-col place-content-end w-[90%] h-[70%] bottom-[10%] left-[5%]">
                                        <div className="text-left text-[8px] lg:text-[11px] font-bold">{el.event.title ? date.getHours() - 1 + 'H' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() : ''}</div>
                                        <h1 className="text-left text-[8px] lg:text-[11px] font-bold">{el.event.title ? el.event.title.toUpperCase() : 'FERMÉ' }</h1>
                                        { el.event.link ? 
                                            <a href={el.event.link} target="_blank" className="hidden transform group-hover:flex transition-all duration-200 flex-row self-center w-fit h-5 px-2 my-1 text-[8px] min-[375px]:text-[10px] sm:text-xs lg:text-sm font-bold bg-red">
                                                <span className="m-auto">Réserver</span>
                                                <Image
                                                    src="/ticket.svg"
                                                    width={20}
                                                    height={20}
                                                    alt="Administration"
                                                    className="ml-1 filter-white"
                                                />
                                            </a>
                                            : el.event.title && 
                                                <div className="hidden transform group-hover:flex transition-all duration-200 flex-row self-center w-fit h-5 px-2 my-1 text-[8px] min-[375px]:text-[10px] sm:text-xs lg:text-sm font-bold bg-red">
                                                    <span className="m-auto">Prix Libre</span>
                                                </div>
                                        }
                                    </div>
                                </div>
                        )})
                    }
                </div>
            </div>
        </div>
    )
}

interface EventsProps {
    db_events: EventsData[]
}

export default function Calendar ({ db_events }: EventsProps) {
    const [ chosenDate, setChosenDate ] = useState(new Date())
    const [ slideOrder, setSlideOrder ] = useState(true)

    function handleClick(value: number) {
        if (value == -1) {
            setChosenDate(new Date(chosenDate.setMonth(chosenDate.getMonth() - 1)))
            setSlideOrder(false)
        }
        else {
            setChosenDate(new Date(chosenDate.setMonth(chosenDate.getMonth() + 1)))
            setSlideOrder(true)
        }
    }

    return (
        <div className="animate-slide-bottom-d5">
            <div className="flex flex-row bg-black bg-gradient-to-l from-red/40 via-black to-black h-10 mb-1 mt-3 z-40 shadow-sm shadow-black/30">
                <h1 className="flex items-center justify-center font-extrabold text-[11px] md:text-lg ml-2 md:ml-5 mr-2">
                    PROGRAMMATION
                </h1>
                <h1 className="flex items-center justify-center font-extrabold text-red text-[11px] md:text-lg mr-2">
                    { chosenDate.toLocaleString('fr-FR', { month: 'long' }).toUpperCase() }
                </h1>
                <h1 className="flex grow items-center font-extrabold text-red text-[11px] md:text-lg ">
                    { chosenDate.getFullYear() }
                </h1>
                <div className="flex flex-row mr-2 md:mr-6">
                    <button onClick={() => {handleClick(-1)}}>
                        <Image
                            src="/arrow-left.svg"
                            width={40}
                            height={40}
                            alt="Mail"
                            className="object-contain h-5 w-5 filter-white"
                        />
                    </button>
                    <button onClick={() => {handleClick(1)}}>
                        <Image
                            src="/arrow-right.svg"
                            width={40}
                            height={40}
                            alt="Mail"
                            className="object-contain h-5 w-5 filter-white"
                        />
                    </button>
                </div>
            </div>
            <div key={chosenDate.getTime()} className={`${slideOrder == true ? "animate-slide-right" : "animate-slide-left"}`}>
                <DisplayEvents db_events={db_events} chosenDate={new Date(chosenDate)}/>
            </div>
        </div>
    )
}