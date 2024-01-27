import { debug } from 'console';
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
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { fi } from 'date-fns/locale';
import { CalendarDays, CircleUserRound, Clock4, ListFilter, Tag } from 'lucide-react';
import { useDebugValue, useEffect, useLayoutEffect, useState } from 'react';
import { useFilterCards } from '../hooks/useFilterCards';
import { Card, LabelItem, LabelItems, Member, Members } from '../types';

// const mockMembers = {
//   id: 1,
//   members: [
//     {
//       id: 2,
//       user: {
//         first_name: 'John',
//         last_name: 'Doe',
//         email: 'johndoe@email.com',
//         username: 'johndoe',
//       },
//       profimage: 'https://example.com/johndoe.jpg',
//     },
//     {
//       id: 3,
//       user: {
//         first_name: 'Jane',
//         last_name: 'Smith',
//         email: 'janesmith@email.com',
//         username: 'janesmith',
//       },
//       profimage: 'https://example.com/janesmith.jpg',
//     },
//     {
//       id: 5,
//       user: {
//         first_name: 'Peter',
//         last_name: 'Jones',
//         email: 'peterjones@email.com',
//         username: 'peterjones',
//       },
//       profimage: 'https://example.com/peterjones.jpg',
//     },
//     {
//       id: 6,
//       user: {
//         first_name: 'Mary',
//         last_name: 'Brown',
//         email: 'marybrown@email.com',
//         username: 'marybrown',
//       },
//       profimage: 'https://example.com/marybrown.jpg',
//     },
//     {
//       id: 7,
//       user: {
//         first_name: 'Mary',
//         last_name: 'Brown',
//         email: 'marybrown@email.com',
//         username: 'marybrown',
//       },
//       profimage: 'https://example.com/marybrown.jpg',
//     },
//     {
//       id: 8,
//       user: {
//         first_name: 'Mary',
//         last_name: 'Brown',
//         email: 'marybrown@email.com',
//         username: 'marybrown',
//       },
//       profimage: 'https://example.com/marybrown.jpg',
//     },
//     {
//       id: 9,
//       user: {
//         first_name: 'Mary',
//         last_name: 'Brown',
//         email: 'marybrown@email.com',
//         username: 'marybrown',
//       },
//       profimage: 'https://example.com/marybrown.jpg',
//     },
//     {
//       id: 10,
//       user: {
//         first_name: 'Mary',
//         last_name: 'Brown',
//         email: 'marybrown@email.com',
//         username: 'marybrown',
//       },
//       profimage: 'https://example.com/marybrown.jpg',
//     },
//   ],
// };

interface FilterCardProps {
  membersData?: Members;
  boardLabelData?: LabelItems;
}

