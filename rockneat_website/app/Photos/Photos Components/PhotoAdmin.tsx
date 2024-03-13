'use client'

import { PhotoData, PhotoList } from "@/app/types";
import { useSortable } from  "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

interface PhotoAdminProps {
    arrList: PhotoList[]
    setArrList: React.SetStateAction<any>,
    imgToDel: any,
    setImgToDel: React.SetStateAction<any>,
    photo: PhotoData
}

export default function PhotoAdmin({ arrList, setArrList, imgToDel, setImgToDel, photo }: PhotoAdminProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: photo.id})
    const style = {
        transition,
        transform: CSS.Translate.toString(transform)
    }

    function handleDelete() {
        let tmpArr = [...arrList]
        let tmpImgToDel = [...imgToDel]
        let index_L = 0;
        let index = 0;

        tmpImgToDel.push(photo)

        while (tmpArr[index_L] && tmpArr[index_L].p_id != photo.p_id) 
            index_L++;
        while (tmpArr[index_L].photos[index] && tmpArr[index_L].photos[index].id != photo.id)
            index++;
        delete tmpArr[index_L].photos[index]
        
        tmpArr[index_L].photos = tmpArr[index_L].photos.filter(( element ) => {
            return element !== undefined;
        });

        setImgToDel(tmpImgToDel)
        setArrList(tmpArr)
    }

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style} className={`group relative break-inside-avoid w-full mb-2 md:max-h-96 bg-black bg-gradient-to-tl from-red/20 via-black to-black shadow-sm shadow-black/30 p-[2px]`}>
            <Image
                src={'https://rockneatdb.pockethost.io/' + 'api/files/Photos/' + photo.p_id + '/' + photo.src}
                width={1500}
                height={1500}
                alt='coucou'
                className="w-full object-cover md:max-h-[23rem]"
            />
            <Image
                src="/moove-icon.svg"
                width={40}
                height={40}
                alt="Mail"
                className="absolute  group-hover:hidden top-2 right-2 object-contain h-7 w-7 filter-white"
            />
            <Image
                src="/moove-icon.svg"
                width={40}
                height={40}
                alt="Mail"
                className="absolute hidden group-hover:block top-2 right-2 object-contain h-7 w-7 filter-red"
            />
            <button onClick={handleDelete} className="absolute group-hover:hidden top-2 left-2">
                <Image
                    src="/delete-cross.svg"
                    width={40}
                    height={40}
                    alt="Mail"
                    className="object-contain h-5 w-5 filter-white"
                />
            </button>
            <button onClick={handleDelete} className="absolute hidden group-hover:block top-2 left-2">
                <Image
                    src="/delete-cross.svg"
                    width={40}
                    height={40}
                    alt="Mail"
                    className="object-contain h-5 w-5 filter-red"
                />
            </button>
        </div>
    )
}


//const pb = new PocketBase(process.env.DB_ADDR);
//        
//pb.collection('Photos').update(photo.p_id, {
//    'Images-': [photo.src],
//});