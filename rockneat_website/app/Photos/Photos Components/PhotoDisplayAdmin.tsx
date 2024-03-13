'use client'

import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, arrayMove, rectSortingStrategy } from  "@dnd-kit/sortable"
import { PhotoData, PhotoList } from "../../types"
import PhotoAdmin from "./PhotoAdmin";
import { useId } from "react";

interface PhotoDisplayAdminProps {
    arrList: PhotoList[],
    setArrList: React.SetStateAction<any>,
    imgToDel: any,
    setImgToDel: React.SetStateAction<any>,
    index_L: number
}

export default function PhotoDisplayAdmin({ arrList, setArrList, imgToDel, setImgToDel, index_L }: PhotoDisplayAdminProps) {
    const id = useId()
    let slide = 1
    
    const sensors = useSensors(
        useSensor(PointerSensor, {activationConstraint: {distance: 2}})
    );

    function onDragEnd(event: any) {
        const { active, over } = event

        if (active.id === over.id)
            return ;

        let tmpArrList = [...arrList]
        const oldIndex = arrList[index_L].photos.findIndex((photo: any) => photo.id === active.id)
        const newIndex = arrList[index_L].photos.findIndex((photo: any) => photo.id === over.id)
        tmpArrList[index_L].photos = arrayMove(arrList[index_L].photos, oldIndex, newIndex)
        setArrList(tmpArrList)
    }

    return (
        <div className='flex flex-wrap justify-evenly'>
            <div className={`columns-1 md:columns-2 lg:columns-3 break-inside-auto gap-1 w-full animate-slide-bottom-d${slide++ % 5}`}>
                <DndContext id={id} collisionDetection={closestCenter} onDragEnd={onDragEnd} sensors={sensors}>
                    <SortableContext items={arrList[index_L].photos} strategy={rectSortingStrategy}>
                        {arrList[index_L].photos.map((photo: PhotoData, index: number) => {
        
                            return (
                                <PhotoAdmin key={photo.id} arrList={arrList} setArrList={setArrList} imgToDel={imgToDel} setImgToDel={setImgToDel} photo={photo} />
                        )})}
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    )
}