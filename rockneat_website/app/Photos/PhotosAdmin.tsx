'use client'

import { PhotoData } from '../types';
import AddPhotosAdmin from './AddPhotosAdmin';
import ModifyPhotoAdmin from './ModifyPhotoAdmin';

export default async function PhotosAdmin() {
    const response = await fetch(process.env.API_ACCESS + 'api/Photo', { cache: 'no-store' })
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

    return (
        <div className='flex flex-col m-auto'>
            <AddPhotosAdmin Photos={photos} />
            <h1 className="text-2xl sm:text-4xl font-extrabold text-center py-5">PHOTOS</h1>
            <div className='mb-4'>
                <h1 className='text-xl font-bold text-center py-4'>LE LIEU</h1>
                <div className='flex flex-wrap justify-evenly'>
                    <div className='columns-1 md:columns-2 lg:columns-3 gap-1 w-full'>
                        {lieux.map((photo: PhotoData) => {
                            return <ModifyPhotoAdmin key={photo.id} Photos_db={photos} displayedPhoto={photo} /> 
                        })}
                    </div>
                </div>
            </div>
            <div className='mb-4'>
                <h1 className='text-xl font-bold text-center py-4'>LES CONCERTS</h1>
                <div className='flex flex-wrap justify-evenly'>
                    <div className='columns-1 md:columns-2 lg:columns-3 gap-1 w-full'>
                        {concerts.map((photo: PhotoData) => {
                            return <ModifyPhotoAdmin key={photo.id} Photos_db={photos} displayedPhoto={photo} /> 
                        })}
                    </div>
                </div>
            </div>
            <div className='mb-4'>
                <h1 className='text-xl font-bold text-center py-4'>LES AFFICHES</h1>
                <div className='flex flex-wrap justify-evenly'>
                    <div className='columns-1 md:columns-2 lg:columns-3 gap-1 w-full'>
                        {affiches.map((photo: PhotoData) => {
                            return <ModifyPhotoAdmin key={photo.id} Photos_db={photos} displayedPhoto={photo} /> 
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}