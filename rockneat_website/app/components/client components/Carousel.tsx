'use client'

import { Carousel } from "flowbite-react"
import Image from "next/image"

export default function CarouselSlider ({ items }: any, type: string) {
    return (
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel indicators={false}>
          {items?.map((photos:any) => {
            if (photos.Type == "lieu")
            return <Photos key={photos.id} photos={photos} />
          })}
        </Carousel>
      </div>
    )
}

function Photos({ photos }: any) {
  const { id, type, img_saved, active } = photos || {};

  return (
    <div className="h-56 justify-center">
      <Image
          src={'http://127.0.0.1:8090/api/files/Photos/' + id + '/' + img_saved}
          width={1000}
          height={1000}
          alt={type}
          className="w-full sm:h-64 xl:h-80 2xl:h-96 object-contain"
      />
    </div>
  )
}