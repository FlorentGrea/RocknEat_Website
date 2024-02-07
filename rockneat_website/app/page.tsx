import { getSession } from '@auth0/nextjs-auth0';
import ChangeTitleAdmin from './AccueilComponents/ChangeTitleAdmin';
import { promises as fs } from 'fs';
import Image from 'next/image';
import ChangeAccueilImageAdmin from './AccueilComponents/ChangeAccueilImageAdmin';
import { AccueilData } from './types';
import ChangeDescriptionAdmin from './AccueilComponents/ChangeDescriptionAdmin';

export default async function HomePage() {
  const file = await fs.readFile("./app/json/accueilData.json", 'utf8');
  const Accueil: AccueilData = JSON.parse(file)
  const session = await getSession();
  const user = session?.user;

  return (
    <div className='flex flex-col text-center text-xl'>
      <ChangeTitleAdmin 
        user={user}
        data={Accueil} 
        name={'Slogan'} 
        html={<h1 className={"text-2xl sm:text-4xl font-extrabold text-center py-5 w-fit " + (user ? "ml-5" : "m-auto")} >{Accueil.Slogan}</h1>} 
      />
      <ChangeDescriptionAdmin 
        user={user} 
        data={Accueil} 
        name={'Description'} 
        html={<h3 className={'text-xl font-bold py-3 w-fit ' + (user ? "ml-5" : "m-auto")}>{Accueil.Description}</h3>} 
      />
      <div className='flex flex-col sm:flex-row justify-evenly w-full text-center'>
        <div className='flex flex-col w-full sm:w-[49%] bg-black/70 p-1 mb-3'>
          <ChangeTitleAdmin 
            user={user} 
            data={Accueil} 
            name={'Nom_Salle_1'} 
            html={<h2 className={'text-xl font-extrabold my-2 w-fit ' + (user ? "ml-5" : "m-auto")}>{Accueil.Nom_Salle_1}</h2>} 
          />
          <div className='relative'>
            <Image
                src={'/accueil/' + Accueil.Image_Salle_1}
                width={1500}
                height={1500}
                alt={Accueil.Image_Salle_1}
                className="w-full h-80 object-cover"
            />
            { user && <ChangeAccueilImageAdmin Accueil={Accueil} name='Image_Salle_1' /> }
          </div>
          <div className='w-max-[85%]'>
          <ChangeDescriptionAdmin 
            user={user} 
            data={Accueil} 
            name={'Description_Salle_1'} 
            html={<p className={'px-4 py-3 w-fit ' + (user ? "ml-5" : "m-auto")}>{Accueil.Description_Salle_1}</p>} 
          />
          </div>
        </div>
        <div className='flex flex-col w-full sm:w-[49%] bg-black/70 p-1 mb-3'>
          <ChangeTitleAdmin 
            user={user} 
            data={Accueil} 
            name={'Nom_Salle_2'} 
            html={<h2 className={'text-xl font-extrabold my-2 w-fit ' + (user ? "ml-5" : "m-auto")}>{Accueil.Nom_Salle_2}</h2>} 
          />
          <div className='relative'>
            <Image
                src={'/accueil/' + Accueil.Image_Salle_2}
                width={1500}
                height={1500}
                alt={Accueil.Image_Salle_2}
                className="w-full h-80 object-cover"
            />
            { user && <ChangeAccueilImageAdmin Accueil={Accueil} name='Image_Salle_2' /> }
          </div>
          <div className='w-max-[85%]'>
          <ChangeDescriptionAdmin 
            user={user} 
            data={Accueil} 
            name={'Description_Salle_2'} 
            html={<p className={'px-4 py-3 w-fit ' + (user ? "ml-5" : "m-auto")}>{Accueil.Description_Salle_2}</p>} 
          />
          </div>
        </div>
      </div>
    </div>
  );
}