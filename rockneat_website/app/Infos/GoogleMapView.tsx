'use client'

import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'
import React from "react";

export default function GoogleMapView() {
    const mapContainer = {
        width:'100%',
        height:'25vh'
    }
    const coordinates = { lat: 45.77103585584342, lng: 4.81163122686791 }

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