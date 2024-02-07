'use client'

import { useRouter } from "next/navigation"
import { EventsData } from "../../types"
import Image from "next/image"

interface EventsProps {
    event_db: EventsData
}

export default function UpdateEventAdmin({ event_db }: EventsProps) {
    const Router = useRouter();
    const eventForm = new FormData()

    function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
            eventForm.set('image', event.target.files[0])
        }
    }

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event_db.date = event_db.date.substring(0, 10) + ' ' + event_db.date.substring(11, 16) + ':00.000Z'
        eventForm.set('date', event_db.date)
        eventForm.set('id', event_db.id)
        fetch('/api/Programmation', {
            method: 'PATCH',
            body: eventForm
        })
        Router.refresh()
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <div className="flex flex-wrap justify-evenly">
                    <div className="flex flex-col justify-center m-2 w-[90%] sm:w-[50%]">
                        <label htmlFor="title" className="m-auto mb-2">Titre</label>
                        <input 
                            name="title"
                            required
                            defaultValue={event_db.title}
                            onChange={(event) => {eventForm.set('title', event.target.value)}}
                            className="h-11 mb-1 border-[1px] border-gray-500 bg-transparent focus:ring-red-b focus:border-transparent"
                        />
                    </div>

                    <div className="flex flex-col justify-center m-2">
                        <label htmlFor="date" className="m-auto mb-2">Date & heure</label>
                        <input 
                            type="datetime-local" 
                            name="date"
                            required
                            defaultValue={event_db.date}
                            onChange={(event) => {event_db.date = event.target.value}}
                            className="mb-1 border-[1px] border-gray-500 bg-transparent focus:ring-red-b focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap justify-evenly">
                    <div className="flex flex-col justify-center">
                        <div className="flex flex-col justify-center m-2">
                            <label htmlFor="link" className="m-auto mb-2">Lien réservation/billeterie</label>
                            <input 
                                type="url"
                                name="link"
                                defaultValue={event_db.link}
                                onChange={(event) => {eventForm.set('link', event.target.value)}}
                                className="mb-1 border-[1px] border-gray-500 bg-transparent focus:ring-red-b focus:border-transparent"
                            />
                        </div>

                        <div className="flex flex-col justify-center m-2">
                            <label htmlFor="status" className="m-auto mb-2">Statut</label>
                            <select 
                                name="status" 
                                defaultValue={event_db.status} 
                                onChange={(event) => {eventForm.set('status', event.target.value)}}
                                className="bg-black shadow shadow-red-b border-0 mb-1 focus:ring-red-b focus:outline-none"
                            >
                                <option value="DISPONIBLE">DISPONIBLE</option>
                                <option value="COMPLET">COMPLET</option>
                                <option value="REPORTÉ">REPORTÉ</option>
                                <option value="ANNULÉ">ANNULÉ</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center w-[90%] sm:w-[60%]">
                        <label htmlFor="description" className="m-auto mb-2">Description</label>
                        <textarea 
                            name="description"
                            cols={30}
                            rows={5}
                            defaultValue={event_db.description}
                            onChange={(event) => {eventForm.set('description', event.target.value)}}
                            className="mb-1 border-[1px] border-gray-500 bg-transparent focus:ring-red-b focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap justify-evenly m-2">
                    <input
                        id="Image"
                        type="file"
                        name="Image"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImage}
                    />
                    <label htmlFor="Image" className="flex flex-row w-fit m-auto text-lg bg-black px-3 py-1 my-1 shadow shadow-red-b">
                        <Image
                            src="/upload.svg"
                            width={40}
                            height={40}
                            alt="Mail"
                            className="object-contain h-5 w-5 filter-white self-center mr-1"
                        />
                        <p className="text-base">Nouvelle Photo</p>
                    </label>
                    <input type="submit" className="m-auto w-fit text-lg bg-black px-3 py-1 my-1 shadow shadow-red-b" value="Modifier" />
                </div>
            </form>
        </div>
    )
}