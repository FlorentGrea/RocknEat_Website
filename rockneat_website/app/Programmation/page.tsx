import ProgrammationAdmin from "./Programmation Components/ProgrammationAdmin";
import EventsList from "./Programmation Components/EventsList";
import { getSession } from "@auth0/nextjs-auth0";
import { EventsData } from '../types';
import PocketBase from 'pocketbase';

export default async function Programmation() {
    const pb = new PocketBase(process.env.DB_ADDR);
    const records = await pb.collection('Events').getFullList({
        sort: '+date',
        cache: 'no-store' 
    });
    const db_events: EventsData[] = await JSON.parse(JSON.stringify(records))
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