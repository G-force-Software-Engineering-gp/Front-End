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
import { AlignLeft, BellDot, HelpCircle, User2 } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderSheet from './HeaderSheet';
import { Input } from './ui/input';
import { ModeToggle } from './ui/mode-toggle';

const HeaderResponsive = () => {
  const navigate = useNavigate();

  return (
    <div>
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
              <BellDot className="h-5 w-5" />
              <HelpCircle className="h-5 w-5" />
              <User2 data-testid="user-icon" className="h-5 w-5" onClick={() => navigate('/settings')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderResponsive;
