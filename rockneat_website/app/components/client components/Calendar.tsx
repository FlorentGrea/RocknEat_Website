"use client"

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function Calendar({ db_events }: any) {
  const [showEventModal, setShowEventModal] = useState(false)
  const [Event, setEvent] = useState(db_events[0])

  function handleShowEventModal(event: any) {
    setEvent((db_events.find((e: any) => e.id == Event.id)))
    setShowEventModal(true)
  }
  
  return (
    <div>
      <FullCalendar 
        timeZone='UTC'
        plugins={[ dayGridPlugin ]}
        initialView="dayGridWeek"
        events={db_events}
        eventClick={(data) => handleShowEventModal(data.event)}
      />
    </div>
  )
}