export interface MenuData {
    id: string
    Type: string
    Titre: string
    Description: string
    Prix: number
    Vege: Boolean
}

export interface EventsData {
    id: string
    date: string
    fin: string
    title: string
    description: string
    link: string
    Prix: number
    status: string
    image: string
}

export interface PhotoData {
    collectionId : string
    id: string
    Type: string
    img_saved: string[]
}