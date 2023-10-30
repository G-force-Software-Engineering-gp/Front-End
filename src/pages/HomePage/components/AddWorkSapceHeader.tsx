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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import AuthContext from '@/contexts/AuthContext';
import { DialogClose } from '@radix-ui/react-dialog';
import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import Swal from 'sweetalert2';

const AddWorkSapceHeader = () => {
  const [name, setname] = useState('');
  const [description, setdescription] = useState('');
  const [selectedValue, setSelectedValue] = useState<string | null | undefined>(null);

  const handleSelectChange = (event: string) => {
    setSelectedValue(event);
  };
  const [nameError, setnameError] = useState(false);
  const [desError, setdesError] = useState(false);
  const [selError, setselError] = useState(false);
  // console.log(selectedValue);
  const { toast } = useToast();

  let authTokens = useContext(AuthContext)?.authTokens;
  // console.log(authTokens);
  // console.log(authTokens.access)

  const CreateWorkspace = async () => {
    const data = await fetch('https://amirmohammadkomijani.pythonanywhere.com/tascrum/crworkspace/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${authTokens.access}`,
      },
      body: JSON.stringify({
        name: name,
        type: selectedValue,
        description: description,
      }),
    }).then((response) => response);
    console.log(data.ok);
    if (data.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Successful',
        text: 'Workspace created successfully',
        timer: 3000,
      });
      setname('');
      setdescription('');
      setSelectedValue(null);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong!',
        timer: 3000,
      });
      setname('');
      setdescription('');
      setSelectedValue(null);
    }
  };

  const submitFn = () => {
    if (name.length === 0) {
      setnameError(true);
    } else if (description.length === 0) {
      setdesError(true);
    } else if (selectedValue === null || selectedValue === undefined) {
      setselError(true);
    } else {
      CreateWorkspace();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="!bg-blue-500">Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Workspace</DialogTitle>
          <DialogDescription>Enter the required information to add your workspace</DialogDescription>
        </DialogHeader>
        {/* <form> */}
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-baseline gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              placeholder="Write name of your workspace"
              className={`col-span-3 ${nameError && name.length === 0 ? 'border-red-500' : ''}`}
              onChange={(e) => setname(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-baseline gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            {/* <Input id="description" defaultValue="@peduarte"  /> */}
            <Textarea
              placeholder="Type your message here."
              className={`col-span-3 h-20 ${desError && description.length === 0 ? 'border-red-500' : ''}`}
              onChange={(e) => setdescription(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Type
            </Label>
            {/* <Input id="description" defaultValue="@peduarte" className="col-span-3" /> */}
            <Select onValueChange={(e) => handleSelectChange(e)}>
              <SelectTrigger className={`col-span-3 ${selError && selectedValue === null ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Select The Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select a type</SelectLabel>
                  <SelectItem value="operations" className=" cursor-pointer hover:bg-slate-500">
                    Operations
                  </SelectItem>
                  <SelectItem value="education" className=" cursor-pointer hover:bg-slate-500">
                    Education
                  </SelectItem>
                  <SelectItem value="human resources" className=" cursor-pointer hover:bg-slate-500">
                    Human Resources
                  </SelectItem>
                  <SelectItem value="small business" className=" cursor-pointer hover:bg-slate-500">
                    Small Business
                  </SelectItem>
                  <SelectItem value="sales crm" className=" cursor-pointer hover:bg-slate-500">
                    Sales Crm
                  </SelectItem>
                  <SelectItem value="engineering" className=" cursor-pointer hover:bg-slate-500">
                    Engineering
                  </SelectItem>
                  <SelectItem value="marketing" className=" cursor-pointer hover:bg-slate-500">
                    Marketing
                  </SelectItem>
                  <SelectItem value="Other" className=" cursor-pointer hover:bg-slate-500">
                    Other
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button onClick={() => submitFn()}>Make The Workspace</Button>
          </DialogClose>
        </DialogFooter>
        {/* </form> */}
      </DialogContent>
    </Dialog>
  );
};

export default AddWorkSapceHeader;
