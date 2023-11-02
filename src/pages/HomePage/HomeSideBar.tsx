import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AuthContext from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { useTheme } from '@/components/theme-provider';

// import { Playlist } from '../../data/playlists';

// interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
//   playlists: Playlist[];
// }

export function HomeSideBar() {
  let authTokens = useContext(AuthContext)?.authTokens;
  // console.log(authTokens.access);
  const [workspaces, setworkspaces] = useState<any[]>([]);
  const gettingData = async () => {
    const { data } = await axios
      .get('https://amirmohammadkomijani.pythonanywhere.com/tascrum/workspace/', {
        headers: {
          Authorization: `JWT ${authTokens.access}`,
        },
      })
      .then((response) => response);
    console.log(data);
    setworkspaces(data);
  };
  useEffect(() => {
    gettingData();
  }, []);
  // use for getting light or dark mode
  const { theme} = useTheme();
  return (
    <div className={cn('pb-12', 'hidden lg:block')}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          {/* <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Discover
          </h2> */}
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start">
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
                className="lucide lucide-trello mr-2 h-5 w-5"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <rect width="3" height="9" x="7" y="7" />
                <rect width="3" height="5" x="14" y="7" />
              </svg>
              Boards
            </Button>

            <Button variant="ghost" className="w-full justify-start">
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
                className="lucide lucide-layout-template mr-2 h-5 w-5"
              >
                <rect width="18" height="7" x="3" y="3" rx="1" />
                <rect width="9" height="7" x="3" y="14" rx="1" />
                <rect width="5" height="7" x="16" y="14" rx="1" />
              </svg>
              Templates
            </Button>

            <Button variant="ghost" className="w-full justify-start">
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
                className="lucide lucide-home mr-2 h-5 w-5"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Home
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="px-4 text-lg font-semibold tracking-tight">Workspaces</h2>
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
              className="lucide lucide-plus cursor-pointer"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </div>
          <div className="space-y-1">
            <Accordion type="single" collapsible className="w-full">
              {workspaces
                ? workspaces.map((item, index) => (
                    <AccordionItem value={index.toString()}>
                      <AccordionTrigger className="rounded-md pl-4 pr-1 hover:bg-accent hover:no-underline">
                        <div className="flex items-center">
                          <Avatar className="mr-2 h-8 w-8 rounded-sm">
                            <AvatarImage className="rounded-sm" src="https://github.com/shadcn.png11" alt="@shadcn" />
                            <AvatarFallback className="rounded-sm">F</AvatarFallback>
                          </Avatar>
                          <div>{item?.name}</div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-2">
                        <Button variant="ghost" className="w-full justify-start">
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
                            className="lucide lucide-trello mr-2 h-5 w-5"
                          >
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                            <rect width="3" height="9" x="7" y="7" />
                            <rect width="3" height="5" x="14" y="7" />
                          </svg>
                          Boards
                        </Button>

                        <Button variant="ghost" className="w-full justify-start">
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
                            className="lucide lucide-heart mr-2 h-5 w-5"
                          >
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                          </svg>
                          Highlights
                        </Button>

                        <Button variant="ghost" className="w-full justify-start">
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
                            className="lucide lucide-layout-dashboard mr-2 h-5 w-5"
                          >
                            <rect width="7" height="9" x="3" y="3" rx="1" />
                            <rect width="7" height="5" x="14" y="3" rx="1" />
                            <rect width="7" height="9" x="14" y="12" rx="1" />
                            <rect width="7" height="5" x="3" y="16" rx="1" />
                          </svg>
                          Views
                        </Button>

                        <Button variant="ghost" className="w-full justify-start">
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
                            className="lucide lucide-users-2 mr-2 h-5 w-5"
                          >
                            <path d="M14 19a6 6 0 0 0-12 0" />
                            <circle cx="8" cy="9" r="4" />
                            <path d="M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8" />
                          </svg>
                          Members
                        </Button>

                        <Button variant="ghost" className="w-full justify-start">
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
                            className="lucide lucide-settings mr-2 h-5 w-5"
                          >
                            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Settings
                        </Button>
                      </AccordionContent>
                    </AccordionItem>
                  ))
                : ''}

              
            </Accordion>
          </div>
        </div>
        <div >
        {theme === 'dark' ? <img className='my-20 h-[400px]' src={require('../../pics/scheduleDark.png')} alt="" />
      : <img className='my-20 h-[400px] ' src={require('../../pics/scheduleLight.png')} alt="" /> }
        </div>
        {/* <div className="py-2">
          <h2 className="relative px-7 text-lg font-semibold tracking-tight">Playlists</h2>
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1 p-2">
              {playlists?.map((playlist, i) => (
                <Button key={`${playlist}-${i}`} variant="ghost" className="w-full justify-start font-normal">
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
                  {playlist}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div> */}
      </div>
    </div>
  );
}
