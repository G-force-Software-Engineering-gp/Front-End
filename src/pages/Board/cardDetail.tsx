import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AuthContext from '@/contexts/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  AlignJustify,
  AppWindow,
  Archive,
  ArrowLeftRight,
  BookKey,
  CheckSquare,
  Clock7,
  Copy,
  LayoutTemplate,
  MenuSquare,
  Paperclip,
  Pen,
  Rows,
  Share2,
  Tag,
  User,
} from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { DatePickerModal } from './components/datePickerModal';
import { StoryPointComponent } from './components/storyPoint';
import { Card } from './types';

interface Props {
  modalOpen: boolean;
  setModalOpen: any;
  data: Card;
}

export function CardDetail({ modalOpen, setModalOpen, data }: Props) {
  const [mainDate, setMainDate] = useState<DateRange | undefined>({
    // from: new Date(), // Provide an appropriate initial start date.
    // to: new Date(),   // Provide an appropriate initial end date.
    from: data?.startdate ? new Date(data.startdate) : new Date(),
    to: data?.duedate ? new Date(data.duedate) : new Date(),
  });

  const [selectedValue, setSelectedValue] = React.useState(data?.reminder ? data?.reminder : 'None');
  // set for story point
  const [storyPoint, setStoryPoint] = useState('');

  let authTokens = useContext(AuthContext)?.authTokens;
  const queryClient = useQueryClient();

  const dateMutation = useMutation({
    mutationFn: () => {
      let newCard_data = {
        id: data.id,
        title: data.title,
        list: data.list,
        startdate: mainDate?.from,
        duedate: mainDate?.to,
        reminder: selectedValue,
      };

      return fetch(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/crcard/${data.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ` + authTokens.access,
        },
        body: JSON.stringify(newCard_data),
      });
    },
    onError: (error, variables, context) => {
      // An error happened!
    },
    onSuccess: (data, variables, context) => {
      // on success
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['card', data?.id] });
    },
  });
  useEffect(() => {
    dateMutation.mutate();
  }, [mainDate, selectedValue]);

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      {/* <DialogTrigger asChild>
        <Button className="display-none" variant="outline">
          Edit Profile
        </Button>
      </DialogTrigger> */}
      <DialogContent className="h-5/6 max-w-[800px]">
        <div className="m-2 overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center">
              <Rows className="mb-1 mr-3 h-7 w-7" />
              <DialogTitle>{data.title}</DialogTitle>
            </div>
            <DialogDescription className="ml-10">After getting api say name of lists</DialogDescription>
          </DialogHeader>

          {/* <div className="flex items-center mt-5 ml-5 text-lg font-semibold text-gray-700"> */}
          {/* Card Title */}
          {/* {"salam"} */}
          {/* </div> */}
          {/* <div className="ml-2"> */}
          {/* <span className="ml-12 text-sm text-gray-700">in list</span> */}
          {/* <span className="ml-1 text-sm text-gray-700 underline"> */}
          {/* {"salam1"} */}
          {/* </span> */}
          {/* </div>   */}

          <div className="grid md:flex">
            <div className="ml- w-3/4">
              <div className="mt-6 flex items-center">
                <AlignJustify className="mb-1 mr-3 h-7 w-7" />
                <Label className="text-md font-semibold">Description</Label>
              </div>
              {/* Description */}
              <div className="ml-10 cursor-pointer">
                {/* <Label>adding new description we can use text box for saving or get data from backend"</Label> */}
                <Textarea placeholder="Add a more detailed description..." className="bg-secondary" />
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center">
                  <MenuSquare className="mb-1 mr-4 h-7 w-7" />
                  <Label className="text-md font-semibold">Activity</Label>
                </div>
                <Button size="sm" variant="secondary" className="cursor-pointer rounded-sm px-2 text-sm">
                  Hide Details
                </Button>
              </div>

              <div className="my-4 flex">
                <Avatar className="mr-3 h-8 w-8">
                  <AvatarImage src="mamad" alt="@shadcn" />
                  <AvatarFallback>MM</AvatarFallback>
                </Avatar>

                <div className="w-full py-1  text-sm">
                  <Textarea placeholder="Write a comment..." />
                </div>
              </div>

              <div className="flex items-center">
                <div>
                  <div>
                    <Label className="ml-3 font-bold">Mamad Mirza</Label>
                    <Label> added this card to </Label>
                    <Label>{'salam3'}</Label>
                  </div>
                  <Label className="ml-3 text-xs">Time Ago</Label>
                </div>
              </div>
            </div>

            <div className="ml-4 pt-2 md:grid md:w-1/3">
              <div className="mx-4 mb-2 text-xs font-medium">ADD TO CARD</div>
              <div className="grid grid-cols-6">
                <Button
                  size="sm"
                  variant="secondary"
                  className="col-span-3 mx-4 mb-2 flex cursor-pointer justify-start rounded-sm px-4  text-sm md:col-span-6"
                >
                  <User className="mb-1 mr-1 h-4 w-4" />
                  Members
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="col-span-3 mx-4 mb-2 flex cursor-pointer justify-start rounded-sm px-4  text-sm md:col-span-6"
                >
                  <Tag className="mb-1 mr-1 h-4 w-4" />
                  Labels
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="col-span-3 mx-4 mb-2 flex cursor-pointer justify-start rounded-sm px-4  text-sm md:col-span-6"
                >
                  <CheckSquare className="mb-1 mr-1 h-4 w-4" />
                  Checklist
                </Button>
                {/* <Button
                  size="sm"
                  variant="secondary"
                  className="col-span-3 mx-4 mb-2 flex cursor-pointer justify-start rounded-sm px-4  text-sm md:col-span-6"
                  onClick={() => setDateOpen(true)}
                > */}
                <DatePickerModal
                  mainDate={mainDate}
                  setMainDate={setMainDate}
                  selectedValue={selectedValue}
                  setSelectedValue={setSelectedValue}
                />
                {/* <Clock7 className="mb-1 mr-1 h-4 w-4" />
                  Dates */}
                {/* </Button> */}

                <Button
                  size="sm"
                  variant="secondary"
                  className="col-span-3 mx-4 mb-2 flex cursor-pointer justify-start rounded-sm px-4  text-sm md:col-span-6"
                >
                  <Paperclip className="mb-1 mr-1 h-4 w-4" />
                  Attachment
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="col-span-3 mx-4 mb-2 flex cursor-pointer justify-start rounded-sm px-4  text-sm md:col-span-6"
                >
                  <AppWindow className="mb-1 mr-1 h-4 w-4" />
                  Cover
                </Button>
              </div>
              <div className="mx-4 mb-2 text-xs font-medium">Power-Ups</div>
              <div className="grid grid-cols-6 ">
                <Button
                  size="sm"
                  variant="secondary"
                  className="col-span-3 mx-4 mb-2 flex cursor-pointer justify-start rounded-sm px-4  text-sm md:col-span-6"
                >
                  <BookKey className="mb-1 mr-1 h-4 w-4" />
                  Set Stimate
                </Button>
                {/* <Button
                  size="sm"
                  variant="secondary"
                  className="col-span-3 mx-4 mb-2 flex cursor-pointer justify-start rounded-sm px-4  text-sm md:col-span-6"
                >
                  <Pen className="mb-1 mr-1 h-4 w-4" />
                  Story Point
                </Button> */}
                <StoryPointComponent storyPoint={storyPoint} setStoryPoint={setStoryPoint} />
              </div>

              <div className="mx-4 mb-2 text-xs font-medium">ACTIONS</div>
              <div className="grid grid-cols-6 ">
                <Button
                  size="sm"
                  variant="secondary"
                  className="col-span-3 mx-4 mb-2 flex cursor-pointer justify-start rounded-sm px-4  text-sm md:col-span-6"
                >
                  <ArrowLeftRight className="mb-1 mr-1 h-4 w-4" />
                  Move
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="col-span-3 mx-4 mb-2 flex cursor-pointer justify-start rounded-sm px-4  text-sm md:col-span-6"
                >
                  <Copy className="mb-1 mr-1 h-4 w-4" />
                  Copy
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="col-span-3 mx-4 mb-2 flex cursor-pointer justify-start rounded-sm px-4  text-sm md:col-span-6"
                >
                  <LayoutTemplate className="mb-1 mr-1 h-4 w-4" />
                  Make Template
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="col-span-3 mx-4 mb-2 flex cursor-pointer justify-start rounded-sm px-4  text-sm md:col-span-6"
                >
                  <Archive className="mb-1 mr-1 h-4 w-4" />
                  Archive
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="col-span-3 mx-4 mb-2 flex cursor-pointer justify-start rounded-sm px-4  text-sm md:col-span-6"
                >
                  <Share2 className="mb-1 mr-1 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
