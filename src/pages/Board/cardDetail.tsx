import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckSquare, Tag, User , Clock7, Paperclip, AppWindow , ArrowLeftRight , Copy , LayoutTemplate , Archive , Share2 , AlignJustify , MenuSquare, Rows } from "lucide-react"


export function CardDetail() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] h-5/6">
      <div className="overflow-y-auto m-2">
        <DialogHeader>
          <div className="flex items-center">
          <Rows className="w-7 h-7 mr-3 mb-1"/>
          <DialogTitle>Card's Name</DialogTitle>
          </div>
          <DialogDescription className="ml-10">
            After getting api say name of lists
          </DialogDescription>
        </DialogHeader>
        
        {/* <div className="flex items-center mt-5 ml-5 text-lg font-semibold text-gray-700"> */}
        {/* Card Title */}
        {/* {"salam"} */}
      {/* </div> */}
      {/* <div className="ml-2"> */}
        {/* <span className="ml-12 text-sm text-gray-700">in list</span> */}
        {/* <span className="ml-1 text-sm text-gray-700 underline"> */}
          {/* {"salam1"} */}
        {/* </span> */}
      {/* </div>   */}

      <div className="md:flex grid">
        <div className="w-3/4 ml-">
          <div className="flex items-center mt-6">
          <AlignJustify className="w-7 h-7 mr-3 mb-1"/>
            <Label className="text-md font-semibold">Description</Label>
          </div>
          {/* Description */}
          <div className="ml-10 cursor-pointer">
            {/* <Label>adding new description we can use text box for saving or get data from backend"</Label> */}
            <Textarea placeholder="Add a more detailed description..." className="bg-secondary" />
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center">
            <MenuSquare className="w-7 h-7 mr-4 mb-1"/>
              <Label className="text-md font-semibold">Activity</Label>
            </div>
            <Button size='sm' variant='secondary'  className="px-2 text-sm rounded-sm cursor-pointer">
              Hide Details
            </Button>
          </div>

          <div className="flex my-4">
          <Avatar className="w-8 h-8 mr-3">
            <AvatarImage   src="mamad" alt="@shadcn" />
            <AvatarFallback>MM</AvatarFallback>
          </Avatar>

            <div className="w-full py-1  text-sm">
              <Textarea placeholder="Write a comment..." />
            </div>
          </div>

          <div className="flex items-center">
            <div>
              <div>
                <Label className="ml-3 font-bold">Mamad Mirza</Label>
                <Label> added this card to </Label>
                <Label>{"salam3"}</Label>
              </div>
              <Label className="ml-3 text-xs">Time Ago</Label>
            </div>
          </div>
        </div>

        <div className="md:grid md:w-1/3 pt-2 ml-4">
          <div className="mx-4 mb-2 text-xs font-medium">
            ADD TO CARD
          </div>
          <div className="grid grid-cols-6">
          <Button size='sm' variant="secondary" className="md:col-span-6 col-span-3 flex justify-start px-4 mx-4 mb-2 text-sm  rounded-sm cursor-pointer">
          <User className="w-4 h-4 mr-1 mb-1"/>
            Members
          </Button>
          <Button size='sm' variant="secondary" className="md:col-span-6 col-span-3 flex justify-start px-4 mx-4 mb-2 text-sm  rounded-sm cursor-pointer">
          <Tag className="w-4 h-4 mr-1 mb-1"/>
            Labels
          </Button>
          <Button size='sm' variant="secondary" className="md:col-span-6 col-span-3 flex justify-start px-4 mx-4 mb-2 text-sm  rounded-sm cursor-pointer">
          <CheckSquare className="w-4 h-4 mr-1 mb-1"/>
            Checklist
          </Button>
          <Button size='sm' variant="secondary" className="md:col-span-6 col-span-3 flex justify-start px-4 mx-4 mb-2 text-sm  rounded-sm cursor-pointer">
            <Clock7 className="w-4 h-4 mr-1 mb-1"/>
              Dates
            </Button>
          <Button size='sm' variant="secondary" className="md:col-span-6 col-span-3 flex justify-start px-4 mx-4 mb-2 text-sm  rounded-sm cursor-pointer">
          <Paperclip className="w-4 h-4 mr-1 mb-1"/>
            Attachment
          </Button>
          <Button size='sm' variant="secondary" className="md:col-span-6 col-span-3 flex justify-start px-4 mx-4 mb-2 text-sm  rounded-sm cursor-pointer">
          <AppWindow className="w-4 h-4 mr-1 mb-1"/>
            Cover
          </Button>
          </div>
          <div className="mx-4 mb-2 text-xs font-medium">
            ACTIONS
          </div>
          <div className="grid grid-cols-6 ">
          <Button size='sm' variant="secondary" className="md:col-span-6 col-span-3 flex justify-start px-4 mx-4 mb-2 text-sm  rounded-sm cursor-pointer">
          <ArrowLeftRight className="w-4 h-4 mr-1 mb-1"/>
            Move
          </Button>
          <Button size='sm' variant="secondary" className="md:col-span-6 col-span-3 flex justify-start px-4 mx-4 mb-2 text-sm  rounded-sm cursor-pointer">
          <Copy className="w-4 h-4 mr-1 mb-1"/>
            Copy
          </Button>
          <Button size='sm' variant="secondary" className="md:col-span-6 col-span-3 flex justify-start px-4 mx-4 mb-2 text-sm  rounded-sm cursor-pointer">
          <LayoutTemplate className="w-4 h-4 mr-1 mb-1"/>
            Make Template
          </Button>
          <Button size='sm' variant="secondary" className="md:col-span-6 col-span-3 flex justify-start px-4 mx-4 mb-2 text-sm  rounded-sm cursor-pointer">
          <Archive className="w-4 h-4 mr-1 mb-1"/>
            Archive
          </Button>
          <Button size='sm' variant="secondary" className="md:col-span-6 col-span-3 flex justify-start px-4 mx-4 mb-2 text-sm  rounded-sm cursor-pointer">
          <Share2 className="w-4 h-4 mr-1 mb-1"/>
            Share
          </Button>
        </div>
      </div>
      </div>
      </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
