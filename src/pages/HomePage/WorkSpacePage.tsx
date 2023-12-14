import Header from '@/components/Header';
import HeaderResponsive from '@/components/HeaderResponsive';
import { HomeSideBar } from './HomeSideBar';
import { Outlet, useNavigate } from 'react-router-dom';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Avatar } from '@radix-ui/react-avatar';
import React from 'react';
import { useParams } from 'react-router-dom';
import useWorkSpaceBoards from './hooks/useWorkSpaceBoards';
import AddBoard from './components/AddBoard';
import BoardCard from './components/BoardCard';

const capitalizeWords = (str: string) => {
  return str.replace(/\b\w/g, (match: string) => match.toUpperCase());
};

const WorkSpacePage = () => {
  const navigate = useNavigate();
  const { workspaceId } = useParams();
  const { data } = useWorkSpaceBoards(parseInt(workspaceId ? workspaceId : ''));
  const capitalizedType = data?.type ? capitalizeWords(data.type) : '';
  return (
    <div>
      <Header />
      <HeaderResponsive />
      <div className="grid grid-flow-col grid-cols-4 justify-center md:px-0 lg:px-14 xl:px-48">
        <div className=" hidden lg:col-span-1 lg:block">
          <HomeSideBar />
        </div>
        <div className=" col-span-4 p-5 lg:col-span-3">
          <div className="mt-4">
            {/* Header */}
            <div className="m-auto ">
              <div className="flex h-40 items-center justify-center">
                <Avatar className="mr-2 h-24 w-24 rounded-sm ">
                  <AvatarImage className="rounded-sm " src="https://github.com/shadcn.png11" alt="@shadcn" />
                  <AvatarFallback className="rounded-sm text-6xl ">{data?.name[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className=" text-3xl font-bold">{data?.name}</div>
                  <div className=" text-xl">{data?.description}</div>
                </div>
              </div>
              <div className=" flex border-b-2 pb-2 text-xl font-semibold">
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
                  className="lucide lucide-shapes mr-2"
                >
                  <path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <circle cx="17.5" cy="17.5" r="3.5" />
                </svg>
                {capitalizedType}
              </div>
            </div>
            <div className="mt-4 grid sm:flex sm:items-center sm:justify-between">
              <div className="">
                <Button
                  onClick={() => navigate(`boards`)}
                  variant="secondary"
                  className="mr-1 mt-1 p-2 sm:mt-0"
                >
                  {' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-layout-dashboard mr-1 h-5 w-5"
                  >
                    <rect width="7" height="9" x="3" y="3" rx="1" />
                    <rect width="7" height="5" x="14" y="3" rx="1" />
                    <rect width="7" height="9" x="14" y="12" rx="1" />
                    <rect width="7" height="5" x="3" y="16" rx="1" />
                  </svg>
                  Views
                </Button>

                <Button onClick={() => navigate(`members`)} variant="secondary" className="mr-1 mt-1 p-2 sm:mt-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-settings mr-1 h-5 w-5"
                  >
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Settings
                </Button>
              </div>
            </div>

          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default WorkSpacePage;
