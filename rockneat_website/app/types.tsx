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
    type: string
    order: number
    src: string
}

export interface AccueilData {
    Slogan: string
    Description: string
    Nom_Salle_1: string
    Image_Salle_1: string
    Description_Salle_1: string
    Nom_Salle_2: string
    Image_Salle_2: string
    Description_Salle_2: string
}