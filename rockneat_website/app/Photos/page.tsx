import PhotoDisplay from './Photos Components/PhotoDisplay'
import { PhotoData } from '../types';
import { getSession } from "@auth0/nextjs-auth0";
import AddPhotosAdmin from './Photos Components/AddPhotosAdmin';
import { promises as fs } from 'fs';

export default async function PhotosPage() {
    const session = await getSession();
    const user = session?.user;
    const file = await fs.readFile(process.cwd() + '/app/json/photosData.json', 'utf8');
    const photosDb = await JSON.parse(file)
    var lieux: PhotoData[] = []
    var concerts: PhotoData[] = []
    var affiches: PhotoData[] = []

    photosDb?.map((item: PhotoData) => {
        if (item.type == "lieu")
            lieux.push(item)
        else if (item.type == "concert")
            concerts.push(item)
        else if (item.type == "affiche")
            affiches.push(item)
    })

    lieux.sort((a: PhotoData, b: PhotoData) =>  a.order - b.order);
    concerts.sort((a: PhotoData, b: PhotoData) =>  a.order - b.order);
    affiches.sort((a: PhotoData, b: PhotoData) =>  a.order - b.order);

    return (
        <div className='flex flex-col m-auto'>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-center py-5">PHOTOS</h1>
            { user && <AddPhotosAdmin photosDb={photosDb} /> }
            <div className='mb-4'>
                <h1 className='text-xl font-bold text-center py-4'>LE LIEU</h1>
                <PhotoDisplay photosDb={photosDb} photosList={lieux} />
            </div>
            <div className='mb-4'>
                <h1 className='text-xl font-bold text-center py-4'>LES CONCERTS</h1>
                <PhotoDisplay photosDb={photosDb} photosList={concerts} />
            </div>
            <div className='mb-4'>
                <h1 className='text-xl font-bold text-center py-4'>LES AFFICHES</h1>
                <PhotoDisplay photosDb={photosDb} photosList={affiches} />
            </div>
        </div>
    )
}