'use client'

import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from  "@dnd-kit/sortable"
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core"
import ModifyRubriqueAdmin from "./ModifyRubriqueAdmin";
import CreateArticleAdmin from "./CreateArticleAdmin";
import ArticleAdmin from "./ArticleAdmin";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import Image from "next/image";

interface RubriqueAdminProps {
    newCarte: any,
    setNewCarte: React.SetStateAction<any>,
    rubrique: any,
}

export default function RubriqueAdmin({ newCarte, setNewCarte, rubrique }: RubriqueAdminProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: rubrique.id, animateLayoutChanges: () => false})
    const style = {
        transition,
        transform: CSS.Translate.toString(transform)
    }
    const [modifyButton, setModifyButton] = useState(1)

    const sensors = useSensors(
        useSensor(PointerSensor, {activationConstraint: {distance: 2}}),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function onDragEnd(event: any) {
        const { active, over } = event

        if (active.id === over.id)
            return ;

        let tmpCarte = [...newCarte]
        const rubriqueIndex = newCarte.findIndex((rub: any) => rub.id === rubrique.id)
        const oldIndex = rubrique.articles.findIndex((article: any) => article.id === active.id)
        const newIndex = rubrique.articles.findIndex((article: any) => article.id === over.id)
        tmpCarte[rubriqueIndex].articles = arrayMove(newCarte[rubriqueIndex].articles, oldIndex, newIndex)

        setNewCarte(tmpCarte)
    }

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style} className={`inline-block touch-none w-full bg-black bg-gradient-to-tl from-red/20 via-black to-black shadow-sm shadow-black/30 p-3 mb-2`}>
            { modifyButton ?
                <div className="relative flex flex-col">
                    <div className="flex flex-row">
                        <h1 className="text-sm lg:text-base xl:text-lg font-bold mb-2 mr-1">{rubrique.type}</h1>
                        <button className="self-start" onClick={() => {setModifyButton(0)}}>
                            <Image
                                src="/edit-write.svg"
                                width={40}
                                height={40}
                                alt="Mail"
                                className="group-hover:hidden object-contain h-5 w-5 mr-1 filter-white pt-1 disabled:animate-pulse"
                            />
                        </button>
                        <button className="self-start" onClick={() => {setModifyButton(0)}}>
                            <Image
                                src="/edit-write.svg"
                                width={40}
                                height={40}
                                alt="Mail"
                                className="hidden group-hover:block object-contain h-5 w-5 mr-1 filter-red pt-1 disabled:animate-pulse"
                            />
                        </button>
                    </div>
                    <p className="text-xs lg:text-sm xl:text-base text-red font-semibold whitespace-pre-line">{rubrique.description}</p>
                    <Image
                        src="/moove-icon.svg"
                        width={40}
                        height={40}
                        alt="Mail"
                        className="group-hover:hidden absolute top-0 right-0 object-contain h-7 w-7 filter-white pt-1"
                    />
                    <Image
                        src="/moove-icon.svg"
                        width={40}
                        height={40}
                        alt="Mail"
                        className="hidden group-hover:block absolute top-0 right-0  object-contain h-7 w-7 filter-red pt-1"
                    />
                </div>
            :
                <ModifyRubriqueAdmin newCarte={newCarte} setNewCarte={setNewCarte} rubrique={rubrique} setModifyButton={setModifyButton} />
            }
            <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd} sensors={sensors}>
                <SortableContext items={rubrique.articles} strategy={verticalListSortingStrategy}>
                    { rubrique.articles.map((article: any, index:number) => {

                        return (
                            <ArticleAdmin key={index} newCarte={newCarte} setNewCarte={setNewCarte} rubrique={rubrique} article={article} />
                        )
                    })}
                </SortableContext>
            </DndContext>        
            <CreateArticleAdmin newCarte={newCarte} setNewCarte={setNewCarte} rubrique={rubrique} />
        </div>
    )
}