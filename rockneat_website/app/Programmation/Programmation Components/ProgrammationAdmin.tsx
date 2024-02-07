'use client'

import { useRouter } from 'next/navigation'
import Image from "next/image"
import { useState } from "react"
import CreateEventAdmin from "./CreateEventAdmin"
import UpdateEventAdmin from "./UpdateEventAdmin"
import { EventsData } from "../../types"

interface EventsProps {
    db_events: EventsData[]
}

export default function ProgrammationAdmin({ db_events }: EventsProps) {
    const router = useRouter();
    const [createButton, setCreateButton] = useState(1)
    const [modifyButton, setModifyButton] = useState(1)
    const [updateKey, setUpdateKey] = useState(0)
    const [eventArr, setEventArr] = useState(db_events[0])

    db_events.map((event_db) => {
        event_db.date = event_db.date.substring(0, 10) + 'T' + event_db.date.substring(11, 16)
    })

    function handleEventChose (event: React.ChangeEvent<HTMLSelectElement>) {
        db_events.map((event_db: EventsData) => {
            if (event_db.title.toUpperCase() == event.target.value)
                setEventArr(event_db)
        })
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
            <div className='flex flex-wrap justify-center'>
                <button className={ !createButton ? "hidden" : "text-lg bg-black px-3 py-1 mb-2 mt-5 mx-7 shadow shadow-red-b" } onClick={() => {
                    setCreateButton(0);
                    setModifyButton(1);
                }}>Créer un événement</button>
                <button className={ !modifyButton ? "hidden" : "text-lg bg-black px-3 py-1 mb-2 mt-5 mx-7 shadow shadow-red-b" } onClick={() => {
                    setModifyButton(0);
                    setCreateButton(1);
                }}>Modifier un événement</button>
            </div>
            <div className={'flex flex-row bg-black/70 ' + ((modifyButton && createButton) ? '' : 'p-3')}>
                { !createButton &&
                    <CreateEventAdmin />
                }
                { !modifyButton &&
                    <div className='flex flex-col flex-grow w-fit justify-center ml-5'>
                        <h2 className='text-xl w-fit mb-3 m-auto'>Modifier un événement</h2>
                        <div className='flex flex-wrap justify-center mb-3'>
                            <div className='flex flex-col mr-3'>
                                <label htmlFor="eventList" className='text-center'>Choisissez un événement</label>
                                <select name="eventList" 
                                    className="w-[100%] bg-black shadow shadow-red-b border-0 my-3 focus:ring-red-b focus:outline-non" 
                                    onChange={(event) => {handleEventChose(event)}}
                                >
                                    { db_events.map((event_db: EventsData) => {
                                        return <option key={event_db.id}>{event_db.title.toUpperCase()}</option>
                                    })}
                                </select>
                            </div>
                            <button onClick={handleDelete} className='h-fit text-lg bg-black px-3 py-1 md:mt-6 shadow shadow-red-b self-center'>
                                Suprimer l'événement
                            </button>
                        </div>
                        <UpdateEventAdmin key={updateKey} event_db={eventArr} />
                    </div>
                }
                { (!createButton || !modifyButton) &&
                    <button onClick={() => {!createButton ? setCreateButton(1) : setModifyButton(1)}} className='self-start'>
                        <Image
                            src="/close-cross.svg"
                            width={40}
                            height={40}
                            alt="Mail"
                            className="object-contain h-5 w-5 filter-white"
                        />
                    </button>
                }
            </div>
        </div>
    )
}