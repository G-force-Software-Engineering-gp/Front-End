import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import AuthContext from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { BaseURL } from '@/pages/baseURL';
import AddWorkSapceHeader from '@/pages/HomePage/components/AddWorkSapceHeader';
import { useRecentlyViewed } from '@/pages/HomePage/hooks/useRecentlyViewed';
import axios from 'axios';
import {
  BellDot,
  Calendar,
  CalendarDays,
  CheckCircle,
  ClipboardList,
  GanttChartSquare,
  HelpCircle,
  Layers,
  LineChart,
  User2,
} from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from './Search';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { Input } from './ui/input';
import { ModeToggle } from './ui/mode-toggle';

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

const Header = () => {
  const navigate = useNavigate();
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
  let authTokens = useContext(AuthContext)?.authTokens;
  const [workspaces, setworkspaces] = useState<any[]>([]);
  const { data: recently } = useRecentlyViewed();
  // console.log(recently);
  const gettingData = async () => {
    const { data } = await axios
      .get(BaseURL + 'tascrum/workspace/', {
        headers: {
          Authorization: `JWT ${authTokens?.access}`,
        },
      })
      .then((response) => response);
    setworkspaces(data);
  };
  useEffect(() => {
    gettingData();
  }, []);
  return (
    <div data-testid="header">
      <>
        <div className="hidden flex-col border-b-2 lg:flex">
          <div className="flex-1 p-2 px-5 ">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                <>
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <span className="cursor-pointer">
                          <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                            onClick={() => {
                              navigate('/');
                            }}
                          >
                            <img className="h-6" src={require('../pics/logo.png')} alt="" />
                          </NavigationMenuLink>
                        </span>
                      </NavigationMenuItem>

                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Workspaces</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                              <NavigationMenuLink asChild>
                                <a
                                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                  href="/"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6">
                                    <rect width="256" height="256" fill="none"></rect>
                                    <line
                                      x1="208"
                                      y1="128"
                                      x2="128"
                                      y2="208"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="16"
                                    ></line>
                                    <line
                                      x1="192"
                                      y1="40"
                                      x2="40"
                                      y2="192"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="16"
                                    ></line>
                                  </svg>
                                  <div className="mb-2 mt-4 text-lg font-medium">Workspaces</div>
                                  <p className="text-sm leading-tight text-muted-foreground">
                                    You can see list of all your workspaces here.
                                  </p>
                                </a>
                              </NavigationMenuLink>
                            </li>
                            <li>
                              {workspaces
                                ? workspaces.map((item) => <ListItem title={item.name}>{item.description}</ListItem>)
                                : ''}
                            </li>
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>

                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Recent</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                              <NavigationMenuLink asChild>
                                <a
                                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                  href="/"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6">
                                    <rect width="256" height="256" fill="none"></rect>
                                    <line
                                      x1="208"
                                      y1="128"
                                      x2="128"
                                      y2="208"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="16"
                                    ></line>
                                    <line
                                      x1="192"
                                      y1="40"
                                      x2="40"
                                      y2="192"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="16"
                                    ></line>
                                  </svg>
                                  <div className="mb-2 mt-4 text-lg font-medium">Recent Workspaces</div>
                                  <p className="text-sm leading-tight text-muted-foreground">
                                    You can see a list of your recent workspaces
                                  </p>
                                </a>
                              </NavigationMenuLink>
                            </li>
                            <li>
                              {recently
                                ? recently.map((item: any) => (
                                    <ListItem className="!flex">
                                      <div
                                        className="flex cursor-pointer items-center gap-2"
                                        onClick={() => navigate(`/board/${item.id}`)}
                                      >
                                        <ClipboardList className="h-8 w-8" />
                                        <div className=" text-base">{item.title}</div>
                                      </div>
                                    </ListItem>
                                  ))
                                : ''}
                            </li>
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>

                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Templates</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] cursor-pointer gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {components.map((component) => (
                              <ListItem key={component.title} title={component.title}>
                                {component.description}
                              </ListItem>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>

                      <AddWorkSapceHeader />
                    </NavigationMenuList>
                  </NavigationMenu>
                </>
              </div>
              <div className="flex items-center space-x-2">
                <ModeToggle data-testid="mode-toggle11" />
                <Search />
                {/* <BellDot className="h-9 w-9" /> */}

                <HoverCard>
                  <HoverCardTrigger asChild>
                    <HelpCircle className="h-9 w-9 cursor-pointer rounded-md px-[6px] transition-colors hover:bg-accent" />
                  </HoverCardTrigger>
                  <HoverCardContent className="mr-10 grid w-[40vw] grid-cols-2">
                    <div className="mb-4 flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage src="https://github.com/vercel.png1" />
                        <AvatarFallback>
                          <Layers />
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">Workspace Management</h4>
                        <p className="text-sm">
                          Organize your projects into distinct workspaces, making it easy to categorize and manage
                          multiple projects at once.
                        </p>
                      </div>
                    </div>
                    <div className="mb-4 flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage src="https://github.com/vercel.png1" />
                        <AvatarFallback>
                          <ClipboardList />
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">Interactive Boards</h4>
                        <p className="text-sm">
                          Dive deep into each workspace with dedicated boards. Customize them to fit your workflow and
                          visualize your tasks like never before.
                        </p>
                      </div>
                    </div>
                    <div className="mb-4 flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage src="https://github.com/vercel.png1" />
                        <AvatarFallback>
                          <CheckCircle />
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">Task Assignment</h4>
                        <p className="text-sm">
                          Efficiently delegate tasks to team members and keep everyone on the same page with real-time
                          updates and notifications.
                        </p>
                      </div>
                    </div>
                    <div className="mb-4 flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage src="https://github.com/vercel.png1" />
                        <AvatarFallback>
                          <Calendar />
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">Calendar Integration</h4>
                        <p className="text-sm">
                          Stay on schedule with our integrated calendar feature. Plan your tasks, set reminders, and
                          track deadlines with ease.
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage src="https://github.com/vercel.png1" />
                        <AvatarFallback>
                          <LineChart />
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">Burndown Chart</h4>
                        <p className="text-sm">
                          Monitor your project's progress with our intuitive burndown charts. Gain insights into task
                          completion rates and adjust your strategies accordingly.
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage src="https://github.com/vercel.png1" />
                        <AvatarFallback>
                          <GanttChartSquare />
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">Timeline View</h4>
                        <p className="text-sm">
                          Visualize your project's timeline and milestones. Understand project progression and identify
                          potential bottlenecks before they arise.
                        </p>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
                <User2
                  data-testid="user-icon"
                  className="h-9 w-9 cursor-pointer rounded-md px-[6px] transition-colors hover:bg-accent"
                  onClick={() => navigate('/settings')}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Header;
