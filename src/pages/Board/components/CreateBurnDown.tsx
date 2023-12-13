import { Popover, PopoverContent, PopoverTrigger } from '@/components/popOverModal';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import AuthContext from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, Clock7 } from 'lucide-react';
import { useContext, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useParams } from 'react-router-dom';

const CreateBurnDown = () => {
  const [mainDate, setMainDate] = useState<DateRange | undefined>();
  const formatDateToString = (date: Date | undefined) => {
    return date ? date.toISOString().split('T')[0] : '';
  };
  const { boardId } = useParams();
  let authTokens = useContext(AuthContext)?.authTokens;
  const CreateBurnDown = async () => {
    if (mainDate) {
      const data = await fetch(
        `https://amirmohammadkomijani.pythonanywhere.com/tascrum/burndown-chart-create/${boardId}/create_burndown/`,
        {
          method: 'POST',
          headers: {
            Authorization: `JWT ` + authTokens.access,
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
            start: formatDateToString(mainDate?.from),
            end: formatDateToString(mainDate?.to),
          }),
        }
      );
      console.log(data);
    }
  };
  return (
    <div className="flex border-b-2 py-5 pl-20">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={'outline'} className="w-[280px] justify-start text-left font-normal">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Pick a date</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3 " align="center">
          <Calendar
            mode="range"
            selected={mainDate}
            onSelect={setMainDate}
            defaultMonth={mainDate?.from}
            initialFocus
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>

      <Button className="ml-4" onClick={CreateBurnDown}>
        {mainDate ? (
          <span>
            Build the table From: {formatDateToString(mainDate.from)} To: {formatDateToString(mainDate.to)}
          </span>
        ) : (
          <span>Select the date</span>
        )}
      </Button>
    </div>
  );
};

export default CreateBurnDown;
