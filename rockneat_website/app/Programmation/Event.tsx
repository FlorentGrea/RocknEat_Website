'use client'

import Image from "next/image";
import { useState } from 'react';
import { EventsData } from "../types";

interface TextWithLinksProps {
    text: string;
}

function TextWithLinks ({ text }: TextWithLinksProps ) {
    const parts = text.split(/(https?:\/\/[^\s]+|www\.[^\s]+)/gi);
  
    return (
        <p className="text-sm font-semibold">
            {parts.map((part, index) => {
                if (part.match(/(https?:\/\/|www\.)/i)) {
                    const url = part.startsWith('http') ? part : `http://${part}`;

                    return (
                        <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="font-bold">
                            {part}
                        </a>
                    );
                }
                else {
                    return (
                        <span key={index}>
                            {part}
                        </span>
                    );
                }
            })}
        </p>
    );
};

interface EventProps {
    Event: EventsData
    hour: string
    endHour: string
    date: string
}

export default function Event ({ Event, hour, endHour, date }: EventProps) {
    const [buttonClicked, setButtonClicked] = useState(false);
    
    const handleClick = () => {
        setButtonClicked(!buttonClicked);
    };

    return (
        <div className="relative w-full sm:w-[49.5%] lg:w-[24.4%] aspect-square m-1 sm:m-[0.25%] lg:m-[0.3%]">
            <Image
                src={
                    Event.image ?
                    'https://rockneatdb.pockethost.io/' + 'api/files/' + Event.collectionId + '/' + Event.id + '/' + Event.image
                    : '/placeholder.png'
                }
                width={1500}
                height={1500}
                alt='oui'
                className="object-cover w-full h-full z-10"
            />
            <div className="absolute w-full h-full top-0 bg-black/50 z-20"/>
            <div className="absolute flex flex-col w-[80%] h-[70%] top-[15%] left-[10%] justify-center align-middle text-center z-30">
                {buttonClicked ?
                    <div className=" w-full break-words">
                        <button onClick={handleClick}>  
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth={1.5} 
                                stroke="currentColor" 
                                className="w-10 h-10"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                            </svg>
                        </button>
                        <TextWithLinks text={Event.description}/>
                        {
                            Event.link &&
                                <button className='text-center m-auto bg-white text-black hover:text-red font-semibold py-1 my-2 px-4 border rounded border-transparent'>
                                    <a href={Event.link} target="_blank">Réservez</a>
                                </button>
                        }
                    </div>
                :
                    <div className="flex flex-col w-full break-words">
                        <div>
                            {Event.status ?
                                <div className={
                                    `w-20 h-5 m-auto text-sm font-bold pb-1 ${
                                    Event.status === "ANNULÉ" ? "bg-red" :
                                    Event.status === "REPORTÉ" ? "bg-yellow-300" :
                                    "bg-green-500"
                                }`}>
                                    {Event.status}
                                </div>
                            :
                                <div className="w-40 h-5 m-auto pb-1"></div>
                            }
                            <div className="text-sm font-bold">{date}</div>
                            <div className="text-xs font-bold">{hour + ' - ' + endHour}</div>
                            <h1 className="text-base font-extrabold">{Event.title.toUpperCase()}</h1>
                        </div>
                        <button onClick={handleClick} className="m-auto">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth={1.5} 
                                stroke="currentColor" 
                                className="w-10 h-10"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>            
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}
