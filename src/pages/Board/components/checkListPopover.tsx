import { Popover, PopoverContent, PopoverTrigger } from '@/components/popOverModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthContext from '@/contexts/AuthContext';
import { BaseURL } from '@/pages/baseURL';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckSquare } from 'lucide-react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Card } from '../types';

interface CheckListPopoverProps {
  data: Card;
}

export function CheckListPopover({ data }: CheckListPopoverProps) {
  let authTokens = useContext(AuthContext)?.authTokens;
  const queryClient = useQueryClient();
  const createCheckList = useMutation({
    mutationFn: (formData: any) => {
      formData.card = data?.id;
      return fetch(BaseURL + `tascrum/crchecklist/`, {
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
      queryClient.invalidateQueries({ queryKey: ['checklist', data?.id] });
    },
  });
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (dataNewCheckList: any) => {
    console.log(dataNewCheckList);
    createCheckList.mutate(dataNewCheckList);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="secondary"
          className="col-span-3 mx-4 mb-2 flex cursor-pointer justify-start rounded-sm px-4  text-sm md:col-span-6"
        >
          <CheckSquare className="mb-1 mr-1 h-4 w-4" />
          Checklist
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <div className="space-y-2">
            <h4 className="text-center text-xs font-bold leading-none">Add checkList</h4>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="checkListTitle" className="text-xs font-bold leading-none">
              Title
            </Label>
            <Input
              id="checkListTitle"
              defaultValue="CheckList"
              {...register('title', { required: true })}
              className="col-span-2 h-8"
            />
            <Button type="submit" className="mt-3 px-0">
              Add
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
