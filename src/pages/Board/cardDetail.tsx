import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AuthContext from '@/contexts/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assign } from 'lodash';
import {
  AlignJustify,
  AppWindow,
  Archive,
  ArrowLeftRight,
  BookKey,
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
import { CheckListSection } from './components/checkListModal';
import { CheckListPopover } from './components/checkListPopover';
import { DatePickerModal } from './components/datePickerModal';
import { LabelPopover } from './components/labelPopover';
import { SetStimateComponent } from './components/setStimate';
import { StoryPointComponent } from './components/storyPoint';
import { useCheckList } from './hooks/useCheckList';
import { useAssignedLabels, useBoardLabels } from './hooks/useLabel';
import { Card } from './types';

// const assigndata = {
//   id: 3,
//   labels: [
//     {
//       id: 1,
//       title: 'label1',
//       color: 'green',
//     },
//     {
//       id: 2,
//       title: 'label2',
//       color: 'bb',
//     },
//     {
//       id: 8,
//       title: 'qmars',
//       color: '#ba67c8',
//     },
//   ],
//   labelcard: [
//     {
//       id: 6,
//     },
//     {
//       id: 2,
//     },
//     {
//       id: 8,
//     },
//   ],
// };
interface Props {
  modalOpen: boolean;
  setModalOpen: any;
  data: Card;
}

export function CardDetail({ modalOpen, setModalOpen, data }: Props) {
  const [mainDate, setMainDate] = useState<DateRange | undefined>({
    from: data?.startdate ? new Date(data.startdate) : new Date(),
    to: data?.duedate ? new Date(data.duedate) : new Date(),
  });

  const [selectedValue, setSelectedValue] = React.useState(data?.reminder ? data?.reminder : 'None');
  // set for story point
  const [storyPoint, setStoryPoint] = useState(data.storypoint);
  const [setStimate, setSetStimate] = useState(data.setstimate);
  const { isLoading: checkListLoading, data: checkListData } = useCheckList(data.id);
  const { isLoading: boardLabelLoading, data: boardLabelData } = useBoardLabels();
  const { isLoading: assignLabelLoading, data: assignLabelData } = useAssignedLabels(data.id);

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
        storypoint: storyPoint,
        setestimate: setStimate,
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
    onError: (error, variables, context) => {},
    onSuccess: (data, variables, context) => {},
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['card', data?.id] });
    },
  });
  useEffect(() => {
    dateMutation.mutate();
  }, [mainDate, selectedValue, storyPoint, setStimate]);

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="h-5/6 max-w-[800px]">
        <div className="m-2 overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center">
              <Rows className="mb-1 mr-3 h-7 w-7" />
              <DialogTitle>{data.title}</DialogTitle>
            </div>
            <DialogDescription className="ml-10">After getting api say name of lists</DialogDescription>
          </DialogHeader>
          <div className="grid md:flex">
            <div className="ml- w-3/4">
              <div className="mt-6 flex items-center">
                <AlignJustify className="mb-1 mr-3 h-7 w-7" />
                <Label className="text-md font-semibold">Description</Label>
              </div>
              <div className="ml-10 cursor-pointer">
                <Textarea placeholder="Add a more detailed description..." className="bg-secondary" />
              </div>

              {checkListData ? <CheckListSection checkLists={checkListData} /> : null}
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
                {/* <Button
                  size="sm"
                  variant="secondary"
                  className="col-span-3 mx-4 mb-2 flex cursor-pointer justify-start rounded-sm px-4  text-sm md:col-span-6"
                >
                  <Tag className="mb-1 mr-1 h-4 w-4" />
                  Labels
                </Button> */}
                <LabelPopover labelData={boardLabelData} assigndata={assignLabelData} />
                {/* <Button
                  size="sm"
                  variant="secondary"
                  className="col-span-3 mx-4 mb-2 flex cursor-pointer justify-start rounded-sm px-4  text-sm md:col-span-6"
                >
                  <CheckSquare className="mb-1 mr-1 h-4 w-4" />
                  Checklist
                </Button> */}
                <CheckListPopover data={data} />
                <DatePickerModal
                  mainDate={mainDate}
                  setMainDate={setMainDate}
                  selectedValue={selectedValue}
                  setSelectedValue={setSelectedValue}
                />

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
                {/* <Button
                  size="sm"
                  variant="secondary"
                  className="col-span-3 mx-4 mb-2 flex cursor-pointer justify-start rounded-sm px-4  text-sm md:col-span-6"
                >
                  <BookKey className="mb-1 mr-1 h-4 w-4" />
                  Set Stimate
                </Button> */}
                <SetStimateComponent setStimate={setStimate} setSetStimate={setSetStimate} />
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
