'use client'

import { Carousel } from "flowbite-react"
import Image from "next/image"
import { PhotoData } from "@/app/types"

interface CarouselSliderProps {
  photos: PhotoData[]
}

export default function CarouselSlider ({ photos }: CarouselSliderProps) {

    return (
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel indicators={false}>
          {photos?.map((photo: PhotoData) => {
              return (
                <div key={photo.id} className="h-98 justify-center">
                  <Image
                      src={'http://127.0.0.1:8090/api/files/Photos/' + photo.id + '/' + photo.Image}
                      width={1500}
                      height={1500}
                      alt={photo.Type}
                      className="w-full sm:h-64 xl:h-80 2xl:h-96 object-contain"
                  />
                </div>
              )
          })}
        </Carousel>
      </div>
    )
}