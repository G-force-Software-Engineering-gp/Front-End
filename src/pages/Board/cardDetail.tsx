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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AuthContext from '@/contexts/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import _, { assign } from 'lodash';
import {
  AlignJustify,
  AppWindow,
  Archive,
  ArrowLeftRight,
  Copy,
  LayoutTemplate,
  MenuSquare,
  Paperclip,
  Rows,
  Share2,
  User,
} from 'lucide-react';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { BaseURL } from '../baseURL';
import { CheckListSection } from './components/checkListModal';
import { CheckListPopover } from './components/checkListPopover';
import { CommentModalComponent } from './components/commentModal';
import { DatePickerModal } from './components/datePickerModal';
import { DescriptionModalComponent } from './components/descriptionModal';
import { LabelHeaderPopover } from './components/labelHeaderPopover';
import { LabelPopover } from './components/labelPopover';
import { SetStimateComponent } from './components/setStimate';
import { StoryPointComponent } from './components/storyPoint';
import { useCheckList } from './hooks/useCheckList';
import { useAssignedLabels, useBoardLabels } from './hooks/useLabel';
import { Card } from './types';

const colorBoxes: { [key: number]: string } = {
  1: '#BAF3DB',
  2: '#C6EDFB',
  3: '#CCE0FF',
  5: '#D3F1A7',
  7: '#F8E6A0',
  11: '#DFD8FD',
  13: '#FEDEC8',
  17: '#FDD0EC',
  19: '#FDB8B4',
};
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
  const [setStimate, setSetStimate] = useState(data.setestimate);
  const [description, setDescription] = useState(data.description);
  const [comment, setComment] = useState(data.comment);
  const [modalTitle, setModalTitle] = useState(data.title);
  const { isLoading: checkListLoading, data: checkListData } = useCheckList(data.id);
  const { isLoading: boardLabelLoading, data: boardLabelData } = useBoardLabels();
  const { isLoading: assignLabelLoading, data: assignLabelData } = useAssignedLabels(data.id);

  // merge for finding assigned list in label
  const mergeObject = useMemo(() => {
    const mergedLabelsData = _.map(boardLabelData?.labels, (label, index) => {
      const assignedLabel = _.find(assignLabelData?.labels, { id: label?.id });
      const assignedLabelIndex = _.findIndex(assignLabelData?.labels, { id: label?.id });
      return assignedLabel
        ? { ...label, labelcard: assignLabelData?.labelcard?.[assignedLabelIndex]?.id, checked: true }
        : { ...label, labelcard: assignLabelData?.labelcard?.[assignedLabelIndex]?.id, checked: false };
    });
    const mergedData = {
      id: boardLabelData?.id || 11,
      labels: mergedLabelsData,
    };
    return mergedData;
  }, [boardLabelData, assignLabelData]);
  console.log(mainDate)
  let authTokens = useContext(AuthContext)?.authTokens;
  const queryClient = useQueryClient();

  const dateMutation = useMutation({
    mutationFn: () => {
      let newCard_data = {
        id: data.id,
        title: modalTitle,
        list: data.list,
        startdate: mainDate?.from,
        duedate: mainDate?.to,
        reminder: selectedValue,
        storypoint: storyPoint,
        setestimate: setStimate,
        description: description,
        comment: comment,
      };

      return fetch(BaseURL + `tascrum/crcard/${data.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ` + authTokens?.access,
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
  }, [mainDate, selectedValue, storyPoint, setStimate, description, modalTitle, comment]);

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="h-5/6 max-w-[800px]">
        <div className="m-2 overflow-y-auto">
          <DialogHeader>
            <div className="mt-1 flex items-center">
              <Rows className="mb-1 mr-3 h-7 w-7" />
              <Input value={modalTitle} onChange={(e) => setModalTitle(e.target.value)} className="w-5/6" />
              {/* <DialogTitle>{data.title}</DialogTitle> */}
            </div>
            <DialogDescription className="ml-10">
              <div className="flex gap-5">
                {storyPoint !== undefined && colorBoxes[storyPoint] ? (
                  <div className="cursor-pointer">
                    <Label className="text-xs font-bold">Story Point:</Label>
                    <div
                      className={`mx-1 my-1 rounded px-2 py-1 text-sm font-semibold text-foreground`}
                      style={{ backgroundColor: colorBoxes[storyPoint] }}
                      // onClick={() => <StoryPointComponent storyPoint={storyPoint} setStoryPoint={setStoryPoint} />}
                    >
                      {storyPoint}
                    </div>
                  </div>
                ) : null}
                <div className="cursor-pointer">
                  {mergeObject?.labels && mergeObject.labels.some((label) => label.checked) && (
                    <Label className="text-xs font-bold">Labels:</Label>
                  )}
                  <div className="flex">
                    {mergeObject?.labels?.map((label) => {
                      if (label.checked) {
                        return (
                          <div
                            key={label.id}
                            className={`mx-1 my-1 w-full rounded px-2 py-1 text-sm font-semibold text-foreground`}
                            style={{ backgroundColor: label?.color }}
                          >
                            {label.title}
                          </div>
                        );
                      }
                      return null;
                    })}
                    {mergeObject?.labels && mergeObject.labels.some((label) => label.checked) && (
                      <LabelHeaderPopover cardData={data} mergeObject={mergeObject} />
                    )}
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="grid md:flex">
            <div className="ml- w-3/4">
              <DescriptionModalComponent description={description} setDescription={setDescription} />

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
                  {/* <Textarea placeholder="Write a comment..." /> */}
                  <CommentModalComponent comment={comment} setComment={setComment} />
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
                {/* <LabelPopover cardData={data} labelData={boardLabelData} assigndata={assignLabelData} /> */}
                <LabelPopover cardData={data} mergeObject={mergeObject} />
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
