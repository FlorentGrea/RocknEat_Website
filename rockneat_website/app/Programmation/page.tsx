import EventsList from "./EventsList";
import { EventsData } from '../types';
import PocketBase from 'pocketbase';
import { getSession } from "@auth0/nextjs-auth0";
import ProgrammationAdmin from "./ProgrammationAdmin";

export default async function Programmation() {
    const response = await fetch(process.env.API_ACCESS + 'api/Programmation', { cache: 'no-store' })
    const db_events: EventsData[] = await response.json()
    const session = await getSession();
    const user = session?.user;
  
    return (
        <div>
            { user && (
                <ProgrammationAdmin db_events={db_events} />
            )}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-center py-5">PROGRAMMATION</h1>
            <EventsList db_events={db_events}/>
        </div>
    );
  }