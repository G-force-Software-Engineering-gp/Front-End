import { Popover, PopoverContent, PopoverTrigger } from '@/components/popOverModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil } from 'lucide-react';
import { useForm } from 'react-hook-form';

export function CreateLable() {
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
        <Button variant="secondary" className="">
          <Label className="cursor-pointer">Create a new label</Label>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <div className="space-y-2">
            <h4 className="text-center text-xs font-bold leading-none">Create label</h4>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="width" className="text-xs font-bold leading-none">
              Title
            </Label>
            <Input {...register('Label', { required: true })} className="col-span-2 h-8" />
            <Button type="submit" className="mt-3 px-0">
              Add
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
