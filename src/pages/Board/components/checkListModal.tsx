import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import { CloudFog, MenuSquare } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  CheckListOption as CheckListOptionType,
  CheckLists as CheckListsType,
  CheckList as CheckListType,
} from '../types';

const serverData: CheckListsType = {
  card: 10,
  checkLists: [
    {
      id: 1,
      title: 'first checklist',
      options: [
        {
          id: 1,
          label: 'Item 1',
          checked: false,
        },
        {
          id: 2,
          label: 'Item 2',
          checked: false,
        },
        {
          id: 3,
          label: 'Item 3',
          checked: false,
        },
        {
          id: 4,
          label: 'Item 4',
          checked: true,
        },
        {
          id: 5,
          label: 'Item 5',
          checked: false,
        },
      ],
    },
    {
      id: 2,
      title: 'second checklist',
      options: [
        {
          id: 1,
          label: 'Item 1',
          checked: false,
        },
        {
          id: 2,
          label: 'Item 2',
          checked: true,
        },
        {
          id: 3,
          label: 'Item 3',
          checked: true,
        },
        {
          id: 4,
          label: 'Item 4',
          checked: true,
        },
        {
          id: 5,
          label: 'Item 5',
          checked: false,
        },
      ],
    },
  ],
};

interface CheckListOptionsProps {
  checkListOptions: CheckListOptionType[];
}
const CheckListOptions = ({ checkListOptions }: CheckListOptionsProps) => {
  const [checklist, setChecklist] = useState(checkListOptions);
  const [toggleButton, setToggleButton] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    const newChecklist = [...checklist];
    newChecklist.push({
      id: checklist.length + 1,
      label: data.newCheckbox,
      checked: false,
    });
    setChecklist(newChecklist);
    reset();
  };
  return (
    <div className="m-4 space-y-2 p-4">
      {checklist?.map((item) => (
        <div key={item.id} className="flex flex-row items-center space-x-3">
          <CheckListItem item={item} checklist={checklist} setChecklist={setChecklist} />
        </div>
      ))}
      {toggleButton && (
        <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <Textarea
            {...register('newCheckbox', { required: true })}
            className="block w-full resize-none rounded-md bg-secondary p-2"
            placeholder="Add an item"
          />
          <Button type="submit" className="mt-4">
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
      )}
    </div>
  );
};
interface CheckListProps {
  checklist: CheckListType;
}
export function CheckListPart({ checklist }: CheckListProps) {
  return (
    <>
      <div className="flex items-center">
        <MenuSquare className="mb-1 mr-4 h-7 w-7" />
        <Label className="text-md font-semibold">{checklist.title}</Label>
      </div>
      <CheckListOptions checkListOptions={checklist.options} />
    </>
  );
}

export function CheckListSection() {
  return (
    <>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center">
          <MenuSquare className="mb-1 mr-4 h-7 w-7" />
          <Label className="text-md font-semibold">All CheckLists</Label>
        </div>
        <Button size="sm" variant="secondary" className="cursor-pointer rounded-sm px-2 text-sm">
          Hide Details
        </Button>
      </div>
      {serverData.checkLists.map((checkListArrary) => {
        return <CheckListPart checklist={checkListArrary} />;
      })}
      <div className="ml-10 cursor-pointer"></div>
    </>
  );
}
type checkListItemProps = {
  item: CheckListOptionType;
  checklist: any;
  setChecklist: any;
};

export const CheckListItem = ({ item, checklist, setChecklist }: checkListItemProps) => {
  const [toggleButton, setToggleButton] = useState(true);
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
    data.id = parseInt(data.id);
    setChecklist((prevChecklist: any) =>
      prevChecklist.map((item: CheckListOptionType) => (item.id === data.id ? { ...item, label: data.label } : item))
    );
    setToggleButton(!toggleButton);
  };
  const handleCheckChange = (itemId: any) => {
    setChecklist((prevChecklist: any) =>
      prevChecklist.map((item: CheckListOptionType) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };
  return (
    <>
      {toggleButton ? (
        <>
          <Checkbox checked={item.checked} onCheckedChange={() => handleCheckChange(item.id)} />
          <Label className="cursor-pointer text-sm font-light" onClick={() => setToggleButton(!toggleButton)}>
            {item.label}
          </Label>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <Input
            {...register('label', { required: true })}
            className="block w-full resize-none rounded-md bg-secondary p-2"
            defaultValue={item.label}
          />
          <Input
            readOnly={true}
            {...register('id', { required: true })}
            className="hidden  w-full resize-none rounded-md bg-secondary p-2"
            defaultValue={item.id}
          />
          <Button type="submit" className="mt-4">
            Submit
          </Button>
          <Button variant="ghost" onClick={() => setToggleButton(!toggleButton)} className="mt-4">
            Cancel
          </Button>
        </form>
      )}
    </>
  );
};
