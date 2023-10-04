import Image from 'next/image'

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
        <div>
            <h1>Photos</h1>
            <div>
                <h1>Le lieu</h1>
                {items?.map((photos) => {
                    if (photos.Type == "lieu")
                    return <Photos key={photos.id} photos={photos} />
                })}
            </div>
            <div>
                <h1>Les concerts</h1>
                {items?.map((photos) => {
                    if (photos.Type == "concert")
                    return <Photos key={photos.id} photos={photos} />
                })}
            </div>
            <div>
                <h1>Les affiches</h1>
                {items?.map((photos) => {
                    if (photos.Type == "affiche")
                    return <Photos key={photos.id} photos={photos} />
                })}
            </div>
        </div>
    )
}

function Photos({ photos }: any) {
    const { id, type, img_saved } = photos || {};

    return (
        <div>
            <h1>
                {type}
            </h1>
            <Image
                src={'http://127.0.0.1:8090/api/files/Photos/' + id + '/' + img_saved}
                width={500}
                height={500}
                alt={type}
            />
        </div>
    )
}