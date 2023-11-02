import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ModeToggle } from '@/components/ui/mode-toggle';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import {
  BellDot,
  ChevronDown,
  Eye,
  HelpCircle,
  ListFilter,
  MoreHorizontal,
  Star,
  Trello,
  User2,
  UserPlus2,
} from 'lucide-react';
import React from 'react';

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';

const BoardHeader = () => {
  const components: { title: string; href: string; description: string }[] = [
    {
      title: 'Alert Dialog',
      href: '/docs/primitives/alert-dialog',
      description: 'A modal dialog that interrupts the user with important content and expects a response.',
    },
    {
      title: 'Hover Card',
      href: '/docs/primitives/hover-card',
      description: 'For sighted users to preview content available behind a link.',
    },
    {
      title: 'Progress',
      href: '/docs/primitives/progress',
      description:
        'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
    },
    {
      title: 'Scroll-area',
      href: '/docs/primitives/scroll-area',
      description: 'Visually or semantically separates content.',
    },
    {
      title: 'Tabs',
      href: '/docs/primitives/tabs',
      description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
    },
    {
      title: 'Tooltip',
      href: '/docs/primitives/tooltip',
      description:
        'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
    },
  ];
  return (
    <div className="backdrop-blur">
      <>
        <div className="flex flex-1 flex-col border-b-2 p-2 px-5 md:flex-row md:items-center md:justify-between">
          <div className="pb-2 md:pb-0">
            <div className="text-2xl font-bold">
              <>
                <span></span>
                <span className="m-2">G-Force</span>
                <Button variant="secondary" className="m-1 h-8 w-8 p-0">
                  <Eye className="h-4 w-4 " />
                </Button>
                <Button variant="secondary" className="m-1 h-8 w-8 p-0">
                  <Star className="h-4 w-4 " />
                </Button>
                <Popover>
                  <PopoverTrigger>
                    <Button variant="secondary" className="ml-1 h-8 w-fit px-2">
                      <Trello className="mr-2 h-4 w-4" />
                      <span className="mr-1">Board</span>
                      <ChevronDown className="h-4 w-4 " />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-100">
                    <div className="grid gap-4">
                      <div className="flex justify-center">
                        <h4 className="font-medium leading-none">Upgrade For Views</h4>
                      </div>
                      <div className="grid gap-2">
                        <h3 className="font-medium leading-none">See your work in new ways</h3>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Input id="maxWidth" defaultValue="300px" className="col-span-2 h-8" />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Input id="maxHeight" defaultValue="none" className="col-span-2 h-8" />
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            </div>
          </div>
          <div className="flex items-center justify-end space-x-2">
            <Button variant="secondary" className="h-8 w-8 p-0">
              <ListFilter className="h-4 w-4" />
            </Button>
            <div className="flex -space-x-2 overflow-hidden">
              <Avatar>
                <AvatarImage />
                <AvatarFallback>EA</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage />
                <AvatarFallback>SR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage />
                <AvatarFallback>+4</AvatarFallback>
              </Avatar>
            </div>
            <Button className="h-8 w-20 p-0">
              <UserPlus2 className="mr-1 h-4 w-4" />
              <span>Share</span>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" className="m-1 h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4 " />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>WTF is this</SheetTitle>
                  <SheetDescription>saturday through sunday. monday, monday through sunday yo</SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </>
    </div>
  );
};

export default BoardHeader;
