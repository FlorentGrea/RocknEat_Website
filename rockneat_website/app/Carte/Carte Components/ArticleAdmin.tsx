'use client'

import ModifyArticleAdmin from "./ModifyArticleAdmin";
import { useSortable } from  "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import Image from "next/image";

interface ArticleAdminProps {
    newCarte: any,
    setNewCarte: React.SetStateAction<any>,
    rubrique: any,
    article: any
}

export default function ArticleAdmin({ newCarte, setNewCarte, rubrique, article }: ArticleAdminProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: article.id, animateLayoutChanges: () => false})
    const style = {
        transition,
        transform: CSS.Translate.toString(transform)
    }
    const [modifyButton, setModifyButton] = useState(1)

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style} className={"flex flex-col touch-none group/article " + (article.Description && "mb-3 ")}>
            { modifyButton ?
                <div>
                    <div className="flex flex-row">
                        { article.Vege &&
                            <p className="mr-1 text-sm lg:text-base xl:text-lg font-bold leading-6 text-green-500">
                                {article.Vege ? "VÉGÉ • " : ""}
                            </p>
                        }
                        <p className="text-sm lg:text-base xl:text-lg font-bold flex-grow group-hover/article:text-red">{article.Titre}</p>
                        { article.Prix && article.Prix > 0 ?
                            <p className="group-hover/article:text-red">
                                {article.Prix + ' €'}
                            </p> : []
                        }
                        <button className="self-start" onClick={() => {setModifyButton(0)}}>
                            <Image
                                src="/edit-write.svg"
                                width={40}
                                height={40}
                                alt="Mail"
                                className="group-hover/article:hidden object-contain h-5 w-5 filter-white pt-1 disabled:animate-pulse"
                            />
                        </button>
                        <button className="self-start" onClick={() => {setModifyButton(0)}}>
                            <Image
                                src="/edit-write.svg"
                                width={40}
                                height={40}
                                alt="Mail"
                                className="hidden group-hover/article:block object-contain h-5 w-5 filter-red pt-1 disabled:animate-pulse"
                            />
                        </button>
                        <Image
                            src="/vertical-arrow.svg"
                            width={40}
                            height={40}
                            alt="Mail"
                            className="group-hover/article:hidden object-contain h-6 w-6 filter-white"
                        />
                        <Image
                            src="/vertical-arrow.svg"
                            width={40}
                            height={40}
                            alt="Mail"
                            className="hidden group-hover/article:block object-contain h-6 w-6 filter-red"
                        />
                    </div>
                    { article.Description && 
                        <p className="text-xs lg:text-sm xl:text-base w-full">
                            {article.Description}
                        </p> 
                    }
                </div>
            :
                <ModifyArticleAdmin newCarte={newCarte} setNewCarte={setNewCarte} rubrique={rubrique} article={article} setModifyButton={setModifyButton} />
            }
        </div>
    )
}