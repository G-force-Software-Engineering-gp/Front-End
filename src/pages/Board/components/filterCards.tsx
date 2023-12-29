import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalendarDays, CircleUserRound, Clock4, ListFilter, Tag } from 'lucide-react';

const data = {
  id: 6,
  labels: [
    {
      id: 1,
      title: 'front',
      color: 'green',
    },
    {
      id: 2,
      title: 'back',
      color: 'blue',
    },
    {
      id: 3,
      title: 'database',
      color: 'red',
    },
    {
      id: 4,
      title: 'devops',
      color: 'orange',
    },
    {
      id: 5,
      title: 'devplus',
      color: 'pink',
    },
  ],
};

export function FilterCard() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {/* <Button variant="outline">Open popover</Button> */}
        <Button data-testid="list filter" variant="secondary" className="h-8 w-8 p-0">
          <ListFilter className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="grid h-[400px] gap-6 overflow-y-auto">
          <div className="space-y-6">
            <h4 className="text-center text-sm font-bold leading-none text-muted-foreground">Filter</h4>
          </div>
          <div className="grid gap-4 p-3">
            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-xs font-semibold text-muted-foreground">Keyword</Label>
              <Input className="col-span-3 h-8" />
              <p className="col-span-3 text-xs text-muted-foreground ">Search cards, members, labels, and more.</p>
            </div>
            <div className="grid grid-cols-3 items-center gap-5">
              <Label className="col-span-3 text-xs font-semibold text-muted-foreground">Members</Label>
              <div className="col-span-3 ml-2 flex space-x-4 ">
                <Checkbox id="terms" />
                <div className="flex gap-2">
                  <CircleUserRound className="-mt-1 h-6 w-6 text-muted-foreground" />
                  <label
                    htmlFor="terms"
                    className="text-sm  text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    No members
                  </label>
                </div>
              </div>
              <div className="col-span-3 ml-2 flex space-x-4 ">
                <Checkbox id="terms" />
                <div className="flex gap-2">
                  {/* <CircleUserRound className="h-5 w-5 text-muted-foreground" /> */}
                  <Avatar className="-mt-2 h-8 w-8 text-muted-foreground">
                    <AvatarImage src="" />
                    <AvatarFallback>MM</AvatarFallback>
                  </Avatar>
                  <label
                    htmlFor="terms"
                    className="text-sm  text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Cards assigned to me
                  </label>
                </div>
              </div>
              <div className="col-span-3 ml-2 flex space-x-4 ">
                <Checkbox id="terms" />
                <Select>
                  <SelectTrigger className="-mt-2 h-9 w-[280px] bg-secondary">
                    <SelectValue placeholder={'Select members'}></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>select members</SelectLabel>
                      <SelectItem value="None">None</SelectItem>
                      <SelectItem value="hosein">hosein</SelectItem>
                      <SelectItem value="mamad">mamad</SelectItem>
                      <SelectItem value="ali">ali</SelectItem>
                      <SelectItem value="arian">arian</SelectItem>
                      <SelectItem value="komij">komij</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 items-center gap-5">
              <Label className="col-span-3 text-xs font-semibold text-muted-foreground">Due date</Label>
              <div className="col-span-3 ml-2 flex space-x-4">
                <Checkbox id="terms" />
                <div className="flex gap-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <label
                    htmlFor="terms"
                    className="text-sm  text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    No dates
                  </label>
                </div>
              </div>
              <div className="col-span-3 ml-2 flex space-x-4 ">
                <Checkbox id="terms" />
                <div className="flex gap-2">
                  <Clock4 className="h-4 w-4 text-destructive" />
                  <label
                    htmlFor="terms"
                    className="text-sm  text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Overdue
                  </label>
                </div>
              </div>
              <div className="col-span-3 ml-2 flex space-x-4 ">
                <Checkbox id="terms" />
                <div className="flex gap-2">
                  <Clock4 className="h-4 w-4 " />
                  <label
                    htmlFor="terms"
                    className="text-sm  text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Due in the next day
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 items-center gap-5">
              <Label className="col-span-3 text-xs font-semibold text-muted-foreground">Labels</Label>
              <div className="col-span-3 ml-2 flex space-x-4">
                <Checkbox id="terms" />
                <div className="flex gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <label
                    htmlFor="terms"
                    className="text-sm  text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    No labels
                  </label>
                </div>
              </div>
              {data?.labels?.map((item) => (
                <div key={item.id} className="col-span-3 ml-2 flex space-x-4">
                  {/* onCheckedChange={() => handleCheckChange(item.id)} */}
                  <Checkbox
                  // checked={assigndata?.labelcard?.some((assignedItem) => assignedItem.id === item?.id)}
                  //   checked={item?.checked}
                  //   onClick={() => handleCheckboxChange(item)}
                  />

                  <div
                    className={`-mt-2 h-8 w-full rounded px-2 py-2 text-sm font-semibold`}
                    style={{ backgroundColor: item.color }}
                  >
                    {item.title}
                  </div>
                </div>
              ))}
              <div className="col-span-3 ml-2 flex space-x-4 ">
                <Checkbox id="terms" />
                <Select>
                  <SelectTrigger className="-mt-2 h-8 w-[280px] bg-secondary">
                    <SelectValue placeholder={'Select labels'}></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select labels</SelectLabel>
                      {/* <SelectItem value="None">None</SelectItem>
                      <SelectItem value="At time of due date">At time of due date</SelectItem>
                      <SelectItem value="1 Day before">1 Day before</SelectItem>
                      <SelectItem value="2 Day before">2 Day before</SelectItem>
                      <SelectItem value="3 Day before">3 Day before</SelectItem>
                      <SelectItem value="5 Day before">5 Day before</SelectItem> */}
                      {data?.labels?.map((item) => (
                        <div key={item.id} className="m-3 ml-2 flex space-x-4">
                          {/* onCheckedChange={() => handleCheckChange(item.id)} */}
                          <Checkbox
                          // checked={assigndata?.labelcard?.some((assignedItem) => assignedItem.id === item?.id)}
                          //   checked={item?.checked}
                          //   onClick={() => handleCheckboxChange(item)}
                          />

                          <div
                            className={`-mt-2 h-8 w-full rounded px-2 py-2 text-sm font-semibold`}
                            style={{ backgroundColor: item.color }}
                          >
                            {item.title}
                          </div>
                        </div>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
