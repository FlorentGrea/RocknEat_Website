'use client'

import { useRouter } from "next/navigation"
import { EventsData } from "../types"

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
            <form onSubmit={handleFormSubmit} className="text-black">

                <label htmlFor="title" className="text-white">Titre</label>
                <input 
                    name="title"
                    required
                    defaultValue={event_db.title}
                    onChange={(event) => {eventForm.set('title', event.target.value)}}
                ></input>

                <label htmlFor="date" className="text-white">Date & heure</label>
                <input 
                    type="datetime-local" 
                    name="date"
                    required
                    defaultValue={event_db.date}
                    onChange={(event) => {event_db.date = event.target.value}}
                ></input>

                <label htmlFor="link" className="text-white">Lien réservation/billeterie</label>
                <input 
                    type="url"
                    name="link"
                    defaultValue={event_db.link}
                    onChange={(event) => {eventForm.set('link', event.target.value)}}
                ></input>

                <label htmlFor="status" className="text-white">Statut</label>
                <select name="status" defaultValue={event_db.status} onChange={(event) => {eventForm.set('status', event.target.value)}}>
                    <option value="DISPONIBLE">DISPONIBLE</option>
                    <option value="COMPLET">COMPLET</option>
                    <option value="REPORTÉ">REPORTÉ</option>
                    <option value="ANNULÉ">ANNULÉ</option>
                </select>

                <label htmlFor="description" className="text-white">Description</label>
                <textarea 
                    name="description"
                    cols={30}
                    rows={5}
                    defaultValue={event_db.description}
                    onChange={(event) => {eventForm.set('description', event.target.value)}}
                ></textarea>

                <label htmlFor="image" className="text-white">Image</label>
                <input
                    type="file"
                    name="Image"
                    accept="image/*"
                    className="text-white"
                    onChange={handleImage}
                ></input>

                <input type="submit" className="text-white" value="Modifier" />
            </form>
        </div>
    )
}