import EventsList from "./EventsList";
import { EventsData } from '../types';
import PocketBase from 'pocketbase';

async function getEvents() {
    const pb = new PocketBase(process.env.DB_ADDR);
    const records = await pb.collection('Events').getFullList({
        sort: '-created',
    });
    return records as EventsData[];
}

export default async function Programmation() {
    const db_events = await getEvents();
  
    return (
        <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-center py-5">PROGRAMMATION</h1>
            <EventsList db_events={db_events}/>
        </div>
    );
  }