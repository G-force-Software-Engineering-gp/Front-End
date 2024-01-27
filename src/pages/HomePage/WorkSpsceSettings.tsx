import { Button } from '@/components/ui/button';
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
import AuthContext from '@/contexts/AuthContext';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { BaseURL } from '../baseURL';
import useWorkSpaceSetting from './hooks/useWorkSpaceSetting';

const WorkSpsceSettings = () => {
  const { workspaceId } = useParams();
  const { data: dataSetting } = useWorkSpaceSetting(parseInt(workspaceId ? workspaceId : ''));

  const [name, setname] = useState('');
  const [description, setdescription] = useState('');
  const [selectedValue, setSelectedValue] = useState<string | null | undefined>(null);

  useEffect(() => {
    if (dataSetting) {
      setname(dataSetting.name);
      setdescription(dataSetting.description);
      setSelectedValue(dataSetting.type);
    }
  }, [dataSetting]);

  const handleSelectChange = (event: string) => {
    setSelectedValue(event);
  };
  const [nameError, setnameError] = useState(false);
  const [desError, setdesError] = useState(false);
  const [selError, setselError] = useState(false);

  let authTokens = useContext(AuthContext)?.authTokens;
  const navigate = useNavigate();
  const CreateWorkspace = async () => {
    const data = await fetch(BaseURL + `tascrum/crworkspace/${workspaceId}/`, {
      method: 'PUT',
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
    console.log(data)
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
      setdescription('');
      setSelectedValue(null);
      setInterval(() => {
        navigate(0);
      }, 2000);
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
    <div className=" p-4">
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-10 items-baseline gap-4">
          <Label htmlFor="name" className="">
            Name
          </Label>
          <Input
            placeholder="Write name of your workspace"
            value={name}
            className={`md:col-span-9 col-span-10 ${nameError && name.length === 0 ? 'border-red-500' : ''}`}
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-10 items-baseline gap-4">
          <Label htmlFor="description" className="">
            Description
          </Label>
          <Textarea
            value={description}
            placeholder="Type your message here."
            className={`md:col-span-9 col-span-10 h-20 ${desError && description.length === 0 ? 'border-red-500' : ''}`}
            onChange={(e) => setdescription(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-10 items-center gap-4">
          <Label id="typeLabel" className="">
            Type
          </Label>
          <Select onValueChange={(e) => handleSelectChange(e)}>
            <SelectTrigger
              aria-labelledby="typeLabel"
              className={`md:col-span-9 col-span-10 ${selError && selectedValue === null ? 'border-red-500' : ''}`}
            >
              <SelectValue placeholder={!selectedValue? "Select The Type" : selectedValue} data-testId="selectClicking">
                {/* {selectedValue || 'Select The Type'} Update this line */}
              </SelectValue>
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
        <Button onClick={() => submitFn()}>Edit The Workspace</Button>
      </div>
    </div>
  );
};

export default WorkSpsceSettings;
