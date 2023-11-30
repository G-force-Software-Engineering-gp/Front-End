import { Button } from '@/components/ui/button'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import { useEffect, useState } from 'react'
import AuthContext from '@/contexts/AuthContext'
import { useContext } from 'react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { CardDetail } from './cardDetail'
import { useTheme } from '@/components/theme-provider'


const Calendar = () => {
  const { theme } = useTheme();
  let authTokens = useContext(AuthContext)?.authTokens

  const [modalOpen, setModalOpen] = useState(false)
  const [allEvents, setAllEvents] = useState<any>()
  const [CalendarEvents, setCalendarEvents] = useState<any>([])

  const fetchedEvents = async () => {
    const response = await fetch(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/calender/`, {
      method: 'GET',
      headers: {
        Authorization: `JWT ${authTokens.access}`
      }
    })
    const data = await response.json()
    setAllEvents(data)
    const calendarEvent = Object.keys(data).map((event) => {
      let dayObject = new Date(data[event].duedate)
      let day: any = dayObject.getUTCDate();
      let month: any = dayObject.getUTCMonth();
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
        "title": data[event].title,
        "labels": data[event].labels
      }
    })
    setCalendarEvents(calendarEvent)
  }
  useEffect(() => {
    fetchedEvents()
  }, [])


  const [data, setData] = useState<any>([])

  function renderEventContent(eventInfo: any) {
    const handleClick = () => {
      const filterData = allEvents.filter((e: any) => e.id == eventInfo.event.id)
      setData(filterData[0])
      setModalOpen(!modalOpen)
    }
    console.log(eventInfo.event)
    return (
      <div>
        {eventInfo.event.extendedProps.labels
          .map((label: any) => (
            <div className='h-fit w-fit m-1 p-1 rounded-full' style={{ backgroundColor: label.color }} key={label.id}>
              <p style={{ color: theme === 'dark' ? '#020817' : '#ffffff' }} className='text-xs'>{label.title}</p>
            </div>
          ))}
        <Button variant="secondary" onClick={() => handleClick()} className='rounded-none justify-start text-sm font-bold p-1 w-full h-auto whitespace-normal' >
          {eventInfo.event.title}
        </Button >
      </div >
    )
  }
  return (
    <>
      <div className='p-4 h-[100vh] w-full'>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={CalendarEvents}
          eventContent={renderEventContent}
          height="100%"
          headerToolbar={{
            left: "today,prev,next",
            center: "title",
            right: "dayGridMonth,dayGridWeek,dayGridDay",
          }}
          eventBorderColor='black'
          eventBackgroundColor={theme === 'dark' ? '#020817' : '#ffffff'}
        />
      </div >
      {data.length !== 0 && <CardDetail modalOpen={modalOpen} setModalOpen={setModalOpen} data={data} />}
    </>

  )
}

export default Calendar