export function FilterCard({ membersData, boardLabelData }: FilterCardProps) {
  const [labels, setLabels] = useState<any>([]);
  const [assignees, setAssignees] = useState<any>([]);
  const [params, setParams] = useState({});
  const { data } = useFilterCards(params, assignees, labels, (data: Card[]) => {
    console.log('datachng', data?.map((card) => card.id));
    if (data) {
      if (data.length !== 0) {
        updateFilteredFlag(data?.map((card) => card.id), true);
      } else {
        updateAllFilteredFlagsTo(true);
      }
    } else {
      updateAllFilteredFlagsTo(true);
    }
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    setLabels(boardLabelData?.labels);
    setAssignees(membersData?.members);
  }, [boardLabelData, membersData]);

  const handleLabelChange = (item: LabelItem) => {
    setLabels((prevLabels: any) =>
      prevLabels.map((label: any) => (label.id === item.id ? { ...label, checked: !label.checked } : label))
    );
  };

  const handleAssigneeChange = (item: Member) => {
    setAssignees((prevAssignees: any) =>
      prevAssignees.map((assignee: any) =>
        assignee.id === item.id ? { ...assignee, checked: !assignee.checked } : assignee
      )
    );
  };

  useLayoutEffect(() => {
    updateAllFilteredFlagsTo(false);
    setParams({
      assignes: assignees?.filter((obj: any) => obj.checked === true).map((item: any) => item.id),
      labels: labels?.filter((obj: any) => obj.checked === true).map((item: any) => item.id),
    });
  }, [assignees, labels]);

  const updateFilteredFlag = (filteredCardsIds: number[], filterflag: boolean) => {
    const cardKeys = queryClient.getQueryCache().findAll(['card']);

    // Loop through each key and update the filtered flag to false
    cardKeys.forEach((cardKey) => {
      // Retrieve existing data from the cache
      const existingData = queryClient.getQueryData(cardKey.queryKey);

      // Check if data exists before updating
      if (existingData) {
        // Mutate the data by setting the 'filtered' property to false
        const updatedData = { ...existingData, filtered: false };

        // Update the cache with the mutated data
        queryClient.setQueryData(cardKey.queryKey, updatedData);
      }
    });
    // Loop through filteredCardsIds and update the cache for each card
    console.log('==================++++++++++++++');
    console.log(filteredCardsIds);
    for (const cardId of filteredCardsIds) {
      const queryKey = ['card', cardId];

      // Retrieve existing data from the cache
      const existingData = queryClient.getQueryData(queryKey);

      // Check if data exists before updating
      if (existingData) {
        // Mutate the data by setting the 'filtered' property to true
        const updatedData = { ...existingData, filtered: true };

        // Update the cache with the mutated data
        queryClient.setQueryData(queryKey, updatedData);
        console.log('++++++++++++++');
        console.log(queryClient.getQueryData(queryKey));
      }
    }
  };
  const updateAllFilteredFlagsTo = (filterflag: boolean) => {
    // Get all query keys matching the pattern ["card", ...]
    const cardKeys = queryClient.getQueryCache().findAll(['card']);

    // Loop through each key and update the filtered flag to false
    cardKeys.forEach((cardKey) => {
      // Retrieve existing data from the cache
      const existingData = queryClient.getQueryData(cardKey.queryKey);

      // Check if data exists before updating
      if (existingData) {
        // Mutate the data by setting the 'filtered' property to false
        const updatedData = { ...existingData, filtered: filterflag };

        // Update the cache with the mutated data
        queryClient.setQueryData(cardKey.queryKey, updatedData);
      }
    });
  };

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
              {/* <div className="col-span-3 ml-2 flex space-x-4 ">
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
              </div> */}
              {/* <div className="col-span-3 ml-2 flex space-x-4 ">
                <Checkbox id="terms" />
                <div className="flex gap-2">
                  <CircleUserRound className="h-5 w-5 text-muted-foreground" />
                  <Avatar className="-mt-2 h-8 w-8 text-muted-foreground">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-sm">MM</AvatarFallback>
                  </Avatar>
                  <label
                    htmlFor="terms"
                    className="text-sm  text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Cards assigned to me
                  </label>
                </div>
              </div> */}
              <div className="col-span-3 ml-2 flex space-x-4 ">
                {/* <Checkbox id="terms" /> */}
                <Select>
                  <SelectTrigger className="-mt-2 h-9 w-[280px] bg-secondary">
                    <SelectValue placeholder={'Select members'}></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {/* <SelectLabel>select members</SelectLabel>
                      <SelectItem value="None">None</SelectItem>
                      <SelectItem value="hosein">hosein</SelectItem>
                      <SelectItem value="mamad">mamad</SelectItem>
                      <SelectItem value="ali">ali</SelectItem>
                      <SelectItem value="arian">arian</SelectItem>
                      <SelectItem value="komij">komij</SelectItem> */}
                      {assignees?.map((member: Member) => (
                        <div className="ml-5 flex gap-3 p-2">
                          <div className="flex gap-2">
                            <Checkbox
                              // checked={assigndata?.labelcard?.some((assignedItem) => assignedItem.id === item?.id)}
                              checked={member?.checked ? true : false}
                              onClick={() => handleAssigneeChange(member)}
                            />
                            <Avatar className="-mt-2 h-7 w-7">
                              <AvatarImage src={member.profimage} />
                              <AvatarFallback className="text-sm">
                                {member.user.first_name[0]}
                                {member.user.last_name[0]}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="">
                            <h4 className="text-xs font-light">
                              {member.user.first_name} {member.user.last_name}
                            </h4>
                          </div>
                        </div>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 items-center gap-5">
              <Label className="col-span-3 text-xs font-semibold text-muted-foreground">Labels</Label>
              {/* <div className="col-span-3 ml-2 flex space-x-4">
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
              </div> */}

              <div className="col-span-3 ml-2 flex space-x-4 ">
                {/* <Checkbox id="terms" /> */}
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
                      {labels?.map((item: LabelItem) => (
                        <div key={item.id} className="m-3 ml-2 flex space-x-4">
                          {/* onCheckedChange={() => handleCheckChange(item.id)} */}
                          <Checkbox
                            // checked={assigndata?.labelcard?.some((assignedItem) => assignedItem.id === item?.id)}
                            checked={item?.checked ? true : false}
                            onClick={() => {
                              handleLabelChange(item);
                            }}
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
              {/* <div className="grid grid-cols-3 items-center gap-5">
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
              </div> */}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
