import PhotoDisplay from './PhotoDisplay'
import { PhotoData } from '../types';
import PocketBase from 'pocketbase';

async function getPhotos() {
    const pb = new PocketBase(process.env.DB_ADDR);
    const records = await pb.collection('Photos').getFullList({
        sort: '-created'
    });
    return records as PhotoData[]
}

export default async function PhotosPage() {
    const photos = await getPhotos();
    var lieux: PhotoData = {collectionId: "", id: "", Type:"", img_saved: [], active:false, collectionName:"", created:"", updated:""};
    var concerts: PhotoData = {collectionId: "", id: "", Type:"", img_saved: [], active:false, collectionName:"", created:"", updated:""};
    var affiches: PhotoData = {collectionId: "", id: "", Type:"", img_saved: [], active:false, collectionName:"", created:"", updated:""};

    photos?.map((item: PhotoData) => {
        if (item.Type == "lieu")
            lieux = item;
        else if (item.Type == "concert")
            concerts = item;
        else if (item.Type == "affiche")
            affiches = item;
    })

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