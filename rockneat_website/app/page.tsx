import { redirect } from 'next/navigation';

export default async function HomePage() {
  redirect('/Programmation');
  /*
  return (
      <div className='flex flex-col text-center text-xl'>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-center py-5">L'ADRESSE ROCK & METAL À LYON</h1>
        <h3 className='text-xl font-bold py-3'>Rock n'Eat Live c'est deux salles pouvant accueillir au total 300 personnes</h3> 
        <div className='flex flex-col sm:flex-row justify-evenly w-full text-center'>
          <div className='flex flex-col w-4/5 m-auto sm:w-2/5 sm:mx-3 bg-black/70'>
            <h2 className='text-xl font-extrabold'>HIGH VOLTAGE</h2>
            <p>La salle principale, all black et 100% underground</p>
          </div>
          <div className='flex flex-col w-4/5 m-auto sm:w-2/5 sm:mx-3 bg-black/70'>
            <h2 className='text-xl font-extrabold'>ACE OF SPADES</h2>
            <p>Plafond voûté et pierres apparentes, elle vibre au rythme du rock'n roll et met à l'honneur les groupes locaux</p>
          </div>
        </div>
      </div>
  );
  */
}