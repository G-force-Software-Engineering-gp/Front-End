// import { Button } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';

// export function StoryPointComponent() {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline">Edit Profile</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle className="text-center">Story Points</DialogTitle>
//           <DialogDescription>Add a story point to the card.</DialogDescription>
//         </DialogHeader>
// <div className="grid gap-3 py-1">
//   <div className="grid items-center gap-4">
//     <Label className="relative mx-1 flex">
//       <Label className="b-2 pointer-events-none absolute flex ">Story Points</Label>
//     </Label>
//     <Input disabled className="peer bg-transparent  ring-2" placeholder="1" />
//   </div>
//   <div className="grid grid-cols-7  gap-3">
//     <div className="col-span-1 items-center">
//       <Button variant="outline">1</Button>
//     </div>
//     <div className="col-span-1 items-center">
//       <Button variant="outline">2</Button>
//     </div>
//     <div className="col-span-1 items-center">
//       <Button variant="outline">3</Button>
//     </div>
//     <div className="col-span-1 items-center">
//       <Button variant="outline">5</Button>
//     </div>
//     <div className="col-span-1 items-center">
//       <Button variant="outline">7</Button>
//     </div>
//     <div className="col-span-1 items-center">
//       <Button variant="outline">11</Button>
//     </div>
//     <div className="col-span-1 items-center">
//       <Button variant="outline">13</Button>
//     </div>
//     <div className="col-span-1 col-start-1 items-center">
//       <Button variant="outline">17</Button>
//     </div>
//     <div className="col-span-1 col-end-8 items-center">
//       <Button variant="outline">19</Button>
//     </div>
//   </div>
// </div>
//         <DialogFooter>
//           <Button type="submit">Save changes</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

import { Popover, PopoverContent, PopoverTrigger } from '@/components/popOverModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pen } from 'lucide-react';

interface Props {
  storyPoint?: number;
  setStoryPoint: any;
}

export function StoryPointComponent({ storyPoint, setStoryPoint }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="secondary"
          className="col-span-3 mx-4 mb-2 flex cursor-pointer justify-start rounded-sm px-4  text-sm md:col-span-6"
        >
          <Pen className="mb-1 mr-1 h-4 w-4" />
          Story Point
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[360px]">
        <div className=" sticky top-0 grid gap-3">
          <Label className="text-center font-bold leading-none text-muted-foreground">Story Points</Label>
          <Label className="text-sm ">Add a story point to the card.</Label>
          <div className="grid gap-3 py-1">
            <div className="grid items-center gap-4">
              <div className="relative mx-1 flex">
                <Label className="pointer-events-none absolute top-2 z-10 flex bg-background font-light text-muted-foreground">
                  Story Points
                </Label>
              </div>
              <Input
                disabled
                className="peer z-0  cursor-auto bg-transparent ring-1"
                placeholder={storyPoint ? storyPoint.toString() : ''}
              />
            </div>
            <div className="grid grid-cols-7  gap-3">
              <div className="col-span-1 items-center">
                <Button onClick={() => setStoryPoint(1)} variant="outline" className="w-auto">
                  1
                </Button>
              </div>
              <div className="col-span-1 items-center">
                <Button onClick={() => setStoryPoint(2)} variant="outline">
                  2
                </Button>
              </div>
              <div className="col-span-1 items-center">
                <Button onClick={() => setStoryPoint(3)} variant="outline">
                  3
                </Button>
              </div>
              <div className="col-span-1 items-center">
                <Button onClick={() => setStoryPoint(5)} variant="outline">
                  5
                </Button>
              </div>
              <div className="col-span-1 items-center">
                <Button onClick={() => setStoryPoint(7)} variant="outline">
                  7
                </Button>
              </div>
              <div className="col-span-1 items-center">
                <Button onClick={() => setStoryPoint(11)} variant="outline">
                  11
                </Button>
              </div>
              <div className="col-span-1 items-center">
                <Button onClick={() => setStoryPoint(13)} variant="outline">
                  13
                </Button>
              </div>
              <div className="col-span-1 col-start-1 items-center">
                <Button onClick={() => setStoryPoint(17)} variant="outline">
                  17
                </Button>
              </div>
              <div className="col-span-1 col-end-8 items-center">
                <Button onClick={() => setStoryPoint(19)} variant="outline">
                  19
                </Button>
              </div>
              <div className="col-span-3 col-end-6 items-center rounded-md border border-destructive text-destructive">
                <Button onClick={() => setStoryPoint(undefined)} variant="outline" className="w-full">
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
