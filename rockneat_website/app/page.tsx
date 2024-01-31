import { getSession } from '@auth0/nextjs-auth0';
import AccueilAdmin from './AccueilAdmin';

export default async function HomePage() {
  const response = await fetch('http://localhost:3000/api/Accueil', { cache: 'no-store' })
  const Accueil = await response.json()
  const session = await getSession();
  const user = session?.user;

  return (
    <div className='flex flex-col text-center text-xl'>
      { user ? (
          <AccueilAdmin data={Accueil} htmlName='Slogan' />
        ):(
          <h1 className="text-2xl sm:text-4xl font-extrabold text-center py-5">{Accueil.Slogan}</h1>
      )}
      { user ? (
          <AccueilAdmin data={Accueil} htmlName='Description' />
        ):(
          <h3 className='text-xl font-bold py-3'>{Accueil.Description}</h3>
      )}
      { user ? (
        <div className='flex flex-col sm:flex-row justify-evenly w-full text-center'>
          <div className='flex flex-col w-4/5 m-auto sm:w-2/5 sm:mx-3 bg-black/70'>
            <AccueilAdmin data={Accueil} htmlName='Nom_Salle_1' />
            <AccueilAdmin data={Accueil} htmlName='Description_Salle_1' />
          </div>
          <div className='flex flex-col w-4/5 m-auto sm:w-2/5 sm:mx-3 bg-black/70'>
            <AccueilAdmin data={Accueil} htmlName='Nom_Salle_2' />
            <AccueilAdmin data={Accueil} htmlName='Description_Salle_2' />
          </div>
          </div>
        ):(
        <div className='flex flex-col sm:flex-row justify-evenly w-full text-center'>
          <div className='flex flex-col w-4/5 m-auto sm:w-2/5 sm:mx-3 bg-black/70'>
            <h2 className='text-xl font-extrabold'>{Accueil.Nom_Salle_1}</h2>
            <p>{Accueil.Description_Salle_1}</p>
          </div>
          <div className='flex flex-col w-4/5 m-auto sm:w-2/5 sm:mx-3 bg-black/70'>
            <h2 className='text-xl font-extrabold'>{Accueil.Nom_Salle_2}</h2>
            <p>{Accueil.Description_Salle_2}</p>
          </div>
        </div>
      )}
    </div>
  );
}