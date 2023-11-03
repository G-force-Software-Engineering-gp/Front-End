import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { CalendarDays, ChevronRight, Link, Plus, Settings, Trash2, Trello, Users2 } from 'lucide-react';

export function BoardSidebar({ className }: any) {
  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4 py-4 ">
        <div className="px-3 py-2">
          <div className="mb-2 flex items-center">
            <Avatar className="h-9 w-9 rounded-sm ">
              <AvatarImage className="rounded-sm" src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback className="rounded-sm">G</AvatarFallback>
            </Avatar>
            <div className="ml-2 flex h-9 flex-col justify-between ">
              <p className="text-sm font-medium ">G-Force</p>
              <p className="text-xs text-muted-foreground">Free</p>
            </div>
          </div>
          <hr className="mb-2" />
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <Trello className="mr-2 h-4 w-4" />
              Boards
            </Button>
            <Button variant="ghost" className="group w-full justify-between pr-2">
              <div className="flex justify-start">
                <Users2 className="mr-2 h-4 w-4" />
                Members
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="hidden h-7  w-7 p-0 group-hover:flex">
                    <Plus className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Invite to Workspace</DialogTitle>
                  </DialogHeader>
                  <Input placeholder="Email address or name" />
                  <div className="mt-3 flex items-center justify-between">
                    <span>Invite someone to this Workspace with a link:</span>
                    <Button variant="secondary" className="flex justify-start">
                      <Link className="mr-2 h-4 w-4" />
                      <span>Create link</span>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-fit w-full justify-between pr-3">
                  <div className="flex items-center justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Workspace Settings
                  </div>
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <span>Workspace settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Upgrade Workspace</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Workspace Views</h2>
          <div className="space-y-1">
            <Button variant="ghost" className="group w-full justify-between pr-2">
              <div className="flex justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-table-properties mr-2 h-4 w-4"
                >
                  <path d="M15 3v18" />
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M21 9H3" />
                  <path d="M21 15H3" />
                </svg>
                <span className="italic">Table</span>
              </div>
              <Button variant="secondary" className="hidden h-7 w-7 p-0 group-hover:flex">
                <Trash2 className="hidden h-4 w-4 group-hover:block" />
              </Button>
            </Button>
            <Button variant="ghost" className="group w-full justify-between pr-2">
              <div className="flex justify-start">
                <CalendarDays className="mr-2 h-4 w-4" />
                <span className="italic">Calendar</span>
              </div>
              <Button variant="secondary" className="hidden h-7  w-7 p-0 group-hover:flex">
                <Trash2 className="hidden h-4 w-4 group-hover:block" />
              </Button>
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Your Boards</h2>
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <path d="M21 15V6" />
                <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                <path d="M12 12H3" />
                <path d="M16 6H3" />
                <path d="M12 18H3" />
              </svg>
              Table
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
