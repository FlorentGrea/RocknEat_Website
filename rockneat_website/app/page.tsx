import Calendar from './calendar';

async function getEvents() {
  const res = await fetch(
      'http://127.0.0.1:8090/api/collections/Events/records?page=1&perPage=30', 
      { cache: 'no-store' }
  );
  const data = await res.json();
  return data?.items as any[];
}

export default async function HomePage() {
  const db_events = await getEvents();

  return (
      <div>
          <h1>Le Rock n&apos;Eat est ouvert de 16h à 4h en fonction des soirs d&apos;évènements :</h1>
          <Calendar db_events={db_events}/>
      </div>
  );
}