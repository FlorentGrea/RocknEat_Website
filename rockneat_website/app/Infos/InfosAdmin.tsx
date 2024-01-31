'use client'

import Image from "next/image"
import { useState } from "react"
import GoogleMapView from './GoogleMapView';

interface InfosAdminProps {
    data: any
    htmlName: string
}

interface lineType {
    [key: string]: any;
}

export default function InfosAdmin({ data, htmlName }: InfosAdminProps) {
    const Infos = data
    const [click, setClick] = useState(1)
    const [text, setText] = useState(Infos.Slogan)
    const [lat, setLat] = useState(Infos.Map_lat)
    const [lng, setLng] = useState(Infos.Map_lng)
    const line: lineType = {
        'Mail': 
            <button className='text-center m-auto bg-gray-800 text-white font-semibold py-1 mt-2 px-4 border rounded border-transparent'>
                <a href={"mailto:" + Infos.Mail} target="_blank" className='flex flex-row justify-center'>
                    <Image
                        src="/mail.svg"
                        width={40}
                        height={40}
                        alt="Mail"
                        className="object-contain h-5 w-5 mr-1 filter-white pt-1"
                    />
                    <p>{Infos.Mail}</p>
                </a>    
            </button>,
        'Facebook':                     
            <button className='text-center m-auto bg-gray-800 text-white font-semibold py-1 mt-2 pr-4 pl-3 border rounded border-transparent'>
                <a href={Infos.Facebook} target="_blank" className='flex flex-row justify-center'>
                    <Image
                        src="/fb.svg"
                        width={40}
                        height={40}
                        alt="Mail"
                        className="object-contain h-5 w-5 mr-1 filter-white pt-1"
                    />
                    <p>facebook</p>
                </a>
            </button>,
        'Horaires': <p>{Infos.Horaires}</p>,
        'Adresse': <p>{Infos.Adresse}</p>,
        'Bus': <p>{Infos.Bus}</p>,
        'Metro': <p>{Infos.Metro}</p>,
        'Parking': <p>{Infos.Parking}</p>,
        'Velo': <p>{Infos.Velo}</p>,
        'Map' : <GoogleMapView Infos={Infos} />
    }
    let check: number = 0
    if (htmlName == 'Map')
        check = 1

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        Infos[htmlName] = text;
        fetch('/api/Infos', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(Infos)
        })
        setClick(1)
    }

    function handleMapSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        Infos.Map_lat = Number(lat)
        Infos.Map_lng = Number(lng)
        fetch('/api/Infos', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(Infos)
        })
        setClick(1)
    }

    return (
        <div>
            {click ? (
                <div>
                    {line[htmlName]}
                    <button onClick={(event) => {setClick(0)}}>
                        <Image
                            src="/edit-write.svg"
                            width={40}
                            height={40}
                            alt="Mail"
                            className="object-contain h-5 w-5 mr-1 filter-white pt-1"
                        />
                    </button>
                </div>
            ):( 
                <div>
                    { check ? (
                        <div>
                            <form onSubmit={handleMapSubmit}>
                                <label>
                                    <input type="text" id='map_lat' name='map_lat' placeholder={Infos.Map_lat} onChange={(event) => {setLat(event.target.value)}}/>
                                    <input type="text" id='Map_lng' name='Map_lng' placeholder={Infos.Map_lng} onChange={(event) => {setLng(event.target.value)}}/>
                                </label>
                                <input type="submit" value="Change" />
                            </form>
                        </div>
                    ):(
                        <div>
                            <form onSubmit={handleSubmit}>
                                <label>
                                    <input type="text" name={htmlName} placeholder={Infos[htmlName]} onChange={(event) => {setText(event.target.value)}}/>
                                </label>
                                <input type="submit" value="Change" />
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}