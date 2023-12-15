import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import { AlignJustify, Dot } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface CommentModalComponentProps {
  comment?: string;
  setComment: any;
}

export function CommentModalComponent({ comment, setComment }: CommentModalComponentProps) {
  const [toggleButton, setToggleButton] = useState(true);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (newComment: any) => {
    console.log(newComment);
    setComment(newComment?.comment);
    setToggleButton(!toggleButton);
  };
  return (
    <div>
      {toggleButton ? (
        <>
          <div
            className="w-6/7 h-auto cursor-pointer  rounded-sm bg-secondary p-2 pb-8 text-sm"
            onClick={() => setToggleButton(!toggleButton)}
          >
            {comment ? (
              comment.split('\n').map((item, index) => (
                <div key={index} className="mb-1 flex">
                  <Dot />
                  {item}
                </div>
              ))
            ) : (
              <Label className="">Write a comment...</Label>
            )}
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
          <div className="cursor-pointer">
            <Textarea
              defaultValue={comment ? comment : ''}
              placeholder="Write a comment..."
              {...register('comment', { required: true })}
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
