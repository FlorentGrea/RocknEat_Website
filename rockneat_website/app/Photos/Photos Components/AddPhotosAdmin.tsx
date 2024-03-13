'use client'

import SubmitButtonPhoto from "./SubmitButtonPhoto";
import { PhotoList } from "../../types";
import PocketBase from 'pocketbase';
import { v4 as uuidv4 } from 'uuid';

interface PhotoDisplayProps {
    arrList: PhotoList[],
    setArrList: React.SetStateAction<any>,
    setIsLoading: React.SetStateAction<any>,
    setDefaultData: React.SetStateAction<any>,
}

export default function AddPhotosAdmin({ arrList, setArrList, setIsLoading, setDefaultData }: PhotoDisplayProps) {

    function addPhotos(formData: FormData) {
        const newData = arrList
        const type_L = formData.get("type") as string
        let info = {
            type: "",
            index_L: 0,
        }
        const Image_array = Array.from(formData.getAll("ImageInput"))

        const postForm = new FormData
        for (const image of Image_array) {
            postForm.append('Images', image as File)
        }
        let record: any = []

        if (type_L == 'lieu') {
            info.type = 'q5bfart0si6hlyl'
            info.index_L = 0
        }
        else if (type_L == 'concert') {
            info.type = 'j81c25iij9uicny'
            info.index_L = 1
        }
        else if (type_L == 'affiche') {
            info.type = 'cc12szu6cisrejt'
            info.index_L = 2
        }

        async function addImages() {
            setIsLoading(true); // Set loading state
    
            try {
                const pb = new PocketBase('https://rockneatdb.pockethost.io/')
                record = await pb.collection('Photos').update(info.type, postForm);
                for (const image of record.Images) {
                    let exist = 0
                    newData[info.index_L].photos.map((db_img: any) => {
                        if (db_img.src == image)
                            exist = 1
                    })
                    if (!exist) {
                        const data = {
                            id: uuidv4(),
                            p_id: info.type,
                            src: image
                        }
                        newData[info.index_L].photos.push(data)
                    }
                }
                const post_data = {
                    "json_name": 'photosData',
                    "json_file": JSON.stringify(newData)
                }
                await pb.collection('Jsons').update('hpvt7kkx079szsb', post_data);
    
                console.log('Images added successfully')
            } catch (error: any) {
                console.error('Error deleting images:', error)
            } finally {
                setIsLoading(false); // Reset loading state
            }
        }
    
        addImages()
        setDefaultData(newData)
        setArrList(JSON.parse(JSON.stringify(newData)))
    }
    
    return (
        <div>
            <h2 className='text-xl font-bold text-center py-4'>Ajouter des photos</h2>
            <form action={addPhotos}  className="flex flex-col sm:w-3/4 lg:w-2/4 m-auto bg-black/70 bg-black bg-gradient-to-tl from-red/20 via-black to-black shadow-sm shadow-black/30 p-2 mt-3">
                <div className="flex flex-row justify-center">
                    <select name="type" required className="bg-black border-1 border-red rounded-sm m-3 focus:ring-red-b focus:outline-none">
                        <option value="lieu">Lieu</option>
                        <option value="concert">Concerts</option>
                        <option value="affiche">Affiches</option>
                    </select>

                    <input
                        id="Image"
                        type="file"
                        name="ImageInput"
                        required
                        multiple
                        accept="image/*"
                        className="text-white m-3 focus:ring-red-b"
                    ></input>
                </div>

                <input type="number" name="lieu" className="hidden" />
                <input type="number" name="concert" className="hidden" />
                <input type="number" name="affiche" className="hidden" />

                <div className="w-full flex justify-center mb-3">
                    <SubmitButtonPhoto html={<p className="text-lg font-semibold px-3 py-1 bg-black rounded-md border-2 border-red hover:border-white">Ajouter</p>}/>
                </div>
            </form>
        </div>
    )
}