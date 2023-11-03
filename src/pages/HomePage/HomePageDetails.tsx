import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AuthContext from '@/contexts/AuthContext';
import axios from 'axios';
import { StarIcon } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePageDetails = () => {
  const navigate = useNavigate();
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

  return (
    <div className=" px-6 pt-3">
      <div>
        <div className="flex">
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
            className="lucide lucide-star mr-2"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <h2>Starred Workspaces</h2>
        </div>
        <div className="mb-8 mt-4 grid auto-rows-fr gap-2 sm:grid-cols-2">
          <Card className=" cursor-pointer bg-slate-200 dark:bg-slate-900">
            <CardHeader className="flex justify-between gap-4 space-y-0 p-4">
              <div className="flex justify-between">
                <div className="space-y-1">
                  <CardTitle>Board 1</CardTitle>
                  <CardDescription>Description</CardDescription>
                </div>
                <Button variant="ghost">
                  <StarIcon className="h-6 w-6" />
                </Button>
              </div>
            </CardHeader>
          </Card>

          <Card className=" cursor-pointer bg-slate-300 dark:bg-slate-800">
            <CardHeader className="flex justify-between gap-4 space-y-0 p-4">
              <div className="flex justify-between">
                <div className="space-y-1">
                  <CardTitle>Board 2</CardTitle>
                  <CardDescription>
                    Beautifully designed components built with Radix UI and Tailwind CSS.
                  </CardDescription>
                </div>
                <Button variant="ghost">
                  <StarIcon className="h-6 w-6" />
                </Button>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>

      <div>
        <div className="flex">
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
            className="lucide lucide-clock-10 mr-2"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 8 10" />
          </svg>
          <h2>Recently viewed</h2>
        </div>
        <div className="mb-8 mt-4 grid auto-rows-fr gap-2  sm:grid-cols-2">
          <Card className=" cursor-pointer bg-slate-200 dark:bg-slate-900">
            <CardHeader className="flex justify-between gap-4 space-y-0 p-4">
              <div className="flex justify-between">
                <div className="space-y-1">
                  <CardTitle>Board 1</CardTitle>
                  <CardDescription>Description</CardDescription>
                </div>
                <Button variant="ghost">
                  <StarIcon className="h-6 w-6" />
                </Button>
              </div>
            </CardHeader>
          </Card>
          <Card className=" cursor-pointer bg-slate-200 dark:bg-slate-900">
            <CardHeader className="flex justify-between gap-4 space-y-0 p-4">
              <div className="flex justify-between">
                <div className="space-y-1">
                  <CardTitle>Board 1</CardTitle>
                  <CardDescription>Description</CardDescription>
                </div>
                <Button variant="ghost">
                  <StarIcon className="h-6 w-6" />
                </Button>
              </div>
            </CardHeader>
          </Card>
          <Card className=" cursor-pointer bg-slate-300 dark:bg-slate-800">
            <CardHeader className="flex justify-between gap-4 space-y-0 p-4">
              <div className="flex justify-between">
                <div className="space-y-1">
                  <CardTitle>Board 2</CardTitle>
                  <CardDescription>
                    Beautifully designed components built with Radix UI and Tailwind CSS.
                  </CardDescription>
                </div>
                <Button variant="ghost">
                  <StarIcon className="h-6 w-6" />
                </Button>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>

      <div>
        <div className="flex">
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
            className="lucide lucide-layers mr-2"
          >
            <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
            <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
            <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
          </svg>
          <h2>Your WorkSpaces</h2>
        </div>
        {/* Workspaces */}
        {workspaces
          ? workspaces.map((item) => (
              <div className="mt-4">
                <div className="grid sm:flex sm:items-center sm:justify-between">
                  <div className="mb-4 flex items-center sm:mb-0">
                    <Avatar className="mr-2 h-8 w-8 rounded-sm ">
                      <AvatarImage className="rounded-sm " src="https://github.com/shadcn.png11" alt="@shadcn" />
                      <AvatarFallback className="rounded-sm ">G</AvatarFallback>
                    </Avatar>
                    <div>{item?.name}</div>
                  </div>
                  <div className="">
                    <Button variant="secondary" className="mr-1 mt-1 p-2 sm:mt-0">
                      {' '}
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
                        className="lucide lucide-trello mr-1 h-5 w-5"
                      >
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                        <rect width="3" height="9" x="7" y="7" />
                        <rect width="3" height="5" x="14" y="7" />
                      </svg>
                      Boards
                    </Button>

                    <Button variant="secondary" className="mr-1 mt-1 p-2 sm:mt-0">
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
                        className="lucide lucide-heart mr-1 h-5 w-5"
                      >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                      Highlights
                    </Button>

                    <Button variant="secondary" className="mr-1 mt-1 p-2 sm:mt-0">
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
                        className="lucide lucide-layout-dashboard mr-1 h-5 w-5"
                      >
                        <rect width="7" height="9" x="3" y="3" rx="1" />
                        <rect width="7" height="5" x="14" y="3" rx="1" />
                        <rect width="7" height="9" x="14" y="12" rx="1" />
                        <rect width="7" height="5" x="3" y="16" rx="1" />
                      </svg>
                      Views
                    </Button>

                    <Button variant="secondary" className="mr-1 mt-1 p-2 sm:mt-0">
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
                        className="lucide lucide-users-2 mr-1 h-5 w-5"
                      >
                        <path d="M14 19a6 6 0 0 0-12 0" />
                        <circle cx="8" cy="9" r="4" />
                        <path d="M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8" />
                      </svg>
                      Members
                    </Button>

                    <Button variant="secondary" className="mt-1 p-2 sm:mt-0">
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
                        className="lucide lucide-settings mr-1 h-5 w-5"
                      >
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      Settings
                    </Button>
                  </div>
                </div>

                <div className="mb-8 mt-4 grid auto-rows-fr gap-2 sm:grid-cols-3">
                  {item?.boards.map((item1: { id: number; title: string; backgroundImage: any }) => (
                    <Card
                      style={{ backgroundImage: `url(${item1?.backgroundImage})`, backgroundSize: 'cover' }}
                      className=" h-36 cursor-pointer bg-slate-200 dark:bg-slate-900"
                      onClick={() => navigate(`/board/${item1.id}`)}
                    >
                      <CardHeader className="flex justify-between gap-4 space-y-0 p-4">
                        <div className="flex justify-between">
                          <div className="space-y-1">
                            <CardTitle>{item1.title}</CardTitle>
                            {/* <CardDescription>Description</CardDescription> */}
                          </div>
                          <Button variant="ghost">
                            <StarIcon className="h-6 w-6" />
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}

                  <Card className=" cursor-pointer bg-slate-300 dark:bg-slate-800">
                    <div className=" flex gap-4 space-y-0 px-12 py-14 sm:px-6 sm:py-14">
                      <label className=" text-xl font-semibold">Create a new Board</label>
                    </div>
                  </Card>
                </div>
              </div>
            ))
          : ''}
      </div>
    </div>
  );
};

export default HomePageDetails;
