import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { DialogClose } from '@radix-ui/react-dialog';
import { ImagePlus } from 'lucide-react';
import React from 'react';

const AddImage = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" className="m-1 ml-2 h-8 w-8 p-0">
            <ImagePlus className="h-4 w-4 " />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select Image</DialogTitle>
            <DialogDescription>Here use can set a BackGround for your board</DialogDescription>
            <DialogDescription>You can select only .jpg and .png files</DialogDescription>
          </DialogHeader>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input id="picture" type="file" className=" cursor-pointer placeholder:text-white" accept=".jpg, .jpeg, .png"/>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Change Picture
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddImage;
