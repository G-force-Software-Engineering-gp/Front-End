import * as React from "react"
import { format , parseISO } from "date-fns"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/popOverModal"
import { Clock7 } from "lucide-react"
import { Label } from "@radix-ui/react-dropdown-menu"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select" 

interface Props {
    mainDate ?: DateRange;
    setMainDate: any;
    selectedValue: string ;
    setSelectedValue: any ;
  }
  

  
export function DatePickerModal({ mainDate , setMainDate , selectedValue ,  setSelectedValue }:Props) {
  //const [date, setDate] = React.useState<Date>()
    // const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     setSelectedValue(event.target.value);
    // };
//   console.log(mainDate?.from ? format(mainDate.from, 'LLL dd, yyyy HH:mm:ss') : "Date is undefined");

console.log(selectedValue)

  return (
    <Popover>
      <PopoverTrigger asChild>
      {/* <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        > */}
        <Button
            size="sm"
            variant="secondary"
            className="col-span-3 mx-4 mb-2 flex cursor-pointer justify-start rounded-sm px-4  text-sm md:col-span-6"
        >
          {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
          {/* {date ? format(date, "PPP") : <span>Pick a date</span>} */}
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
        <Select onValueChange={(selectedValue) => setSelectedValue(selectedValue)} >
        <SelectTrigger className="w-[240px] mx-6" >
            <SelectValue placeholder={selectedValue}  ></SelectValue>
        </SelectTrigger>
        <SelectContent >
            <SelectGroup >
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
     {/* <select
            id="dueDate"
            className="w-[240px] mx-6"
            onChange={handleChange}
            value={selectedValue}
        >
            <option value="None">None</option>
            <option value="At time of due date">At time of due date</option>
            <option value="1 Day before">1 Day before</option>
            <option value="2 Day before">2 Day before</option>
            <option value="3 Day before">3 Day before</option>
            <option value="5 Day before">5 Day before</option>
        </select> */}
      </PopoverContent>
    </Popover>
  )
}
