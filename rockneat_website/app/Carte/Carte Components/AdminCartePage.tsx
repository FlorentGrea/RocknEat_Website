'use client'

import { SortableContext, arrayMove, rectSortingStrategy } from  "@dnd-kit/sortable"
import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { DndContext, closestCenter } from "@dnd-kit/core"
import CreateRubriqueAdmin from "./CreateRubriqueAdmin";
import RubriqueAdmin from "./RubriqueAdmin";
import { useEffect, useState } from "react";
import PocketBase from 'pocketbase'

interface AdminCartePageProps {
    Carte: any
}

export default function AdminCartePage({ Carte }: AdminCartePageProps) {
    const [ defaultCarte, setDefaultCarte ] = useState(JSON.parse(JSON.stringify(Carte)))
    const [ newCarte, setNewCarte ] = useState(JSON.parse(JSON.stringify(defaultCarte)))
    const [ changeButton, setChangeButton ] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const sensors = useSensors(
      useSensor(PointerSensor, {activationConstraint: {distance: 2}})
    );

    function onDragEnd(event: any) {
        const { active, over } = event

        if (active.id === over.id)
            return ;

        setNewCarte((newCarte: any) => {
            const oldIndex = newCarte.findIndex((rubrique: any) => rubrique.id === active.id)
            const newIndex = newCarte.findIndex((rubrique: any) => rubrique.id === over.id)

            return (arrayMove(newCarte, oldIndex, newIndex))
        })
    }

    useEffect(() => {
        if (JSON.stringify(Carte) !== JSON.stringify(newCarte))
            setChangeButton(true)
    }, [newCarte])

    function handleSubmit() {
        async function postData() {
            setIsLoading(true); // Set loading state
    
            try {
                const pb = new PocketBase('https://rockneatdb.pockethost.io/')
                const post_data = {
                    "json_name": 'carteData',
                    "json_file": JSON.stringify(newCarte)
                }
                await pb.collection('Jsons').update('emip3npy7ntnwse', post_data);
    
                console.log('Carte Updated successfully')
            } catch (error: any) {
                console.error('Error updating carte:', error)
            } finally {
                setIsLoading(false); // Reset loading state
            }
        }
    
        postData()
        setChangeButton(false)
    }

    function revertChanges() {
        setNewCarte(JSON.parse(JSON.stringify(defaultCarte)))
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
        <div className='relative flex flex-col m-auto w-full mt-4 sm:mt-6 md:mt-8 lg:mt-14'>
            <CreateRubriqueAdmin newCarte={newCarte} setNewCarte={setNewCarte} />
            <div className="columns-1 md:columns-2 break-inside-auto gap-2 w-full animate-slide-bottom-d1">
                <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd} sensors={sensors}>
                    <SortableContext items={newCarte} strategy={rectSortingStrategy}>
                        { newCarte.map((rubrique: any, index: number) => {

                            return (
                                <div key={index} className="group relative">
                                    <RubriqueAdmin newCarte={newCarte} setNewCarte={setNewCarte} rubrique={rubrique} />
                                </div>
                            )
                        })}
                    </SortableContext>
                </DndContext>
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