import AddPhotosAdmin from './Photos Components/AddPhotosAdmin';
import PhotoDisplay from './Photos Components/PhotoDisplay'
import { getSession } from "@auth0/nextjs-auth0";
import { PhotoData } from '../types';
import PocketBase from 'pocketbase';
import SmoothScroll from './Photos Components/smoothScroll';

export default async function PhotosPage() {
    const session = await getSession();
    const user = session?.user;
    const pb = new PocketBase(process.env.DB_ADDR);
    const record = await pb.collection('Jsons').getOne('hpvt7kkx079szsb', { cache: 'no-store' })
    const photosDb = JSON.parse(JSON.stringify(record.json_file))
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
        <div className='flex flex-col m-auto mt-4'>
            { user && <AddPhotosAdmin photosDb={photosDb} /> }
            <div className='mb-4'>
                <div id="lieu" className='flex flex-row justify-center scroll-mt-[100rem]'>
                    <h1 className='text-sm sm:text-baseline xl:text-lg font-bold text-center text-red py-4 animate-slide-bottom-d1 mx-3'>LE LIEU</h1>
                    <SmoothScroll href="#concerts">
                        <h1 className='text-sm sm:text-baseline xl:text-lg font-semibold text-center py-4 animate-slide-bottom-d1 mx-3'>LES CONCERTS</h1>
                    </SmoothScroll>
                    <SmoothScroll href="#affiches">
                        <h1 className='text-sm sm:text-baseline xl:text-lg font-semibold text-center py-4 animate-slide-bottom-d1 mx-3'>LES AFFICHES</h1>
                    </SmoothScroll>
                </div>
                <PhotoDisplay photosDb={photosDb} photosList={lieux} />
            </div>
            <div className='mb-4'>
                <div id="concerts" className='flex flex-row justify-center scroll-mt-24'>
                    <SmoothScroll href="#lieu">
                        <h1 className='text-sm sm:text-baseline xl:text-lg font-semibold text-center py-4 animate-slide-bottom-d1 mx-3'>LE LIEU</h1>
                    </SmoothScroll>
                    <h1 className='text-sm sm:text-baseline xl:text-lg font-bold text-center text-red py-4 mx-3'>LES CONCERTS</h1>
                    <SmoothScroll href="#affiches">
                        <h1 className='text-sm sm:text-baseline xl:text-lg font-semibold text-center py-4 animate-slide-bottom-d1 mx-3'>LES AFFICHES</h1>
                    </SmoothScroll>
                </div>
                <PhotoDisplay photosDb={photosDb} photosList={concerts} />
            </div>
            <div className='mb-4'>
                <div id="affiches" className='flex flex-row justify-center scroll-mt-24'>
                    <SmoothScroll href="#lieu">
                        <h1 className='text-sm sm:text-baseline xl:text-lg font-semibold text-center py-4 animate-slide-bottom-d1 mx-3'>LE LIEU</h1>
                    </SmoothScroll>
                    <SmoothScroll href="#concerts">
                        <h1 className='text-sm sm:text-baseline xl:text-lg font-semibold text-center py-4 animate-slide-bottom-d1 mx-3'>LES CONCERTS</h1>
                    </SmoothScroll>
                    <h1 className='text-sm sm:text-baseline xl:text-lg font-bold text-center text-red py-4 mx-3'>LES AFFICHES</h1>
                </div>
                <PhotoDisplay photosDb={photosDb} photosList={affiches} />
            </div>
        </div>
    )
}