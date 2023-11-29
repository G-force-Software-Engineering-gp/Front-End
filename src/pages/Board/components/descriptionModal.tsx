import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import { AlignJustify, Dot } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface DescriptionModalComponentProps {
  description?: string;
  setDescription: any;
}

export function DescriptionModalComponent({ description, setDescription }: DescriptionModalComponentProps) {
  const [toggleButton, setToggleButton] = useState(true);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (newDescription: any) => {
    console.log(newDescription);
    setDescription(newDescription?.description);
    setToggleButton(!toggleButton);
  };
  return (
    <div>
      <div className="mt-6 flex items-center">
        <AlignJustify className="mb-1 mr-3 h-7 w-7" />
        <Label className="text-md font-semibold">Description</Label>
      </div>
      {toggleButton ? (
        <>
          <div
            className="w-6/7 ml-12 h-auto cursor-pointer  rounded-sm bg-secondary p-2 pb-8 text-sm"
            onClick={() => setToggleButton(!toggleButton)}
          >
            {/* <div> {'description'}</div>
            <div> {'description'}</div>
            <div> {'description'}</div>
            <div> {'description'}</div>
            <div> {'description'}</div> */}
            {description ? (
              description.split('\n').map((item, index) => (
                <div key={index} className="mb-1 flex">
                  <Dot />
                  {item}
                </div>
              ))
            ) : (
              <Label className="">Add a more detailed description...</Label>
            )}
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
          <div className="ml-10 cursor-pointer">
            <Textarea
              defaultValue={description ? description : ''}
              placeholder="Add a more detailed description..."
              {...register('description', { required: true })}
              className="h-auto bg-secondary"
            />
          </div>
          <Button type="submit" className="ml-10 mt-4 p-2">
            Save
          </Button>
          <Button variant="ghost" onClick={() => setToggleButton(!toggleButton)} className="ml-2 mt-4 p-1">
            Cancel
          </Button>
        </form>
      )}
    </div>
  );
}
