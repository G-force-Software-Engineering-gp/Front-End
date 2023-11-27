import { Popover, PopoverContent, PopoverTrigger } from '@/components/popOverModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil, Tag } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LabelItems as LabelItemsType, LabelItem as LabelItemType } from '../types';
import { CreateLable } from './createLable';

const colorBoxes = [
  '#baf3db',
  '#f8e6a0',
  '#fedec8',
  '#ffd5d2',
  '#dfd8fd',
  '#4bce97',
  '#f5cd47',
  '#fea362',
  '#f87168',
  '#9f8fef',
  '#1f845a',
  '#946f00',
  '#c25100',
  '#ae2e24',
  '#6e5dc6',
  '#cce0ff',
  '#d3f1a7',
  '#fdd0ec',
  '#dcdfe4',
  '#579dff',
  '#94c748',
  '#e774bb',
  '#8590a2',
  '#0c66e4',
  '#5b7f24',
];

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
  ],
};
interface LabelItemProps {
  item: LabelItemType;
  LabelsModalId: number;
  labels: any;
  labelOpen: boolean;
  setLabelOpen: any;
}
const LabelItem = ({ item, LabelsModalId, labels, labelOpen, setLabelOpen }: LabelItemProps) => {
  //   const [createLabelOpen, setCreateLabelOpen] = useState(false);
  return (
    <>
      <div
        className={`m-1 inline-block w-full rounded px-2 py-1 text-sm font-semibold`}
        style={{ backgroundColor: item.color }}
      >
        {item.title}
      </div>
      <div>
        <EditLable item={item} />
      </div>
    </>
  );
};
export function LabelPopover() {
  //   const [label, setLabel] = useState(data.labels);
  const [labelOpen, setLabelOpen] = useState(false);

  return (
    <Popover open={labelOpen} onOpenChange={setLabelOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="secondary"
          className="col-span-3 mx-4 mb-2 flex cursor-pointer justify-start rounded-sm px-4  text-sm md:col-span-6"
        >
          <Tag className="mb-1 mr-1 h-4 w-4" />
          Labels
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="text-center text-sm font-bold leading-none text-muted-foreground">Labels</h4>
            <Input placeholder="Search labels..."></Input>
            <p className="text-xs text-muted-foreground">labels</p>
            <LabelItems LabelsModal={data} labelOpen={labelOpen} setLabelOpen={setLabelOpen} />
          </div>
          <CreateLable />
        </div>
      </PopoverContent>
    </Popover>
  );
}
interface LabelItemsProps {
  LabelsModal: LabelItemsType;
  labelOpen: boolean;
  setLabelOpen: any;
}
const LabelItems = ({ LabelsModal, labelOpen, setLabelOpen }: LabelItemsProps) => {
  const [labels, setLabels] = useState(LabelsModal.labels);
  useEffect(() => {
    setLabels(LabelsModal.labels);
  }, [LabelsModal]);
  const [toggleButton, setToggleButton] = useState(false);
  // let authTokens = useContext(AuthContext)?.authTokens;
  // const queryClient = useQueryClient();
  // const createItem = useMutation({
  //   mutationFn: (formData: any) => {
  //     formData.checklist = checkList?.id;
  //     formData.checked = false;
  //     console.log(formData);
  //     return fetch(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/critem/`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `JWT ` + authTokens.access,
  //       },
  //       body: JSON.stringify(formData),
  //     });
  //   },
  //   onError: (error, variables, context) => {},
  //   onSuccess: (data, variables, context) => {},
  //   onSettled: () => {
  //     queryClient.invalidateQueries({ queryKey: ['checklist'] });
  //   },
  // });

  // const { register, handleSubmit, reset } = useForm();

  // const onSubmit = (data: any) => {
  //   // const newChecklist = [...checklist];
  //   // newChecklist.push({
  //   //   id: checklist.length + 1,
  //   //   content: data.newCheckbox,
  //   //   checked: false,
  //   // });
  //   // setChecklist(newChecklist);
  //   console.log(data);
  //   createItem.mutate(data);
  //   reset();
  // };
  return (
    <div className="">
      {labels?.map((item) => (
        <div key={item.id} className="flex flex-row items-center space-x-3">
          <LabelItem
            item={item}
            labels={LabelsModal.labels}
            LabelsModalId={LabelsModal.id}
            labelOpen={labelOpen}
            setLabelOpen={setLabelOpen}
          />
        </div>
      ))}
      {/* {toggleButton && (
          <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 space-y-6">
            <Input
              {...register('content', { required: true })}
              className="block w-full resize-none rounded-md bg-secondary p-2"
              placeholder="Add an item"
            />
            <Button type="submit" className="mr-2 mt-4">
              Submit
            </Button>
            <Button variant="ghost" onClick={() => setToggleButton(!toggleButton)} className="mt-4">
              Cancel
            </Button>
          </form>
        )}
        {!toggleButton && (
          <Button variant="secondary" className="ml-7" onClick={() => setToggleButton(!toggleButton)}>
            Add an item
          </Button>
        )} */}
    </div>
  );
};
interface EditLableProps {
  item: LabelItemType;
}
export function EditLable({ item }: EditLableProps) {
  const [inputValue, setInputValue] = useState(item.title);
  const [colorValue, setColorValue] = useState(item.color);
  // interface CheckListPopoverProps {
  //     data: Card;
  //   }

  //   export function CheckListPopover({ data }: CheckListPopoverProps) {
  //     let authTokens = useContext(AuthContext)?.authTokens;
  //     const queryClient = useQueryClient();
  //     const createCheckList = useMutation({
  //       mutationFn: (formData: any) => {
  //         formData.card = data?.id;
  //         return fetch(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/crchecklist/`, {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: `JWT ` + authTokens.access,
  //           },
  //           body: JSON.stringify(formData),
  //         });
  //       },
  //       onError: (error, variables, context) => {},
  //       onSuccess: (data, variables, context) => {},
  //       onSettled: () => {
  //         queryClient.invalidateQueries({ queryKey: ['checklist', data?.id] });
  //       },
  //     });
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (newLabel: any) => {
    console.log(newLabel);
    //   createCheckList.mutate(dataNewCheckList);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="h-7">
          <Pencil className="h-3 w-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-2">
            <h4 className="text-center text-xs font-bold leading-none">Edit label</h4>
          </div>
          <div className="bg-secondary p-8">
            <div className="h-9 rounded-sm p-2" style={{ backgroundColor: colorValue }}>
              {inputValue}
            </div>
          </div>
          <div className="space-y-2">
            <div className="mb-4">
              <Label htmlFor="width" className="text-xs font-bold leading-none">
                Title
              </Label>
              <Input
                defaultValue={item.title}
                {...register('Label', { required: true })}
                onChange={(e) => setInputValue(e.target.value)}
                className="col-span-2 h-8"
              />
            </div>
            <Label htmlFor="width" className="col-span-5 text-xs font-bold leading-none">
              Select color
            </Label>
            <div className="grid grid-cols-5 gap-2">
              {colorBoxes.map((color, index) => (
                <div
                  onClick={() => setColorValue(color)}
                  key={index}
                  className="w-13 col-span-1 h-6 cursor-pointer rounded-sm"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
              <div onClick={() => setColorValue('#e9ebee')} className="col-span-5  items-center rounded-md ">
                <Button variant="outline" className="w-full">
                  Remove color
                </Button>
              </div>

              <Button type="submit" className="mt-3 px-0" disabled={!inputValue.trim()}>
                Save
              </Button>
              <Button variant="destructive" type="submit" className="col-start-5 col-end-6 mt-3 px-0">
                Delete
              </Button>
            </div>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
