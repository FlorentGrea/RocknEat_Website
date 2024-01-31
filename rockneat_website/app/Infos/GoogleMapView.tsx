'use client'

import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'
import React from "react";

export default function GoogleMapView(Infos: any) {
    const mapContainer = {
        width:'100%',
        height:'25vh'
    }
    Infos = Infos.Infos
    const coordinates = { lat: Infos.Map_lat, lng: Infos.Map_lng }

    return (
        <div>
            <LoadScript
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!} 
            >
                <GoogleMap
                    mapContainerStyle={mapContainer}
                    center={coordinates}
                    zoom={15}   
                >
                    <MarkerF
                        position={coordinates}
                        title= "Rock n' Eat"
                    />
                </GoogleMap>
            </LoadScript>
            GoogleMapView
        </div>
    )
}