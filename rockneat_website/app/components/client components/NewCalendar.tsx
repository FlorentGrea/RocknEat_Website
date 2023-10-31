'use client'

import { useState, useEffect } from "react";

interface TextWithLinksProps {
    text: string;
}
  
const TextWithLinks: React.FC<TextWithLinksProps> = ({ text }) => {
    const parts = text.split(/(https?:\/\/[^\s]+|www\.[^\s]+)/gi);
  
    return (
        <p>
            {parts.map((part, index) => {
                if (part.match(/(https?:\/\/|www\.)/i)) {
                    const url = part.startsWith('http') ? part : `http://${part}`;

                    return (
                        <a key={index} href={url} target="_blank" rel="noopener noreferrer">
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

    const divStyle = "flex flex-col w-full h-30 my-1 bg-red overflow-hidden "
    const evenDivStyle = divStyle + ""
    const unevenDivStyle = divStyle + ""

    return (
        <div className={day % 2 ? unevenDivStyle : evenDivStyle}>
            <div className="w-full text-center pb-1">
                {Jours[day - 1] + ' ' + actual.getDate() + ' ' + actual.toDateString().substring(4,7)}
            </div>
            <div className="flex flex-col">
                <h1 className="text-center pb-2 text-lg">
                    {db_event ? db_event.title : "Fermé"}
                </h1>
                <div className="text-center">
                    {db_event ? <TextWithLinks text={db_event.description} /> : ""}
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
                <button onClick={PreviousWeek} className="w-1/6 bg-blue-500">
                </button>
                <h1 className="text-center">
                    {firstDay.toDateString().substring(8,10) + ' ' + 
                        firstDay.toDateString().substring(4,7) + ' - ' +
                        lastDay.toDateString().substring(8,10) + ' ' + 
                        lastDay.toDateString().substring(4,7)}
                </h1>
                <button onClick={NextWeek} className="w-1/6 bg-green-500"></button>
            </div>
            <div className="flex flex-col w-full md:w-4/5">
                {days.map((day: number) => {
                    return (
                        <Day key={day} db_events={db_events} day={day} week={week}/>
                    )
                })}
            </div>
        </div>
    )
}