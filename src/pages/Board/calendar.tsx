import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Calendar as Cal } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthContext from '@/contexts/AuthContext';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useMutation } from '@tanstack/react-query';
import { CalendarCheck } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseURL } from '../baseURL';
import { CardDetail } from './cardDetail';
import { useMembers } from './hooks/useMembers';

const Calendar = () => {
  const { theme } = useTheme();
  let authTokens = useContext(AuthContext)?.authTokens;
  const { boardId } = useParams();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [allEvents, setAllEvents] = useState<any>();
  const [CalendarEvents, setCalendarEvents] = useState<any>([]);

  const [title, setTitle] = useState<any>();
  const [date, setDate] = useState<any>();

  const fetchedEvents = async () => {
    const response = await fetch(BaseURL + `tascrum/boards/${boardId}/calender/`, {
      method: 'GET',
      headers: {
        Authorization: `JWT ${authTokens.access}`,
      },
    });
    const data = await response.json();
    setAllEvents(data);
    const calendarEvent: any = Object.keys(data).map((event) => {
      let dayObject = new Date(data[event].duedate);
      let day: any = dayObject.getUTCDate();
      let month: any = dayObject.getUTCMonth();
      month = month + 1
      if (month < 10) {
        month = '0' + month;
      }
      if (day < 10) {
        day = '0' + day;
      }
      let year = dayObject.getUTCFullYear();
      return {
        id: data[event].id,
        date: year + '-' + month + '-' + day,
        title: data[event].title,
        labels: data[event].labels,
        type: 'calendarEvent',
      };
    });
    const res = await fetch(BaseURL + `tascrum/boards/${boardId}/meeting/`, {
      method: 'GET',
      headers: {
        Authorization: `JWT ${authTokens.access}`,
      },
    });
    const Data = await res.json();
    const calendar_event: any = Object.keys(Data).map((meeting: any) => {
      let dayObject = new Date(Data[meeting].time);
      let day: any = dayObject.getUTCDate();
      let month: any = dayObject.getUTCMonth() + 1;
      const eventTime = dayObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (month < 10) {
        month = '0' + month;
      }
      if (day < 10) {
        day = '0' + day;
      }
      let year = dayObject.getUTCFullYear();
      return {
        id: Data[meeting].id,
        date: year + '-' + month + '-' + day,
        title: Data[meeting].title,
        hour: eventTime,
        type: 'calendarMeeting',
      };
    });
    setCalendarEvents(calendarEvent.concat(calendar_event));
  };
  useEffect(() => {
    fetchedEvents();
  }, []);

  const { data: membersData } = useMembers(parseInt(boardId ? boardId : ''));

  const AddMeeting: any = useMutation((meetingInfo: any) => addMeeting(meetingInfo));
  const addMeeting = async (meetingData: any) => {
    const response = await fetch(BaseURL + `tascrum/boards/${boardId}/meeting/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${authTokens.access}`,
      },
      body: JSON.stringify(meetingData),
    });
  };
  function handleSubmit() {
    const meetingValues = {
      member: membersData?.members[1]?.id,
      title: title,
      time: date,
    };
    AddMeeting.mutate(meetingValues, {
      onSuccess: () => {
        setDate(null);
        setTitle(null);
        setOpen(false);
      },
    });
  }
  const [data, setData] = useState<any>([]);

  function renderEventContent(eventInfo: any) {
    const handleClick = () => {
      const filterData = allEvents.filter((e: any) => e.id == eventInfo.event.id);
      setData(filterData[0]);
      setModalOpen(!modalOpen);
    };
    return (
      <div>
        {eventInfo.event.extendedProps.type === 'calendarEvent' && (
          <div>
            <div className="flex flex-wrap">
              {eventInfo.event.extendedProps.labels.map((label: any) => (
                <div
                  className="m-1 h-fit w-fit rounded-full p-1"
                  style={{ backgroundColor: label.color }}
                  key={label.id}
                >
                  <p className="color-white text-xs">{label.title}</p>
                </div>
              ))}
            </div>
            <Button
              variant="secondary"
              onClick={() => handleClick()}
              className="h-auto w-full justify-start whitespace-normal rounded-none p-1 text-sm font-bold"
            >
              {eventInfo.event.title}
            </Button>
          </div>
        )}
        {eventInfo.event.extendedProps.type === 'calendarMeeting' && (
          <Button className="flex-rows text-s flex h-auto w-full justify-start whitespace-normal rounded-none p-1 font-bold">
            <CalendarCheck className="my-1 flex  h-7 w-7 flex-shrink-0 items-center" />
            <div className="flex flex-grow flex-col">
              <p className="text-base">{eventInfo.event.title}</p>
              <p className="text-xs font-bold">{eventInfo.event.extendedProps.hour}</p>
            </div>
          </Button>
        )}
      </div>
    );
  }
  return (
    <>
      <div className="h-[100vh] w-full p-4 backdrop-blur-md">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={CalendarEvents}
          eventContent={renderEventContent}
          height="100%"
          customButtons={{
            AddNewMeeting: {
              text: 'Add Meeting',
              click: () => {
                setOpen(!open);
              },
            },
          }}
          headerToolbar={{
            left: 'today,prev,next,AddNewMeeting',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay',
          }}
          eventBorderColor="black"
          eventBackgroundColor={theme === 'dark' ? '#020817' : '#ffffff'}
        />
      </div>
      {data.length !== 0 && <CardDetail modalOpen={modalOpen} setModalOpen={setModalOpen} data={data} />}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new meeting</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col justify-center">
            <div className="m-1 flex items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input
                id="name"
                placeholder="meeting title"
                className="w-full rounded-md border"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="m-1 flex items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Date
              </Label>
              <Cal mode="single" selected={date} onSelect={setDate} className="w-full rounded-md border" />
            </div>
          </div>
          <DialogFooter>
            <Button disabled={AddMeeting.isLoading} onClick={() => handleSubmit()} type="submit">
              Add Meeting
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Calendar;
