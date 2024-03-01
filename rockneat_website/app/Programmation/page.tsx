import ProgrammationAdmin from "./Programmation Components/ProgrammationAdmin";
import { getSession } from "@auth0/nextjs-auth0";
import { EventsData } from '../types';
import PocketBase from 'pocketbase';
import Calendar from "./Programmation Components/Calendar";
import MainEvents from "./Programmation Components/MainEvents";

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
        <div className="mt-4">
            { user && (
                <ProgrammationAdmin db_events={db_events} />
            )}
            <MainEvents db_events={db_events}/>
            <Calendar db_events={db_events}/>
        </div>
    );
  }