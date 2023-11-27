import { Popover, PopoverContent, PopoverTrigger } from '@/components/popOverModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

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
const randomIndex = Math.floor(Math.random() * colorBoxes.length);
export function CreateLable() {
  const [inputValue, setInputValue] = useState('');
  const [colorValue, setColorValue] = useState(colorBoxes[randomIndex]);
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-2">
            <h4 className="text-center text-xs font-bold leading-none">Create label</h4>
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
                Create
              </Button>
            </div>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
