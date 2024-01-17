export interface MenuData {
    id: string
    Type: string
    Titre: string
    Description: string
    Prix: number
    Vege: boolean
    collectionId: string
    collectionName: string
    created: string
    updated: string
}

export interface EventsData {
    id: string
    date: string
    fin: string
    title: string
    description: string
    link: string
    status: string
    image: string
    collectionId: string
    collectionName: string 
    created: string
    updated: string
}

export interface PhotoData {
    collectionId : string
    id: string
    Type: string
    img_saved: string[]
    active: boolean
    collectionName: string
    created: string
    updated: string
}