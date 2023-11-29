import { Popover, PopoverContent, PopoverTrigger } from '@/components/popOverModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookKey } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface SetStimateComponentProps {
  setStimate?: number;
  setSetStimate: any;
}

export function SetStimateComponent({ setStimate, setSetStimate }: SetStimateComponentProps) {
  const [stimateOpen, setStimateOpen] = useState(true);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (newStimate: any) => {
    console.log(newStimate);
    setSetStimate(newStimate?.stimate);
  };
  return (
    <Popover open={stimateOpen} onOpenChange={setStimateOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="secondary"
          className="col-span-3 mx-4 mb-2 flex cursor-pointer justify-start rounded-sm px-4  text-sm md:col-span-6"
        >
          <BookKey className="mb-1 mr-1 h-4 w-4" />
          Set Stimate
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <div className="space-y-2">
            <h4 className="text-center text-xs font-bold leading-none">Set stimate</h4>
          </div>
          <Label htmlFor="width" className="text-sm leading-none underline">
            Your stimate : {setStimate}
          </Label>
          <div className="grid gap-2">
            <Input
              placeholder={setStimate ? setStimate.toString() : 'Type your stimate and save'}
              {...register('stimate', { required: true })}
              className="col-span-2 h-8"
            />
            <Button type="submit" className="mt-3 px-0" onClick={() => setStimateOpen(false)}>
              Save
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
