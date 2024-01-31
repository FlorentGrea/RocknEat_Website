'use client'

import Image from "next/image";
import { useState } from "react"
import { PhotoData } from "../types";

interface PhotoDisplayProps {
    Photos: PhotoData[]
}

export default function AddPhotosAdmin({ Photos }: PhotoDisplayProps) {
    const [addPhotosButton, setAddPhotosButton] = useState(1)
    const photoForm = new FormData
    let ordre: number = 0;

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        let post_photo = new FormData
        const type = photoForm.get('type') ? photoForm.get('type'): 'lieu'
        post_photo.set('Type', type as string)
        Photos.map((photo) => {
            if (photo.Type == type)
                ordre++
        })
        const images = photoForm.getAll('image')
        Array.from(images).map((image) => {
            post_photo.set('Image', image)
            post_photo.set('ordre', (ordre++).toString())
            fetch('/api/Photos', {
                method: 'POST',
                body: post_photo
            })
        })
        setAddPhotosButton(1)
    }

    function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            Array.from(event.target.files).map((file:File) => {
                photoForm.append('image', file)
            })
        }
    }

    return (
        <div>
            <div>
                <button className={ !addPhotosButton ? "hidden" : "" } onClick={() => {
                    setAddPhotosButton(0);
                }}>Ajouter des photos</button>
            </div>
            { !addPhotosButton ?
                <div>
                    <h2>Créer une rubrique</h2>

                    <form onSubmit={handleFormSubmit} className="text-black">

                        <label htmlFor="status" className="text-white">Catégorie</label>
                        <select name="status" defaultValue="lieu" onChange={(event) => {photoForm.set('type', event.target.value)}}>
                            <option value="lieu">LE LIEU</option>
                            <option value="concert">LES CONCERTS</option>
                            <option value="affiche">LES AFFICHES</option>
                        </select>

                        <label htmlFor="image" className="text-white">Photo</label>
                        <input
                            type="file"
                            name="Image"
                            required
                            multiple
                            accept="image/*"
                            className="text-white"
                            onChange={handleImage}
                        ></input>
        
                        <input type="submit" className="text-white" value="Créer" />
                    </form>
                    <button onClick={() => {setAddPhotosButton(1)}}>
                        <Image
                            src="/close-cross.svg"
                            width={40}
                            height={40}
                            alt="Mail"
                            className="object-contain h-5 w-5 mr-1 filter-white pt-1"
                        />
                    </button>
                </div>
            : []}
        </div>
    )
}