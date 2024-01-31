import PhotoDisplay from './PhotoDisplay'
import { PhotoData } from '../types';
import { getSession } from "@auth0/nextjs-auth0";
import PhotosAdmin from './PhotosAdmin';

export default async function PhotosPage() {
    const session = await getSession();
    const user = session?.user;
    const response = await fetch('http://localhost:3000/api/Photos', { cache: 'no-store' })
    const photos: PhotoData[] = await response.json()
    var lieux: PhotoData[] = []
    var concerts: PhotoData[] = []
    var affiches: PhotoData[] = []

    photos?.map((item: PhotoData) => {
        if (item.Type == "lieu")
            lieux.push(item)
        else if (item.Type == "concert")
            concerts.push(item)
        else if (item.Type == "affiche")
            affiches.push(item)
    })

    lieux.sort((a: any, b: any) =>  a.ordre - b.ordre);
    concerts.sort((a: any, b: any) =>  a.ordre - b.ordre);
    affiches.sort((a: any, b: any) =>  a.ordre - b.ordre);

    if (user)
        return <PhotosAdmin /> 
    return (
        <div className='flex flex-col m-auto'>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-center py-5">PHOTOS</h1>
            <div className='mb-4'>
                <h1 className='text-xl font-bold text-center py-4'>LE LIEU</h1>
                <PhotoDisplay Photos={lieux} />
            </div>
            <div className='mb-4'>
                <h1 className='text-xl font-bold text-center py-4'>LES CONCERTS</h1>
                <PhotoDisplay Photos={concerts} />
            </div>
            <div className='mb-4'>
                <h1 className='text-xl font-bold text-center py-4'>LES AFFICHES</h1>
                <PhotoDisplay Photos={affiches} />
            </div>
        </div>
    )
}