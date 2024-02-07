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
    const [text, setText] = useState('')
    const [lat, setLat] = useState(Infos.Map_lat)
    const [lng, setLng] = useState(Infos.Map_lng)
    const line: lineType = {
        'Mail': 
            <button className="w-fit text-lg bg-black px-3 py-1 my-1 shadow shadow-red-b ml-5">
                <a href={"mailto:" + Infos.Mail} target="_blank" className='flex flex-row justify-center'>
                    <Image
                        src="/mail.svg"
                        width={40}
                        height={40}
                        alt="Mail"
                        className="object-contain h-5 w-5 mr-1 mt-1 filter-white"
                    />
                    <p>{Infos.Mail}</p>
                </a>    
            </button>,
        'Facebook':                     
            <button className="w-fit text-lg bg-black px-3 py-1 my-1 shadow shadow-red-b ml-5">
                <a href={Infos.Facebook} target="_blank" className='flex flex-row justify-center'>
                    <Image
                        src="/fb.svg"
                        width={40}
                        height={40}
                        alt="Mail"
                        className="object-contain h-5 w-5 mr-1 mt-1 filter-white"
                    />
                    <p>facebook</p>
                </a>
            </button>,
        'Horaires': <p className="ml-5">{Infos.Horaires}</p>,
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
        if (text)
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
        if (lat)
            Infos.Map_lat = Number(lat)
        if (lng)
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
                <div className={ "flex flex-row " + ((htmlName == 'Mail' || htmlName == 'Facebook' || htmlName == 'Horaires') && "justify-center")}>
                    {line[htmlName]}
                    <button onClick={(event) => {setClick(0)}} className="self-start">
                        <Image
                            src="/edit-write.svg"
                            width={40}
                            height={40}
                            alt="Mail"
                            className="object-contain h-4 w-4 ml-1 filter-white"
                        />
                    </button>
                </div>
            ):( 
                <div>
                    { check ? (
                        <div className="flex flex-row justify-center w-full my-2">
                            <form onSubmit={handleMapSubmit} className="flex flex-row justify-center align-middle w-[90%]">
                                <div className="flex flex-row w-[90%]">
                                    <div className="flex flex-col w-full">
                                        <label htmlFor="map_lat">Position Latitude</label>
                                        <input 
                                            type="text" 
                                            id='map_lat' 
                                            name='Map_lat' 
                                            defaultValue={Infos.Map_lat} 
                                            onChange={(event) => {setLat(event.target.value)}}
                                            className="w-[95%] bg-transparent focus:ring-red-b"
                                        />
                                        <label htmlFor="map_lng">Position Longitude</label>
                                        <input 
                                            type="text" 
                                            id='Map_lng' 
                                            name='Map_lng' 
                                            defaultValue={Infos.Map_lng} 
                                            onChange={(event) => {setLng(event.target.value)}}
                                            className="w-[95%] bg-transparent focus:ring-red-b"
                                        />
                                    </div>
                                    <button type="submit" className="ml-2">
                                        <Image
                                            src="/validation.svg"
                                            width={40}
                                            height={40}
                                            alt="Mail"
                                            className="object-contain h-6 w-6 filter-white"
                                        />
                                    </button>
                                    <button onClick={() => {setClick(1)}} className="self-start">
                                        <Image
                                            src="/close-cross.svg"
                                            width={40}
                                            height={40}
                                            alt="Mail"
                                            className="object-contain h-5 w-5 filter-white"
                                        />
                                    </button>
                                </div>
                            </form>
                        </div>
                    ):(
                        <div className="flex flex-row justify-center w-full my-2">
                            <form onSubmit={handleSubmit} className="flex flex-row justify-center align-middle w-[90%]">
                                <label>
                                    <input 
                                        type="text" 
                                        name={htmlName} 
                                        defaultValue={Infos[htmlName]} 
                                        onChange={(event) => {setText(event.target.value)}}
                                        className="w-[90%] bg-transparent focus:ring-red-b"
                                    />
                                </label>
                                <button type="submit" className="mx-1">
                                    <Image
                                        src="/validation.svg"
                                        width={40}
                                        height={40}
                                        alt="Mail"
                                        className="object-contain h-6 w-6 filter-white"
                                    />
                                </button>
                                <button onClick={() => {setClick(1)}} className="self-start ml-1">
                                    <Image
                                        src="/close-cross.svg"
                                        width={40}
                                        height={40}
                                        alt="Mail"
                                        className="object-contain h-5 w-5 filter-white"
                                    />
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}