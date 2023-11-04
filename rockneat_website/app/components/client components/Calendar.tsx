'use client'

import { useState } from "react";
import "../../globals.css"

interface TextWithLinksProps {
    text: string;
}
  
const TextWithLinks: React.FC<TextWithLinksProps> = ({ text }) => {
    const parts = text.split(/(https?:\/\/[^\s]+|www\.[^\s]+)/gi);
  
    return (
        <p className="text-sm">
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

function Day ({ db_events, day, week }: any) {
    const [buttonClicked, setButtonClicked] = useState(false);
    const Jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    const today = new Date();
    const actual = new Date(today.setDate(today.getDate() - today.getDay() + day + week));
    const db_event = db_events.find((event: any) => {
        const db_date = new Date(event.start)
        if (db_date.toDateString() == actual.toDateString()) {
            return (event)
        }
        return (null)
    });

    const handleClick = () => {
        setButtonClicked(!buttonClicked);
    };

    const divStyle = "flex flex-col w-full h-30 my-1 bg-red-b border border-transparent rounded-lg "
    const evenDivStyle = divStyle + "justify-end"
    const unevenDivStyle = divStyle + "justify-start"

    return (
        <div className={day % 2 ? unevenDivStyle : evenDivStyle}>
            <div className="w-full text-xs text-center pb-1">
                {Jours[day - 1] + ' ' + actual.getDate() + ' ' + actual.toDateString().substring(4,7)}
            </div>
            <div className="flex flex-col">
                <h1 className={db_event ? "text-center sm:text-lg font-bold" : "text-center pb-2 text-xl font-bold"}>
                    {db_event ? db_event.title : "Fermé"}
                </h1>
                <div className="text-center">
                    {db_event ? (
                        <div>
                            <div>
                                {buttonClicked && (
                                    <TextWithLinks text={db_event.description}/>
                                )}
                            </div>
                            <button
                                onClick={handleClick}
                            >
                                {buttonClicked ?
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        strokeWidth={1.5} 
                                        stroke="currentColor" 
                                        className="w-6 h-6"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                    </svg>
                                :  
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        strokeWidth={1.5} 
                                        stroke="currentColor" 
                                        className="w-6 h-6"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg> 
                                }
                            </button>
                        </div>
                    ) : ""}
                </div>
            </div>
        </div>
    )
}

export default function Calendar ({ db_events }: any) {
    const [week, setWeek] = useState(0);
    const days = [1, 2, 3, 4, 5, 6, 7];
    const today = new Date();
    const firstDay = new Date(today.setDate(today.getDate() - today.getDay() + 1 + week));
    const lastDay = new Date(today.setDate(today.getDate() - today.getDay() + 7 + week));

    function NextWeek () {
        setWeek(week + 7);
    }

    function PreviousWeek () {
        setWeek(week - 7)
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row justify-between md:w-4/5">
                <button onClick={PreviousWeek} className="w-11">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="w-9 h-9 m-auto hover:filter-red"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>
                </button>
                <h1 className="w-40 text-center text-xl">
                    {firstDay.toDateString().substring(8,10) + ' ' + 
                        firstDay.toDateString().substring(4,7) + ' - ' +
                        lastDay.toDateString().substring(8,10) + ' ' + 
                        lastDay.toDateString().substring(4,7)}
                </h1>
                <button onClick={NextWeek} className="w-11">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="w-9 h-9 m-auto hover:filter-red"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </button>
            </div>
            <div className="flex flex-col w-full">
                {days.map((day: number) => {
                    return (
                        <Day key={day} db_events={db_events} day={day} week={week}/>
                    )
                })}
            </div>
        </div>
    )
}