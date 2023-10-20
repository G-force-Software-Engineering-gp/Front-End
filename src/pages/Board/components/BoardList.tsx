import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AuthContext from '@/contexts/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Calendar, ListIcon, MoreHorizontal, MoreVertical, Plus, Tags, Trash, User } from 'lucide-react';
import React, { useContext } from 'react';
import { useBoard } from '../hooks/useBoard';
import { useCard } from '../hooks/useCard';
import { useList } from '../hooks/useList';
import { List } from '../types';
import CreateTaskModal from './CreateTaskModal';

interface Props {
  listId: number;
  columns: List[];
  boardId: number;
}
export const BoardList = ({ listId, columns, boardId }: Props) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  let authTokens = useContext(AuthContext)?.authTokens;
  const deleteList = useMutation({
    mutationFn: () => {
      return fetch(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/list/${listId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ` + authTokens.access,
        },
      });
    },
    onError: (error, variables, context) => {
      // An error happened!
    },
    onSuccess: (data, variables, context) => {
      // on success
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['board', boardId] });
    },
  });

  const { data, isLoading } = useList(listId);
  return (
    <div className="board-draggable relative flex max-h-full w-72 shrink-0 flex-col">
      <div className="board-draggable-handler flex items-center justify-between px-0.5 pb-3">
        <div className="flex items-center space-x-2">
          <div className="bg-info/10 text-info flex h-8 w-8 items-center justify-center rounded-lg">
            <ListIcon className="text-base" />
          </div>
          <h3 className=" text-base">{data?.title}</h3>
        </div>
        <div className="inline-flex">
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuGroup>
                {/* <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Assign to...
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Calendar className="mr-2 h-4 w-4" />
                  Set due date...
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Tags className="mr-2 h-4 w-4" />
                    Move to
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Filter label..." autoFocus={true} />
                      <CommandList>
                        <CommandEmpty>No label found.</CommandEmpty>
                        <CommandGroup>
                          {columns.map((col) => (
                            <CommandItem
                              key={col.id}
                              onSelect={(value) => {
                                console.log(value);
                                setOpen(false);
                              }}
                            >
                              {col.title}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator /> */}
                <DropdownMenuItem onClick={() => deleteList.mutate()} className="text-red-600">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="is-scrollbar-hidden relative space-y-2.5 overflow-y-auto p-0.5">
        {data?.card?.map((card) => <ListCard columns={columns} cardId={card.id} listId={listId} />)}
      </div>
      <div className="flex justify-center  py-2">{data !== undefined && <CreateTaskModal listId={data.id} />}</div>
    </div>
  );
};

interface CardProps {
  cardId: number;
  listId: number;
  columns: List[];
}

export const ListCard = ({ cardId, columns, listId }: CardProps) => {
  const { data, isLoading } = useCard(cardId);
  const [open, setOpen] = React.useState(false);

  const queryClient = useQueryClient();
  let authTokens = useContext(AuthContext)?.authTokens;
  const deleteTask = useMutation({
    mutationFn: () => {
      return fetch(`https://amirmohammadkomijani.pythonanywhere.com/tascrum/card/${cardId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ` + authTokens.access,
        },
      });
    },
    onError: (error, variables, context) => {
      // An error happened!
    },
    onSuccess: (data, variables, context) => {
      // on success
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['list', listId] });
    },
  });
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <p className=" text-lg">{data?.title}</p>

            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Assign to...
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Calendar className="mr-2 h-4 w-4" />
                    Set due date...
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Tags className="mr-2 h-4 w-4" />
                      Move to
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="p-0">
                      <Command>
                        {/* <CommandInput placeholder="Filter label..." autoFocus={true} /> */}
                        <CommandList>
                          {/* <CommandEmpty>No label found.</CommandEmpty> */}
                          <CommandGroup>
                            {columns.map((col) => (
                              <CommandItem
                                key={col.id}
                                onSelect={(value) => {
                                  console.log(value);
                                  setOpen(false);
                                }}
                              >
                                {col.title}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => deleteTask.mutate()} className="text-red-600">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardTitle>
          {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
        </CardHeader>
        {/* <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">lllhlhhlkhkklj</div>
            <div className="flex flex-col space-y-1.5">
              <div className="flex flex-wrap space-x-1">
                <Badge className=" space-x-1 px-1.5 py-1 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span> Sep 12</span>
                </Badge>
                <Badge className="px-1.5 py-1">Update</Badge>
                <Badge className=" space-x-1 px-1.5 py-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>4/5</span>
                </Badge>
              </div>
            </div>
          </div>
        </CardContent> */}
        {/* <CardFooter className="flex items-end justify-between pt-1">
          <div className="flex flex-wrap -space-x-1.5">
            <Avatar className="h-5 w-5 hover:z-10">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <Avatar className="h-5 w-5 hover:z-10">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <Avatar className="h-5 w-5 hover:z-10">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="dark:text-navy-300 flex items-center space-x-2 text-xs text-slate-400">
            <div className="flex items-center space-x-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              <span>3</span>
            </div>
            <div className="flex items-center space-x-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <span>1</span>
            </div>
          </div>
        </CardFooter> */}
      </Card>
    </>
  );
};
