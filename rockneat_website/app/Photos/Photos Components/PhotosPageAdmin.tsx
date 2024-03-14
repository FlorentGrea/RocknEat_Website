'use client'

import PhotoDisplayAdmin from './PhotoDisplayAdmin'
import { PhotoData, PhotoList } from '@/app/types'
import AddPhotosAdmin from './AddPhotosAdmin'
import { useEffect, useState } from 'react'
import SmoothScroll from './smoothScroll'
import PocketBase from 'pocketbase'

interface PhotosPageAdminProps {
    photosDB: PhotoList[]
}

export default function PhotosPageAdmin({ photosDB }: PhotosPageAdminProps) {
    const [ defaultData, setDefaultData ] = useState(JSON.parse(JSON.stringify(photosDB)))
    const [ arrList, setArrList ] = useState(JSON.parse(JSON.stringify(photosDB)))
    const [ changeButton, setChangeButton ] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [ imgToDel, setImgToDel ] = useState([])

    useEffect(() => {
        if (JSON.stringify(arrList) !== JSON.stringify(defaultData))
            setChangeButton(true)
    }, [arrList])

    function handleSubmit() {
        const imgToDelLieux: string[] = []
        const imgToDelConcerts: string[] = []
        const imgToDelAffiches: string[] = []
        imgToDel.map((photo: PhotoData) => {
            if (photo.p_id == "q5bfart0si6hlyl")
                imgToDelLieux.push(photo.src)
            else if (photo.p_id == "j81c25iij9uicny")
                imgToDelConcerts.push(photo.src)
            else if (photo.p_id == "cc12szu6cisrejt")
                imgToDelAffiches.push(photo.src)
        })

        async function saveNewJson() {
            setIsLoading(true); // Set loading state
    
            try {
                const pb = new PocketBase('https://rockneatdb.pockethost.io/')
    
                const post_data = {
                    "json_name": 'photosData',
                    "json_file": JSON.stringify(arrList)
                }
                await pb.collection('Jsons').update('hpvt7kkx079szsb', post_data);
    
                console.log('Json modified successfully')
                setDefaultData(JSON.parse(JSON.stringify(arrList)))
            } catch (error: any) {
                console.error('Error modifying json:', error)
            } finally {
                setIsLoading(false); // Reset loading state
            }
        }

        async function deleteImages() {
            setIsLoading(true); // Set loading state
    
            try {
                const pb = new PocketBase('https://rockneatdb.pockethost.io/')
    
                await pb.collection('Photos').update("q5bfart0si6hlyl", { 'Images-': imgToDelLieux })
                await pb.collection('Photos').update("j81c25iij9uicny", { 'Images-': imgToDelConcerts })
                await pb.collection('Photos').update("cc12szu6cisrejt", { 'Images-': imgToDelAffiches })
                const post_data = {
                    "json_name": 'photosData',
                    "json_file": JSON.stringify(arrList)
                }
                await pb.collection('Jsons').update('hpvt7kkx079szsb', post_data);
    
                console.log('Images deleted successfully')
                saveNewJson()
            } catch (error: any) {
                console.error('Error deleting images:', error)
            } finally {
                setIsLoading(false); // Reset loading state
            }
        }
    
        if (imgToDelLieux.length || imgToDelConcerts.length || imgToDelAffiches.length) {
            deleteImages()
        }
        else
            saveNewJson()
        setImgToDel([])
        setChangeButton(false)
    }

    function revertChanges() {
        setImgToDel([])
        setArrList(JSON.parse(JSON.stringify(photosDB)))
        setChangeButton(false)
    }

    if (isLoading) {
        return (
            <div className='w-full mt-52 flex justify-center'>
                <div className="
                        inline-block 
                        h-8 
                        w-8 
                        animate-spin 
                        rounded-full 
                        border-4 
                        border-solid 
                        border-current 
                        border-e-transparent 
                        align-[-0.125em] 
                        text-danger 
                        motion-reduce:animate-[spin_1.5s_linear_infinite]
                    "
                    role="status"
                >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                    </span>
                </div>
            </div>
    )}

    return (
        <div className='flex flex-col m-auto mt-4'>
            <AddPhotosAdmin arrList={arrList} setArrList={setArrList} setIsLoading={setIsLoading} setDefaultData={setDefaultData} />
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
                <PhotoDisplayAdmin arrList={arrList} setArrList={setArrList} imgToDel={imgToDel} setImgToDel={setImgToDel} index_L={0} />
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
                <PhotoDisplayAdmin arrList={arrList} setArrList={setArrList} imgToDel={imgToDel} setImgToDel={setImgToDel} index_L={1} />
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
                <PhotoDisplayAdmin arrList={arrList} setArrList={setArrList} imgToDel={imgToDel} setImgToDel={setImgToDel} index_L={2} />
            </div>
            { changeButton &&
                <div className='sticky flex flex-row bottom-5 w-full justify-center align-middle animate-slide-bottom-d1'>
                    <button onClick={handleSubmit} className='text-lg font-semibold mx-5 px-3 py-1 bg-black rounded-md border-2 border-red hover:border-white'>
                        sauvegarder
                    </button>
                    <button onClick={revertChanges} className='text-lg font-semibold mx-5 px-3 py-1 bg-black rounded-md border-2 border-green-500 hover:border-white'>
                        reinitialiser
                    </button>
                </div>
            }
        </div>
    )
}