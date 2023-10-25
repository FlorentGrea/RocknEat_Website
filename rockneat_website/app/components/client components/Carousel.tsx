'use client'

import { Carousel } from "flowbite-react"
import Image from "next/image"

export default function CarouselSlider ({ items }: any) {
  console.log(items.length)
    return (
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel indicators={false}>
          {items?.map((photo:any) => {
              return (
                <div className="h-56 justify-center">
                  <Image
                      key={photo}
                      src={'http://127.0.0.1:8090/api/files/Photos/' + photo.id + '/' + photo.img_saved}
                      width={1000}
                      height={1000}
                      alt={photo.type}
                      className="w-full sm:h-64 xl:h-80 2xl:h-96 object-contain"
                  />
                </div>
              )
          })}
        </Carousel>
      </div>
    )
}