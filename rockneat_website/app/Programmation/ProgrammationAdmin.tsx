'use client'

import { useRouter } from 'next/navigation'
import Image from "next/image"
import { useState } from "react"
import CreateEventAdmin from "./CreateEventAdmin"
import UpdateEventAdmin from "./UpdateEventAdmin"
import { EventsData } from "../types"

interface EventsProps {
    db_events: EventsData[]
}

export default function ProgrammationAdmin({ db_events }: EventsProps) {
    const router = useRouter();
    const [createButton, setCreateButton] = useState(1)
    const [modifyButton, setModifyButton] = useState(1)
    const [eventChose, setEventChose] = useState('')
    const [updateKey, setUpdateKey] = useState(0)
    const [eventArr, setEventArr] = useState({
        id: '', date: '', fin: '', title: '', description: '', 
        link: '', status: '', image: '', collectionId: '', 
        collectionName: '', created: '', updated: ''
    })

    function handleEventChose (event: React.ChangeEvent<HTMLSelectElement>) {
        db_events.map((event_db: EventsData) => {
            if (event_db.title.toUpperCase() == event.target.value)
            {
                const arr = event_db
                arr.date = arr.date.substring(0, 10) + 'T' + arr.date.substring(11, 16)
                setEventArr(arr)
            }
        })
        setEventChose(event.target.value)
        setUpdateKey(updateKey + 1)
    }

    function handleDelete() {
        fetch('/api/Programmation', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(eventArr)
        })
        router.refresh()
        setModifyButton(1)
    }

    return (
        <div>
            <div>
                <button className={ !createButton ? "hidden" : "" } onClick={() => {
                    setCreateButton(0);
                    setModifyButton(1);
                    setEventChose('');
                }}>Créer un événement</button> 
                <button className={ !modifyButton ? "hidden" : "" } onClick={() => {
                    setModifyButton(0);
                    setCreateButton(1);
                }}>Modifier un événement</button>
            </div>
            { !createButton &&
                <CreateEventAdmin />
            }
            { !modifyButton &&
                <div>
                    <h2>Modifier un événement</h2>
                    <label htmlFor="eventList">Choisissez un événement</label>
                    <select name="eventList" 
                        className="text-black" 
                        onChange={(event) => {handleEventChose(event)}}
                    >
                        <option>Choisissez un événement</option>
                        { db_events.map((event_db: EventsData) => {
                            return <option key={event_db.id}>{event_db.title.toUpperCase()}</option>
                        })}
                    </select>
                    { eventChose && 
                        <button onClick={handleDelete}>
                            Suprimer l'événement
                        </button>
                    }
                </div>
            }
            { (!modifyButton && eventChose) &&
                <UpdateEventAdmin key={updateKey} event_db={eventArr} />
            }
            { (!createButton || !modifyButton) &&
                <button onClick={() => {!createButton ? setCreateButton(1) : setModifyButton(1)}}>
                    <Image
                        src="/close-cross.svg"
                        width={40}
                        height={40}
                        alt="Mail"
                        className="object-contain h-5 w-5 mr-1 filter-white pt-1"
                    />
                </button>
            }
        </div>
    )
}