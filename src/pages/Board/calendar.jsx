import { Button } from '@/components/ui/button'
import { Undo2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import { useEffect, useState } from 'react'
import AuthContext from '@/contexts/AuthContext'
import { useContext } from 'react'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import timeGridPlugin from '@fullcalendar/timegrid'

const Calendar = () => {
  let authTokens = useContext(AuthContext)?.authTokens
  const navigate = useNavigate()
  const { boardId } = useParams();
  const [CalendarEvents, setCalendarEvents] = useState([])

  const fetchedEvents = async () => {
    const response = await fetch(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/calender/`, {
      method: 'GET',
      headers: {
        Authorization: `JWT ${authTokens.access}`
      }
    })
    const data = await response.json()
    const calendarEvent = Object.keys(data).map((event) => {
      let dayObject = new Date(data[event].duedate)
      let day = dayObject.getUTCDate();
      let month = dayObject.getUTCMonth();
      if (month < 10) {
        month = "0" + month
      }
      if (day < 10) {
        day = '0' + day
      }
      let year = dayObject.getUTCFullYear();
      return {
        "id": data[event].id,
        "date": year + '-' + month + '-' + day,
        "title": data[event].title
      }
    })
    console.log(calendarEvent)
    setCalendarEvents(calendarEvent)
  }
  useEffect(() => {
    fetchedEvents()
  }, [])
  // {
  //   "id": 19,
  //   "startdate": null,
  //   "duedate": "2023-11-17T11:28:50.501576Z",
  //   "reminder": "At time of due date",
  //   "storypoint": 5,
  //   "setestimate": 0
  // }
  // {
  //   "id":id,
  //   "start": start date of the task,
  //   "end" : due date of the task,
  //   "title": name of the task,
  //   "backgroundColor": bg color of the task,
  //   "borderColor" : border color of the task,
  //   "textColor" : text color of the task,
  //   "allDay" : false,
  //    "date" : due date?
  // }

  function renderEventContent(eventInfo) {
    return (
      <Button className='text-sm font-bold p-1 w-full h-auto whitespace-normal'>
        {eventInfo.event.title}
      </Button>
    )
  }
  return (
    <div className='p-4 h-[100vh] w-full'>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={CalendarEvents}
        eventContent={renderEventContent}
        height="100%"
        //dateClick={ }
        headerToolbar={{
          left: "today,prev,next",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        }}

      />
    </div >
  )
}

export default Calendar
