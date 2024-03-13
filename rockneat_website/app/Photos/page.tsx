import PhotosPageAdmin from './Photos Components/PhotosPageAdmin';
import SmoothScroll from './Photos Components/smoothScroll';
import PhotoDisplay from './Photos Components/PhotoDisplay'
import { getSession } from "@auth0/nextjs-auth0";
import PocketBase from 'pocketbase';

export default async function PhotosPage() {
    const session = await getSession();
    const user = session?.user;
    const pb = new PocketBase(process.env.DB_ADDR);
    const record = await pb.collection('Jsons').getOne('hpvt7kkx079szsb', { cache: 'no-store' })
    const photosDb = JSON.parse(JSON.stringify(record.json_file))

    if (user)
        return <PhotosPageAdmin photosDB={photosDb} />

    return (
        <div className='flex flex-col m-auto mt-4'>
            <div className='mb-4'>
                <div id="lieu" className='flex flex-row justify-center scroll-mt-[100rem]'>
                    <h1 className='text-sm sm:text-baseline xl:text-lg font-bold text-center text-red py-4 animate-slide-bottom-d1 mx-3'>LE LIEU</h1>
                    <SmoothScroll href="#concerts">
                        <h1 className='text-sm sm:text-baseline xl:text-lg font-semibold text-center hover:text-red py-4 animate-slide-bottom-d1 mx-3'>LES CONCERTS</h1>
                    </SmoothScroll>
                    <SmoothScroll href="#affiches">
                        <h1 className='text-sm sm:text-baseline xl:text-lg font-semibold text-center hover:text-red py-4 animate-slide-bottom-d1 mx-3'>LES AFFICHES</h1>
                    </SmoothScroll>
                </div>
                <PhotoDisplay photosDb={photosDb} index={0} />
            </div>
            <div className='mb-4'>
                <div id="concerts" className='flex flex-row justify-center scroll-mt-24'>
                    <SmoothScroll href="#lieu">
                        <h1 className='text-sm sm:text-baseline xl:text-lg font-semibold text-center hover:text-red py-4 animate-slide-bottom-d1 mx-3'>LE LIEU</h1>
                    </SmoothScroll>
                    <h1 className='text-sm sm:text-baseline xl:text-lg font-bold text-center text-red py-4 mx-3'>LES CONCERTS</h1>
                    <SmoothScroll href="#affiches">
                        <h1 className='text-sm sm:text-baseline xl:text-lg font-semibold text-center hover:text-red py-4 animate-slide-bottom-d1 mx-3'>LES AFFICHES</h1>
                    </SmoothScroll>
                </div>
                <PhotoDisplay photosDb={photosDb} index={1} />
            </div>
            <div className='mb-4'>
                <div id="affiches" className='flex flex-row justify-center scroll-mt-24'>
                    <SmoothScroll href="#lieu">
                        <h1 className='text-sm sm:text-baseline xl:text-lg font-semibold text-center hover:text-red py-4 animate-slide-bottom-d1 mx-3'>LE LIEU</h1>
                    </SmoothScroll>
                    <SmoothScroll href="#concerts">
                        <h1 className='text-sm sm:text-baseline xl:text-lg font-semibold text-center hover:text-red py-4 animate-slide-bottom-d1 mx-3'>LES CONCERTS</h1>
                    </SmoothScroll>
                    <h1 className='text-sm sm:text-baseline xl:text-lg font-bold text-center text-red py-4 mx-3'>LES AFFICHES</h1>
                </div>
                <PhotoDisplay photosDb={photosDb} index={2} />
            </div>
        </div>
    )
}