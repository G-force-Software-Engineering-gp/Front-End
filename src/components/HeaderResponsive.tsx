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
import AddWorkSapceHeader from '@/pages/HomePage/components/AddWorkSapceHeader';
import axios from 'axios';
import { AlignLeft, BellDot, Calendar, CheckCircle, ClipboardList, GanttChartSquare, HelpCircle, Layers, LineChart, User2 } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderSheet from './HeaderSheet';
import { Input } from './ui/input';
import { ModeToggle } from './ui/mode-toggle';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const HeaderResponsive = () => {
  const navigate = useNavigate();

  return (
    <div data-testid="headerResponsive">
      <div className="flex-col border-b-2 lg:hidden">
        <div className="flex-1 p-2 px-5 ">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              <>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <HeaderSheet />
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </>
            </div>
            <div className="flex items-center space-x-2">
              {/* <Input type="text" placeholder="Search" /> */}
              <ModeToggle data-testid="mode-toggle11" />
              {/* <BellDot className="h-5 w-5" /> */}
              <HoverCard>
                  <HoverCardTrigger asChild>
                    <HelpCircle className="h-5 w-5 cursor-pointer rounded-md" />
                  </HoverCardTrigger>
                  <HoverCardContent className="mr-10 grid w-[40vw] grid-cols-2">
                    <div className="mb-4 flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage src="https://github.com/vercel.png1" />
                        <AvatarFallback><Layers /></AvatarFallback>
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
                        <AvatarFallback><ClipboardList /></AvatarFallback>
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
                        <AvatarFallback><CheckCircle /></AvatarFallback>
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
                        <AvatarFallback><Calendar /></AvatarFallback>
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
                        <AvatarFallback><LineChart /></AvatarFallback>
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
                        <AvatarFallback><GanttChartSquare /></AvatarFallback>
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
              <User2 data-testid="user-icon" className="h-5 w-5" onClick={() => navigate('/settings')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderResponsive;
