import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AuthContext from '@/contexts/AuthContext';
import { Label } from '@radix-ui/react-label';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { CheckSquare } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  CheckListOption as CheckListOptionType,
  CheckLists as CheckListsType,
  CheckList as CheckListType,
} from '../types';

// const serverData: CheckListsType = {
//   card: 10,
//   checkLists: [
//     {
//       id: 1,
//       title: 'first checklist',
//       options: [
//         {
//           id: 1,
//           label: 'Item 1',
//           checked: false,
//         },
//         {
//           id: 2,
//           label: 'Item 2',
//           checked: false,
//         },
//         {
//           id: 3,
//           label: 'Item 3',
//           checked: false,
//         },
//         {
//           id: 4,
//           label: 'Item 4',
//           checked: true,
//         },
//         {
//           id: 5,
//           label: 'Item 5',
//           checked: false,
//         },
//       ],
//     },
//     {
//       id: 2,
//       title: 'second checklist',
//       options: [
//         {
//           id: 1,
//           label: 'Item 1',
//           checked: false,
//         },
//         {
//           id: 2,
//           label: 'Item 2',
//           checked: true,
//         },
//         {
//           id: 3,
//           label: 'Item 3',
//           checked: true,
//         },
//         {
//           id: 4,
//           label: 'Item 4',
//           checked: true,
//         },
//         {
//           id: 5,
//           label: 'Item 5',
//           checked: false,
//         },
//       ],
//     },
//   ],
// };

interface CheckListOptionsProps {
  checkList: CheckListType;
}
const CheckListOptions = ({ checkList }: CheckListOptionsProps) => {
  const [checklist, setChecklist] = useState(checkList.items);
  useEffect(() => {
    setChecklist(checkList.items);
  }, [checkList]);
  const [toggleButton, setToggleButton] = useState(false);
  let authTokens = useContext(AuthContext)?.authTokens;
  const queryClient = useQueryClient();
  const createItem = useMutation({
    mutationFn: (formData: any) => {
      formData.checklist = checkList?.id;
      formData.checked = false;
      console.log(formData);
      return fetch(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/critem/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ` + authTokens.access,
        },
        body: JSON.stringify(formData),
      });
    },
    onError: (error, variables, context) => {},
    onSuccess: (data, variables, context) => {},
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['checklist'] });
    },
  });

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    // const newChecklist = [...checklist];
    // newChecklist.push({
    //   id: checklist.length + 1,
    //   content: data.newCheckbox,
    //   checked: false,
    // });
    // setChecklist(newChecklist);
    console.log(data);
    createItem.mutate(data);
    reset();
  };
  return (
    <div className="m-4 space-y-2 p-4">
      {checklist?.map((item) => (
        <div key={item.id} className="flex flex-row items-center space-x-3">
          <CheckListItem
            item={item}
            checklist={checkList.items}
            checkListId={checkList.id}
            setChecklist={setChecklist}
          />
        </div>
      ))}
      {toggleButton && (
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
      <div className="ml-3 flex items-center">
        <CheckSquare className="mb-1 mr-2 h-4 w-4" />
        <Label className="text-md font-semibold">{checklist.title}</Label>
      </div>
      <CheckListOptions checkList={checklist} />
    </>
  );
}

interface CheckListSectionProps {
  checkLists: CheckListsType;
}
export function CheckListSection({ checkLists }: CheckListSectionProps) {
  return (
    <>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center">
          <CheckSquare className="mb-1 mr-4 h-7 w-7" />
          <Label className="text-md font-semibold">All CheckLists</Label>
        </div>
        <Button size="sm" variant="secondary" className="cursor-pointer rounded-sm px-2 text-sm">
          Hide Details
        </Button>
      </div>
      {checkLists?.checklists?.map((checkListArrary) => {
        return <CheckListPart checklist={checkListArrary} />;
      })}
      <div className="ml-10 cursor-pointer"></div>
    </>
  );
}
type checkListItemProps = {
  item: CheckListOptionType;
  checkListId: number;
  checklist: any;
  setChecklist: any;
};

export const CheckListItem = ({ item, checklist, setChecklist, checkListId }: checkListItemProps) => {
  const [toggleButton, setToggleButton] = useState(true);
  let authTokens = useContext(AuthContext)?.authTokens;
  const queryClient = useQueryClient();
  // useEffect(() => {
  //   setChecklist(checklist.items);
  // }, [checklist]);
  const updateItem = useMutation({
    mutationFn: (formData: any) => {
      formData.checklist = checkListId;
      formData.id = item?.id;
      console.log(formData);
      return fetch(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/critem/${item.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ` + authTokens.access,
        },
        body: JSON.stringify(formData),
      });
    },
    onError: (error, variables, context) => {},
    onSuccess: (data, variables, context) => {},
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['checklist'] });
    },
  });
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
    data.checked = item.checked;
    // data.id = parseInt(data.id);
    // setChecklist((prevChecklist: any) =>
    //   prevChecklist.map((item: CheckListOptionType) => (item.id === data.id ? { ...item, label: data.label } : item))
    // );
    updateItem.mutate(data);
    setToggleButton(!toggleButton);
  };
  const handleCheckChange = (itemId: any) => {
    // setChecklist((prevChecklist: any) =>
    //   prevChecklist.map((item: CheckListOptionType) =>
    //     item.id === itemId ? { ...item, checked: !item.checked } : item
    //   )
    //);
    const changedChecked = _.find(checklist, { id: itemId });
    changedChecked.checked = !changedChecked.checked;
    updateItem.mutate(changedChecked);
  };
  return (
    <>
      {toggleButton ? (
        <>
          <Checkbox checked={item.checked} onCheckedChange={() => handleCheckChange(item.id)} />
          <Label className="cursor-pointer text-sm font-light" onClick={() => setToggleButton(!toggleButton)}>
            {item.content}
          </Label>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <Input
            {...register('content', { required: true })}
            className="block w-full resize-none rounded-md bg-secondary p-2"
            defaultValue={item.content}
          />
          <Input
            readOnly={true}
            {...register('id', { required: true })}
            className="hidden  w-full resize-none rounded-md bg-secondary p-2"
            defaultValue={item.id}
          />
          <Button type="submit" className="mr-2 mt-4">
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
