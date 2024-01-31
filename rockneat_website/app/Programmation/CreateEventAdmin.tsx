'use client'

import { useRouter } from "next/navigation"
import { EventsData } from "../types"

export default function CreateEventAdmin() {
    const Router = useRouter();
    const eventForm = new FormData()
    let Event_arr: EventsData = {
        id: '', date: '', fin: '', title: '', description: '', 
        link: '', status: '', image: '', collectionId: '', 
        collectionName: '', created: '', updated: ''
    }

    function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
            eventForm.set('image', event.target.files[0])
        }
    }

    function handleFormSubmit() {
        Event_arr.date = Event_arr.date.substring(0, 10) + ' ' + Event_arr.date.substring(11, 16) + ':00.000Z'
        eventForm.set('date', Event_arr.date)
        fetch('/api/Programmation', {
            method: 'POST',
            body: eventForm
        })
        Router.refresh()
    }

    return (
        <div>
            <h2>Créer un événement</h2>

            <form onSubmit={handleFormSubmit} className="text-black">

                <label htmlFor="title" className="text-white">Titre</label>
                <input 
                    name="title"
                    required
                    onChange={(event) => {eventForm.set('title', event.target.value)}}
                ></input>

                <label htmlFor="date" className="text-white">Date & heure</label>
                <input 
                    type="datetime-local" 
                    name="date"
                    required
                    onChange={(event) => {Event_arr.date = event.target.value}}
                ></input>

                <label htmlFor="link" className="text-white">Lien réservation/billeterie</label>
                <input 
                    type="url"
                    name="link"
                    onChange={(event) => {eventForm.set('link', event.target.value)}}
                ></input>

                <label htmlFor="status" className="text-white">Statut</label>
                <select name="status" defaultValue={Event_arr.status} onChange={(event) => {eventForm.set('status', event.target.value)}}>
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
                <input type="submit" className="text-white" value="Créer" />
            </form>
        </div>
    )
}