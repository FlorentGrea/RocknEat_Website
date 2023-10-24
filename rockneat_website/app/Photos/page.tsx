import Image from 'next/image'
import CarouselSlider from '../components/client components/Carousel';

async function getPhotos() {
    const res = await fetch(
        'http://127.0.0.1:8090/api/collections/Photos/records?page=1&perPage=30', 
        { cache: 'no-store' }
    );
    const data = await res.json();
    return data?.items as any[];
}

export default async function PhotosPage() {
    const items = await getPhotos();

    return (
        <div className='flex flex-col m-auto'>
            <h1>Photos</h1>
            {items?.map((photos:any) => {
                if (photos.Type == "lieu")
                return <Photos key={photos.id} photos={photos} />
            })}
            <div>
                <h1>Le lieu</h1>
                <CarouselSlider items={items} type="lieu" />
            </div>
            <div>
                <h1>Les concerts</h1>
                <CarouselSlider items={items} type="concert"/>
            </div>
            <div>
                <h1>Les affiches</h1>
                <CarouselSlider items={items} type="affiche"/>
            </div>
        </div>
    )
}

function Photos({ photos }: any) {
    const { id, type, img_saved, active } = photos || {};

    return (
        <div className="hidden duration-200 ease-linear" data-carousel-item={active == true ? "active" : ""}>
            <Image
                src={'http://127.0.0.1:8090/api/files/Photos/' + id + '/' + img_saved}
                width={500}
                height={500}
                alt={type}
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            />
        </div>
    )
}