import EventsList from "./EventsList";
import { EventsData } from '../types';

async function getEvents() {
  const res = await fetch(
      'http://127.0.0.1:8090/api/collections/Events/records?page=1&perPage=30', 
      { cache: 'no-store' }
  );
  const data = await res.json();
  return data?.items as EventsData[];
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