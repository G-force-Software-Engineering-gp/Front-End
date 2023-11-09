import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
import AuthContext from '@/contexts/AuthContext';
import { DialogClose } from '@radix-ui/react-dialog';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface AddBoardProps {
  workspaceId: number; // Define the type for the workspaceId prop
}

const AddBoard: React.FC<AddBoardProps> = ({ workspaceId }) => {
  //   console.log(workspaceId);
  const [name, setname] = useState('');
  const [nameError, setnameError] = useState(false);
  let authTokens = useContext(AuthContext)?.authTokens;
  const navigate = useNavigate();
  const CreateWorkspace = async () => {
    const data = await fetch('https://amirmohammadkomijani.pythonanywhere.com/tascrum/crboard/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${authTokens.access}`,
      },
      body: JSON.stringify({
        title: name,
        workspace: workspaceId,
      }),
    }).then((response) => response);
    console.log(data);
    if (data.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Successful',
        text: 'Workspace created successfully',
        timer: 3000,
      });
      setname('');
      setInterval(() => {
        navigate(0);
      }, 2000);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong!',
        timer: 3000,
      });
      setname('');
      setInterval(() => {
        navigate(0);
      }, 2000);
    }
  };

  const submitFn = () => {
    if (name.length === 0) {
      setnameError(true);
    } else {
      CreateWorkspace();
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Card className=" cursor-pointer bg-slate-300 dark:bg-slate-800">
            <div className=" flex cursor-pointer gap-4 space-y-0 px-12 py-14 sm:px-6 sm:py-14">
              <label className=" cursor-pointer text-xl font-semibold">Create a new Board</label>
            </div>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Board</DialogTitle>
            <DialogDescription>Enter name of the board</DialogDescription>
          </DialogHeader>
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
          </div>
          <DialogFooter>
            <DialogClose>
              <Button onClick={() => submitFn()}>Add Board</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddBoard;
