import { Popover, PopoverContent, PopoverTrigger } from '@/components/popOverModal';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Clock7 } from 'lucide-react';
import { DateRange } from 'react-day-picker';

interface Props {
  mainDate?: DateRange;
  setMainDate: any;
  selectedValue: string;
  setSelectedValue: any;
}

export function DatePickerModal({ mainDate, setMainDate, selectedValue, setSelectedValue }: Props) {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="secondary"
          className="col-span-3 mx-4 mb-2 flex cursor-pointer justify-start rounded-sm px-4  text-sm md:col-span-6"
        >
          <Clock7 className="mb-1 mr-1 h-4 w-4" />
          Dates
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
        <div className="mx-6 my-4 text-xs font-medium">
          <Label>Set due date reminder</Label>
        </div>
        <Select onValueChange={(selectedValue) => setSelectedValue(selectedValue)}>
          <SelectTrigger className="mx-6 w-[240px]">
            <SelectValue placeholder={selectedValue}></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>due date</SelectLabel>
              <SelectItem value="None">None</SelectItem>
              <SelectItem value="At time of due date">At time of due date</SelectItem>
              <SelectItem value="1 Day before">1 Day before</SelectItem>
              <SelectItem value="2 Day before">2 Day before</SelectItem>
              <SelectItem value="3 Day before">3 Day before</SelectItem>
              <SelectItem value="5 Day before">5 Day before</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </PopoverContent>
    </Popover>
  );
}
