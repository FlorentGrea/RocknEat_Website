"use client"

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Fragment } from 'react';

export default function Calendar({ db_events }: any) {
  console.log(db_events);

    return (
      <div>
        <FullCalendar 
          timeZone='UTC'
          plugins={[ dayGridPlugin ]}
          initialView="dayGridMonth"
          events={db_events}
        />
      </div>
    )
}