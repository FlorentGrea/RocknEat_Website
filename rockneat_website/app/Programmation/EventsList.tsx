import "../globals.css"
import Event from "./Event";
import { EventsData } from "@/app/types";

interface EventsProps {
    db_events: EventsData[]
}

export default function EventsList ({ db_events }: EventsProps) {
    const today = new Date();
    const actual = new Date(
        today.setDate(today.getDate() - today.getDay())
        ).toLocaleString('fr-FR', {
        timeZone: 'Europe/Paris',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric' as 'numeric',
    })

    db_events.sort((event1: EventsData, event2: EventsData) => {
        return (new Date(event1.date).setHours(0, 0, 0, 0) - new Date(event2.date).setHours(0, 0, 0, 0));
    })

    console.log(db_events)

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-wrap w-full">
                {db_events.map((event: EventsData) => {
                    const hour = event.date.substring(11, 13) + 'h' + event.date.substring(14, 16)
                    const endHour = event.fin.substring(11, 13) + 'h' + event.fin.substring(14, 16)
                    var treatedDate = new Date(event.date).toLocaleString('fr-FR', {
                        timeZone: 'Europe/Paris',
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric' as 'numeric',
                    })
                    if (treatedDate >= actual)
                        treatedDate = treatedDate.substring(0,2) + '.' + treatedDate.substring(3,5) + '.' + treatedDate.substring(8,10)

                        return (
                            <Event key={event.id} Event={event} hour={hour} endHour={endHour} date={treatedDate}/>
                        )
                })}
            </div>
        </div>
    )
}