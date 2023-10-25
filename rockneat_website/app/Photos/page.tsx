import Image from 'next/image'
import CarouselSlider from '../components/client components/Carousel';

async function getPhotos() {
    const res = await fetch(
        'http://127.0.0.1:8090/api/collections/Photos/records?page=1&perPage=30', 
        { cache: 'no-store' }
    );
    const data = await res.json();
    return data?.items as string[];
}

export default async function PhotosPage() {
    const items = await getPhotos();
    const lieux: string[] = [];
    const concerts: string[] = [];
    const affiches: string[] = [];

    items?.map((item: any) => {
        if (item.Type == "lieu")
            lieux.push(item);
        else if (item.Type == "concert")
            concerts.push(item);
        else if (item.Type == "affiche")
            affiches.push(item);
    })

    return (
        <div className='flex flex-col m-auto'>
            <h1>Photos</h1>
            <div>
                <h1>Le lieu</h1>
                <CarouselSlider items={lieux} />
            </div>
            <div>
                <h1>Les concerts</h1>
                <CarouselSlider items={concerts} />
            </div>
            <div>
                <h1>Les affiches</h1>
                <CarouselSlider items={affiches} />
            </div>
        </div>
    )
}