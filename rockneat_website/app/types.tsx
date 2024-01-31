export interface ArticleData {
    Titre: string
    Description: string
    Prix: number
    Vege: boolean
}

export interface CarteData {
    Type: string
    Description: string
    ordre: number
    pos_y: number
    pos_x: number
    articles: ArticleData[]
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
    ordre: number
    Image: string
    active: boolean
    collectionName: string
    created: string
    updated: string
}