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
import AuthContext from '@/contexts/AuthContext';
import { BaseURL } from '@/pages/baseURL';
import { DialogClose } from '@radix-ui/react-dialog';
import axios from 'axios';
import { ImagePlus } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddImage = () => {
  const { boardId } = useParams();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };
  let authTokens = useContext(AuthContext)?.authTokens;
  const navigate = useNavigate();
  const handleUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('backgroundimage', selectedImage);

      try {
        const response = await axios.put(BaseURL + `tascrum/board-bgimage/${boardId}/`, formData, {
          headers: {
            Authorization: `JWT ${authTokens?.access}`,
            'Content-Type': 'multipart/form-data', // Important for file uploads
          },
        });
        console.log(response);
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Successful',
            text: 'Picture uploaded completely',
            timer: 3000,
          });
          setTimeout(() => {
            navigate(0);
          }, 2000);
        } else {
          throw new Error('Something went wrong!');
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong!',
          timer: 3000,
        });
        setTimeout(() => {
          navigate(0);
        }, 2000);
      }
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" className="m-1 ml-2 h-8 w-8 p-0" data-testId="clicking">
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
            <label htmlFor="picture" className="hidden cursor-pointer">
              Select Images
            </label>
            <Input
              id="picture"
              type="file"
              className=" cursor-pointer placeholder:text-white"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
              placeholder="Image"
              name="picture"
            />
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={handleUpload}>
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
